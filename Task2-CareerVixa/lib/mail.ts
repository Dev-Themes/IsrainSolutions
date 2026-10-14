// @ts-nocheck
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { VerifyEmailTemplate } from "@/components/emails/VerifyEmailTemplate";
import { ResetPasswordTemplate } from "@/components/emails/ResetPasswordTemplate";
import { ArticleSubmissionTemplate } from "@/components/emails/ArticleSubmissionTemplate";
import { AdminNewSubmissionTemplate } from "@/components/emails/AdminNewSubmissionTemplate";
import { ArticleDecisionTemplate } from "@/components/emails/ArticleDecisionTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL;

  // If in production or on Vercel, guarantee we never send a localhost link
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    if (envUrl && !envUrl.includes("localhost")) {
      return envUrl.replace(/\/$/, "");
    }
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    return "https://career-vixa.vercel.app";
  }

  return (envUrl || "http://localhost:3000").replace(/\/$/, "");
}

const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
const gmailPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;

function getSmtpTransporter() {
  if (!gmailUser || !gmailPassword) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword.replace(/\s+/g, ""),
    },
  });
}

async function deliverEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: any;
}) {
  const transporter = getSmtpTransporter();

  if (transporter && gmailUser) {
    const html = await render(react);
    const info = await transporter.sendMail({
      from: `"CareerVixa" <${gmailUser}>`,
      to,
      subject,
      html,
    });
    console.log(`[Gmail SMTP Success] Email delivered to ${to} (Message ID: ${info.messageId})`);
    return { data: { id: info.messageId }, error: null };
  } else {
    const res = await resend.emails.send({
      from: "CareerVixa <onboarding@resend.dev>",
      to,
      subject,
      react,
    });
    return res;
  }
}

export const sendVerificationEmail = async (email: string, token: string, name?: string) => {
  const verifyUrl = `${getBaseUrl()}/verify-email?token=${token}`;
  console.log(`\n======================================================`);
  console.log(`📧 [DEV EMAIL] Verification Link for ${email}:`);
  console.log(`🔗 ${verifyUrl}`);
  console.log(`======================================================\n`);

  try {
    const res = await deliverEmail({
      to: email,
      subject: "Verify your email - CareerVixa",
      react: VerifyEmailTemplate({ name: name || "there", verifyUrl }),
    });
    return res;
  } catch (err: any) {
    console.warn(`[Email Delivery Notice] Could not deliver to ${email}: ${err?.message || err}`);
    return null;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string, name?: string) => {
  const resetUrl = `${getBaseUrl()}/reset-password?token=${token}`;
  console.log(`\n======================================================`);
  console.log(`📧 [DEV EMAIL] Password Reset Link for ${email}:`);
  console.log(`🔗 ${resetUrl}`);
  console.log(`======================================================\n`);

  try {
    const res = await deliverEmail({
      to: email,
      subject: "Reset your password - CareerVixa",
      react: ResetPasswordTemplate({ name: name || "there", resetUrl }),
    });
    return res;
  } catch (err: any) {
    console.warn(`[Email Delivery Notice] Could not deliver to ${email}: ${err?.message || err}`);
    return null;
  }
};

export const sendArticleSubmissionConfirmationEmail = async ({
  email,
  name,
  articleId,
  articleTitle,
  categoryName,
}: {
  email: string;
  name?: string;
  articleId: string;
  articleTitle: string;
  categoryName?: string;
}) => {
  try {
    const dashboardUrl = `${getBaseUrl()}/dashboard/articles`;
    const previewUrl = `${getBaseUrl()}/dashboard/articles/${articleId}/preview`;

    const res = await deliverEmail({
      to: email,
      subject: `Article Received: "${articleTitle}" - CareerVixa`,
      react: ArticleSubmissionTemplate({
        name: name || "there",
        articleTitle,
        categoryName,
        dashboardUrl,
        previewUrl,
      }),
    });

    return res;
  } catch (error) {
    console.error("Failed to send article submission confirmation email:", error);
    return null;
  }
};

export const sendAdminSubmissionNotificationEmail = async ({
  adminEmail,
  authorName,
  authorEmail,
  articleId,
  articleTitle,
  categoryName,
  promotionalUrl,
}: {
  adminEmail: string;
  authorName: string;
  authorEmail: string;
  articleId: string;
  articleTitle: string;
  categoryName?: string;
  promotionalUrl?: string;
}) => {
  try {
    const reviewUrl = `${getBaseUrl()}/admin/articles`;

    const res = await deliverEmail({
      to: adminEmail,
      subject: `[New Submission] "${articleTitle}" by ${authorName}`,
      react: AdminNewSubmissionTemplate({
        authorName,
        authorEmail,
        articleTitle,
        categoryName,
        promotionalUrl,
        reviewUrl,
      }),
    });

    return res;
  } catch (error) {
    console.error("Failed to send admin submission notification email:", error);
    return null;
  }
};

export const sendArticleDecisionEmail = async ({
  to,
  name,
  articleId,
  articleTitle,
  articleSlug,
  status,
  reviewNotes,
}: {
  to: string;
  name?: string;
  articleId: string;
  articleTitle: string;
  articleSlug?: string;
  status: string;
  reviewNotes?: string | null;
}) => {
  try {
    const dashboardUrl = `${getBaseUrl()}/dashboard/articles`;
    const articleUrl = articleSlug ? `${getBaseUrl()}/articles/${articleSlug}` : undefined;

    let subject = `Editorial Update: "${articleTitle}" - CareerVixa`;
    if (status === "PUBLISHED" || status === "APPROVED") {
      subject = `🎉 Published: "${articleTitle}" is now live on CareerVixa!`;
    } else if (status === "CHANGES_REQUESTED") {
      subject = `📝 Revisions Requested: "${articleTitle}" - CareerVixa`;
    } else if (status === "REJECTED") {
      subject = `Editorial Decision: "${articleTitle}" - CareerVixa`;
    }

    const res = await deliverEmail({
      to,
      subject,
      react: ArticleDecisionTemplate({
        name: name || "there",
        articleTitle,
        articleId,
        articleSlug,
        status,
        reviewNotes,
        dashboardUrl,
        articleUrl,
      }),
    });

    return res;
  } catch (error) {
    console.error("Failed to send article decision email:", error);
    return null;
  }
};

