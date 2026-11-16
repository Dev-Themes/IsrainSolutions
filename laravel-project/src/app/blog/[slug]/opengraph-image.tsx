import { ImageResponse } from "next/og";
import { BLOG_ARTICLES } from "@/lib/data";

export const alt = "TradeConnect Practical Technical Guides & Price Advice";
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
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  const articleTitle = article ? article.title : "Trade Knowledge & Cost Guide";
  const categoryName = article ? article.category : "Technical Advice";
  const author = article ? article.author : "TradeConnect Technical Editor";

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
              <span style={{ marginLeft: "8px" }}>Guide</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(217, 119, 6, 0.15)",
              border: "1px solid rgba(217, 119, 6, 0.3)",
              color: "#d97706",
              fontSize: "14px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {categoryName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "940px" }}>
          <div style={{ display: "flex", fontSize: "44px", fontWeight: "900", color: "#ffffff", lineHeight: 1.2 }}>
            {articleTitle}
          </div>
          <div style={{ display: "flex", fontSize: "18px", color: "#a3b8b0", lineHeight: 1.4 }}>
            {article ? article.excerpt : "Expert technical recommendations from certified contractors."}
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
            Written by {author}
          </div>
          <div style={{ display: "flex", fontSize: "16px", fontWeight: "700", color: "#34d399" }}>
            TradeConnect Technical Knowledge Hub
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
