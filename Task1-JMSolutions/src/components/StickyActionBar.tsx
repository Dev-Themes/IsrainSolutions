import { Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function StickyActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0F1CF0] backdrop-blur-md border-t border-stroke flex h-[56px]">
      <a href="tel:5551234567" className="flex-1 flex items-center justify-center gap-2 font-bold text-text-0 hover:bg-bg-2 transition-colors border-r border-stroke">
        <Phone className="w-5 h-5 text-ice-500" />
        Call
      </a>
      <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 font-bold text-text-0 hover:bg-bg-2 transition-colors">
        <Calendar className="w-5 h-5 text-ember-500" />
        Book Service
      </Link>
    </div>
  );
}
