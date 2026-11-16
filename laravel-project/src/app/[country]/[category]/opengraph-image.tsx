import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/lib/data";

export const alt = "TradeConnect Verified Category Specialists";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ country: string; category: string }>;
}) {
  const { country, category } = await params;
  const currentCategory = CATEGORIES.find((c) => c.slug === category);
  const categoryName = currentCategory ? currentCategory.name : "Trade Services";
  const countryName = country.toUpperCase() === "UK" ? "United Kingdom" : "United States";
  const badgeText = country.toUpperCase() === "UK" ? "UK Vetted Network (45% Active)" : "USA Expansion Hub";

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
                width: "52px",
                height: "52px",
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
            <div style={{ display: "flex", fontSize: "30px", fontWeight: "900" }}>
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
            {badgeText}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "920px" }}>
          <div style={{ display: "flex", fontSize: "18px", fontWeight: "700", color: "#d97706", textTransform: "uppercase", letterSpacing: "1px" }}>
            Verified Contractor Directory
          </div>
          <div style={{ display: "flex", fontSize: "48px", fontWeight: "900", color: "#ffffff", lineHeight: 1.15 }}>
            {categoryName} in {countryName}
          </div>
          <div style={{ display: "flex", fontSize: "20px", color: "#a3b8b0", lineHeight: 1.4 }}>
            {currentCategory ? currentCategory.shortDescription : "Compare vetted, insured local contractors."}
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
            Gas Safe &middot; NICEIC &middot; EPA &middot; Public Liability Verified
          </div>
          <div style={{ display: "flex", fontSize: "16px", fontWeight: "700", color: "#34d399" }}>
            Free Instant Estimates
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
