import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Peptide Ingredients Lab — Cosmetic Peptide Showcase";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF9F6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          border: "12px solid #E5E5DF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              background: "#242522",
              color: "#FAF9F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            PI
          </div>
          <span style={{ fontSize: "24px", fontWeight: "600", color: "#242522" }}>
            Peptide Ingredients Lab
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#63735B",
              fontWeight: "bold",
            }}
          >
            Cosmetic Formulations &amp; Research Inquiries
          </span>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "500",
              color: "#242522",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Peptide Ingredients, <br />
            Presented with Clarity.
          </h1>
          <p style={{ fontSize: "20px", color: "#6D716B", maxWidth: "800px", margin: 0 }}>
            Structured chemical descriptors, CAS identifiers, and direct inquiry communication.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #E5E5DF",
            paddingTop: "24px",
            fontSize: "16px",
            color: "#6D716B",
          }}
        >
          <span>18+ Access Enforced Platform</span>
          <span style={{ color: "#63735B", fontWeight: "600" }}>Direct Telegram Inquiries</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
