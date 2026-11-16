import { ImageResponse } from "next/og";
import { VERIFIED_PROS } from "@/lib/data";

export const alt = "TradeConnect Verified Contractor Credentials";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pro = VERIFIED_PROS.find((p) => p.slug === slug);
  const companyName = pro ? pro.companyName : "Verified Contractor";
  const city = pro ? pro.city : "Local Area";
  const rating = pro ? `${pro.rating} / 5.0 (${pro.reviewCount} verified reviews)` : "Verified 5.0 Rating";
  const license = pro ? pro.licenseNumber : "Verified License";

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                backgroundColor: "#b4481f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "900",
              }}
            >
              TC
            </div>
            <div style={{ display: "flex", fontSize: "28px", fontWeight: "900" }}>
              <span>Trade</span>
              <span style={{ color: "#d97706" }}>Connect</span>
              <span style={{ marginLeft: "8px" }}>Verified Pro</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(52, 211, 153, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              color: "#34d399",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Verified &amp; Insured
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "940px" }}>
          <div style={{ display: "flex", fontSize: "18px", fontWeight: "700", color: "#d97706", textTransform: "uppercase" }}>
            {city} &middot; {license}
          </div>
          <div style={{ display: "flex", fontSize: "52px", fontWeight: "900", color: "#ffffff", lineHeight: 1.15 }}>
            {companyName}
          </div>
          <div style={{ display: "flex", fontSize: "22px", color: "#34d399", fontWeight: "700" }}>
            {rating}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <div style={{ display: "flex", fontSize: "16px", color: "#8a9e97" }}>
            Public Liability &amp; License Monitored Annually
          </div>
          <div style={{ display: "flex", fontSize: "16px", fontWeight: "700", color: "#d97706" }}>
            Get Quotes from {companyName.split(" ")[0]}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
