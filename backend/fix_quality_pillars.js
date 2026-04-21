const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Fixing Quality Pillars Database Entry ---");

  const qualityPage = await prisma.page.findUnique({
    where: { slug: 'quality' },
    include: { sections: true }
  });

  if (!qualityPage) {
    console.error("Quality page not found");
    return;
  }

  const pillarsSection = qualityPage.sections.find(s => s.type === 'quality_pillars');
  if (!pillarsSection) {
    console.error("Quality Pillars section not found");
    return;
  }

  const pillars = [...(pillarsSection.config?.pillars || [])];
  
  if (pillars[0]) pillars[0].image = '/images/quality/pillar-safety.webp';
  if (pillars[1]) pillars[1].image = '/images/quality/pillar-control.webp';
  if (pillars[2]) pillars[2].image = '/images/quality/pillar-sampling.webp';

  const newConfig = {
    ...pillarsSection.config,
    pillars: pillars
  };

  await prisma.section.update({
    where: { id: pillarsSection.id },
    data: { config: newConfig }
  });

  console.log("Quality Pillars updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
