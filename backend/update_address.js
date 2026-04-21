const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Updating Contact Address & Map Config ---");

  const contactPage = await prisma.page.findUnique({
    where: { slug: 'contact' },
    include: { sections: true }
  });

  if (!contactPage) {
    console.error("Contact page not found");
    return;
  }

  const infoSection = contactPage.sections.find(s => s.type === 'contact_info');
  if (infoSection) {
    const items = [...(infoSection.config?.items || [])];
    const addressItem = items.find(i => i.type === 'address');
    
    if (addressItem) {
      addressItem.value = { 
        ar: "بني سويف - مركز سمسطا - منشأة أبو مليح", 
        en: "Samasta - Manchat Abu Malih, Beni Suef, Egypt" 
      };
    }

    const newConfig = {
      ...infoSection.config,
      items: items
    };

    await prisma.section.update({
      where: { id: infoSection.id },
      data: { config: newConfig }
    });
    console.log("Updated Address in Database");
  }

  console.log("Contact map and address updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
