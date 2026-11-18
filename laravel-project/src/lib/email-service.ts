import dns from "dns";
import nodemailer from "nodemailer";

// In-memory OTP storage with TTL
interface StoredOtp {
  code: string;
  expiresAt: number;
  attempts: number;
  purpose: "REGISTRATION" | "PASSWORD_RESET";
}

// Global OTP store to survive hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __tc_otp_store__: Map<string, StoredOtp> | undefined;
}

const otpStore: Map<string, StoredOtp> =
  global.__tc_otp_store__ || (global.__tc_otp_store__ = new Map());

// Common disposable or fake email domains to block outright
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "tempmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "throwawaymail.com",
  "getairmail.com",
  "dispostable.com",
  "yopmail.com",
  "trashmail.com",
  "fakeinbox.com",
]);

/**
 * Validates whether an email's domain actually exists and has active MX records in the cloud
 */
export async function validateEmailDomain(email: string): Promise<{
  valid: boolean;
  error?: string;
  mxHost?: string;
}> {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email address is required." };
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: "Invalid email syntax format." };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { valid: false, error: "Invalid email structure." };
  }

  const domain = parts[1];

  // 1. Check for disposable domain
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: `Disposable email domains like '${domain}' are not permitted. Please use a genuine Google (Gmail), Outlook, or corporate email.`,
    };
  }

  // 2. Perform real DNS MX Record Query
  try {
    const mxRecords = await dns.promises.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return {
        valid: false,
        error: `The domain '${domain}' does not have active Mail Exchange (MX) servers and cannot receive incoming emails.`,
      };
    }

    // Sort by priority (lowest number = highest priority)
    mxRecords.sort((a, b) => a.priority - b.priority);
    return {
      valid: true,
      mxHost: mxRecords[0].exchange,
    };
  } catch (err: unknown) {
    const dnsError = err as { code?: string };
    if (dnsError.code === "ENOTFOUND" || dnsError.code === "ENODATA") {
      return {
        valid: false,
        error: `The email domain '${domain}' does not exist on the internet. Please check the spelling or provide an active Gmail or company email.`,
      };
    }
    // Network fallback: if DNS resolve timed out or failed locally, allow standard well-known domains
    const wellKnownDomains = ["gmail.com", "googlemail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "aol.com"];
    if (wellKnownDomains.includes(domain)) {
      return { valid: true, mxHost: `mx.${domain}` };
    }
    return {
      valid: false,
      error: `Could not reach active mail servers for domain '${domain}'. Please verify the email address.`,
    };
  }
}

/**
 * Generate and store a secure 6-digit numeric OTP
 */
export function generateOtp(email: string, purpose: "REGISTRATION" | "PASSWORD_RESET"): string {
  const normalized = email.trim().toLowerCase();
  // 6 digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const ttlMs = 10 * 60 * 1000; // 10 minutes

  otpStore.set(`${normalized}:${purpose}`, {
    code,
    expiresAt: Date.now() + ttlMs,
    attempts: 0,
    purpose,
  });

  return code;
}

/**
 * Verifies an OTP code for an email and purpose
 */
export function verifyOtp(
  email: string,
  code: string,
  purpose: "REGISTRATION" | "PASSWORD_RESET"
): { success: boolean; error?: string } {
  const normalized = email.trim().toLowerCase();
  const key = `${normalized}:${purpose}`;
  const stored = otpStore.get(key);

  if (!stored) {
    return {
      success: false,
      error: "No active verification code found for this email. Please request a new code.",
    };
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(key);
    return {
      success: false,
      error: "Verification code has expired. Please request a new one.",
    };
  }

  if (stored.attempts >= 5) {
    otpStore.delete(key);
    return {
      success: false,
      error: "Too many incorrect attempts. Please request a fresh verification code.",
    };
  }

  if (stored.code !== code.trim()) {
    stored.attempts += 1;
    return {
      success: false,
      error: `Incorrect verification code. ${5 - stored.attempts} attempts remaining.`,
    };
  }

  // Verification succeeded - clear OTP
  otpStore.delete(key);
  return { success: true };
}

/**
 * Dispatches the email through real SMTP or Gmail cloud transport
 */
export async function sendEmailCode(
  email: string,
  code: string,
  purpose: "REGISTRATION" | "PASSWORD_RESET"
): Promise<{ success: boolean; isLiveDelivery: boolean; previewCode?: string }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM || "no-reply@tradeconnect.com";

  const isRegistration = purpose === "REGISTRATION";
  const subject = isRegistration
    ? `Your TradeConnect Verification Code: ${code}`
    : `Reset Your TradeConnect Password: ${code}`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 800;">Trade<span style="color: #ea580c;">Connect</span></h2>
        <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Verified Trade Professionals Network &middot; UK &amp; US</p>
      </div>
      
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #334155; margin-top: 0; margin-bottom: 12px; font-weight: 600;">
          ${isRegistration ? "Confirm Your Email Address" : "Authorize Password Reset"}
        </p>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">
          Use the following 6-digit verification code to complete your request for <strong>${email}</strong>:
        </p>
        <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #0f172a; background-color: #ffffff; padding: 12px 24px; border: 2px dashed #cbd5e1; border-radius: 8px; display: inline-block;">
          ${code}
        </div>
        <p style="font-size: 11px; color: #94a3b8; margin-top: 12px; margin-bottom: 0;">
          This security code expires in 10 minutes. Do not share this code with anyone.
        </p>
      </div>

      <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 0;">
        If you did not initiate this request on TradeConnect, you can safely ignore this email. No changes have been made to your account.
      </p>
    </div>
  `;

  // Check if live SMTP credentials exist
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"TradeConnect Security" <${fromEmail}>`,
        to: email,
        subject,
        html: htmlBody,
      });

      return { success: true, isLiveDelivery: true };
    } catch (err) {
      console.error("[TradeConnect Email Service] Live SMTP delivery failed, falling back to verified token mode:", err);
      return { success: true, isLiveDelivery: false, previewCode: code };
    }
  }

  // Simulated delivery mode (Development / Testing without SMTP credentials in .env)
  console.log(`[TradeConnect Email Service] Simulation: Code for ${email} (${purpose}) is: ${code}`);
  return { success: true, isLiveDelivery: false, previewCode: code };
}
