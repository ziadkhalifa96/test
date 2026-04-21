const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Updating Category Images ---");

  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  });

  if (!homePage) {
    console.error("Home page not found");
    return;
  }

  const categoriesSection = homePage.sections.find(s => s.type === 'categories');
  if (!categoriesSection) {
    console.error("Categories section not found");
    return;
  }

  const newConfig = {
    ...categoriesSection.config,
    items: [
      {
        id: 1,
        title: { en: "Herbs & Infusions", ar: "الأعشاب والمنقوعات" },
        description: { en: "Egyptian herbs known for their natural aroma and export quality.", ar: "أعشاب مصرية معروفة بجودتها الطبيعية ورائحتها المميزة." },
        image: "/images/categories/herbs.jpg",
        slug: "herbs-infusions"
      },
      {
        id: 2,
        title: { en: "Seeds", ar: "البذور" },
        description: { en: "Sourced with attention to quality, cleanliness, and specifications.", ar: "بذور مختارة بعناية لتلبية متطلبات السوق والجودة." },
        image: "/images/categories/seeds.jpg",
        slug: "seeds"
      },
      {
        id: 3,
        title: { en: "Spices", ar: "التوابل" },
        description: { en: "Premium Egyptian spices with focus on color, aroma, and appearance.", ar: "توابل مصرية فاخرة نركز فيها على اللون والرائحة والمظهر." },
        image: "/images/categories/spices.jpg",
        slug: "spices"
      },
      {
        id: 4,
        title: { en: "Dehydrated Vegetables", ar: "الخضروات المجففة" },
        description: { en: "Selected and prepared for food processors and traders.", ar: "خضروات مجففة مختارة ومنتقاة بعناية لشركائنا حول العالم." },
        image: "/images/categories/vegetables.jpg",
        slug: "dehydrated-vegetables"
      }
    ]
  };

  await prisma.section.update({
    where: { id: categoriesSection.id },
    data: { config: newConfig }
  });

  console.log("Category images updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
