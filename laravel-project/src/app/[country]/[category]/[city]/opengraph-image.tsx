import { ImageResponse } from "next/og";
import { CATEGORIES, CITIES } from "@/lib/data";

export const alt = "TradeConnect Verified Local Trade Services";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ country: string; category: string; city: string }>;
}) {
  const { country, category, city } = await params;
  const currentCategory = CATEGORIES.find((c) => c.slug === category);
  const currentCity = CITIES.find((c) => c.slug === city);

  const categoryName = currentCategory ? currentCategory.name : "Trade Services";
  const cityName = currentCity ? currentCity.name : "Local Area";
  const countryBadge = country.toUpperCase() === "UK" ? "🇬🇧 UK Vetted Network" : "🇺🇸 USA Verified Hub";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0f19",
          color: "#ffffff",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Branding */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                backgroundColor: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0b0f19",
                fontSize: "28px",
                fontWeight: "900",
              }}
            >
              TC
            </div>
            <div style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-1px" }}>
              Trade<span style={{ color: "#f59e0b" }}>Connect</span>
            </div>
          </div>

          <div
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              color: "#f59e0b",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            {countryBadge}
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "20px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700" }}>
            Verified & Insured Contractors
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              maxWidth: "950px",
            }}
          >
            {categoryName} in {cityName}
          </div>
          <div style={{ fontSize: "24px", color: "#cbd5e1" }}>
            Compare quotes from local professionals with verified public liability insurance.
          </div>
        </div>

        {/* Bottom Trust Metrics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1e293b",
            paddingTop: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "#f59e0b" }}>4.92 ★</span>
              <span style={{ fontSize: "14px", color: "#94a3b8" }}>Average Customer Rating</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "800" }}>8,780+</span>
              <span style={{ fontSize: "14px", color: "#94a3b8" }}>Registered Vetted Pros</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "800" }}>&lt; 2 Hours</span>
              <span style={{ fontSize: "14px", color: "#94a3b8" }}>Fast Quote Response</span>
            </div>
          </div>

          <div
            style={{
              padding: "12px 28px",
              backgroundColor: "#f59e0b",
              color: "#0b0f19",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "800",
            }}
          >
            Get Free Quotes
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
