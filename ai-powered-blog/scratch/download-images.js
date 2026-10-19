const https = require('https');
const fs = require('fs');

const images = [
  { name: 'remote-work-leadership.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Coworking_Space_in_Singapore.jpg' },
  { name: 'workplace-growth-tips.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Business_man_at_work_in_an_office.jpg' },
  { name: 'tech-job-search.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Programmer_at_work.jpg/1200px-Programmer_at_work.jpg' },
  { name: 'negotiating-equity.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Business_meeting_in_an_office.jpg' },
];

images.forEach(img => {
  const file = fs.createWriteStream(`public/images/${img.name}`);
  https.get(img.url, function(response) {
    if (response.statusCode === 200) {
      response.pipe(file);
    } else {
      console.log('Failed to download', img.name, response.statusCode);
    }
  });
});
