const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Modernizing Why Us Icons ---");

  const homePage = await prisma.page.findUnique({
    where: { slug: 'home' },
    include: { sections: true }
  });

  if (!homePage) {
    console.error("Home page not found");
    return;
  }

  const whyUsSection = homePage.sections.find(s => s.type === 'whyus');
  if (!whyUsSection) {
    console.error("Why Us section not found");
    return;
  }

  const newConfig = {
    ...whyUsSection.config,
    reasons: [
      {
        icon: 'Award',
        title: { ar: "جودة موثوقة", en: "Reliable Quality" },
        text: { ar: "نركز على تقديم منتجات بمعايير ثابتة وجاهزية عالية للتصدير.", en: "We focus on supplying products with consistent standards and dependable export readiness." },
        gradient: 'from-brand-green/10 to-emerald-50',
        border: 'border-brand-green/20'
      },
      {
        icon: 'Globe2',
        title: { ar: "شبكة توريد قوية", en: "Trusted Supply Network" },
        text: { ar: "علاقاتنا القوية مع مصادر التوريد تساعدنا على تأمين خامات متميزة والحفاظ على استقرار الإمداد.", en: "Our strong sourcing relationships help us secure premium raw materials and maintain stable supply." },
        gradient: 'from-brand-olive/10 to-lime-50',
        border: 'border-brand-olive/20'
      },
      {
        icon: 'Ship',
        title: { ar: "دعم تصديري احترافي", en: "Professional Export Support" },
        text: { ar: "نفهم متطلبات التجارة الدولية ونعمل على تقديم تجربة تصدير منظمة وموثوقة.", en: "We understand international business requirements and aim to deliver a smooth and reliable export experience." },
        gradient: 'from-blue-50 to-cyan-50',
        border: 'border-blue-100'
      },
      {
        icon: 'Handshake',
        title: { ar: "شراكات طويلة الأمد", en: "Commitment to Partnerships" },
        text: { ar: "نؤمن أن العلاقات التجارية الناجحة تُبنى على الثقة والوضوح والاستمرارية في الأداء.", en: "We believe strong business relationships are built on trust, transparency, and consistent performance." },
        gradient: 'from-brand-gold/10 to-amber-50',
        border: 'border-brand-gold/20'
      }
    ]
  };

  await prisma.section.update({
    where: { id: whyUsSection.id },
    data: { config: newConfig }
  });

  console.log("Why Us icons modernized successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
