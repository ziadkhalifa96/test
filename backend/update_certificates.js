const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Redesigning Certificates Page ---");

  const page = await prisma.page.findUnique({
    where: { slug: 'certificates' }
  });

  if (!page) {
    console.error("Certificates page not found");
    return;
  }

  // Delete old sections to start fresh
  await prisma.section.deleteMany({
    where: { pageId: page.id }
  });

  // 1. Certificates Hero/Grid Section
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'certificates_grid',
      order: 1,
      config: {
        badge: { ar: "الجودة والامتثال", en: "QUALITY & COMPLIANCE" },
        title: { ar: "شهادات جودة عالمية", en: "Globally Certified Quality" },
        description: { 
          ar: "نفخر بالتزامنا بأعلى معايير سلامة الغذاء والجودة العالمية، مما يضمن وصول منتجاتنا إلى شركائنا في كافة أنحاء العالم بكل ثقة.", 
          en: "We take pride in our commitment to the highest international food safety and quality standards, ensuring our products reach partners worldwide with full confidence." 
        },
        certificates: [
          {
            id: 'iso-22000',
            name: { ar: 'ISO 22000:2018', en: 'ISO 22000:2018' },
            issuer: { ar: 'سلامة الأغذية', en: 'Food Safety Management' },
            description: { ar: 'شهادة نظام إدارة سلامة الغذاء لضمان أعلى معايير الجودة والتصنيع.', en: 'Standardized system for ensuring safety along the entire food supply chain.' },
            logo: 'https://cdn.worldvectorlogo.com/logos/iso-22000.svg'
          },
          {
            id: 'iso-9001',
            name: { ar: 'ISO 9001:2015', en: 'ISO 9001:2015' },
            issuer: { ar: 'إدارة الجودة', en: 'Quality Management' },
            description: { ar: 'المعيار العالمي لنظام إدارة الجودة والتحسين المستمر في كافة العمليات.', en: 'International benchmark for quality management and process optimization.' },
            logo: 'https://cdn.worldvectorlogo.com/logos/iso-9001-2015.svg'
          },
          {
            id: 'fda',
            name: { ar: 'FDA Approved', en: 'FDA Approved' },
            issuer: { ar: 'إدارة الغذاء والدواء', en: 'U.S. Food & Drug Administration' },
            description: { ar: 'الامتثال الكامل لمتطلبات إدارة الغذاء والدواء الأمريكية لتصدير آمن.', en: 'Registered and compliant with US FDA regulations for international export.' },
            logo: '/assets/certificates/fda-logo.webp'
          },
          {
            id: 'organic',
            name: { ar: 'Organic Certified', en: 'Organic Certified' },
            issuer: { ar: 'الزراعة العضوية', en: 'EU/USDA Organic Standards' },
            description: { ar: 'شهادة الزراعة العضوية الخالية من أي تدخلات كيميائية أو مبيدات.', en: 'Verification of organic farming practices according to global standards.' },
            logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/EU-Organic-Logo.svg'
          },
          {
            id: 'haccp',
            name: { ar: 'HACCP', en: 'HACCP' },
            issuer: { ar: 'تحليل المخاطر', en: 'Hazard Analysis' },
            description: { ar: 'نظام وقائي معني بسلامة الغذاء من المخاطر البيولوجية والكيميائية والفيزيائية.', en: 'Preventative system for food safety from biological, chemical, and physical hazards.' },
            logo: 'https://www.haccp.com/assets/images/HACCP_Logo.png'
          }
        ]
      }
    }
  });

  // 2. Add a final CTA
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'cta',
      order: 2,
      config: {
        title: { ar: "هل لديك استفسار عن معاييرنا؟", en: "Have Questions About Our Standards?" },
        subtitle: { ar: "نحن هنا لمساعدتكم في فهم كافة جوانب الجودة والسلامة التي نطبقها.", en: "We are here to help you understand every aspect of the quality and safety we apply." },
        buttonText: { ar: "تواصل مع فريق الجودة", en: "Contact Quality Team" },
        buttonLink: "/contact"
      }
    }
  });

  console.log("Certificates page REBUILT and MODERNIZED!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
