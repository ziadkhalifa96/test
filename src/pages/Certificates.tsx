import { useEffect } from 'react';
import { Award, FileCheck, Globe2, ShieldCheck, Leaf } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import SectionBadge from '@/components/features/SectionBadge';

function useRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.animate-reveal, .animate-reveal-left, .animate-reveal-right, .animate-scale-in');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Certificates() {
  const { t, isRTL } = useLanguage();
  useRevealObserver();

  const commitments = [
    {
      icon: ShieldCheck,
      title: isRTL ? 'سلامة المنتج' : 'Product Safety',
      desc: isRTL ? 'التزام كامل بمعايير سلامة الغذاء الدولية' : 'Full compliance with international food safety standards',
      color: 'from-brand-green/10 to-emerald-50',
      border: 'border-brand-green/15',
    },
    {
      icon: FileCheck,
      title: isRTL ? 'وثائق التصدير' : 'Export Documents',
      desc: isRTL ? 'تجهيز كامل وتنظيم دقيق لوثائق التصدير' : 'Complete preparation and accurate organization of export documents',
      color: 'from-blue-50 to-indigo-50',
      border: 'border-blue-100',
    },
    {
      icon: Globe2,
      title: isRTL ? 'معايير دولية' : 'International Standards',
      desc: isRTL ? 'امتثال لمتطلبات الأسواق الدولية في كل مرحلة' : 'Compliance with international market requirements at every stage',
      color: 'from-brand-gold/10 to-amber-50',
      border: 'border-brand-gold/15',
    },
    {
      icon: Award,
      title: isRTL ? 'جودة مضمونة' : 'Guaranteed Quality',
      desc: isRTL ? 'معايير جودة ثابتة في كل شحنة' : 'Consistent quality standards in every shipment',
      color: 'from-purple-50 to-violet-50',
      border: 'border-purple-100',
    },
  ];

  const exportReqs = [
    { label: isRTL ? 'شهادة المنشأ' : 'Certificate of Origin', icon: '📜' },
    { label: isRTL ? 'شهادة التحليل' : 'Certificate of Analysis', icon: '🔬' },
    { label: isRTL ? 'الفاتورة التجارية' : 'Commercial Invoice', icon: '📋' },
    { label: isRTL ? 'قائمة التعبئة' : 'Packing List', icon: '📦' },
    { label: isRTL ? 'بيان الشحن' : 'Bill of Lading', icon: '🚢' },
    { label: isRTL ? 'شهادة صحية' : 'Health Certificate', icon: '✅' },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient" />
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="absolute top-12 right-12 opacity-20 animate-float">
          <Leaf className="w-24 h-24 text-brand-gold" />
        </div>
        <div className="absolute bottom-16 left-12 opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>
          <Award className="w-20 h-20 text-white" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">
            {t.certificates.hero.badge}
          </SectionBadge>
          <h1 className={`text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {t.certificates.hero.title}
          </h1>
          <h2 className={`text-3xl font-semibold text-brand-gold ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {t.certificates.hero.titleAccent}
          </h2>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-reveal space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              {t.certificates.intro}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
            <p className="text-gray-500 leading-relaxed text-center">
              {t.certificates.text}
            </p>
            <div className="p-6 rounded-2xl bg-brand-green/5 border border-brand-green/15">
              <p className="text-brand-green font-medium text-center leading-relaxed">
                {t.certificates.commitment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 bg-brand-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-reveal text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {isRTL ? 'التزاماتنا التصديرية' : 'Our Export Commitments'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`animate-scale-in stagger-${i + 1} group p-6 rounded-3xl border ${item.border} bg-gradient-to-br ${item.color} hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-2`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-brand">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold text-gray-900 mb-2 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export Documents */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-reveal text-center mb-12">
            <SectionBadge className="mb-4">{isRTL ? 'المستندات' : 'Documentation'}</SectionBadge>
            <h2 className={`text-3xl font-bold text-gray-900 mt-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {isRTL ? 'مستندات التصدير' : 'Export Documentation'}
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              {isRTL
                ? 'نقوم بتجهيز جميع المستندات المطلوبة لعمليات التصدير'
                : 'We prepare all required documents for export operations'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {exportReqs.map((req, i) => (
              <div
                key={i}
                className={`animate-scale-in stagger-${i + 1} flex items-center gap-3 p-4 rounded-2xl bg-brand-beige border border-brand-gold/15 hover:border-brand-green/30 hover:bg-brand-green/5 transition-all duration-300 group`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{req.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-brand-green transition-colors">
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
