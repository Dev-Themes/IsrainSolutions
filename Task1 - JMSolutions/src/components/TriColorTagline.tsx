export default function TriColorTagline() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
      <span className="text-heat-500">Heating</span>
      <span className="text-ink-500 font-light px-1">|</span>
      <span className="text-cool-500">Cooling</span>
      <span className="text-ink-500 font-light px-1">|</span>
      <span className="text-navy-900 dark:text-white">Refrigeration</span>
    </div>
  );
}
