import { Eye, Target, Heart } from 'lucide-react';
import SectionBadge from '@/components/features/SectionBadge';
import { useLanguage } from '@/hooks/useLanguage';

interface LangObj { ar: string; en: string }

interface VisionMissionSectionProps {
  config: {
    vision?: { badge: LangObj; title: LangObj; text: LangObj };
    mission?: { badge: LangObj; title: LangObj; text: LangObj };
    values?: { badge: LangObj; title: LangObj; items: LangObj[] };
  };
}

export default function VisionMissionSection({ config }: VisionMissionSectionProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  if (!config) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          {config.vision && (
            <div className="animate-reveal-left p-8 rounded-3xl bg-gradient-to-br from-brand-green/5 to-emerald-50 border border-brand-green/15">
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 shadow-brand">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <SectionBadge className="mb-3 text-xs">{config.vision.badge?.[lang] || ''}</SectionBadge>
              <h2 className={`text-2xl font-bold text-gray-900 mt-2 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                {config.vision.title?.[lang] || ''}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {config.vision.text?.[lang] || ''}
              </p>
            </div>
          )}

          {/* Mission */}
          {config.mission && (
            <div className="animate-reveal-right p-8 rounded-3xl bg-gradient-to-br from-brand-gold/5 to-amber-50 border border-brand-gold/15">
              <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mb-5 shadow-brand">
                <Target className="w-7 h-7 text-white" />
              </div>
              <SectionBadge className="mb-3 text-xs">{config.mission.badge?.[lang] || ''}</SectionBadge>
              <h2 className={`text-2xl font-bold text-gray-900 mt-2 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                {config.mission.title?.[lang] || ''}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {config.mission.text?.[lang] || ''}
              </p>
            </div>
          )}
        </div>

        {/* Values */}
        {config.values && (
          <div className="py-20 bg-brand-gradient relative overflow-hidden rounded-[3rem] px-8">
            <div className="absolute inset-0 pattern-dots opacity-10" />
            <div className="relative max-w-5xl mx-auto text-center">
              <div className="animate-reveal mb-12">
                <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">
                  {config.values.badge?.[lang] || ''}
                </SectionBadge>
                <h2 className={`text-4xl font-bold text-white mt-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                  {config.values.title?.[lang] || ''}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {config.values.items?.map((item, i) => (
                  <div
                    key={i}
                    className={`animate-scale-in stagger-${i + 1} flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-white/20 text-white font-medium text-base hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default`}
                  >
                    <Heart className="w-5 h-5 text-brand-gold" />
                    {item?.[lang] || ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
