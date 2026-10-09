import { services } from '@/config/services';
import { serviceAreas, ServiceArea } from '@/config/serviceAreas';
import { site } from '@/config/site';

export interface LocalHit {
  service: typeof services[0];
  area: ServiceArea;
}

export function parseLocalSlug(localSlug: string): LocalHit | null {
  for (const service of services) {
    if (!service.enabled) continue;
    const prefix = `${service.slug}-`;
    if (localSlug.startsWith(prefix)) {
      const areaSlug = localSlug.substring(prefix.length);
      const area = serviceAreas.find(a => a.slug === areaSlug);
      if (area) {
        return { service, area };
      }
    }
  }
  return null;
}

export function allLocalSlugs(): string[] {
  const slugs: string[] = [];
  const showSample = process.env.NEXT_PUBLIC_SHOW_SAMPLE_AREAS === '1' || process.env.NODE_ENV === 'development';
  
  for (const service of services) {
    if (!service.enabled) continue;
    for (const area of serviceAreas) {
      if (area.placeholder && !showSample) continue;
      slugs.push(`${service.slug}-${area.slug}`);
    }
  }
  return slugs;
}

export function isIndexable(service: any, area: ServiceArea): boolean {
  if (area.placeholder) return false;
  if ((area as any).enabled === false) return false;
  
  let words = 0;
  if (area.localNote) words += area.localNote.split(/\s+/).filter(Boolean).length;
  if (area.neighborhoods) words += area.neighborhoods.join(' ').split(/\s+/).filter(Boolean).length;
  if (area.localFaq) {
    area.localFaq.forEach(faq => {
      words += faq.question.split(/\s+/).filter(Boolean).length;
      words += faq.answer.split(/\s+/).filter(Boolean).length;
    });
  }
  if (area.recentWork) {
    area.recentWork.forEach(work => {
      words += work.problem.split(/\s+/).filter(Boolean).length;
      words += work.diagnosis.split(/\s+/).filter(Boolean).length;
      words += work.solution.split(/\s+/).filter(Boolean).length;
    });
  }
  
  return words >= 150;
}

export function getAreaCtx(area: ServiceArea | null, isHub: boolean = false) {
  return {
    town: isHub ? site.metroArea : (area?.town || ''),
    st: isHub ? site.state : (area?.st || ''),
    stateName: isHub ? 'State' : (area?.stateName || ''),
    metro: site.metroArea,
    fee: site.features.diagnosticFee,
    phone: site.phone,
    license: site.license,
    status: isHub ? 'primary' : (area?.status || 'primary'),
    neighborhoods: area?.neighborhoods || [],
    nearby: area?.nearby || [],
    features: site.features,
    localNote: area?.localNote,
    recentWork: area?.recentWork,
    localFaq: area?.localFaq,
  };
}
