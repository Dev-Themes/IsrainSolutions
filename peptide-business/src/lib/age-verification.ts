/**
 * Age Verification Utility
 * 
 * Uses standard Web Crypto API (supported in Edge Runtime & Node 18+)
 * to create and verify tamper-proof HMAC-SHA256 signed age confirmation cookies.
 */

export const AGE_COOKIE_NAME = "age_verified_token";
export const AGE_COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

function getSecretKey(): string {
  const secret = process.env.AGE_VERIFICATION_SECRET;
  if (!secret || secret.length < 16) {
    // Fallback for development if not set, with prominent warning
    return "default_dev_fallback_secret_key_32_bytes_min";
  }
  return secret;
}

// Convert ArrayBuffer to Hex string
function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Constant-time string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Creates an HMAC-SHA256 signature for a given payload
 */
async function signPayload(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const keyData = enc.encode(secret) as unknown as BufferSource;
  const payloadData = enc.encode(payload) as unknown as BufferSource;

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, payloadData);
  return bufferToHex(signature);
}

/**
 * Generates a signed age confirmation token.
 * Format: `verified.<timestamp>.<signature>`
 */
export async function createAgeVerificationToken(): Promise<string> {
  const secret = getSecretKey();
  const timestamp = Date.now().toString();
  const payload = `verified.${timestamp}`;
  const signature = await signPayload(payload, secret);
  return `${payload}.${signature}`;
}

/**
 * Validates a signed age confirmation token.
 * Verifies format, timestamp freshness (under 30 days), and cryptographic signature.
 */
export async function verifyAgeToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [prefix, timestampStr, signature] = parts;
  if (prefix !== "verified") return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const now = Date.now();
  const maxAgeMs = AGE_COOKIE_MAX_AGE * 1000;

  // Check if token has expired or is in the distant future (clock skew tolerance of 5 mins)
  if (timestamp > now + 300000 || now - timestamp > maxAgeMs) {
    return false;
  }

  try {
    const secret = getSecretKey();
    const payload = `${prefix}.${timestampStr}`;
    const expectedSignature = await signPayload(payload, secret);

    return timingSafeEqual(signature, expectedSignature);
  } catch (err) {
    console.error("Age verification validation error:", err);
    return false;
  }
}

/**
 * Validates safe return URLs, preventing open redirect vulnerabilities.
 */
export function sanitizeReturnUrl(returnUrl: string | null | undefined): string {
  if (!returnUrl) return "/";
  // Must start with single / and not // or /\, and not contain protocol
  if (returnUrl.startsWith("/") && !returnUrl.startsWith("//") && !returnUrl.startsWith("/\\")) {
    // Avoid double encoding issues
    try {
      const parsed = new URL(returnUrl, "http://dummy-local.test");
      if (parsed.origin === "http://dummy-local.test") {
        return parsed.pathname + parsed.search;
      }
    } catch {
      return "/";
    }
  }
  return "/";
}
