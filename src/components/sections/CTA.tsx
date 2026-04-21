import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionBadge from '@/components/features/SectionBadge';

interface CTAProps {
  config?: any;
}

export default function CTA({ config }: CTAProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-reveal">
          <SectionBadge className="mb-4">{config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.cta.badge}</SectionBadge>
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.cta.title}{' '}
            <span className="text-gradient">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.cta.titleAccent}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {config?.subtitle?.[isRTL ? 'ar' : 'en'] || config?.text?.[isRTL ? 'ar' : 'en'] || t.home.cta.text}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {config?.btn?.[isRTL ? 'ar' : 'en'] || t.home.cta.btn}
              <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-brand-green/30 text-brand-green font-semibold hover:bg-brand-green/5 transition-all duration-300"
            >
              {config?.btn2?.[isRTL ? 'ar' : 'en'] || t.home.cta.btn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
