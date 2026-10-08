import Link from "next/link";

export function TaxonomyList({
  items,
  type,
}: {
  items: { name: string; slug: string }[];
  type: "category" | "tag";
}) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <Link 
          key={item.slug} 
          href={`/${type}/${item.slug}`}
          className={type === "category" 
            ? "px-3 py-1 bg-[var(--line)] text-[var(--ink)] text-sm font-bold hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
            : "px-3 py-1 border border-[var(--line)] text-[var(--mute)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          }
        >
          {type === "tag" ? "#" : ""}{item.name}
        </Link>
      ))}
    </div>
  );
}
