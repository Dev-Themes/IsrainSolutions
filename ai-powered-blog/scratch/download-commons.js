const https = require('https');
const fs = require('fs');

const pages = [
  { name: 'tech-job-search.jpg', url: 'https://commons.wikimedia.org/wiki/File:Business_professional_working_on_laptop_in_a_bright_office_space.jpg' },
  { name: 'negotiating-equity.jpg', url: 'https://commons.wikimedia.org/wiki/File:Modern_office_space_in_historical_building_B%C3%B8rsen.jpg' }
];

pages.forEach(page => {
  https.get(page.url, res => {
    let html = '';
    res.on('data', chunk => html += chunk);
    res.on('end', () => {
      // Find original file URL
      const match = html.match(/<a href="(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"]+)"[^>]*>Original file<\/a>/);
      if (match) {
        let fileUrl = match[1];
        console.log('Downloading', fileUrl, 'for', page.name);
        https.get(fileUrl, fileRes => {
          const file = fs.createWriteStream(`public/images/${page.name}`);
          fileRes.pipe(file);
          fileRes.on('end', () => console.log('Finished', page.name));
        });
      } else {
        console.log('Could not find original file link for', page.name);
      }
    });
  });
});
