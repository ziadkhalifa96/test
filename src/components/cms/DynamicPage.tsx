import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SectionRenderer from './SectionRenderer';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageEffects } from '@/hooks/usePageEffects';

interface DynamicPageProps {
  slug?: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ slug: propSlug }) => {
  const { slug: paramSlug } = useParams();
  const slug = propSlug || paramSlug;
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  usePageEffects();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/pages/${slug || 'home'}`);
        setPageData(response.data.data);
        setError(false);
      } catch (err) {
        console.error('Error fetching dynamic page:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-8 p-8">
        <Skeleton className="h-[60vh] w-full rounded-2xl" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600">The page you are looking for doesn't exist or has been moved.</p>
      </div>
    );
  }

  // Set SEO tags dynamically
  document.title = pageData.seoTitle || pageData.title;
  // Meta description etc could be set here with a dedicated hook

  return (
    <main>
      {pageData.sections?.map((section: any) => (
        <SectionRenderer 
          key={section.id} 
          type={section.type} 
          config={section.config} 
        />
      ))}
    </main>
  );
};

export default DynamicPage;
