const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, nameAr: true, nameEn: true }
  });

  const dupes = {};
  products.forEach(p => {
    const key = `${p.nameAr} | ${p.nameEn}`;
    if (!dupes[key]) dupes[key] = [];
    dupes[key].push(p.id);
  });

  const repeated = Object.entries(dupes).filter(([key, ids]) => ids.length > 1);
  
  if (repeated.length === 0) {
    console.log("No duplicates found.");
  } else {
    console.log(`Found ${repeated.length} duplicate groups:`);
    repeated.forEach(([key, ids]) => {
      console.log(`- ${key}: [${ids.join(', ')}] Count: ${ids.length}`);
    });
  }

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
