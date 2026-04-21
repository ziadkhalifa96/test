import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionBadge from '@/components/features/SectionBadge';

interface CategoriesProps {
  config?: any;
}

export default function Categories({ config }: CategoriesProps) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const categories = config?.categories || [
    {
      href: '/products?cat=herbs',
      label: t.home.categories.herbs,
      desc: t.home.categories.herbsDesc,
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80&auto=format&fit=crop',
      color: 'from-emerald-900/80 to-brand-green/60',
    },
    {
      href: '/products?cat=seeds',
      label: t.home.categories.seeds,
      desc: t.home.categories.seedsDesc,
      image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=600&q=80&auto=format&fit=crop',
      color: 'from-amber-900/80 to-amber-700/60',
    },
    {
      href: '/products?cat=spices',
      label: t.home.categories.spices,
      desc: t.home.categories.spicesDesc,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format&fit=crop',
      color: 'from-red-900/80 to-orange-700/60',
    },
    {
      href: '/products?cat=dehydrated',
      label: t.home.categories.dehydrated,
      desc: t.home.categories.dehydratedDesc,
      image: 'https://images.unsplash.com/photo-1618512496248-a07e43164f87?w=600&q=80&auto=format&fit=crop',
      color: 'from-green-900/80 to-lime-700/60',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-brand-beige relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="animate-reveal">
            <SectionBadge className="mb-3">{config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.categories.badge}</SectionBadge>
            <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.categories.title}{' '}
              <span className="text-gradient">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.categories.titleAccent}</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="animate-reveal inline-flex items-center gap-2 text-brand-green font-medium hover:text-brand-green-dark transition-colors shrink-0"
          >
            {config?.viewAll?.[isRTL ? 'ar' : 'en'] || t.home.categories.viewAll}
            <Arrow className="w-4 h-4" />
          </Link>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat: any, i: number) => (
            <Link
              key={i}
              to={cat.href}
              className={`animate-scale-in stagger-${i + 1} group relative rounded-3xl overflow-hidden h-72 img-zoom block`}
            >
              <img
                src={cat.image}
                alt={cat.label?.[isRTL ? 'ar' : 'en'] || cat.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}`} />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-1">{cat.label?.[isRTL ? 'ar' : 'en'] || cat.label}</h3>
                <p className="text-white/70 text-sm mb-3">{cat.desc?.[isRTL ? 'ar' : 'en'] || cat.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-brand-gold text-sm font-medium group-hover:gap-2.5 transition-all">
                  {isRTL ? 'استكشف' : 'Explore'}
                  <Arrow className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
