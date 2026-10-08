const fs = require('fs');
const html = fs.readFileSync('contact-utf8.html', 'utf8');
console.log('Request exists:', html.includes('Request'));
console.log('Emergency line exists:', html.includes('Emergency line'));
console.log('Input name exists:', html.includes('name="name"'));
