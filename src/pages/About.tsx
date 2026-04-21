import { useEffect } from 'react';
import { Eye, Target, Heart, Leaf } from 'lucide-react';
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

export default function About() {
  const { t, isRTL } = useLanguage();
  useRevealObserver();

  const values = [
    { icon: '✨', label: t.about.values.v1 },
    { icon: '🤝', label: t.about.values.v2 },
    { icon: '🔍', label: t.about.values.v3 },
    { icon: '📋', label: t.about.values.v4 },
    { icon: '🌍', label: t.about.values.v5 },
  ];

  const stats = [
    { value: '30+', label: t.about.stats.s1, sublabel: t.about.stats.s1Label },
    { value: '50+', label: isRTL ? 'منتج' : 'Products', sublabel: t.about.stats.s2Label },
    { value: '🇪🇬', label: t.about.stats.s3, sublabel: t.about.stats.s3Label, isEmoji: true },
    { value: '100%', label: isRTL ? 'طبيعي' : 'Natural', sublabel: t.about.stats.s4Label },
  ];

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-28 bg-brand-gradient overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

        {/* Decorative leaves */}
        <div className="absolute top-12 right-12 opacity-20 animate-float">
          <Leaf className="w-24 h-24 text-brand-gold" />
        </div>
        <div className="absolute bottom-12 left-12 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
          <Leaf className="w-16 h-16 text-white" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">
            {t.about.hero.badge}
          </SectionBadge>
          <h1 className={`text-5xl lg:text-6xl font-bold text-white mt-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {t.about.hero.title}{' '}
            <span className="text-brand-gold">{t.about.hero.titleAccent}</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-reveal-left">
              <div className="space-y-5">
                {[t.about.intro.text1, t.about.intro.text2, t.about.intro.text3].map((text, i) => (
                  <p key={i} className={`text-gray-600 leading-relaxed ${i === 0 ? 'text-xl font-medium text-gray-800' : ''}`}>
                    {text}
                  </p>
                ))}
              </div>
            </div>

            <div className="animate-reveal-right">
              <div className="relative rounded-3xl overflow-hidden h-96 shadow-brand-lg img-zoom">
                <img
                  src="https://images.unsplash.com/photo-1628251727905-3b4de94de23b?w=800&q=80&auto=format&fit=crop"
                  alt="Egyptian farm"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {isRTL ? 'الرحيق هربس' : 'Alraheeq Herbs'}
                        </p>
                        <p className="text-white/70 text-xs">
                          {isRTL ? 'بني سويف، مصر' : 'Beni Suef, Egypt'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-beige">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`animate-scale-in stagger-${i + 1} text-center p-8 rounded-3xl glass-card border border-brand-green/10`}
              >
                <div className={`font-bold text-brand-green mb-1 ${stat.isEmoji ? 'text-4xl' : 'text-4xl lg:text-5xl'}`}>
                  {stat.value}
                </div>
                <div className="text-gray-700 font-semibold text-sm mb-0.5">{stat.label}</div>
                <div className="text-gray-400 text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="animate-reveal-left p-8 rounded-3xl bg-gradient-to-br from-brand-green/5 to-emerald-50 border border-brand-green/15">
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 shadow-brand">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <SectionBadge className="mb-3 text-xs">{t.about.vision.badge}</SectionBadge>
              <h2 className={`text-2xl font-bold text-gray-900 mt-2 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                {t.about.vision.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t.about.vision.text}
              </p>
            </div>

            {/* Mission */}
            <div className="animate-reveal-right p-8 rounded-3xl bg-gradient-to-br from-brand-gold/5 to-amber-50 border border-brand-gold/15">
              <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mb-5 shadow-gold">
                <Target className="w-7 h-7 text-white" />
              </div>
              <SectionBadge className="mb-3 text-xs">{t.about.mission.badge}</SectionBadge>
              <h2 className={`text-2xl font-bold text-gray-900 mt-2 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                {t.about.mission.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t.about.mission.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-gradient relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-reveal mb-12">
            <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">
              {t.about.values.badge}
            </SectionBadge>
            <h2 className={`text-4xl font-bold text-white mt-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {t.about.values.title}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value, i) => (
              <div
                key={i}
                className={`animate-scale-in stagger-${i + 1} flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-white/20 text-white font-medium text-base hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default`}
              >
                <span className="text-2xl">{value.icon}</span>
                {value.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
