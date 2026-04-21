import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface LangObj { ar: string; en: string }

interface FAQAccordionProps {
  config: {
    title?: LangObj;
    subtitle?: LangObj;
    faqs: Array<{ q: LangObj; a: LangObj }>;
    cta?: {
      title: LangObj;
      subtitle: LangObj;
      btn: LangObj;
    };
  };
}

export default function FAQAccordion({ config }: FAQAccordionProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!config?.faqs || !Array.isArray(config.faqs)) {
    return null;
  }

  return (
    <>
      <section className="py-20 bg-brand-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {config.faqs.map((faq, i) => {
              if (!faq) return null;
              return (
                <div
                  key={i}
                  className={`animate-reveal border rounded-2xl overflow-hidden transition-all duration-300 ${
                    openIndex === i
                      ? 'border-brand-green/30 shadow-brand bg-white'
                      : 'border-gray-100 bg-white hover:border-brand-green/20 hover:shadow-sm'
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left rtl:text-right"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                        openIndex === i ? 'bg-brand-green text-white' : 'bg-brand-green/10 text-brand-green'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-semibold text-gray-900 text-base leading-relaxed ${openIndex === i ? 'text-brand-green' : ''}`}>
                        {faq.q?.[lang] || ''}
                      </span>
                    </div>
                    <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openIndex === i ? 'bg-brand-green text-white rotate-0' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      <div className="ps-12">
                        {faq.a?.[lang] || ''}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {config.cta && (
        <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-reveal">
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-5 shadow-brand">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {config.cta.title?.[lang] || ''}
            </h2>
            <p className="text-gray-500 mb-6">{config.cta.subtitle?.[lang] || ''}</p>
            <Link
              to="/contact"
              className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1"
            >
              {config.cta.btn?.[lang] || ''}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
