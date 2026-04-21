import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/constants/products';
import { useLanguage } from '@/hooks/useLanguage';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isRTL } = useLanguage();

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const images = (product as any).images;
  const imageUrl = images && Array.isArray(images) && images.length > 0
    ? (images[0].url.startsWith('http') ? images[0].url : `${import.meta.env.VITE_API_URL}${images[0].url}`)
    : (product as any).image || '/placeholder.png';

  const specs = (product as any).specifications || {};
  const origin = specs.Origin || (product as any).origin || 'Egypt';

  const categoryLabels: Record<string, { ar: string; en: string }> = {
    herbs: { ar: 'الأعشاب', en: 'Herbs' },
    seeds: { ar: 'البذور', en: 'Seeds' },
    spices: { ar: 'التوابل', en: 'Spices' },
    dehydrated: { ar: 'خضروات مجففة', en: 'Dehydrated' },
  };

  const categoryName = (product as any).category && typeof (product as any).category === 'object'
    ? (isRTL ? (product as any).category.nameAr : (product as any).category.nameEn)
    : (categoryLabels[(product as any).category as string]?.[isRTL ? 'ar' : 'en'] || (product as any).category);

  return (
    <div
      className={`animate-scale-in stagger-${Math.min(index + 1, 6)} card-3d group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-brand-lg transition-all duration-500`}
    >
      {/* Image */}
      <div className="img-zoom relative h-52">
        <img
          src={imageUrl}
          alt={isRTL ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-green text-white shadow-sm">
            {categoryName}
          </span>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-40 transition-opacity duration-400" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-xs text-gray-400">{origin}</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1.5 group-hover:text-brand-green transition-colors">
          {isRTL ? product.nameAr : product.nameEn}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {isRTL ? product.descAr : product.descEn}
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-green group-hover:text-brand-green-dark transition-colors"
        >
          {isRTL ? 'اطلب عرض سعر' : 'Request Quote'}
          <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
