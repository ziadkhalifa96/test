const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Updating Quality Page Assets ---");

  const qualityPage = await prisma.page.findUnique({
    where: { slug: 'quality' },
    include: { sections: true }
  });

  if (!qualityPage) {
    console.error("Quality page not found");
    return;
  }

  // 1. Update Intro Section
  const introSection = qualityPage.sections.find(s => s.type === 'intro');
  if (introSection) {
    const newConfig = {
      ...introSection.config,
      image: '/images/quality/quality-hero.webp'
    };
    await prisma.section.update({
      where: { id: introSection.id },
      data: { config: newConfig }
    });
    console.log("Updated Intro Image");
  }

  // 2. Update Featured Stats (background)
  const statsSection = qualityPage.sections.find(s => s.type === 'featured_stats');
  if (statsSection) {
    const newConfig = {
      ...statsSection.config,
      mainImage: '/images/quality/quality-stats-bg.jpg'
    };
    await prisma.section.update({
      where: { id: statsSection.id },
      data: { config: newConfig }
    });
    console.log("Updated Stats Image");
  }

  // 3. Update Process List Section
  const processSection = qualityPage.sections.find(s => s.type === 'process_list');
  if (processSection) {
    const items = [...(processSection.config?.items || [])];
    
    // Sampling
    if (items[0]) items[0].image = '/images/quality/sampling.webp';
    // Lab
    if (items[1]) items[1].image = '/images/quality/quality-cert.jpg';
    // Final
    if (items[2]) items[2].image = '/images/quality/final-product.jpg';

    const newConfig = {
      ...processSection.config,
      items: items
    };
    await prisma.section.update({
      where: { id: processSection.id },
      data: { config: newConfig }
    });
    console.log("Updated Process List Images");
  }

  console.log("Quality page assets updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
