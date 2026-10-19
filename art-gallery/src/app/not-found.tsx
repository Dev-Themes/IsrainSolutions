import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RootNotFound() {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className="bg-[#050505] text-[#FFFFFF] min-h-screen flex items-center justify-center p-6" suppressHydrationWarning>
        <div className="text-center max-w-md">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#E8D49B] block mb-4">
            404
          </span>
          <h1 className="text-4xl font-medium tracking-tight text-[#FFFFFF] mb-4">
            Page Introuvable
          </h1>
          <p className="text-sm font-light text-[#B8B8B8] mb-8">
            La page demandée n&apos;existe pas.
          </p>
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#FFFFFF] text-[#050505] hover:bg-[#E8D49B] transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Accueil / Home</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
