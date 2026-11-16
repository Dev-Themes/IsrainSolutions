import { ImageResponse } from "next/og";

export const alt = "TradeConnect | Verified Local Trade Services (UK & USA)";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#111c19",
          color: "#f6f1e9",
          padding: "60px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "12px",
                backgroundColor: "#b4481f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "26px",
                fontWeight: "900",
              }}
            >
              TC
            </div>
            <div style={{ display: "flex", fontSize: "32px", fontWeight: "900", letterSpacing: "-0.5px" }}>
              <span>Trade</span>
              <span style={{ color: "#d97706" }}>Connect</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(31, 58, 52, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#34d399",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Verified Network &middot; UK &amp; USA
          </div>
        </div>

        {/* Main Title & Value Prop */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "900px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              color: "#ffffff",
            }}
          >
            Reliable local tradespeople, checked before they quote.
          </div>
          <div style={{ display: "flex", fontSize: "22px", color: "#a3b8b0", lineHeight: 1.4 }}>
            Compare free quotes from vetted plumbers, electricians, roofers, and HVAC contractors with guaranteed insurance and licensing.
          </div>
        </div>

        {/* Footer Metrics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <div style={{ display: "flex", gap: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: "28px", fontWeight: "900", color: "#ffffff" }}>8,784+</div>
              <div style={{ display: "flex", fontSize: "14px", color: "#8a9e97" }}>Vetted Trade Pros</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: "28px", fontWeight: "900", color: "#d97706" }}>Under 2 Hours</div>
              <div style={{ display: "flex", fontSize: "14px", color: "#8a9e97" }}>Avg Response Time</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: "28px", fontWeight: "900", color: "#34d399" }}>4.92 / 5.0</div>
              <div style={{ display: "flex", fontSize: "14px", color: "#8a9e97" }}>Verified Trust Score</div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: "16px", fontWeight: "700", color: "#d97706" }}>
            business-platform-ashy.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
