const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function dedupeCategories() {
  console.log("--- Deduplicating Categories ---");
  const categories = await prisma.category.findMany();
  const groups = {};

  categories.forEach(c => {
    const key = `${c.nameAr} | ${c.nameEn}`.toLowerCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });

  for (const [key, catList] of Object.entries(groups)) {
    if (catList.length > 1) {
      const master = catList[0];
      const slaves = catList.slice(1);
      console.log(`Processing group: ${key}`);
      console.log(`Master: ${master.id}, Slaves: ${slaves.map(s => s.id).join(', ')}`);

      for (const slave of slaves) {
        // Move products to master
        const updateResult = await prisma.product.updateMany({
          where: { categoryId: slave.id },
          data: { categoryId: master.id }
        });
        console.log(`Moved ${updateResult.count} products from ${slave.id} to ${master.id}`);

        // Delete slave
        await prisma.category.delete({ where: { id: slave.id } });
        console.log(`Deleted category: ${slave.id}`);
      }
    }
  }
}

async function dedupeProducts() {
  console.log("\n--- Deduplicating Products ---");
  const products = await prisma.product.findMany();
  const groups = {};

  products.forEach(p => {
    const key = `${p.nameAr} | ${p.nameEn}`.toLowerCase();
    if (!groups[key]) groups[key] = [];
    groups[key].push(p);
  });

  for (const [key, prodList] of Object.entries(groups)) {
    if (prodList.length > 1) {
      const master = prodList[0];
      const slaves = prodList.slice(1);
      console.log(`Processing group: ${key}`);
      console.log(`Keeping: ${master.id}, Deleting: ${slaves.map(s => s.id).join(', ')}`);

      for (const slave of slaves) {
        await prisma.product.delete({ where: { id: slave.id } });
        console.log(`Deleted product: ${slave.id}`);
      }
    }
  }
}

async function main() {
  try {
    await dedupeCategories();
    await dedupeProducts();
    console.log("\n--- Cleanup Complete ---");
  } catch (err) {
    console.error("Cleanup Failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
