import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ProductCard from '@/components/features/ProductCard';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface FeaturedProductsProps {
  config?: any;
}

export default function FeaturedProducts({ config }: FeaturedProductsProps) {
  const { isRTL } = useLanguage();
  const sectionRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Use config to slice if provided, otherwise default to 4
  const count = config?.count || 4;
  const categoryId = config?.categoryId; // Dashboard uses categoryId
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = categoryId 
          ? `${import.meta.env.VITE_API_URL}/api/products?categoryId=${categoryId}`
          : `${import.meta.env.VITE_API_URL}/api/products`;
        
        const response = await axios.get(url);
        const allProducts = response.data.data || [];
        setProducts(allProducts.slice(0, count));
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, count]);

  if (loading) {
    return (
      <section className="py-16 bg-brand-beige-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 bg-brand-beige-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
