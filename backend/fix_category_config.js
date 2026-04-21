const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Fixing Category Config Key ---");

  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  });

  const categoriesSection = homePage.sections.find(s => s.type === 'categories');
  
  const categoriesList = [
    {
      href: "/products?cat=herbs-infusions",
      label: { en: "Herbs & Infusions", ar: "الأعشاب والمنقوعات" },
      desc: { en: "Egyptian herbs known for their natural aroma and export quality.", ar: "أعشاب مصرية معروفة بجودتها الطبيعية ورائحتها المميزة." },
      image: "/images/categories/herbs.jpg",
      color: "from-emerald-900/80 to-brand-green/60"
    },
    {
      href: "/products?cat=seeds",
      label: { en: "Seeds", ar: "البذور" },
      desc: { en: "Sourced with attention to quality, cleanliness, and specifications.", ar: "بذور مختارة بعناية لتلبية متطلبات السوق والجودة." },
      image: "/images/categories/seeds.jpg",
      color: "from-amber-900/80 to-amber-700/60"
    },
    {
      href: "/products?cat=spices",
      label: { en: "Spices", ar: "التوابل" },
      desc: { en: "Premium Egyptian spices with focus on color, aroma, and appearance.", ar: "توابل مصرية فاخرة نركز فيها على اللون والرائحة والمظهر." },
      image: "/images/categories/spices.jpg",
      color: "from-red-900/80 to-orange-700/60"
    },
    {
      href: "/products?cat=dehydrated-vegetables",
      label: { en: "Dehydrated Vegetables", ar: "الخضروات المجففة" },
      desc: { en: "Selected and prepared for food processors and traders.", ar: "خضروات مجففة مختارة ومنتقاة بعناية لشركائنا حول العالم." },
      image: "/images/categories/vegetables.jpg",
      color: "from-green-900/80 to-lime-700/60"
    }
  ];

  const newConfig = {
    ...categoriesSection.config,
    categories: categoriesList // Use 'categories' instead of 'items'
  };

  await prisma.section.update({
    where: { id: categoriesSection.id },
    data: { config: newConfig }
  });

  console.log("Category config fixed successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
