import { CheckCircle2, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

interface LangObj { ar: string; en: string }

interface Certificate {
  id: string;
  name: LangObj;
  issuer: LangObj;
  description: LangObj;
  logo: string;
  largeImage?: string;
}

interface CertificatesGridProps {
  config: {
    badge?: LangObj;
    title?: LangObj;
    subtitle?: LangObj;
    description?: LangObj;
    certificates?: Certificate[];
  };
}

export default function CertificatesGrid({ config }: CertificatesGridProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  const defaultCerts: Certificate[] = [
    {
      id: 'iso-22000',
      name: { ar: 'ISO 22000:2018', en: 'ISO 22000:2018' },
      issuer: { ar: 'سلامة الأغذية العالمي', en: 'Food Safety Management' },
      description: { ar: 'شهادة نظام إدارة سلامة الغذاء لضمان أعلى معايير الجودة والتصنيع.', en: 'Food Safety Management System ensuring the highest standards of production and quality.' },
      logo: 'https://cdn.worldvectorlogo.com/logos/iso-22000.svg'
    },
    {
      id: 'iso-9001',
      name: { ar: 'ISO 9001:2015', en: 'ISO 9001:2015' },
      issuer: { ar: 'إدارة الجودة', en: 'Quality Management' },
      description: { ar: 'المعيار العالمي لنظام إدارة الجودة والتحسين المستمر.', en: 'International standard for quality management systems and continuous improvement.' },
      logo: 'https://cdn.worldvectorlogo.com/logos/iso-9001-2015.svg'
    },
    {
      id: 'fda',
      name: { ar: 'FDA Approved', en: 'FDA Approved' },
      issuer: { ar: 'إدارة الغذاء والدواء الأمريكية', en: 'U.S. Food & Drug Administration' },
      description: { ar: 'الامتثال الكامل لمتطلبات إدارة الغذاء والدواء الأمريكية لسلامة المستهلك.', en: 'Full compliance with US Food and Drug Administration requirements for consumer safety.' },
      logo: '/assets/certificates/fda-logo.webp'
    },
    {
      id: 'organic',
      name: { ar: 'Organic Certified', en: 'Organic Certified' },
      issuer: { ar: 'المعايير العضوية', en: 'EU/USDA Organic Standards' },
      description: { ar: 'شهادة الزراعة العضوية الخالية من المبيدات والأسمدة الكيماوية.', en: 'Certification for organic farming, free from pesticides and chemical fertilizers.' },
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/EU-Organic-Logo.svg'
    }
  ];

  const certs = config?.certificates || defaultCerts;

  return (
    <section className="py-24 bg-[#FDFCF9] relative overflow-hidden">
      {/* Background Botanical Textures */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-3xl rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 blur-3xl rounded-full -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-brand-gold" />
            <span className="text-sm font-bold text-brand-gold uppercase tracking-[0.3em]">
              {config.badge?.[lang] || (isRTL ? 'الاعتمادات والجودة' : 'COMPLIANCE & QUALITY')}
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}
          >
            {config.title?.[lang] || (isRTL ? 'شهادات فخرية بجودة مصرية' : 'Certified to Meet Global Standards')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            {config.description?.[lang] || (isRTL 
              ? 'نحن نلتزم بأقصى درجات الدقة والاحترافية، حيث تخضع كافة منتجاتنا لرقابة صارمة لضمان مطابقتها للمواصفات الدولية.' 
              : 'Our commitment to excellence is verified by international governing bodies, ensuring every product meets the peak of food safety and quality.')}
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-brand-green/5 border border-brand-green/5 hover:border-brand-gold/20 transition-all duration-500 relative flex flex-col justify-between"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-brand-beige/20 rounded-3xl flex items-center justify-center p-4 group-hover:bg-brand-gold/10 transition-colors duration-500 overflow-hidden">
                  <img 
                    src={cert.logo} 
                    alt={cert.name[lang]} 
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-Cairo' : ''}`}>
                  {cert.name[lang]}
                </h3>
                <p className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-4 opacity-80">
                  {cert.issuer[lang]}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {cert.description[lang]}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <button className="flex items-center gap-2 text-xs font-bold text-brand-green hover:text-brand-gold transition-colors">
                  <Download size={14} />
                  {isRTL ? 'تحميل الشهادة' : 'Download PDF'}
                </button>
                <button className="p-2 rounded-xl bg-brand-green/5 text-brand-green hover:bg-brand-green hover:text-white transition-all">
                  <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sample Certificate Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-gray-900 rounded-[3.5rem] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-gold/20 rounded-full border border-brand-gold/30">
                <ShieldCheck className="text-brand-gold" size={20} />
                <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">Verified Excellence</span>
              </div>
              <h3 className={`text-4xl lg:text-5xl font-bold text-white leading-tight ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                {isRTL ? 'نحن نثق بجودتنا' : 'We Stand By Our Quality'}
              </h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                {isRTL 
                  ? 'يتم فحص وتدقيق كل دفعة إنتاج وفق أعلى المعايير الدولية لضمان السلامة الكاملة والوصول إلى معايير التصدير الممتازة.'
                  : 'Every production batch is audited and inspected under rigorous international protocols to ensure complete safety and premium export grading.'}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 bg-brand-gold text-white rounded-2xl font-bold hover:bg-brand-gold/90 transition-all flex items-center gap-3 shadow-xl shadow-brand-gold/20">
                  <Download size={20} />
                  {isRTL ? 'تحميل ملف المستندات' : 'Download Documentation'}
                </button>
              </div>
            </div>
            
            <div className="relative group cursor-zoom-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-brand-green rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="/assets/certificates/main-certificate.jpg" 
                  alt="Official Certificate Sample" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold shadow-xl flex items-center gap-3">
                    <ExternalLink size={18} />
                    {isRTL ? 'عرض كامل' : 'View Full Image'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
