import React from "react";
import { Check, Sparkles, Bot, SearchCode, Cpu } from "lucide-react";

export const AiSearchSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#020817] via-[#04143a] to-[#020817] py-20 lg:py-28 border-b border-sky-500/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Realities */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>AI search (AEO and GEO)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Do backlinks help you show up in ChatGPT and Google AI Overviews?
            </h2>
            <div className="space-y-4 text-sm text-slate-200 leading-relaxed">
              <p>
                Generative AI tools such as ChatGPT, Perplexity, Gemini, and Microsoft Copilot generate summaries by indexing and retrieving information from authoritative pages across the live web. When trusted, high-traffic publications repeatedly cover and link to your brand, AI models are substantially more likely to incorporate your domain into their context windows.
              </p>
              <p className="text-slate-300">
                Google has officially clarified that its AI Overview features rely on the same fundamental ranking systems used across traditional web search. While no reputable agency can guarantee that an AI tool will cite a specific brand, establishing editorial mentions and authoritative backlinks across your niche is essential for discovery.
              </p>
            </div>
          </div>

          {/* Right Column: 3 Definition Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-xl bg-[#06163b]/85 border border-sky-400/35 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#092252] border border-sky-400/40 flex items-center justify-center text-sky-300 flex-shrink-0">
                <SearchCode className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>AEO: Answer Engine Optimization</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Structuring your page content to be selected for featured snippets, People Also Ask boxes, and AI summaries. Direct, concise answers and clear headings matter most.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#06163b]/85 border border-sky-400/35 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#092252] border border-sky-400/40 flex items-center justify-center text-sky-300 flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>GEO: Generative Engine Optimization</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Earning brand citations inside Perplexity, ChatGPT, Gemini, and Copilot. Editorial mentions on high-trust industry sites provide the entity proof AI answers cite.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#06163b]/85 border border-sky-400/35 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#092252] border border-sky-400/40 flex items-center justify-center text-sky-300 flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>SGE, AIO, and LLMO</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Different industry names for the same core discipline. SGE was Google&apos;s experimental Search Generative Experience; AIO refers to AI Overviews; LLMO is Large Language Model Optimization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
