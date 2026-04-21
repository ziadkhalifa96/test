const fs = require('fs');
const path = require('path');

const sourceDir = 'D:\\Alraheeq\\11\\copied1\\almasherbs.com\\wp-content\\uploads\\2025\\12';
const destDir = 'd:\\Alraheeq\\4\\AlraheeqHerbs-9b6xf3-main\\AlraheeqHerbs-9b6xf3-main\\public\\assets\\certificates';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const assets = [
  { src: 'cert-10.jpg', dest: 'main-certificate.jpg' },
  { src: 'png-clipart-food-and-drug-administration-united-states-fda-food-safety-modernization-act-dietary-supplement-approved-drug-united-states-angle-food-2.webp', dest: 'fda-logo.webp' },
  { src: 'standard-quality-control-concept-m-scaled.webp', dest: 'quality-bg.webp' }
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
