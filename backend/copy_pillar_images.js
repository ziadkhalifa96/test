const fs = require('fs');
const path = require('path');

const src12 = 'D:\\Alraheeq\\11\\copied1\\alalamyaherbs.com\\wp-content\\uploads\\2025\\12';
const src07 = 'D:\\Alraheeq\\11\\copied1\\alalamyaherbs.com\\wp-content\\uploads\\2025\\07';
const destBase = path.join(__dirname, '..', 'public', 'images', 'quality');

if (!fs.existsSync(destBase)) {
    fs.mkdirSync(destBase, { recursive: true });
}

const imagesToCopy = [
  { dir: src12, src: 'standard-quality-control-concept-m-scaled.webp', dest: 'pillar-safety.webp' },
  { dir: src07, src: 'Sustainability.webp', dest: 'pillar-control.webp' },
  { dir: src12, src: 'side-view-peasant-hands-gardening-scaled.webp', dest: 'pillar-sampling.webp' }
];

console.log("--- Copying Correct Quality Pillar Images ---");

imagesToCopy.forEach(img => {
    const srcPath = path.join(img.dir, img.src);
    const destPath = path.join(destBase, img.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${img.src} -> ${img.dest}`);
    } else {
        console.warn(`Source not found: ${srcPath}`);
    }
});

console.log("Image transfer complete!");
