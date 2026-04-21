const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\Alraheeq\\11\\copied1\\alalamyaherbs.com\\wp-content\\uploads\\2025\\12';
const destDir = path.join(__dirname, '..', 'public', 'images', 'categories');

const mappings = {
  'HerbsCategory.jpg': 'herbs.jpg',
  'seedsCategory.jpg': 'seeds.jpg',
  'top-view-variety-spoons-with-spices-scaled.jpg': 'spices.jpg',
  'top-view-delicious-vegetables-scaled.jpg': 'vegetables.jpg'
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
