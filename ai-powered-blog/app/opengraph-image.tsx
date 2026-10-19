import { ImageResponse } from "next/og";

export const alt = "CareerVixa - Career, Jobs & Professional Growth";
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#064e3b",
          backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "72px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#064e3b",
                fontWeight: 900,
                fontSize: "26px",
              }}
            >
              CV
            </div>
            <span
              style={{
                fontSize: "34px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#ffffff",
              }}
            >
              Career<span style={{ color: "#34d399" }}>Vixa</span>
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              borderRadius: "9999px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#6ee7b7",
            }}
          >
            Executive Career Intelligence
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Data-Backed Strategies to Navigate &amp; Elevate Your Career.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#a7f3d0",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Compensation Benchmarks · Interview Scripts · Executive Roadmaps
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#d1fae5",
          }}
        >
          <div style={{ display: "flex", gap: "36px" }}>
            <span>• 100% Fact-Checked</span>
            <span>• Verified Industry Sources</span>
            <span>• 50K+ Monthly Readers</span>
          </div>
          <div style={{ fontWeight: 700, color: "#34d399" }}>
            careervixa.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
