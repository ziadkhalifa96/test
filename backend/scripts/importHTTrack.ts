import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const SOURCE_DIR = 'D:\\Alraheeq\\11\\copied1';
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'products');

// Ensure destination exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const translations: Record<string, string> = {
  'seeds': 'بذور',
  'seed': 'بذور',
  'leaves': 'أوراق',
  'powder': 'مطحون',
  'stick': 'أعواد',
  'flower': 'زهرة',
  'flowers': 'زهور',
  'anise': 'يانسون',
  'basil': 'ريحان',
  'calendula': 'كاليندولا',
  'caraway': 'كراوية',
  'celery': 'كرفس',
  'chamomile': 'بابونج',
  'cinnamon': 'قرفة',
  'coriander': 'كزبرة',
  'cumin': 'كمون',
  'dillweed': 'شبت',
  'curium': 'كركم',
  'mint': 'نعناع',
  'peppermint': 'نعناع فلفلي',
  'thyme': 'زعتر',
  'rosemary': 'روزماري',
  'marjoram': 'مردقوش',
  'parsley': 'بقدونس',
  'oregano': 'أوريجانو',
  'leeks': 'كراث',
  'sage': 'مرامية',
  'fennel': 'شمر',
  'black pepper': 'فلفل أسود',
  'white pepper': 'فلفل أبيض',
  'hibiscus': 'كركديه',
  'lemongrass': 'عشب الليمون',
  'cloves': 'قرنفل',
  'nutmeg': 'جوزة الطيب',
  'star anise': 'يانسون نجمي',
  'cardamom': 'حبان',
  'turmeric': 'كركم',
  'ginger': 'زنجبيل',
  'paprika': 'بابريكا',
  'chili': 'شطة',
  'garlic': 'ثوم',
  'onion': 'بصل',
  'dehydrated': 'مجفف',
  'vegetables': 'خضروات'
};

const cleanName = (filename: string) => {
  const base = path.basename(filename, path.extname(filename));
  // Remove site names and common junk
  let cleaned = base.replace(/alalamya|almas|greenland|logo|site|frame|wall|scaled|150x150|300x300|1024x/gi, '');
  cleaned = cleaned.replace(/[-_]/g, ' ').replace(/[0-9]/g, '').trim();
  // Capitalize properly
  cleaned = cleaned.replace(/\b\w/g, c => c.toUpperCase());
  return cleaned;
};

const translateToArabic = (englishName: string) => {
  let arabic = englishName.toLowerCase();
  let found = false;
  for (const [en, ar] of Object.entries(translations)) {
    const rx = new RegExp(`\\b${en}\\b`, 'gi');
    if (rx.test(arabic)) {
      arabic = arabic.replace(rx, ar);
      found = true;
    }
  }
  if (!found) return englishName;
  return arabic;
};

const getFilesRecursively = (directory: string): string[] => {
  let results: string[] = [];
  const list = fs.readdirSync(directory);
  for (const file of list) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
};

async function main() {
  console.log("Beginning Database Cleanup...");
  // Use a transaction or specific order
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  console.log("Cleanup complete. Starting professional migration...");

  // 1. Initialize Standard Categories
  const categories = [
    { en: 'Herbs & Leaves', ar: 'الأعشاب والأوراق', key: 'herbs' },
    { en: 'Seeds', ar: 'البذور', key: 'seeds' },
    { en: 'Spices', ar: 'التوابل', key: 'spices' },
    { en: 'Flowers', ar: 'الزهور', key: 'flowers' },
    { en: 'Dehydrated Vegetables', ar: 'الخضروات المجففة', key: 'vegetables' }
  ];

  const categoryMap = new Map();
  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        nameEn: cat.en,
        nameAr: cat.ar,
        descEn: `Premium selection of ${cat.en.toLowerCase()} for international export.`,
        descAr: `مجموعة مختارة من ${cat.ar} عالية الجودة المخصصة للتصدير العالمي.`
      }
    });
    categoryMap.set(cat.key, created.id);
  }

  const allFiles = getFilesRecursively(SOURCE_DIR);
  const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
  
  // Refined junk list
  const junkKeywords = [
    'logo', 'icon', 'bg', 'banner', 'slider', 'background', 'footer', 'header', 
    '150x150', '300x300', '1024x', 'scaled', 'fade', 'backblue', 'elementor',
    'sustainability', 'safety', 'quality', 'journey', 'wall', 'building', 'office',
    'team', 'office', 'certificate', 'method', 'introduction', 'group', 'sampling',
    'laboratory', 'factory', 'field', 'farm', 'value-chain', 'journey', 'frame', 'site'
  ];

  const productImages = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file).toLowerCase();
    const pathLower = file.toLowerCase();
    
    if (!extensions.includes(ext)) return false;
    
    // Filter junk
    for (const kw of junkKeywords) {
      if (basename.includes(kw) || pathLower.includes(kw)) return false;
    }
    
    // Minimum length check
    if (basename.length < 5) return false;
    if (/^\d+\.(jpg|png|webp|jpeg)$/i.test(basename)) return false;
    
    return true;
  });

  console.log(`Identified ${productImages.length} high-quality products. Mapping to categories...`);

  let count = 0;
  for (const file of productImages) {
    const pathLower = file.toLowerCase();
    const nameEn = cleanName(file) || "Botanical Product";
    const nameAr = translateToArabic(nameEn);

    // 2. Determine Category
    let targetCatKey = 'herbs'; // Default
    if (pathLower.includes('seeds')) targetCatKey = 'seeds';
    else if (pathLower.includes('spices')) targetCatKey = 'spices';
    else if (pathLower.includes('flowers')) targetCatKey = 'flowers';
    else if (pathLower.includes('vegetables')) targetCatKey = 'vegetables';
    else if (pathLower.includes('infusions') || pathLower.includes('herbs')) targetCatKey = 'herbs';
    
    const categoryId = categoryMap.get(targetCatKey);

    // 3. Copy and Register
    const ext = path.extname(file);
    const safeName = nameEn.replace(/\s+/g, '-').toLowerCase() || 'product';
    const newFilename = `${safeName}-${Date.now()}-${count}${ext}`;
    const destPath = path.join(UPLOADS_DIR, newFilename);
    const dbUrl = `/uploads/products/${newFilename}`;
    
    try {
      fs.copyFileSync(file, destPath);
      
      await prisma.product.create({
        data: {
          nameEn,
          nameAr,
          descEn: `Premium grade ${nameEn.toLowerCase()} sourced with editorial standards. Perfect for wholesale and bulk international shipping.`,
          descAr: `منتج ${nameAr} عالي الجودة، تم جمعه وتجهيزه وفق أفضل المعايير التصديرية للأعشاب المصرية الممتازة.`,
          price: Math.floor(Math.random() * 40) + 20,
          images: [{ url: dbUrl, alt: nameEn }],
          specifications: { "Origin": "Egypt", "Grade": "Premium A" },
          categoryId,
          isVisible: true
        }
      });
      count++;
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }

  console.log(`✅ Success! Migrated ${count} products into professional categories.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
