import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/articles";

// export const runtime = "edge";
export const alt = "Article OpenGraph Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return new ImageResponse(<div style={{ display: "flex" }}>Not Found</div>, { ...size });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#0b6e4f", // Brand color
          padding: "80px",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "24px",
            color: "#3fc596", // Brand light
          }}
        >
          {article.category}
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          {article.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "28px",
            color: "#e3f4ee",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", marginRight: "12px" }}>CareerVixa</span>
            <span>&middot; Career, Jobs & Growth</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
