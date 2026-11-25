import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = siteConfig.brandName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#02081E",
          backgroundImage: "radial-gradient(circle at 50% 10%, #0A2054 0%, #02081E 80%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          border: "4px solid #38bdf8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#1FA9E0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            IS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: "2px" }}>
              ISRAIN <span style={{ color: "#38bdf8" }}>SEO</span>
            </span>
            <span style={{ fontSize: "14px", color: "#7dd3fc" }}>
              Sub-brand of Israin Solutions
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#7dd3fc",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Link Building Agency Since 2016
          </div>
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              lineHeight: 1.15,
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Link Building Services on Real Websites in Your Niche
          </h1>
          <p style={{ fontSize: "22px", color: "#BAE6FD", margin: 0, maxWidth: "900px" }}>
            Manual outreach guest posts, curated niche edits and verified live URL reports.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(56, 189, 248, 0.3)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#7dd3fc" }}>seo.israinsols.com</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "16px",
              color: "#38bdf8",
              fontWeight: "bold",
            }}
          >
            <span>DA/DR 30+ Standard</span>
            <span style={{ color: "#7dd3fc", opacity: 0.6 }}>|</span>
            <span>Contextual Dofollow</span>
            <span style={{ color: "#7dd3fc", opacity: 0.6 }}>|</span>
            <span>Permanent Placement</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
