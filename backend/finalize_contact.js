const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- FINALizing Contact Address ---");

  const contactPage = await prisma.page.findUnique({
    where: { slug: 'contact' }
  });

  if (!contactPage) {
    console.error("Contact page not found");
    return;
  }

  // Delete ALL sections of type contact_info to be generic
  await prisma.section.deleteMany({
    where: { 
      pageId: contactPage.id,
      type: 'contact_info'
    }
  });

  const fullAddressAr = "بني سويف - مركز سمسطا - منشأة أبو مليح";
  const fullAddressEn = "Manchat Abu Malih, Samasta, Beni Suef, Egypt";

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
        value: { ar: fullAddressAr, en: fullAddressEn }, 
        iconBg: 'bg-brand-olive' 
      }
    ],
    addressDetail: {
      ar: fullAddressAr,
      en: fullAddressEn
    }
  };

  await prisma.section.create({
    data: {
      pageId: contactPage.id,
      type: 'contact_info',
      order: 1,
      config: newConfig
    }
  });

  console.log("Contact section REBUILT and FINALIZED!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
