const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Updating Intro Section Images ---");

  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  });

  if (!homePage) {
    console.error("Home page not found");
    return;
  }

  const introSection = homePage.sections.find(s => s.type === 'intro');
  if (!introSection) {
    console.error("Intro section not found");
    return;
  }

  const newConfig = {
    ...introSection.config,
    images: [
      "/images/intro/intro-field.webp",
      "/images/intro/intro-harvest.webp",
      "/images/intro/intro-quality.webp",
      "/images/intro/intro-spices.jpg"
    ]
  };

  await prisma.section.update({
    where: { id: introSection.id },
    data: { config: newConfig }
  });

  console.log("Intro section images updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
