export default function Loading() {
  return (
    <div className="section-light py-24 text-center">
      <div className="container-custom flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--line)] border-t-[var(--accent)] animate-spin" />
        <span className="text-xs font-semibold text-[var(--text-muted)]">
          Loading TradeConnect verified directory...
        </span>
      </div>
    </div>
  );
}
