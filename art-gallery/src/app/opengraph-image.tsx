import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "FORME — Studio Créatif | Art Direction & Visual Identity";
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
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle geometric border frame */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid #292929",
            display: "flex",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.25em",
              color: "#E8D49B",
              textTransform: "uppercase",
            }}
          >
            PARIS, FRANCE
          </span>
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.25em",
              color: "#717171",
              textTransform: "uppercase",
            }}
          >
            STUDIO CRÉATIF
          </span>
        </div>

        {/* Center Typography Composition */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Brand Name */}
          <div
            style={{
              fontSize: "110px",
              fontWeight: 900,
              letterSpacing: "0.15em",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            FORME
          </div>

          {/* Golden Accent Line */}
          <div
            style={{
              width: "180px",
              height: "3px",
              backgroundColor: "#E8D49B",
              marginBottom: "24px",
            }}
          />

          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.2em",
              color: "#B8B8B8",
              textTransform: "uppercase",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Direction Artistique • Identité Visuelle • Scénographie
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            letterSpacing: "0.2em",
            color: "#717171",
            textTransform: "uppercase",
          }}
        >
          <span>hello@forme.example</span>
          <span>© 2026 FORME STUDIO</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
