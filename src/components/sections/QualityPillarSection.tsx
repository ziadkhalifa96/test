import { Shield, CheckCircle2, Search } from 'lucide-react';
import SectionBadge from '@/components/features/SectionBadge';
import { useLanguage } from '@/hooks/useLanguage';

interface LangObj { ar: string; en: string }

interface Pillar {
  title: LangObj;
  badge: LangObj;
  text: LangObj;
  image: string;
  type: 'safety' | 'control' | 'sampling';
}

interface QualityPillarSectionProps {
  config: {
    pillars: Pillar[];
  };
}

const iconMap = {
  safety: { icon: Shield, gradient: 'from-brand-green/5 to-emerald-50', border: 'border-brand-green/15', iconBg: 'bg-brand-gradient' },
  control: { icon: CheckCircle2, gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-100', iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
  sampling: { icon: Search, gradient: 'from-brand-gold/5 to-amber-50', border: 'border-brand-gold/15', iconBg: 'bg-gold-gradient' },
};

export default function QualityPillarSection({ config: sectionConfig }: QualityPillarSectionProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  if (!sectionConfig?.pillars || !Array.isArray(sectionConfig.pillars)) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {sectionConfig.pillars.map((pillar, i) => {
          if (!pillar) return null;
          const iconConfig = iconMap[pillar.type] || iconMap.safety;
          const Icon = iconConfig.icon;
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
                    src={pillar.image || ''}
                    alt={pillar.title?.[lang] || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`animate-reveal-${isEven ? 'right' : 'left'} w-full lg:w-1/2`}>
                <div className={`p-8 rounded-3xl bg-gradient-to-br ${iconConfig.gradient} border ${iconConfig.border}`}>
                  <div className={`w-14 h-14 rounded-2xl ${iconConfig.iconBg} flex items-center justify-center mb-5 shadow-brand`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {pillar.badge?.[lang] && (
                    <SectionBadge className="mb-3 text-xs">{pillar.badge[lang]}</SectionBadge>
                  )}
                  <h2 className={`text-2xl font-bold text-gray-900 mt-3 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                    {pillar.title?.[lang] || ''}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{pillar.text?.[lang] || ''}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
