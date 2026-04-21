import { PrismaClient, Role, PageStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Super Admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@alraheeqherbs.com' },
    update: {},
    create: {
      email: 'admin@alraheeqherbs.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: Role.SUPER_ADMIN
    }
  });
  console.log('Admin created: admin@alraheeqherbs.com');

  // 2. Clear existing dynamic data
  await prisma.section.deleteMany({});
  await prisma.page.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // 3. Seed Categories
  const categories = [
    { id: 'herbs', nameAr: 'الأعشاب والمنقوعات', nameEn: 'Herbs & Infusions' },
    { id: 'seeds', nameAr: 'البذور', nameEn: 'Seeds' },
    { id: 'spices', nameAr: 'التوابل', nameEn: 'Spices' },
    { id: 'dehydrated', nameAr: 'الخضروات المجففة', nameEn: 'Dehydrated Vegetables' }
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }
  console.log('Categories seeded');

  // 4. Helper to create a page with sections
  const createPage = async (slug: string, title: string, sections: any[]) => {
    return await prisma.page.create({
      data: {
        slug,
        title,
        status: PageStatus.PUBLISHED,
        seoTitle: `Alraheeq Herbs | ${title}`,
        seoDescription: `Premium Egyptian products - ${title} page.`,
        sections: {
          create: sections.map((s, i) => ({
            type: s.type,
            order: i + 1,
            config: s.config
          }))
        }
      }
    });
  };

  // --- 1) HOMEPAGE ---
  await createPage('home', 'Home', [
    {
      type: 'hero',
      config: {
        badge: { ar: 'موقع الرحيق هربس', en: 'Alraheeq Herbs' },
        title: { ar: 'أعشاب وتوابل مصرية', en: 'High Quality Egyptian' },
        titleAccent: { ar: 'عالية الجودة للأسواق العالمية', en: 'Herbs and Spices for Global Markets' },
        subtitle: { 
          ar: 'في الرحيق هربس ننقل ثراء الزراعة المصرية إلى العملاء حول العالم. من خلال التوريد الموثوق، والتجهيز الدقيق، ومعايير الجودة المناسبة للتصدير، نوفر الأعشاب والتوابل والبذور والخضروات المجففة بثبات واحترافية.',
          en: 'At Alraheeq Herbs, we bring the richness of Egyptian agriculture to clients worldwide. Through reliable sourcing, meticulous processing, and export-grade quality standards, we provide herbs, spices, seeds, and dehydrated vegetables with consistency and professionalism.'
        },
        cta1: { ar: 'اطلب عرض سعر', en: 'Request a Quote' },
        cta2: { ar: 'استكشف المنتجات', en: 'Explore Products' }
      }
    },
    {
      type: 'intro',
      config: {
        badge: { ar: 'عن الرحيق هربس', en: 'About Alraheeq Herbs' },
        title: { ar: 'من منشأ مصري', en: 'From Egyptian Origin' },
        titleAccent: { ar: 'إلى وجهات عالمية', en: 'to Global Destinations' },
        text1: { 
          ar: 'نلتزم بتقديم منتجات مصرية طبيعية تلبي احتياجات المستوردين والمصنعين والعملاء الدوليين. هدفنا هو بناء شراكات مستدامة تقوم على الثقة والشفافية والجودة الاستثنائية.',
          en: 'We are committed to providing natural Egyptian products that meet the needs of importers, manufacturers, and international clients. Our goal is to build sustainable partnerships based on trust, transparency, and exceptional quality.'
        },
        feature1: { ar: 'جودة استثنائية', en: 'Exceptional Quality' },
        feature2: { ar: 'التزام بالمواعيد', en: 'Timely Commitment' },
        feature3: { ar: 'أسعار تنافسية', en: 'Competitive Pricing' },
        feature4: { ar: 'تطوير مستمر', en: 'Continuous Development' }
      }
    },
    {
      type: 'process',
      config: {
        badge: { ar: 'كيف نعمل؟', en: 'How We Work' },
        title: { ar: 'رحلة الجودة', en: 'The Quality' },
        titleAccent: { ar: 'من الحقل إلى الحاوية', en: 'Journey from Field to Container' },
        step1Title: { ar: 'التوريد (Sourcing)', en: 'Sourcing' },
        step1Text: { ar: 'نتعامل مع مزارع مختارة تتبع ممارسات زراعية جيدة.', en: 'We deal with selected farms that follow good agricultural practices.' },
        step2Title: { ar: 'التحديث والجودة (Quality)', en: 'Quality' },
        step2Text: { ar: 'عمليات فرز وتجهيز باستخدام تكنولوجيا حديثة لضمان النقاء.', en: 'Sorting and processing operations using modern technology to ensure purity.' },
        step3Title: { ar: 'اللوجستيات والتصدير (Export)', en: 'Export' },
        step3Text: { ar: 'تسهيل كافة الإجراءات اللوجستية لضمان وصول الطلبية بكفاءة.', en: 'Facilitating all logistical procedures to ensure the order arrives efficiently.' }
      }
    },
    {
      type: 'categories',
      config: {
        badge: { ar: 'منتجاتنا', en: 'Our Products' },
        title: { ar: 'نقدم لك أفضل ما في', ar2: 'الأرض المصرية', en: 'Offering the Best of', en2: 'Egyptian Land' },
        viewAll: { ar: 'عرض كافة الأصناف', en: 'View All Categories' }
      }
    }
  ]);

  // --- 2) ABOUT PAGE ---
  await createPage('about', 'About Us', [
    {
      type: 'page_hero',
      config: {
        badge: { ar: 'من نحن', en: 'About Us' },
        title: { ar: 'الرحيق هربس', en: 'Alraheeq Herbs' },
        titleAccent: { ar: 'تاريخ من الجودة', en: 'A History of Quality' },
        subtitle: { ar: 'نحن شركة مصرية رائدة متخصصة في توريد وتصدير الأعشاب والتوابل والبذور والخضروات المجففة.', en: 'A leading Egyptian company specializing in the supply and export of herbs, spices, seeds, and dehydrated vegetables.' }
      }
    },
    {
      type: 'simple_text',
      config: {
        paragraphs: [
          {
            ar: 'الرحيق هربس هي شركة مصرية رائدة متخصصة في توريد وتصدير الأعشاب، التوابل، البذور، والخضروات المجففة. نحن نعمل كجسر يربط بين خصوبة التربة المصرية ومتطلبات الأسواق العالمية، مع التركيز الكامل على الجودة والمصداقية.',
            en: 'Alraheeq Herbs is a leading Egyptian company specializing in the supply and export of herbs, spices, seeds, and dehydrated vegetables. We act as a bridge connecting the fertility of Egyptian soil with the requirements of global markets, with full focus on quality and credibility.'
          },
          {
            ar: 'الرحيق هربس تأسست لتلبي حاجة السوق الدولي لمنتجات موثوقة ومطابقة للمواصفات القياسية. بفضل خبرتنا ومعرفتنا العميقة بالسوق المصري، نوفر لعملائنا أفضل الأصناف من خلال سلاسل توريد مراقبة بعناية.',
            en: 'Alraheeq Herbs was founded to meet the international market\'s need for reliable products that comply with standard specifications. Thanks to our experience and deep knowledge of the Egyptian market, we provide our customers with the best varieties through carefully monitored supply chains.'
          }
        ]
      }
    },
    {
      type: 'vision_mission',
      config: {
        vision: { 
          badge: { ar: 'رؤيتنا', en: 'Our Vision' }, 
          title: { ar: 'الريادة العالمية', en: 'Global Leadership' }, 
          text: { ar: 'أن نكون الخيار الأول لشركات الأغذية والمستوردين عالمياً عند البحث عن التميز في الأصناف المصرية.', en: 'To be the first choice for food companies and importers globally when looking for excellence in Egyptian varieties.' } 
        },
        mission: { 
          badge: { ar: 'رسالتنا', en: 'Our Mission' }, 
          title: { ar: 'الجودة المستدامة', en: 'Sustainable Quality' }, 
          text: { ar: 'خدمة شركائنا بمنتجات طبيعية وآمنة، من خلال تحسين عمليات التوريد وضمان الشفافية في كل مرحلة.', en: 'Serving our partners with natural and safe products, through optimizing supply processes and ensuring transparency at every stage.' } 
        },
        values: { 
          badge: { ar: 'قيمنا', en: 'Our Values' }, 
          title: { ar: 'ما نؤمن به', en: 'What We Believe In' }, 
          items: [
            { ar: 'الجودة', en: 'Quality' },
            { ar: 'المصداقية', en: 'Credibility' },
            { ar: 'الابتكار', en: 'Innovation' },
            { ar: 'الاستدامة', en: 'Sustainability' },
            { ar: 'الاحترافية', en: 'Professionalism' }
          ] 
        }
      }
    }
  ]);

  // --- 3) PRODUCTS PAGE ---
  await createPage('products', 'Our Products', [
    {
      type: 'page_hero',
      config: {
        badge: { ar: 'منتجاتنا', en: 'Our Products' },
        title: { ar: 'أفضل المحاصيل', en: 'The Best' },
        titleAccent: { ar: 'المصرية', en: 'Egyptian Crops' },
        subtitle: { ar: 'تنوع واسع يلبي كافة احتياجات الصناعات الغذائية والدوائية.', en: 'Wide variety meeting all needs of the food and pharmaceutical industries.' }
      }
    },
    {
      type: 'simple_text',
      config: {
        title: { ar: 'قائمة المنتجات', en: 'Product List' },
        paragraphs: [
          {
            ar: 'الأعشاب والمنقوعات: (النعناع، البابونج، الكركديه، الميرمية، البردقوش، الزعتر، وغيرها...)، نوفرها بدرجات نقاء مختلفة (أوراق كاملة، مقطعة، أو بودرة) لتناسب شاي الأعشاب والصناعات الغذائية.',
            en: 'Herbs & Infusions: (Mint, Chamomile, Hibiscus, Sage, Marjoram, Thyme, etc.), available in various purity grades (whole leaves, TBC, or powder) to suit herbal teas and food industries.'
          },
          {
            ar: 'البذور: (اليانسون، الكراوية، الشمر، الكزبرة، السمسم، الكمون، وغيرها...)، بذور مختارة بعناية، منقاة، ومجهزة للتعبئة أو التصنيع.',
            en: 'Seeds: (Anise, Caraway, Fennel, Coriander, Sesame, Cumin, etc.), carefully selected seeds, purified, and ready for packaging or processing.'
          },
          {
            ar: 'التوابل: تشكيلة متنوعة من التوابل المصرية ذات النكهة القوية والمميزة.',
            en: 'Spices: A diverse assortment of Egyptian spices with strong and distinctive flavors.'
          },
          {
            ar: 'الخضروات المجففة: (البصل المجفف، الثوم المجفف، البقدونس، الشبت، وغيرها...)، يتم تجفيفها بعناية للحفاظ على القيمة الغذائية والنكهة.',
            en: 'Dehydrated Vegetables: (Dehydrated onion, garlic, parsley, dill, etc.), carefully dehydrated to preserve nutritional value and flavor.'
          }
        ]
      }
    }
  ]);

  // --- 4) QUALITY PAGE ---
  await createPage('quality', 'Quality Assurance', [
    {
      type: 'page_hero',
      config: {
        badge: { ar: 'الجودة', en: 'Quality' },
        title: { ar: 'الجودة في كل خطوة', en: 'Quality in Every Step' },
        subtitle: { ar: 'نحن لا نبيع المنتجات فحسب، بل نبيع التميز.', en: 'We don\'t just sell products; we sell excellence.' }
      }
    },
    {
      type: 'quality_pillars',
      config: {
        pillars: [
          {
            type: 'safety',
            badge: { ar: 'سلامة الغذاء', en: 'Food Safety' },
            title: { ar: 'سلامة الغذاء أولاً', en: 'Food Safety First' },
            text: { ar: 'نلتزم بكافة المعايير الصحية العالمية لضمان وصول منتج آمن وخالٍ من الملوثات.', en: 'We adhere to all international health standards to ensure a safe and contaminant-free product arrives.' },
            image: 'https://images.unsplash.com/photo-1579152276506-2d54c1fc16b0?q=80&w=2070&auto=format&fit=crop'
          },
          {
            type: 'control',
            badge: { ar: 'الرقابة', en: 'Control' },
            title: { ar: 'رقابة صارمة', en: 'Strict Control' },
            text: { ar: 'نطبق نظاماً صارماً لمراقبة الجودة، بدءاً من الحقل وحتى التحميل النهائي، لضمان مطابقة المواصفات المطلوبة.', en: 'We implement a rigorous quality control system, from the field to final loading, to ensure compliance with required specifications.' },
            image: 'https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?q=80&w=2070&auto=format&fit=crop'
          },
          {
            type: 'sampling',
            badge: { ar: 'العينات', en: 'Sampling' },
            title: { ar: 'سحب العينات والاختبار', en: 'Sampling & Testing' },
            text: { ar: 'تخضع كافة الكميات لاختبارات وتحاليل لضمان الجوانب الكيميائية والفيزيائية والميكروبيولوجية.', en: 'All quantities undergo tests and analyses to ensure chemical, physical, and microbiological aspects.' },
            image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2070&auto=format&fit=crop'
          }
        ]
      }
    }
  ]);

  // --- 5) CERTIFICATES PAGE ---
  await createPage('certificates', 'Certificates', [
    {
       type: 'page_hero',
       config: { 
         title: { ar: 'الشهادات والامتثال', en: 'Certificates & Compliance' } 
       }
    },
    {
      type: 'simple_text',
      config: {
        paragraphs: [
          {
            ar: 'شهادات الجودة والامتثال: نؤمن بأن الشهادات هي دليل التزام، لذا نحرص على التعامل مع المنتجات التي تتبع المعايير القياسية (مثل ISO, HACCP, Organic) بناءً على طلب السوق والعملاء.',
            en: 'Quality & Compliance Certificates: We believe that certificates are evidence of commitment, so we ensure dealing with products that follow standard criteria (such as ISO, HACCP, Organic) based on market and customer demand.'
          },
          {
            ar: 'الامتثال القانوني: الرحيق هربس شركة مرخصة ومسجلة رسمياً، وتلتزم بكافة القوانين المنظمة للتجارة الدولية والتصدير من جمهورية مصر العربية.',
            en: 'Legal Compliance: Alraheeq Herbs is a licensed and officially registered company, complying with all laws regulating international trade and export from the Arab Republic of Egypt.'
          }
        ]
      }
    }
  ]);

  // --- 6) FAQ PAGE ---
  await createPage('faq', 'FAQ', [
    {
      type: 'page_hero',
      config: { 
        title: { ar: 'الأسئلة الشائعة', en: 'Frequently Asked Questions' } 
      }
    },
    {
      type: 'faq_accordion',
      config: {
        faqs: [
          { 
            q: { ar: 'ما هي الأصناف التي توفرها شركة الرحيق هربس؟', en: 'What varieties do Alraheeq Herbs provide?' }, 
            a: { ar: 'نوفر الأعشاب، التوابل، البذور، والخضروات المجففة.', en: 'We provide herbs, spices, seeds, and dehydrated vegetables.' } 
          },
          { 
            q: { ar: 'هل يمكن طلب عينات قبل التعاقد؟', en: 'Can I request samples before contracting?' }, 
            a: { ar: 'نعم، نوفر عينات لعملائنا لضمان مطابقتها لمواصفاتهم المطلوبة.', en: 'Yes, we provide samples to our customers to ensure compliance with their required specifications.' } 
          },
          { 
            q: { ar: 'هل توفرون خيارات التعبئة الخاصة (Private Label)؟', en: 'Do you provide Private Label options?' }, 
            a: { ar: 'نعم، يمكننا توفير خيارات تعبئة مختلفة بناءً على حجم الطلب واتفاق الطرفين.', en: 'Yes, we can provide various packaging options based on order volume and mutual agreement.' } 
          },
          { 
            q: { ar: 'كيف يتم ضمان جودة المنتج؟', en: 'How is product quality ensured?' }, 
            a: { ar: 'من خلال الرقابة الصارمة في كافة المراحل وإجراء التحاليل اللازمة قبل الشحن.', en: 'Through strict control at all stages and performing necessary analyses before shipment.' } 
          },
          { 
            q: { ar: 'ما هي الدول التي تصدرون إليها؟', en: 'Which countries do you export to?' }, 
            a: { ar: 'نصدر إلى كافة الوجهات العالمية التي تطلب المنتجات المصرية، مع الالتزام بمواصفات كل دولة.', en: 'We export to all global destinations that request Egyptian products, complying with each country\'s specifications.' } 
          }
        ],
        cta: {
          title: { ar: 'هل لديك أسئلة أخرى؟', en: 'Have more questions?' },
          subtitle: { ar: 'فريقنا جاهز للرد على كافة استفساراتك.', en: 'Our team is ready to answer all your inquiries.' },
          btn: { ar: 'تواصل معنا', en: 'Contact Us' }
        }
      }
    }
  ]);

  // --- 7) CONTACT PAGE ---
  await createPage('contact', 'Contact Us', [
    {
       type: 'page_hero',
       config: { 
         title: { ar: 'تواصل معنا', en: 'Contact Us' } 
       }
    },
    {
      type: 'contact_info',
      config: {
        title: { ar: 'بيانات التواصل', en: 'Contact Details' },
        items: [
           { 
             type: 'email', 
             label: { ar: 'البريد الإلكتروني', en: 'Email' }, 
             value: { ar: 'info@alraheeqherbs.com', en: 'info@alraheeqherbs.com' }, 
             iconBg: 'bg-blue-500' 
           },
           { 
             type: 'phone', 
             label: { ar: 'الهاتف / واتساب', en: 'Phone / WhatsApp' }, 
             value: { ar: '+201014167384', en: '+201014167384' }, 
             iconBg: 'bg-green-500' 
           },
           { 
             type: 'address', 
             label: { ar: 'المقر الرئيسي', en: 'Headquarters' }, 
             value: { ar: 'مصر، محافظة الفيوم', en: 'Egypt, Faiyum Governorate' }, 
             iconBg: 'bg-brand-gold' 
           },
           { 
             type: 'hours', 
             label: { ar: 'ساعات العمل', en: 'Working Hours' }, 
             value: { ar: 'الأحد - الخميس (9ص - 5م)', en: 'Sunday - Thursday (9 AM - 5 PM)' }, 
             iconBg: 'bg-brand-green' 
           }
        ],
        addressDetail: { 
          ar: 'كما يمكنكم زيارة مكتبنا في محافظة الفيوم بمصر (قطب زراعة وتصدير الأعشاب).', 
          en: 'You can also visit our office in Faiyum Governorate, Egypt (a hub for herb cultivation and export).' 
        }
      }
    }
  ]);

  console.log('All 7 pages seeded successfully in Bilingual format!');
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
