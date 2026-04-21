const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("--- Populating Master Content ---");

  const pagesData = [
    {
      slug: 'home',
      title: 'Home',
      seoTitle: 'Alraheeq Herbs | Premium Egyptian Herbs & Spices',
      sections: [
        {
          type: 'hero',
          order: 0,
          config: {
            title: { ar: "أعشاب وتوابل مصرية عالية الجودة", en: "Premium Egyptian Herbs & Spices" },
            titleAccent: { ar: "للأسواق العالمية", en: "for Global Markets" },
            subtitle: { 
              ar: "في الرحيق هربس ننقل ثراء الزراعة المصرية إلى العملاء حول العالم. من خلال التوريد الموثوق، والتجهيز الدقيق، ومعايير الجودة المناسبة للتصدير، نوفر الأعشاب والتوابل والبذور والخضروات المجففة بثبات واحترافية.", 
              en: "At Alraheeq Herbs, we deliver the richness of Egyptian agriculture to customers around the world. Through trusted sourcing, careful processing, and export-focused quality standards, we supply herbs, spices, seeds, and dehydrated vegetables with consistency and confidence." 
            },
            cta1: { ar: "اطلب عرض سعر", en: "Request a Quote" },
            cta2: { ar: "استكشف المنتجات", en: "Explore Products" },
            badge: { ar: "الرحيق هربس", en: "Alraheeq Herbs" }
          }
        },
        {
          type: 'intro',
          order: 1,
          config: {
            badge: { ar: "عن الشركة", en: "About Company" },
            title: { ar: "من منشأ مصري", en: "From Egyptian Origin" },
            titleAccent: { ar: "إلى وجهات عالمية", en: "to International Destination" },
            text1: { 
              ar: "نلتزم بتقديم منتجات مصرية طبيعية تلبي احتياجات المستوردين والمصنعين والعملاء الدوليين الباحثين عن الجودة والاعتمادية والخدمة التصديرية الاحترافية.", 
              en: "We are committed to supplying natural Egyptian products that meet the expectations of importers, manufacturers, and global buyers seeking quality, reliability, and professional export service." 
            },
            features: [
              { ar: "جودة تصديرية", en: "Export Quality" },
              { ar: "توريد موثوق", en: "Reliable Sourcing" },
              { ar: "تجهيز دقيق", en: "Careful Processing" },
              { ar: "خدمة احترافية", en: "Professional Service" }
            ]
          }
        },
        {
          type: 'process',
          order: 2,
          config: {
            badge: { ar: "آلية العمل", en: "Our Process" },
            title: { ar: "من المصدر", en: "From Source" },
            titleAccent: { ar: "إلى الشحنة", en: "to Shipment" },
            steps: [
              {
                number: '01',
                icon: '🌿',
                title: { ar: "توريد انتقائي", en: "Selective Sourcing" },
                text: { 
                  ar: "نتعاون مع مزارعين وموردين موثوقين لتوفير أعشاب وتوابل وبذور وخضروات مجففة بجودة مناسبة لمتطلبات التصدير.", 
                  en: "We work with trusted growers and suppliers to source high-quality herbs, spices, seeds, and dehydrated vegetables that meet export requirements." 
                },
                color: 'from-emerald-400 to-brand-green'
              },
              {
                number: '02',
                icon: '🔍',
                title: { ar: "الفحص وضمان الجودة", en: "Inspection & Quality Assurance" },
                text: { 
                  ar: "يتم التعامل مع كل دفعة بعناية مع التركيز على النظافة والثبات ومطابقة مواصفات العميل.", 
                  en: "Each batch is reviewed and handled with attention to cleanliness, consistency, and compliance with customer specifications." 
                },
                color: 'from-brand-green to-brand-olive'
              },
              {
                number: '03',
                icon: '🚢',
                title: { ar: "التصدير والتسليم", en: "Export & Delivery" },
                text: { 
                  ar: "نجهز الشحنات باحترافية من خلال تنسيق دقيق، ومستندات منظمة، وخدمات لوجستية فعالة لضمان تسليم دولي سلس.", 
                  en: "We prepare shipments with professional coordination, reliable documentation, and efficient logistics to support smooth international delivery." 
                },
                color: 'from-brand-olive to-brand-gold'
              }
            ]
          }
        },
        {
          type: 'whyus',
          order: 3,
          config: {
            badge: { ar: "لماذا تختارنا", en: "Why Choose Us" },
            title: { ar: "لماذا", en: "Why" },
            titleAccent: { ar: "الرحيق هربس", en: "Alraheeq Herbs" },
            reasons: [
              {
                icon: '⭐',
                title: { ar: "جودة موثوقة", en: "Reliable Quality" },
                text: { ar: "نركز على تقديم منتجات بمعايير ثابتة وجاهزية عالية للتصدير.", en: "We focus on supplying products with consistent standards and dependable export readiness." },
                gradient: 'from-brand-green/10 to-emerald-50',
                border: 'border-brand-green/20'
              },
              {
                icon: '🌐',
                title: { ar: "شبكة توريد قوية", en: "Trusted Supply Network" },
                text: { ar: "علاقاتنا القوية مع مصادر التوريد تساعدنا على تأمين خامات متميزة والحفاظ على استقرار الإمداد.", en: "Our strong sourcing relationships help us secure premium raw materials and maintain stable supply." },
                gradient: 'from-brand-olive/10 to-lime-50',
                border: 'border-brand-olive/20'
              },
              {
                icon: '📦',
                title: { ar: "دعم تصديري احترافي", en: "Professional Export Support" },
                text: { ar: "نفهم متطلبات التجارة الدولية ونعمل على تقديم تجربة تصدير منظمة وموثوقة.", en: "We understand international business requirements and aim to deliver a smooth and reliable export experience." },
                gradient: 'from-blue-50 to-cyan-50',
                border: 'border-blue-100'
              },
              {
                icon: '🤝',
                title: { ar: "شراكات طويلة الأمد", en: "Commitment to Partnerships" },
                text: { ar: "نؤمن أن العلاقات التجارية الناجحة تُبنى على الثقة والوضوح والاستمرارية في الأداء.", en: "We believe strong business relationships are built on trust, transparency, and consistent performance." },
                gradient: 'from-brand-gold/10 to-amber-50',
                border: 'border-brand-gold/20'
              }
            ]
          }
        },
        {
          type: 'categories',
          order: 4,
          config: {
            badge: { ar: "أبرز الفئات", en: "Featured Categories" },
            title: { ar: "فئاتنا", en: "Our Main" },
            titleAccent: { ar: "الرئيسية", en: "Product Categories" }
          }
        },
        {
          type: 'featured_products',
          order: 5,
          config: { count: 4 }
        },
        {
          type: 'cta',
          order: 6,
          config: {
            title: { ar: "هل تبحث عن شريك تصدير مصري موثوق؟", en: "Looking for a Reliable Egyptian Export Partner?" },
            subtitle: { ar: "دع الرحيق هربس يدعم أعمالك بمنتجات طبيعية متميزة وخدمة تصدير يمكن الاعتماد عليها.", en: "Let Alraheeq Herbs support your business with premium natural products and dependable export service." },
            btn: { ar: "تواصل معنا", en: "Contact Us" }
          }
        }
      ]
    },
    {
      slug: 'about',
      title: 'About Us',
      sections: [
        {
          type: 'page_hero',
          order: 0,
          config: {
            title: { ar: "عن", en: "About" },
            titleAccent: { ar: "الرحيق هربس", en: "Alraheeq Herbs" },
            subtitle: { ar: "شركة مصرية متخصصة في تصدير الأعشاب والتوابل والبذور والخضروات المجففة", en: "An Egyptian company specialized in exporting herbs, spices, and more." }
          }
        },
        {
          type: 'simple_text',
          order: 1,
          config: {
            paragraphs: [
              { 
                ar: "الرحيق هربس شركة مصرية متخصصة في تصدير الأعشاب والتوابل والبذور والخضروات المجففة إلى الأسواق الدولية. نلتزم بتقديم منتجات طبيعية بجودة موثوقة، مع بناء شراكات قوية مع العملاء الذين يقدّرون الاستمرارية والاحترافية وحسن الخدمة.", 
                en: "Alraheeq Herbs is an Egyptian company specialized in exporting herbs, spices, seeds, and dehydrated vegetables to international markets. We are dedicated to offering natural products of dependable quality while building strong partnerships with clients who value consistency, service, and professionalism." 
              },
              {
                ar: "نؤمن أن نجاح التصدير يبدأ من المصدر الصحيح، لذلك نولي اهتمامًا كبيرًا باختيار المنتج والتعامل معه وتجهيزه في كل مرحلة من مراحل التوريد. وهدفنا هو تقديم منتجات مصرية تعكس ثراء الطبيعة وجودة التنفيذ في آن واحد.",
                en: "We believe that successful export begins with the right source. That is why we pay close attention to product selection, handling, and preparation at every stage of the supply process. Our mission is to provide customers with Egyptian products that reflect both natural richness and export excellence."
              }
            ]
          }
        },
        {
          type: 'vision_mission',
          order: 2,
          config: {
            vision: {
              badge: { ar: "رؤيتنا", en: "Vision" },
              title: { ar: "إلى التميز العالمي", en: "Towards Global Excellence" },
              text: { ar: "أن نصبح اسمًا موثوقًا في سوق الأعشاب والتوابل العالمي من خلال تقديم منتجات مصرية عالية الجودة باحترافية وثبات واهتمام بالتفاصيل.", en: "To become a trusted name in the global herbs and spices industry by delivering quality Egyptian products with professionalism, consistency, and care." }
            },
            mission: {
              badge: { ar: "رسالتنا", en: "Mission" },
              title: { ar: "ربط الطبيعة بالعالم", en: "Connecting Nature to the World" },
              text: { ar: "ربط قيمة الزراعة المصرية بالأسواق العالمية من خلال التوريد الموثوق، والرقابة الدقيقة على الجودة، والحلول التصديرية الموجهة لاحتياجات العملاء.", en: "To connect the value of Egyptian agriculture with international markets through reliable sourcing, careful quality control, and customer-focused export solutions." }
            },
            values: {
              badge: { ar: "قيمنا", en: "Our Values" },
              title: { ar: "ما نؤمن به", en: "What We Believe" },
              items: [
                { ar: "الجودة", en: "Quality" },
                { ar: "الثقة", en: "Trust" },
                { ar: "الشفافية", en: "Transparency" },
                { ar: "الالتزام", en: "Commitment" },
                { ar: "الشراكة طويلة المدى", en: "Long-Term Partnership" }
              ]
            }
          }
        }
      ]
    },
    {
      slug: 'products',
      title: 'Our Products',
      sections: [
        {
          type: 'page_hero',
          order: 0,
          config: {
            title: { ar: "منتجاتنا", en: "Our Products" },
            subtitle: { ar: "منتجات مصرية متميزة للأسواق الدولية", en: "Premium Egyptian Products for International Markets" }
          }
        },
        {
          type: 'simple_text',
          order: 1,
          config: {
            paragraphs: [
              { ar: "في الرحيق هربس نقدم مجموعة مختارة من المنتجات الطبيعية المصرية التي يتم تجهيزها بعناية لتلبية احتياجات الأسواق المختلفة ومتطلبات العملاء.", en: "At Alraheeq Herbs, we offer a carefully selected portfolio of Egyptian natural products prepared to meet diverse market needs and customer requirements." }
            ]
          }
        },
        {
          type: 'product_catalog',
          order: 2,
          config: {}
        },
        {
          type: 'cta',
          order: 3,
          config: {
            title: { ar: "هل لديك استفسار محدد؟", en: "Have a Specific Inquiry?" },
            subtitle: { ar: "للحصول على قائمة المنتجات والمواصفات وعروض الأسعار، يرجى التواصل مع فريقنا مباشرة.", en: "For product lists, specifications, and quotations, please contact our team directly." },
            btn: { ar: "اطلب عرض سعر", en: "Get a Quote" }
          }
        }
      ]
    },
    {
      slug: 'quality',
      title: 'Quality',
      sections: [
        {
          type: 'page_hero',
          order: 0,
          config: {
            title: { ar: "الجودة والتميز", en: "Quality & Excellence" },
            subtitle: { ar: "الجودة في كل مرحلة - من الاختيار حتى التصدير", en: "Quality at Every Step - From Selection to Export" }
          }
        },
        {
          type: 'simple_text',
          order: 1,
          config: {
            paragraphs: [
              { ar: "في الرحيق هربس لا تقتصر الجودة على المنتج النهائي فقط، بل تشمل كل خطوة من خطوات العمل بدءًا من التوريد والاختيار وحتى التجهيز والتعامل التصديري. نحن ملتزمون بتقديم منتجات تلبي توقعات العملاء وتدعم متطلبات الأسواق الدولية.", en: "At Alraheeq Herbs, quality is not limited to the final product. It is part of every stage, from sourcing and selection to preparation and export handling. We are committed to supplying products that meet customer expectations and support international market standards." }
            ]
          }
        },
        {
          type: 'quality_pillars',
          order: 2,
          config: {
            pillars: [
              {
                type: 'safety',
                badge: { ar: "سلامة الغذاء", en: "Food Safety" },
                title: { ar: "التزام قوي بسلامة الغذاء", en: "A Strong Commitment to Food Safety" },
                text: { ar: "تمثل سلامة الغذاء جزءًا أساسيًا من عملية التصدير لدينا. ونعمل من خلال ضوابط واضحة وتعامل احترافي لدعم تقديم منتجات آمنة ومتوافقة وجاهزة للأسواق المختلفة.", en: "Food safety is an essential part of our export process. We work with careful control and professional handling to support safe, compliant, and market-ready products across our supply chain." },
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb75bb41?w=600&q=80'
              },
              {
                type: 'control',
                badge: { ar: "مراقبة الجودة", en: "Quality Control" },
                title: { ar: "مراجعة دقيقة وتقييم مستمر", en: "Careful Review and Product Evaluation" },
                text: { ar: "تعتمد منهجيتنا في مراقبة الجودة على فحص كل دفعة وفقًا للمتطلبات المتفق عليها وتوقعات التصدير، بهدف تقديم منتج ثابت الجودة واحترافي في عرضه وتجهيزه.", en: "Our quality control approach is based on checking each batch against agreed requirements and export expectations. We aim to deliver products with dependable consistency and professional presentation." },
                image: 'https://images.unsplash.com/photo-1581093191148-72b490c58211?w=600&q=80'
              },
              {
                type: 'sampling',
                badge: { ar: "الفحص وسحب العينات", en: "Sampling & Inspection" },
                title: { ar: "اهتمام بالتفاصيل في كل دفعة", en: "Attention to Detail from Batch to Batch" },
                text: { ar: "نؤمن أن الدقة في الفحص ومراجعة المنتج عنصر أساسي للحفاظ على الثبات وبناء ثقة العملاء، لذلك يتم التعامل مع كل طلب بعناية ووفقًا للمعايير المطلوبة.", en: "We believe that accurate inspection and product review are essential for maintaining consistency and customer confidence. Each order is handled with care and attention to required standards." },
                image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80'
              }
            ]
          }
        }
      ]
    },
    {
      slug: 'certificates',
      title: 'Certificates',
      sections: [
        {
          type: 'page_hero',
          order: 0,
          config: {
            title: { ar: "الشهادات والامتثال", en: "Certificates & Compliance" },
            subtitle: { ar: "ثقة في التصدير مدعومة بمعايير احترافية", en: "Export Confidence Backed by Professional Standards" }
          }
        },
        {
          type: 'simple_text',
          order: 1,
          config: {
            paragraphs: [
              { ar: "في الرحيق هربس ندرك أهمية الامتثال والمستندات في التجارة الدولية. لذلك نلتزم بدعم متطلبات العملاء من خلال التعامل الاحترافي مع المنتجات، والتنظيم الجيد لعمليات التصدير، والتركيز على الجودة في جميع المراحل.", en: "At Alraheeq Herbs, we understand the importance of compliance and documentation in international trade. We are committed to supporting customer requirements through professional product handling, organized export preparation, and a quality-focused approach." },
              { ar: "هدفنا هو منح عملائنا الثقة والاطمئنان من خلال تجهيز كل شحنة بعناية ووضوح وجاهزية كاملة للتصدير. نعمل بما يدعم توقعات الأسواق الدولية من حيث الجودة وسلامة المنتج وتنظيم المستندات التصديرية بشكل احترافي.", en: "Our goal is to provide confidence to our clients by ensuring that every shipment is prepared with care, clarity, and export readiness. We work to support international expectations related to quality, safety, and professional export documentation." }
            ]
          }
        }
      ]
    },
    {
      slug: 'faq',
      title: 'FAQ',
      sections: [
        {
          type: 'page_hero',
          order: 0,
          config: {
            title: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" }
          }
        },
        {
          type: 'faq_accordion',
          order: 1,
          config: {
            faqs: [
              {
                q: { ar: "ما المنتجات التي تقومون بتصديرها؟", en: "What products do you export?" },
                a: { ar: "نقوم بتصدير الأعشاب والتوابل والبذور والخضروات المجففة من مصر إلى الأسواق الدولية.", en: "We export Egyptian herbs, spices, seeds, and dehydrated vegetables prepared for international markets." }
              },
              {
                q: { ar: "كيف تحافظون على جودة المنتجات؟", en: "How do you maintain product quality?" },
                a: { ar: "نتبع عملية دقيقة تشمل التوريد والتعامل مع المنتج ومراجعته وتجهيزه للتصدير بما يساعد على الحفاظ على الجودة والثبات.", en: "We follow a careful process that includes sourcing, handling, product review, and export preparation to support consistency and quality." }
              },
              {
                q: { ar: "هل يمكن التوريد وفقًا لمواصفات العميل؟", en: "Can you supply based on customer specifications?" },
                a: { ar: "نعم، نعمل على تلبية متطلبات العملاء ومواصفاتهم كلما كان ذلك ممكنًا.", en: "Yes, we work to align our products with customer requirements whenever possible." }
              },
              {
                q: { ar: "هل توفرون مستندات التصدير وتنسيق الشحنات؟", en: "Do you support export documents and shipment coordination?" },
                a: { ar: "نعم، نقوم بتجهيز وتنسيق متطلبات التصدير وفقًا لطبيعة الطلب والوجهة المستهدفة.", en: "Yes, we prepare and coordinate export requirements according to the order and destination needs." }
              },
              {
                q: { ar: "ما مدة التنفيذ المعتادة؟", en: "What is your lead time?" },
                a: { ar: "تعتمد مدة التنفيذ على نوع المنتج والكمية والوجهة، مع حرصنا الدائم على سرعة التجهيز والالتزام في التسليم.", en: "Lead time depends on the product, quantity, and destination. We always aim for efficient preparation and timely delivery." }
              }
            ],
            cta: {
              title: { ar: "هل لديك سؤال آخر؟", en: "Do you have another question?" },
              subtitle: { ar: "نحن هنا لمساعدتك دائماً", en: "We are always here to help" },
              btn: { ar: "تواصل معنا", en: "Contact Us" }
            }
          }
        }
      ]
    },
    {
      slug: 'contact',
      title: 'Contact Us',
      sections: [
        {
          type: 'page_hero',
          order: 0,
          config: {
            title: { ar: "تواصل معنا", en: "Contact Us" },
            subtitle: { ar: "لنبدأ شراكة ناجحة", en: "Let’s Build Business Together" }
          }
        },
        {
          type: 'contact_info',
          order: 1,
          config: {
            items: [
              { type: 'email', label: { ar: "البريد الإلكتروني", en: "Email" }, value: { ar: "info@alraheeqherbs.com", en: "info@alraheeqherbs.com" }, iconBg: 'bg-brand-green' },
              { type: 'phone', label: { ar: "الهاتف", en: "Phone" }, value: { ar: "+20 1010213937", en: "+20 1010213937" }, iconBg: 'bg-brand-gold' },
              { type: 'address', label: { ar: "العنوان", en: "Address" }, value: { ar: "مصر", en: "Egypt" }, iconBg: 'bg-brand-olive' }
            ],
            addressDetail: { 
              ar: "بني سويف - مركز سمسطا - منشأة أبو مليح", 
              en: "Beni Suef - Samasta - Manshat Abu Malih, Egypt" 
            }
          }
        },
        {
          type: 'cta',
          order: 2,
          config: {
            title: { ar: "جاهز للبدء؟", en: "Ready to Start?" },
            subtitle: { ar: "تواصل مع فريقنا للحصول على عروض الأسعار وتفاصيل المنتجات والاستفسارات التصديرية.", en: "Get in touch with our team for quotations, product details, and export inquiries." },
            btn: { ar: "اطلب عرض سعر", en: "Get a Quote" }
          }
        }
      ]
    }
  ];

  for (const page of pagesData) {
    console.log(`Setting up page: ${page.slug}`);
    
    // Upsert the page
    const p = await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        seoTitle: page.seoTitle || page.title,
        status: 'PUBLISHED'
      },
      create: {
        slug: page.slug,
        title: page.title,
        seoTitle: page.seoTitle || page.title,
        status: 'PUBLISHED'
      }
    });

    // Clear existing sections
    await prisma.section.deleteMany({ where: { pageId: p.id } });

    // Create new sections
    await prisma.section.createMany({
      data: page.sections.map(s => ({
        pageId: p.id,
        type: s.type,
        order: s.order,
        config: s.config
      }))
    });
  }

  console.log("Master Content Populated Successfully!");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
