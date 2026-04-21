import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, PackageOpen, Loader2, Search } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import ProductCard from '@/components/features/ProductCard';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductCatalogProps {
  config?: any;
}

export default function ProductCatalog({ config }: ProductCatalogProps) {
  const { t, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const catParam = searchParams.get('cat') || 'all';
  const [activeFilter, setActiveFilter] = useState(catParam);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    setActiveFilter(catParam);
  }, [catParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/products`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/categories`)
        ]);
        setProducts(prodRes.data.data || []);
        setCategories(catRes.data.data || []);
      } catch (err) {
        console.error('Error fetching catalog data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    if (key === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: key });
    }
  };

  const filtered = products.filter((p) => {
    const matchesCategory = activeFilter === 'all' || p.categoryId === activeFilter || p.category?.id === activeFilter;
    const matchesSearch = p.nameAr.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Bar */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleFilter('all')}
              className={`category-chip text-sm font-medium transition-all duration-300 ${activeFilter === 'all' ? 'active' : ''}`}
            >
              {isRTL ? 'الكل' : 'All'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilter(cat.id)}
                className={`category-chip text-sm font-medium transition-all duration-300 ${activeFilter === cat.id ? 'active' : ''}`}
              >
                {isRTL ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder={isRTL ? 'بحث...' : 'Search...'} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl border-gray-100 bg-gray-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
            <PackageOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-medium">{isRTL ? 'لا توجد منتجات مطابقة' : 'No matching products found'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i % 6} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
