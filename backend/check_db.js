const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.count();
  const categories = await prisma.category.count();
  console.log(`Products: ${products}`);
  console.log(`Categories: ${categories}`);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
