import { Phone, Calendar } from "lucide-react";
import Link from "next/link";

export default function StickyActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex">
      <a href="tel:[PHONE]" className="flex-1 h-14 flex items-center justify-center gap-2 bg-heat-600 text-white font-semibold text-sm">
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link href="/contact" className="flex-1 h-14 flex items-center justify-center gap-2 bg-navy-900 text-white font-semibold text-sm">
        <Calendar className="w-4 h-4" />
        Book Online
      </Link>
    </div>
  );
}
