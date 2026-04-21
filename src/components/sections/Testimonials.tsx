import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionBadge from '@/components/features/SectionBadge';
import { testimonials } from '@/constants/products';

interface TestimonialsProps {
  config?: any;
}

export default function Testimonials({ config }: TestimonialsProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const [current, setCurrent] = useState(0);

  // Use dynamic list from config if provided, otherwise fallback to static constants
  const list = config?.testimonials || testimonials;

  useEffect(() => {
    if (!list || list.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % list.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [list]);

  if (!list || list.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-brand-gradient relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pattern-dots opacity-10" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-reveal">
          <SectionBadge className="mb-4 !bg-white/10 !text-white !border-white/20">{config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.testimonials.badge}</SectionBadge>
          <h2 className={`text-4xl font-bold text-white mb-12 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.testimonials.title}{' '}
            <span className="text-brand-gold">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.testimonials.titleAccent}</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="animate-scale-in">
          <div className="glass rounded-3xl p-8 md:p-12 mb-8">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 relative">
              <span className={`absolute -top-4 ${isRTL ? 'right-0' : 'left-0'} text-brand-gold text-6xl leading-none opacity-30 font-serif`}>"</span>
              {isRTL ? list[current].textAr : list[current].textEn}
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-gold/20 border-2 border-brand-gold/30 flex items-center justify-center text-xl">
                {list[current].country}
              </div>
              <div className="text-left rtl:text-right">
                <div className="font-semibold text-white">
                  {isRTL ? list[current].nameAr : list[current].nameEn}
                </div>
                <div className="text-white/50 text-sm">
                  {isRTL ? list[current].roleAr : list[current].roleEn}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          {list.length > 1 && (
            <div className="flex justify-center gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 h-2.5 bg-brand-gold' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
