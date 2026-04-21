import { useEffect } from 'react';
import { Shield, CheckCircle2, Search, Leaf } from 'lucide-react';
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const elements = document.querySelectorAll('.animate-reveal, .animate-reveal-left, .animate-reveal-right, .animate-scale-in');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Quality() {
  const { t, isRTL } = useLanguage();
  useRevealObserver();

  const qualityPillars = [
    {
      icon: Shield,
      badge: t.quality.safety.badge,
      title: t.quality.safety.title,
      text: t.quality.safety.text,
      gradient: 'from-brand-green/5 to-emerald-50',
      border: 'border-brand-green/15',
      iconBg: 'bg-brand-gradient',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80&auto=format&fit=crop',
    },
    {
      icon: CheckCircle2,
      badge: t.quality.control.badge,
      title: t.quality.control.title,
      text: t.quality.control.text,
      gradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-100',
      iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80&auto=format&fit=crop',
    },
    {
      icon: Search,
      badge: t.quality.sampling.badge,
      title: t.quality.sampling.title,
      text: t.quality.sampling.text,
      gradient: 'from-brand-gold/5 to-amber-50',
      border: 'border-brand-gold/15',
      iconBg: 'bg-gold-gradient',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
    },
  ];

  const steps = [
    { num: '01', label: isRTL ? 'التوريد' : 'Sourcing', icon: '🌿' },
    { num: '02', label: isRTL ? 'الفحص الأولي' : 'Initial Inspection', icon: '🔬' },
    { num: '03', label: isRTL ? 'ضبط الجودة' : 'Quality Control', icon: '✅' },
    { num: '04', label: isRTL ? 'التجهيز' : 'Processing', icon: '⚙️' },
    { num: '05', label: isRTL ? 'التعبئة' : 'Packaging', icon: '📦' },
    { num: '06', label: isRTL ? 'الشحن' : 'Shipment', icon: '🚢' },
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">
            {t.quality.hero.badge}
          </SectionBadge>
          <h1 className={`text-5xl lg:text-6xl font-bold text-white mt-4 mb-6 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {t.quality.hero.title}{' '}
            <span className="text-brand-gold">{t.quality.hero.titleAccent}</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.quality.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Intro statement */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-reveal">
          <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-brand-gold rtl:border-l-0 rtl:border-r-4 px-6 py-4 bg-brand-gold/5 rounded-r-2xl rtl:rounded-r-none rtl:rounded-l-2xl text-right rtl:text-right">
            {t.quality.intro}
          </p>
        </div>
      </section>

      {/* Quality Process Timeline */}
      <section className="py-16 bg-brand-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-reveal text-center mb-12">
            <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {isRTL ? 'مسار الجودة' : 'Quality Journey'}
            </h2>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-brand-green via-brand-gold to-brand-olive" />

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`animate-scale-in stagger-${i + 1} flex flex-col items-center text-center`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-brand-green/20 flex flex-col items-center justify-center shadow-brand relative z-10 hover:border-brand-green hover:shadow-brand-lg transition-all duration-300 mb-3 group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{step.icon}</span>
                  </div>
                  <span className="text-xs text-brand-gold font-bold mb-1">{step.num}</span>
                  <span className="text-xs text-gray-600 font-medium">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {qualityPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className={`animate-reveal-${isEven ? 'left' : 'right'} w-full lg:w-1/2`}>
                  <div className="img-zoom rounded-3xl overflow-hidden h-72 shadow-brand-lg">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`animate-reveal-${isEven ? 'right' : 'left'} w-full lg:w-1/2`}>
                  <div className={`p-8 rounded-3xl bg-gradient-to-br ${pillar.gradient} border ${pillar.border}`}>
                    <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-5 shadow-brand`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <SectionBadge className="mb-3 text-xs">{pillar.badge}</SectionBadge>
                    <h2 className={`text-2xl font-bold text-gray-900 mt-3 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                      {pillar.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{pillar.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
