const fs = require('fs');
const path = require('path');

const sourceDir = 'D:\\Alraheeq\\11\\copied1\\alalamyaherbs.com\\wp-content\\uploads\\2025\\12';
const destDir = 'd:\\Alraheeq\\4\\AlraheeqHerbs-9b6xf3-main\\AlraheeqHerbs-9b6xf3-main\\public\\assets\\about';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const assets = [
  { src: 'side-view-peasant-hands-gardening-scaled.webp', dest: 'story-origins.webp' },
  { src: 'countryside-field-sunny-day-countryside-1-scaled.webp', dest: 'about-hero.webp' },
  { src: 'standard-quality-control-concept-m-scaled.webp', dest: 'mission-quality.webp' }
];

assets.forEach(asset => {
  const srcPath = path.join(sourceDir, asset.src);
  const destPath = path.join(destDir, asset.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${asset.src} to ${asset.dest}`);
  } else {
    console.log(`Source ${asset.src} not found`);
  }
});
