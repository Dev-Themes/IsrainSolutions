import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { site } from '@/config/site';

export function ContactSidebar() {
  const hasSocials = site.socials && Object.values(site.socials).some(url => url && url.length > 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 items-start h-full">
      {/* 1. Emergency Line */}
      <Card variant="warm" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-ember/10 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-ember" />
          </div>
          <h3 className="font-display font-bold uppercase tracking-wide text-fg-0 text-lg">Emergency line</h3>
        </div>
        <a href={`tel:${site.phone.replace(/[^0-9]/g, '')}`} className="text-3xl font-display font-bold text-fg-0 hover:text-ember transition-colors block mb-2 focus-visible:outline-brand">
          {site.phone}
        </a>
        <p className="text-fg-1 text-sm">Answered 24 hours a day, 7 days a week.</p>
      </Card>

      {/* 2. Service Area */}
      <Card variant="cool" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-ice/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-ice" />
          </div>
          <h3 className="font-display font-bold uppercase tracking-wide text-fg-0 text-lg">Service Area</h3>
        </div>
        <p className="text-fg-1 text-sm mb-4">
          We primarily serve <strong className="text-fg-0">{site.metroArea}</strong>, including:
        </p>
        {site.serviceAreas && (
          <ul className="grid grid-cols-1 gap-2">
            {site.serviceAreas.slice(0, 6).map((area) => (
              <li key={area} className="flex items-center gap-2 text-sm text-fg-1">
                <ChevronRight className="w-4 h-4 text-ice shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* 3. Availability */}
      <Card variant="cool" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-ice/10 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-ice" />
          </div>
          <h3 className="font-display font-bold uppercase tracking-wide text-fg-0 text-lg">Availability</h3>
        </div>
        <dl className="flex flex-col gap-0 divide-y divide-line/30">
          <div className="py-3 flex flex-col gap-1">
            <dt className="text-fg-0 font-bold text-sm uppercase tracking-wide">Mon-Fri</dt>
            <dd className="text-fg-1 text-sm">7am–6pm &middot; Scheduled</dd>
          </div>
          <div className="py-3 flex flex-col gap-1">
            <dt className="text-ember font-bold text-sm uppercase tracking-wide">Emergency</dt>
            <dd className="text-fg-1 text-sm">24/7 &middot; Always answered</dd>
          </div>
        </dl>
      </Card>

      {/* 4. Find us online */}
      {/* Social card omitted until real profile URLs are supplied (see docs/dummy-data.md) */}
      {!site.isDummy && hasSocials && (
        <Card variant="cool" className="p-6">
          <h3 className="font-display font-bold uppercase tracking-wide text-fg-0 text-lg mb-4">Find us online</h3>
          <div className="flex gap-4">
            {Object.entries(site.socials).map(([platform, url]) => {
              if (!url) return null;
              return (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-fg-1 hover:text-ice transition-colors capitalize text-sm font-bold focus-visible:outline-brand">
                  {platform}
                </a>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
