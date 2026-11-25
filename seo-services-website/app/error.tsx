"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xl bg-[#06163b]/85 border border-red-500/40">
        <span className="text-red-400 text-xs font-bold uppercase tracking-widest block">
          System Notice
        </span>
        <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
        <p className="text-sm text-slate-300">
          An unexpected error occurred while loading this page. You can try refreshing or contact our team directly.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => reset()}
            className="w-full py-2.5 rounded-md bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34bbf0] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full py-2.5 rounded-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
