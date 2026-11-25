"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      <a
        href={siteConfig.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all duration-300 transform group-hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.031 2C6.496 2 2 6.5 2 12.043c0 1.905.534 3.682 1.455 5.201L2 22l4.908-1.424A9.972 9.972 0 0 0 12.031 22C17.566 22 22 17.5 22 12.043 22 6.5 17.566 2 12.031 2zm0 18.232c-1.579 0-3.085-.436-4.385-1.222l-.314-.19-2.915.845.856-2.837-.206-.328A8.19 8.19 0 0 1 3.84 12.043c0-4.526 3.673-8.209 8.191-8.209 4.517 0 8.19 3.683 8.19 8.209 0 4.526-3.673 8.209-8.19 8.209zm4.498-6.155c-.246-.123-1.459-.72-1.685-.802-.227-.082-.392-.123-.557.123-.165.247-.64 1.054-.784 1.218-.144.165-.288.185-.534.062-.246-.123-1.04-.383-1.982-1.223-.733-.654-1.228-1.462-1.372-1.708-.144-.247-.015-.38.108-.503.111-.111.246-.288.37-.432.123-.144.164-.247.247-.411.082-.165.041-.309-.021-.432-.062-.124-.557-1.341-.763-1.838-.2-.483-.404-.418-.557-.426-.144-.008-.309-.01-.474-.01-.165 0-.432.062-.658.309-.227.247-.866.846-.866 2.063 0 1.218.887 2.394 1.01 2.559.124.165 1.745 2.664 4.228 3.737.59.256 1.052.409 1.411.523.593.189 1.133.162 1.56.098.476-.071 1.459-.597 1.665-1.173.206-.576.206-1.07.144-1.173-.062-.103-.227-.165-.473-.288z" />
        </svg>
      </a>
    </aside>
  );
};
