/**
 * Validates that production builds do not contain unverified placeholder markers.
 */
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');
let hasError = false;

if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir);
  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.json') || file.endsWith('.mdx')) {
      const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      if (content.includes('status: "needs-content"') && process.env.NODE_ENV === 'production') {
        console.error(`[check:content] Error: Found 'needs-content' in ${file}`);
        hasError = true;
      }
    }
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('[check:content] All content verified successfully.');
}
