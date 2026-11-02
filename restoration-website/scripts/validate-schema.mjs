import assert from 'node:assert/strict';
const html=await fetch('http://localhost:3000').then(r=>r.text());
const blocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert(blocks.length>0,'JSON-LD missing');
for(const [,raw] of blocks){const data=JSON.parse(raw);assert.equal(data['@context'],'https://schema.org');assert(Array.isArray(data['@graph']));assert(!raw.includes('aggregateRating'),'Unverified rating present');}
console.log('JSON-LD checks passed');
