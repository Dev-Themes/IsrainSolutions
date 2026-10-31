import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(directory, '../..');
const languages = ['ro', 'fr', 'en'];

/** Runs before production builds; overrides support validation regression checks. */
export function validateContent(overrides = {}) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const load = name => {
    try { return overrides[name] ?? JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')); }
    catch (error) { errors.push(`${name}: ${error.message}`); return null; }
  };
  const text = (value, label) => check(typeof value === 'string' && value.trim().length > 0, `${label}: enter non-empty text`);
  const translated = (value, label) => { for (const locale of languages) text(value?.[locale], `${label}.${locale}`); };
  const url = (value, label) => { try { check(['https:', 'http:'].includes(new URL(value).protocol), `${label}: use an HTTP(S) URL`); } catch { errors.push(`${label}: invalid URL`); } };
  const site = load('site.config.json');
  if (site) {
    for (const key of ['name', 'descriptor', 'location', 'copyright']) text(site[key], `site.${key}`);
    check(typeof site.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email), 'site.email: enter an email address');
    url(site.url, 'site.url');
    for (const key of ['description', 'collaboration', 'footerDescriptor']) translated(site[key], `site.${key}`);
    for (const locale of languages) check(Array.isArray(site.address?.[locale]) && site.address[locale].every(line => typeof line === 'string' && line.trim()), `site.address.${locale}: enter address lines`);
    check(Array.isArray(site.socials), 'site.socials: expected a list');
    for (const [i, social] of (Array.isArray(site.socials) ? site.socials : []).entries()) { text(social.name, `site.socials[${i}].name`); url(social.url, `site.socials[${i}].url`); }
  }
  const compare = (reference, value, label) => {
    if (typeof reference === 'string') { text(value, label); return; }
    if (Array.isArray(reference)) { check(Array.isArray(value), `${label}: expected a list`); if (Array.isArray(value)) { check(value.length === reference.length, `${label}: keep matching entry counts in all languages`); value.forEach((entry, i) => compare(reference[Math.min(i, reference.length - 1)], entry, `${label}[${i}]`)); } return; }
    if (reference && typeof reference === 'object') { check(value && typeof value === 'object', `${label}: expected an object`); for (const key of Object.keys(reference)) compare(reference[key], value?.[key], `${label}.${key}`); }
    else check(typeof value === typeof reference, `${label}: wrong value type`);
  };
  const navigation = load('navigation.config.json');
  if (navigation) {
    for (const locale of languages) compare(navigation.translations?.en, navigation.translations?.[locale], `navigation.translations.${locale}`);
    for (const list of ['header', 'footer', 'legal']) {
      check(Array.isArray(navigation[list]), `navigation.${list}: expected a list`);
      const seen = new Set();
      for (const entry of navigation[list] ?? []) {
        check(typeof entry.href === 'string' && /^(|\/(work|products|about|contact|terms|privacy|cookies))$/.test(entry.href), `navigation.${list}.${entry.key}: use an existing page path`);
        check(!seen.has(entry.key), `navigation.${list}: duplicate ${entry.key}`); seen.add(entry.key);
        for (const locale of languages) text(navigation.translations?.[locale]?.[list === 'header' ? 'nav' : 'footer']?.[entry.key], `navigation.${list}.${entry.key}.${locale}`);
      }
    }
  }
  for (const page of ['home', 'studio', 'products', 'contact', 'shared']) {
    const data = load(`pages/${page}.config.json`);
    if (data) for (const locale of languages) compare(data.en, data[locale], `pages/${page}.${locale}`);
  }
  const labels = load('pages/interface.config.json');
  if (labels) for (const [key, value] of Object.entries(labels)) translated(value, `interface.${key}`);
  const work = load('pages/work.config.json');
  if (work) {
    for (const [key, value] of Object.entries(work.copy ?? {})) translated(value, `work.copy.${key}`);
    check(Array.isArray(work.filters) && work.filters.some(item => item.id === 'all'), 'work.filters: include the all filter');
    for (const item of work.filters ?? []) { check(['all', 'beauty', 'lifestyle', 'fashion', 'fragrance', 'motion'].includes(item.id), `work.filters: invalid id ${item.id}`); translated(item, `work.filters.${item.id}`); }
  }
  const offers = load('offers.config.json');
  check(Array.isArray(offers) && offers.length === 3, 'offers: keep the three-card structure');
  const counts = new Set();
  for (const [i, offer] of (Array.isArray(offers) ? offers : []).entries()) {
    const label = `offers[${i}]`;
    check(Number.isInteger(offer.count) && offer.count > 0 && offer.count <= 10, `${label}.count: use a whole number from 1 to 10`);
    check(!counts.has(offer.count), `${label}.count: duplicate package count`); counts.add(offer.count);
    check(Number.isFinite(offer.price) && offer.price > 0, `${label}.price: use a positive number`);
    check(Number.isFinite(offer.originalPrice) && offer.originalPrice > offer.price, `${label}.originalPrice: must exceed the current price`);
    check(typeof offer.recommended === 'boolean', `${label}.recommended: use true or false`);
    for (const key of ['name', 'badge', 'description']) translated(offer[key], `${label}.${key}`);
  }
  const media = load('media.config.json');
  check(Array.isArray(media) && media.some(item => item.visible), 'media: keep at least one visible entry');
  const ids = new Set();
  for (const [i, item] of (Array.isArray(media) ? media : []).entries()) {
    const label = `media[${i}]`;
    check(typeof item.id === 'string' && /^[a-z0-9-]+$/.test(item.id) && !ids.has(item.id), `${label}.id: use a unique lowercase ID`); ids.add(item.id);
    text(item.brand, `${label}.brand`);
    for (const key of ['title', 'category', 'brandLabel']) translated(item[key], `${label}.${key}`);
    check(['beauty', 'lifestyle', 'fashion', 'fragrance', 'motion'].includes(item.group), `${label}.group: invalid group`);
    for (const flag of ['visible', 'featured']) check(typeof item[flag] === 'boolean', `${label}.${flag}: use true or false`);
    for (const number of ['width', 'height', 'duration']) check(Number.isFinite(item[number]) && item[number] > 0, `${label}.${number}: must be positive`);
    for (const time of ['posterTime', 'thumbnailTime']) if (item[time] !== undefined) check(Number.isFinite(item[time]) && item[time] >= 0 && item[time] < item.duration, `${label}.${time}: must fall within the video`);
    const source = typeof item.source === 'string' && !/[\\/]/.test(item.source) ? path.join(root, 'public/videos', item.source) : '';
    check(source && fs.existsSync(source), `${label}.source: video file not found in public/videos`);
    for (const suffix of ['', '-tile']) check(fs.existsSync(path.join(root, `public/videos/posters/${item.id}${suffix}.webp`)), `${label}: missing ${item.id}${suffix}.webp`);
  }
  const home = load('pages/home.config.json');
  check(Array.isArray(home?.offerPreviewIds) && home.offerPreviewIds.length > 0, 'home.offerPreviewIds: add preview IDs');
  for (const id of home?.offerPreviewIds ?? []) check(ids.has(id), `home.offerPreviewIds: unknown media ID ${id}`);
  for (const kind of ['terms', 'privacy', 'cookies']) {
    const document = load(`legal/${kind}.config.json`);
    if (!document) continue;
    check(/^\d{4}-\d{2}-\d{2}$/.test(document.updated) && !Number.isNaN(Date.parse(document.updated)), `legal/${kind}.updated: use YYYY-MM-DD`);
    for (const locale of languages) {
      const copy = document.translations?.[locale];
      for (const key of ['title', 'intro', 'back', 'label', 'updatedLabel', 'contactLabel']) text(copy?.[key], `legal/${kind}.${locale}.${key}`);
      check(Array.isArray(copy?.sections) && copy.sections.length > 0, `legal/${kind}.${locale}: add sections`);
      for (const [i, section] of (copy?.sections ?? []).entries()) { text(section.heading, `legal/${kind}.${locale}.sections[${i}].heading`); check(Array.isArray(section.paragraphs) && section.paragraphs.length > 0, `legal/${kind}.${locale}.sections[${i}]: add paragraphs`); for (const paragraph of section.paragraphs ?? []) text(paragraph, `legal/${kind}.${locale}.sections[${i}].paragraphs`); }
    }
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = validateContent();
  if (errors.length) { console.error(`Content validation failed:\n${errors.map(error => `- ${error}`).join('\n')}`); process.exitCode = 1; }
  else console.log('Content valid: translations, navigation, offers, media files and legal documents.');
}
