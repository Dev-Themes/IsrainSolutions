export function Stat({ text }: { text: string }) {
  return (
    <div className="pl-4 py-1 border-l-2 border-[image:var(--grad-brand)] text-fg-0 font-nav uppercase tracking-wider text-sm font-bold flex items-center">
      {text}
    </div>
  );
}
