const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Updating Process Icons for Storytelling ---");

  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  });

  if (!homePage) {
    console.error("Home page not found");
    return;
  }

  const processSection = homePage.sections.find(s => s.type === 'process');
  if (!processSection) {
    console.error("Process section not found");
    return;
  }

  const newConfig = {
    ...processSection.config,
    steps: [
      {
        number: '01',
        title: { ar: "توريد انتقائي", en: "Selective Sourcing" },
        text: { ar: "نتعاون مع مزارعين وموردين موثوقين لتوفير أعشاب وتوابل وبذور وخضروات مجففة بجودة مناسبة لمتطلبات التصدير.", en: "We collaborate with trusted farmers and suppliers to secure herbs, spices, seeds, and dried vegetables that meet high export standards." },
        icon: 'Sprout',
        color: 'from-emerald-500 to-brand-green'
      },
      {
        number: '02',
        title: { ar: "الفحص وضمان الجودة", en: "Inspection & Quality Assurance" },
        text: { ar: "يتم التعامل مع كل دفعة بعناية مع التركيز على النظافة والثبات ومطابقة مواصفات العميل.", en: "Each batch is handled with care, focusing on cleanliness, consistency, and alignment with client specifications." },
        icon: 'SearchCheck',
        color: 'from-brand-green to-brand-olive'
      },
      {
        number: '03',
        title: { ar: "التصدير والتسليم", en: "Export & Delivery" },
        text: { ar: "نجهز الشحنات باحترافية من خلال تنسيق دقيق ومستندات منظمة وخدمات لوجستية فعالة لضمان تسليم دولي سلس.", en: "We professionally prepare shipments with precise coordination, organized documentation, and efficient logistics to ensure a smooth international delivery experience." },
        icon: 'Ship',
        color: 'from-brand-olive to-brand-gold'
      }
    ]
  };

  await prisma.section.update({
    where: { id: processSection.id },
    data: { config: newConfig }
  });

  console.log("Process icons updated successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
