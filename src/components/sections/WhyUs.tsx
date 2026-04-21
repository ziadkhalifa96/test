import { CheckCircle2, Award, Globe2, Ship, Handshake, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionBadge from '@/components/features/SectionBadge';

const iconMap: Record<string, any> = {
  Award: Award,
  Globe2: Globe2,
  Ship: Ship,
  Handshake: Handshake,
  Star: Star,
};

interface WhyUsProps {
  config?: any;
}

export default function WhyUs({ config }: WhyUsProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const reasons = config?.reasons || [
    {
      icon: 'Award',
      title: t.home.why.r1Title,
      text: t.home.why.r1Text,
      gradient: 'from-brand-green/10 to-emerald-50',
      border: 'border-brand-green/20',
    },
    {
      icon: 'Globe2',
      title: t.home.why.r2Title,
      text: t.home.why.r2Text,
      gradient: 'from-brand-olive/10 to-lime-50',
      border: 'border-brand-olive/20',
    },
    {
      icon: 'Ship',
      title: t.home.why.r3Title,
      text: t.home.why.r3Text,
      gradient: 'from-blue-50 to-cyan-50',
      border: 'border-blue-100',
    },
    {
      icon: 'Handshake',
      title: t.home.why.r4Title,
      text: t.home.why.r4Text,
      gradient: 'from-brand-gold/10 to-amber-50',
      border: 'border-brand-gold/20',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-reveal">
          <SectionBadge className="mb-4">{config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.why.badge}</SectionBadge>
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mt-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.why.title}{' '}
            <span className="text-gradient">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.why.titleAccent}</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason: any, i: number) => {
            const Icon = iconMap[reason.icon];
            return (
              <div
                key={i}
                className={`animate-scale-in stagger-${i + 1} group relative p-6 rounded-3xl border ${reason.border} bg-gradient-to-br ${reason.gradient} hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 inline-flex items-center justify-center">
                  {Icon ? (
                    <Icon className="w-12 h-12 text-brand-green" strokeWidth={1.5} />
                  ) : (
                    <span className="text-4xl">{reason.icon}</span>
                  )}
                </div>
                <h3 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                {reason.title?.[isRTL ? 'ar' : 'en'] || reason.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {reason.text?.[isRTL ? 'ar' : 'en'] || reason.text}
              </p>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
}
