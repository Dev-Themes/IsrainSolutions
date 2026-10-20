import fs from "node:fs";

const projCode = fs.readFileSync("src/data/projects.ts", "utf-8");
const prodCode = fs.readFileSync("src/data/product-projects.ts", "utf-8");

const urlRegex = /https:\/\/images\.unsplash\.com\/[^\s"',]+/g;
const projUrls = projCode.match(urlRegex) || [];
const prodUrls = prodCode.match(urlRegex) || [];
const allUrls = [...new Set([...projUrls, ...prodUrls])];

console.log(`Checking ${allUrls.length} unique Unsplash URLs across codebase...`);

const results = await Promise.all(
  allUrls.map(async (url) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return { url, status: res.status, ok: res.ok };
    } catch (e) {
      return { url, error: e.message, ok: false };
    }
  })
);

const failed = results.filter((r) => !r.ok);
if (failed.length === 0) {
  console.log(`[SUCCESS] All ${allUrls.length} image URLs are 200 OK!`);
} else {
  console.log(`[FAILED] Found ${failed.length} broken image URLs:`);
  failed.forEach((f) => console.log(`  - ${f.status || f.error}: ${f.url}`));
}
