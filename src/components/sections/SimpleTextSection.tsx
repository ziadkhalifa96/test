import { useLanguage } from '@/hooks/useLanguage';

interface LangObj { ar: string; en: string }

interface SimpleTextSectionProps {
  config: {
    title?: LangObj;
    paragraphs: LangObj[];
    bg?: string;
    containerClass?: string;
  };
}

export default function SimpleTextSection({ config }: SimpleTextSectionProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  if (!config?.paragraphs || !Array.isArray(config.paragraphs)) {
    return null;
  }

  return (
    <section className={`py-12 ${config.bg || 'bg-white'}`}>
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${config.containerClass || ''}`}>
        {config.title?.[lang] && (
          <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
            {config.title?.[lang] || ''}
          </h2>
        )}
        <div className="space-y-6">
          {config.paragraphs.map((para, i) => {
            if (!para) return null;
            return (
              <p
                key={i}
                className={`text-gray-600 leading-relaxed animate-reveal ${
                  i === 0 ? 'text-xl font-medium text-gray-800' : 'text-lg'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {para?.[lang] || ''}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
