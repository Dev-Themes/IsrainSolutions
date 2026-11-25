/**
 * Email dispatcher helper for link briefs.
 * Safely wraps email delivery (e.g. Resend or Nodemailer) with logging and secret isolation.
 */
import { siteConfig } from "./site-config";
import { BriefFormInput } from "./validators";

export async function sendBriefNotification(data: BriefFormInput): Promise<{ success: boolean; messageId?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;

  if (!apiKey) {
    console.log("[MAIL LOG] No RESEND_API_KEY set. Brief stored in local system log:", {
      to: recipientEmail,
      from: `${data.fullName} <${data.email}>`,
      website: data.website,
      service: data.service,
      budget: data.budget,
      details: data.targetDetails,
      niches: data.niches,
    });
    return { success: true, messageId: "mock-log-" + Date.now() };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `OffPage SEO Inquiries <noreply@israinsols.com>`,
        to: recipientEmail,
        reply_to: data.email,
        subject: `New Link Building Brief: ${data.website} (${data.service})`,
        text: `
Name: ${data.fullName}
Email: ${data.email}
Website: ${data.website}
Service: ${data.service}
Budget: ${data.budget}
Selected Niches: ${data.niches?.join(", ") || "None"}

Target Details:
${data.targetDetails}
        `.trim(),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[MAIL ERROR]", err);
      return { success: false };
    }

    const json = await res.json();
    return { success: true, messageId: json.id };
  } catch (error) {
    console.error("[MAIL EXCEPTION]", error);
    return { success: false };
  }
}
