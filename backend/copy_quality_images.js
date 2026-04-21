const fs = require('fs');
const path = require('path');

const srcBase = 'D:\\Alraheeq\\11\\copied1\\alalamyaherbs.com\\wp-content\\uploads\\2025\\12';
const destBase = path.join(__dirname, '..', 'public', 'images', 'quality');

if (!fs.existsSync(destBase)) {
    fs.mkdirSync(destBase, { recursive: true });
}

const imagesToCopy = [
  { src: 'standard-quality-control-concept-m-scaled.webp', dest: 'quality-hero.webp' },
  { src: 'cert-10.jpg', dest: 'quality-cert.jpg' },
  { src: 'banner.jpeg', dest: 'quality-stats-bg.jpg' },
  { src: '2148969980.webp', dest: 'sampling.webp' },
  { src: 'side-view-peasant-hands-gardening-scaled.webp', dest: 'manual-selection.webp' },
  { src: 'top-view-delicious-vegetables-scaled.jpg', dest: 'final-product.jpg' }
];

console.log("--- Copying Quality Page Images ---");

imagesToCopy.forEach(img => {
    const srcPath = path.join(srcBase, img.src);
    const destPath = path.join(destBase, img.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${img.src} -> ${img.dest}`);
    } else {
        console.warn(`Source not found: ${srcPath}`);
    }
});

console.log("Image transfer complete!");
