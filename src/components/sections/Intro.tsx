import { CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionBadge from '@/components/features/SectionBadge';

interface IntroProps {
  config?: any;
}

export default function Intro({ config }: IntroProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const features = config?.features || [
    t.home.intro.feature1,
    t.home.intro.feature2,
    t.home.intro.feature3,
    t.home.intro.feature4,
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <div className={`animate-reveal-${isRTL ? 'right' : 'left'} relative`}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-zoom rounded-2xl overflow-hidden h-48 shadow-brand">
                    <img
                      src={config?.images?.[0] || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80&auto=format&fit=crop"}
                      alt="Egyptian herbs"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden h-32 shadow-brand">
                    <img
                      src={config?.images?.[1] || "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=400&q=80&auto=format&fit=crop"}
                      alt="Spices"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-zoom rounded-2xl overflow-hidden h-32 shadow-brand">
                    <img
                      src={config?.images?.[2] || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80&auto=format&fit=crop"}
                      alt="Seeds"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden h-48 shadow-brand">
                    <img
                      src={config?.images?.[3] || "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80&auto=format&fit=crop"}
                      alt="Chamomile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-brand animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-brand-green">{config?.badgeValue || "100%"}</div>
                    <div className="text-xs text-gray-500">{config?.badgeText?.[isRTL ? 'ar' : 'en'] || (isRTL ? 'طبيعي وموثوق' : 'Natural & Trusted')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`animate-reveal-${isRTL ? 'left' : 'right'}`}>
            <SectionBadge className="mb-4">{config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.intro.badge}</SectionBadge>
            <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.intro.title}{' '}
              <span className="text-gradient">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.intro.titleAccent}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {config?.text1?.[isRTL ? 'ar' : 'en'] || t.home.intro.text1}
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              {config?.text2?.[isRTL ? 'ar' : 'en'] || t.home.intro.text2}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature: any, i: number) => (
                <div
                  key={i}
                  className={`animate-scale-in stagger-${i + 1} flex items-center gap-2.5 p-3 rounded-xl bg-brand-green/5 border border-brand-green/10`}
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span className="text-sm font-medium text-gray-700">
                    {typeof feature === 'string' ? feature : (feature?.[isRTL ? 'ar' : 'en'] || '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
