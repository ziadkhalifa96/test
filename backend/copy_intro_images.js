const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\Alraheeq\\11\\copied1\\alalamyaherbs.com\\wp-content\\uploads\\2025\\12';
const destDir = path.join(__dirname, '..', 'public', 'images', 'intro');

const mappings = {
  'countryside-field-sunny-day-countryside-1-scaled.webp': 'intro-field.webp',
  'side-view-peasant-hands-gardening-scaled.webp': 'intro-harvest.webp',
  'standard-quality-control-concept-m-scaled.webp': 'intro-quality.webp',
  '2148969980.jpg': 'intro-spices.jpg'
};

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const [src, dest] of Object.entries(mappings)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
}
