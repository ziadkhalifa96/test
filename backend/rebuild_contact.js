const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Nuke & Rebuild Contact Address ---");

  const contactPage = await prisma.page.findUnique({
    where: { slug: 'contact' }
  });

  if (!contactPage) {
    console.error("Contact page not found");
    return;
  }

  // Delete all contact_info sections for this page to be 100% sure
  await prisma.section.deleteMany({
    where: { 
      pageId: contactPage.id,
      type: 'contact_info'
    }
  });

  const newConfig = {
    title: { ar: "تواصل معنا", en: "Contact Us" },
    subtitle: { ar: "لنبدأ شراكة ناجحة", en: "Let’s Build Business Together" },
    items: [
      { 
        type: 'email', 
        label: { ar: "البريد الإلكتروني", en: "Email" }, 
        value: { ar: "info@alraheeqherbs.com", en: "info@alraheeqherbs.com" }, 
        iconBg: 'bg-brand-green' 
      },
      { 
        type: 'phone', 
        label: { ar: "الهاتف", en: "Phone" }, 
        value: { ar: "+20 1010213937", en: "+20 1010213937" }, 
        iconBg: 'bg-brand-gold' 
      },
      { 
        type: 'address', 
        label: { ar: "العنوان", en: "Address" }, 
        value: { ar: "بني سويف - مركز سمسطا - منشأة أبو مليح", en: "Manchat Abu Malih, Samasta, Beni Suef, Egypt" }, 
        iconBg: 'bg-brand-olive' 
      }
    ]
  };

  await prisma.section.create({
    data: {
      pageId: contactPage.id,
      type: 'contact_info',
      order: 1,
      config: newConfig
    }
  });

  console.log("Contact section REBUILT successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
