const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Seeding CMS Pages ---");

  // 1. Setup Home Page
  const home = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home',
      seoTitle: 'Alraheeq Herbs | Premium Egyptian Herbs & Spices',
      status: 'PUBLISHED'
    }
  });

  // Clear existing sections to avoid duplicates during seed
  await prisma.section.deleteMany({ where: { pageId: home.id } });

  await prisma.section.createMany({
    data: [
      { pageId: home.id, type: 'hero', order: 0, config: {} },
      { pageId: home.id, type: 'intro', order: 1, config: {} },
      { pageId: home.id, type: 'categories', order: 2, config: {} },
      { pageId: home.id, type: 'featured_products', order: 3, config: { count: 4 } },
      { pageId: home.id, type: 'whyus', order: 4, config: {} },
      { pageId: home.id, type: 'testimonials', order: 5, config: {} },
      { pageId: home.id, type: 'cta', order: 6, config: {} }
    ]
  });

  // 2. Setup Products Page
  const productsPage = await prisma.page.upsert({
    where: { slug: 'products' },
    update: {},
    create: {
      slug: 'products',
      title: 'Our Products',
      seoTitle: 'Our Products | Alraheeq Herbs',
      status: 'PUBLISHED'
    }
  });

  await prisma.section.deleteMany({ where: { pageId: productsPage.id } });

  await prisma.section.createMany({
    data: [
      { pageId: productsPage.id, type: 'page_hero', order: 0, config: { 
          title: { en: "Our Botanical Catalog", ar: "كتالوج منتجاتنا النباتية" },
          subtitle: { en: "Pure, natural, and sustainably sourced from the heart of Egypt.", ar: "بيور، طبيعي، ومن مصادر مستدامة من قلب مصر." }
        } 
      },
      { pageId: productsPage.id, type: 'product_catalog', order: 1, config: {} }
    ]
  });

  console.log("CMS Seeded Successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
