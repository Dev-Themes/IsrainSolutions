/**
 * Import script for publisher sites.
 * Usage:
 *   node -r ts-node/register scripts/import-sites.ts path/to/sites.csv
 */
import fs from "fs";
import path from "path";

interface CsvRow {
  domain: string;
  name: string;
  category: string;
  da: number | null;
  dr: number | null;
  trafficMonthly: string | null;
  price: number | null;
  sponsoredLabel: boolean;
  linkType: "Dofollow" | "Nofollow" | "Editorial";
  turnaroundDays: number;
}

function parseCsv(filePath: string): CsvRow[] {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((l) => l.trim().length > 0);
  const rows: CsvRow[] = [];

  // Assume header: domain,name,category,da,dr,traffic,price,sponsored,linkType,turnaround
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    if (cols.length >= 4) {
      rows.push({
        domain: cols[0],
        name: cols[1] || cols[0],
        category: cols[2] || "General",
        da: cols[3] ? parseInt(cols[3], 10) : null,
        dr: cols[4] ? parseInt(cols[4], 10) : null,
        trafficMonthly: cols[5] || null,
        price: cols[6] ? parseFloat(cols[6]) : null,
        sponsoredLabel: cols[7]?.toLowerCase() === "true",
        linkType: (cols[8] as "Dofollow" | "Nofollow" | "Editorial") || "Dofollow",
        turnaroundDays: cols[9] ? parseInt(cols[9], 10) : 5,
      });
    }
  }

  return rows;
}

const args = process.argv.slice(2);
if (args.length > 0) {
  const csvFile = args[0];
  const parsed = parseCsv(csvFile);
  console.log(`Successfully parsed ${parsed.length} publisher sites from ${csvFile}.`);
} else {
  console.log("Usage: node scripts/import-sites.ts <path-to-csv>");
}
