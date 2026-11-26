import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "mb-12 sm:mb-16",
        isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
        className
      )}
    >
      {/* Eyebrow Label with cyan indicator dot */}
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FA9E0]/10 border border-[#1FA9E0]/25 text-[#1FA9E0] text-[11px] font-bold uppercase tracking-[0.14em] mb-4 shadow-[0_0_15px_rgba(31,169,224,0.15)]",
            isCenter ? "mx-auto" : ""
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0] animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}

      {/* Main Section H2 Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.18]">
        {title}
      </h2>

      {/* ElementsKit Signature Separator: Cyan accent bar with dotted detail */}
      <div
        className={cn(
          "flex items-center gap-1.5 my-4",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        <span className="h-[3px] w-12 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]" />
        <span className="w-2 h-2 rounded-full bg-[#1FA9E0] shadow-[0_0_8px_#1FA9E0]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60" />
      </div>

      {/* Descriptive Subtitle */}
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
