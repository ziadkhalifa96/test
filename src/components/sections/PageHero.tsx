import { Leaf } from 'lucide-react';
import SectionBadge from '@/components/features/SectionBadge';
import { useLanguage } from '@/hooks/useLanguage';

interface PageHeroProps {
  config: {
    badge?: { ar: string; en: string };
    title: { ar: string; en: string };
    titleAccent?: { ar: string; en: string };
    subtitle?: { ar: string; en: string };
    gradient?: string;
  };
}

export default function PageHero({ config }: PageHeroProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  if (!config) return null;

  return (
    <section className="relative py-28 overflow-hidden">
      <div className={`absolute inset-0 ${config.gradient || 'bg-brand-gradient'}`} />
      <div className="absolute inset-0 pattern-dots opacity-10" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-beige to-transparent" />

      <div className="absolute top-12 right-12 opacity-20 animate-float">
        <Leaf className="w-24 h-24 text-brand-gold" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {config.badge?.[lang] && (
          <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">
            {config.badge[lang]}
          </SectionBadge>
        )}
        <h1 className={`text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
          {config.title?.[lang] || ''}{' '}
          {config.titleAccent?.[lang] && <span className="text-brand-gold">{config.titleAccent[lang]}</span>}
        </h1>
        {config.subtitle?.[lang] && (
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed animate-reveal">
            {config.subtitle[lang]}
          </p>
        )}
      </div>
    </section>
  );
}
