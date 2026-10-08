const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');
const lines = css.split('\n');
const newLines = lines.filter(line => !line.includes('&#x27;') && !line.includes('textures/contours.svg'));
fs.writeFileSync('src/app/globals.css', newLines.join('\n'));
