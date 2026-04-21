const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Updating Contact Page Content ---");

  const contactPage = await prisma.page.findUnique({
    where: { slug: 'contact' },
    include: { sections: true }
  });

  if (!contactPage) {
    console.error("Contact page not found");
    return;
  }

  // 1. Update Page Hero
  const heroSection = contactPage.sections.find(s => s.type === 'page_hero');
  if (heroSection) {
    const newConfig = {
      ...heroSection.config,
      title: { ar: "تواصل معنا", en: "Contact Us" },
      subtitle: { ar: "لنبدأ شراكة ناجحة", en: "Let’s Build Business Together" }
    };
    await prisma.section.update({
      where: { id: heroSection.id },
      data: { config: newConfig }
    });
    console.log("Updated Hero Section");
  }

  // 2. Update Contact Info Section
  const infoSection = contactPage.sections.find(s => s.type === 'contact_info');
  if (infoSection) {
    const newConfig = {
      ...infoSection.config,
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
          value: { ar: "مصر", en: "Egypt" }, 
          iconBg: 'bg-brand-olive' 
        }
      ]
    };
    await prisma.section.update({
      where: { id: infoSection.id },
      data: { config: newConfig }
    });
    console.log("Updated Info Section");
  }

  // 3. Update CTA Section
  const ctaSection = contactPage.sections.find(s => s.type === 'cta');
  if (ctaSection) {
    const newConfig = {
      ...ctaSection.config,
      title: { ar: "دعوة للتواصل", en: "Contact CTA" },
      subtitle: { ar: "تواصل مع فريقنا للحصول على عروض الأسعار وتفاصيل المنتجات والاستفسارات التصديرية.", en: "Get in touch with our team for quotations, product details, and export inquiries." },
      btn: { ar: "اطلب عرض سعر", en: "Get a Quote" }
    };
    await prisma.section.update({
      where: { id: ctaSection.id },
      data: { config: newConfig }
    });
    console.log("Updated CTA Section");
  }

  console.log("Contact page updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
