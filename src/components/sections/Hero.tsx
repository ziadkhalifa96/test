import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Play, Star, Leaf, Package, Award, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import heroImage from '@/assets/hero-herbs.jpg';

interface HeroProps {
  config?: any;
}

export default function Hero({ config }: HeroProps) {
  const { t, isRTL } = useLanguage();
  const [bgLoaded, setBgLoaded] = useState(false);
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setBgLoaded(true);
  }, []);

  const stats = [
    { icon: Users, value: '30+', label: config?.stats?.s1 || t.home.hero.stat1 },
    { icon: Package, value: '50+', label: config?.stats?.s2 || t.home.hero.stat2 },
    { icon: Award, value: '10+', label: config?.stats?.s3 || t.home.hero.stat3 },
    { icon: Star, value: '100+', label: config?.stats?.s4 || t.home.hero.stat4 },
  ];

  return (
    <section className="hero-section">
      {/* Background */}
      <div className={`hero-bg ${bgLoaded ? 'loaded' : ''}`}>
        <img src={config?.backgroundImage || heroImage} alt="Egyptian herbs and spices" />
      </div>
      <div className="hero-overlay" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-brand-gold/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
        {/* Floating leaves */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <Leaf className="w-full h-full text-brand-gold" />
        </div>
        <div className="absolute top-1/3 left-1/5 w-10 h-10 opacity-15 animate-float" style={{ animationDelay: '2.5s' }}>
          <Leaf className="w-full h-full text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              {config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.hero.badge}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}
            style={{ animationDelay: '0.15s' }}>
            {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.hero.title}{' '}
            <span className="text-gradient-gold">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.hero.titleAccent}</span>
            {(config?.titleEnd?.[isRTL ? 'ar' : 'en'] || t.home.hero.titleEnd) && (
              <>
                <br />
                <span className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white/80">{config?.titleEnd?.[isRTL ? 'ar' : 'en'] || t.home.hero.titleEnd}</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.3s' }}>
            {config?.subtitle?.[isRTL ? 'ar' : 'en'] || t.home.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <Link
              to="/contact"
              className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand-gold text-white font-semibold text-base shadow-gold hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {config?.cta1?.[isRTL ? 'ar' : 'en'] || t.home.hero.cta1}
              <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass border border-white/30 text-white font-semibold text-base hover:bg-white/20 transition-all duration-300 group"
            >
              <Play className="w-4 h-4" />
              {config?.cta2?.[isRTL ? 'ar' : 'en'] || t.home.hero.cta2}
            </Link>
          </div>

          {/* Decorative scroll hint */}
          <div className="mt-16 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <span className="text-white/40 text-xs tracking-widest uppercase">{t.home.hero.scroll}</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-5xl mx-auto px-4">
            <div className="glass border-t border-white/10 border-x-0 border-b-0 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10 rtl:divide-x-reverse">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-5 px-4">
                  <stat.icon className="w-5 h-5 text-brand-gold mb-1" />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-white/50 text-xs text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
