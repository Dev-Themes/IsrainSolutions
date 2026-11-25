import React from "react";

export const StatStrip: React.FC = () => {
  const stats = [
    { value: "2016", label: "Year we started" },
    { value: "1k+", label: "Orders completed" },
    { value: "1k+", label: "Clients served" },
    { value: "2k+", label: "Websites in our list" },
    { value: "$10", label: "Starting price of a post" },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-xl bg-gradient-to-r from-[#06183d] via-[#082255] to-[#06183d] border border-sky-400/40 p-4 sm:p-6 shadow-[0_15px_40px_rgba(2,8,23,0.8),0_0_25px_rgba(56,189,248,0.15)]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-sky-500/20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center pt-3 md:pt-0 ${
                idx === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-sky-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-200 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
