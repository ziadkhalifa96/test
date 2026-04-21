const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Redesigning About Us Page (Master Mix) ---");

  const page = await prisma.page.findUnique({
    where: { slug: 'about' }
  });

  if (!page) {
    console.error("About page not found");
    return;
  }

  // Delete old sections to start fresh
  await prisma.section.deleteMany({
    where: { pageId: page.id }
  });

  // 1. Page Hero
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'page_hero',
      order: 1,
      config: {
        title: { ar: "تراثنا وقصتنا", en: "Our Heritage & Story" },
        subtitle: { ar: "بدأنا من قلب الريف المصري لنصل إلى مائدتكم في كل أنحاء العالم.", en: "From the heart of the Egyptian countryside to your table worldwide." },
        image: "/assets/about/about-hero.webp",
        overlay: 0.5
      }
    }
  });

  // 2. Editorial Story (Intro + Story)
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'editorial_story',
      order: 2,
      config: {
        items: [
          {
            type: 'split',
            title: { ar: "من نحن", en: "Who We Are" },
            content: { 
              ar: "شركة الرحيق هربس هي شركة مصرية رائدة متخصصة في إنتاج وتصدير الأعشاب الطبية والعطرية والبذور والتوابل عالية الجودة. مع عقود من الخبرة في قلب المناطق الزراعية الخصبة في مصر ، قمنا ببناء سمعة طيبة للتميز والنزاهة والموثوقية في سوق الأعشاب العالمية. يرتكز عملنا على التفاني في ممارسات الزراعة المستدامة والالتزام الراسخ بتقديم أنقى كنوز الطبيعة لعملائنا في جميع أنحاء العالم.", 
              en: "Alraheeq Herbs is a leading Egyptian company specializing in the production and export of high-quality medicinal and aromatic herbs, seeds, and spices. With decades of experience at the heart of Egypt's fertile agricultural regions, we have built a reputation for excellence, integrity, and reliability in the global herbs market. Our work is rooted in a dedication to sustainable farming practices and an unwavering commitment to delivering nature's purest treasures to our customers around the world." 
            },
            image: "/assets/about/story-origins.webp",
            caption: { ar: "أيدي مصرية تعمل بحب", en: "Egyptian hands working with heart" },
            reverse: false
          },
          {
            type: 'split',
            title: { ar: "قصتنا", en: "Our Story" },
            content: { 
              ar: "من المزارع المصرية المختارة بعناية إلى مرافق التجفيف والمعالجة المتطورة لدينا ، يتم التعامل مع كل منتج بأقصى درجات العناية لضمان احتفاظه بخصائصه الطبيعية القوية والفعالية والنكهة. نحن نؤمن بأن الجودة لا يمكن المساومة عليها ، ولهذا السبب تخضع كل دفعة إنتاج لعمليات مراقبة جودة شاملة تلبي المعايير الدولية الصارمة.", 
              en: "From carefully selected Egyptian farms to our state-of-the-art drying and processing facilities, every product is handled with the utmost care to ensure it retains its potent natural properties, potency, and flavor. We believe that quality is non-negotiable, which is why every production batch undergoes comprehensive quality control processes that meet strict international standards." 
            },
            image: "/assets/about/mission-quality.webp",
            caption: { ar: "دقة وجودة تصديرية", en: "Precision & Export Quality" },
            reverse: true
          }
        ]
      }
    }
  });

  // 3. Vision & Mission Creative
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'vision_mission_creative',
      order: 3,
      config: {
        vision: {
          badge: { ar: "رؤيتنا", en: "VISION" },
          title: { ar: "المعيار العالمي للأعشاب المصرية", en: "The Global Benchmark for Egyptian Herbs" },
          content: { 
            ar: "أن نصبح المعيار العالمي للأعشاب والتوابل المصرية من خلال وضع معايير جديدة للجودة والبساطة والمسؤولية في سلسلة التوريد الزراعية.", 
            en: "To become the global benchmark for Egyptian herbs and spices by setting new standards for quality, simplicity, and responsibility in the agricultural supply chain." 
          },
          image: "/assets/about/about-hero.webp"
        },
        mission: {
          badge: { ar: "رسالتنا", en: "MISSION" },
          title: { ar: "ربط الطبيعة بالعالم", en: "Connecting Nature to the World" },
          content: { 
            ar: "ربط قيمة الزراعة المصرية بالأسواق الدولية من خلال المصادر الموثوقة ، ومراقبة الجودة الدقيقة ، وحلول التصدير التي تركز على العملاء.", 
            en: "To connect the value of Egyptian agriculture with international markets through reliable sourcing, careful quality control, and customer-focused export solutions." 
          },
          image: "/assets/about/mission-quality.webp"
        }
      }
    }
  });

  // 4. CTA (Final)
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'cta',
      order: 4,
      config: {
        title: { ar: "انضم إلى شركائنا في النجاح", en: "Join Our Success Partners" },
        subtitle: { ar: "نحن هنا لتقديم أفضل ما تجود به الأرض المصرية لمشروعكم.", en: "We are here to provide the best of Egyptian land for your project." },
        buttonText: { ar: "اطلب عرض سعر الآن", en: "Request a Quote Now" },
        buttonLink: "/contact"
      }
    }
  });

  console.log("About Us page REBUILT with MASTER MIX layout!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
