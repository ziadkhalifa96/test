import React, { lazy, Suspense } from 'react';

// Dynamic imports for CMS sections
const Hero = lazy(() => import('@/components/sections/Hero'));
const Intro = lazy(() => import('@/components/sections/Intro'));
const Process = lazy(() => import('@/components/sections/Process'));
const WhyUs = lazy(() => import('@/components/sections/WhyUs'));
const Categories = lazy(() => import('@/components/sections/Categories'));
const FeaturedProducts = lazy(() => import('@/components/sections/FeaturedProducts'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const CTA = lazy(() => import('@/components/sections/CTA'));
const PageHero = lazy(() => import('@/components/sections/PageHero'));
const FAQAccordion = lazy(() => import('@/components/sections/FAQAccordion'));
const VisionMissionSection = lazy(() => import('@/components/sections/VisionMissionSection'));
const QualityPillarSection = lazy(() => import('@/components/sections/QualityPillarSection'));
const SimpleTextSection = lazy(() => import('@/components/sections/SimpleTextSection'));
const ContactInfoSection = lazy(() => import('@/components/sections/ContactInfoSection'));
const ProductCatalog = lazy(() => import('@/components/sections/ProductCatalog'));
const CertificatesGrid = lazy(() => import('@/components/sections/CertificatesGrid'));
const EditorialStorySection = lazy(() => import('@/components/sections/EditorialStorySection'));
const VisionMissionCreative = lazy(() => import('@/components/sections/VisionMissionCreative'));


const sectionMap: Record<string, any> = {
  hero: Hero,
  intro: Intro,
  process: Process,
  whyus: WhyUs,
  categories: Categories,
  featured_products: FeaturedProducts,
  testimonials: Testimonials,
  cta: CTA,
  page_hero: PageHero,
  faq_accordion: FAQAccordion,
  vision_mission: VisionMissionSection,
  quality_pillars: QualityPillarSection,
  simple_text: SimpleTextSection,
  contact_info: ContactInfoSection,
  product_catalog: ProductCatalog,
  certificates_grid: CertificatesGrid,
  editorial_story: EditorialStorySection,
  vision_mission_creative: VisionMissionCreative,
};

interface SectionProps {
  type: string;
  config: any;
}

const SectionRenderer: React.FC<SectionProps> = ({ type, config }) => {
  const Component = sectionMap[type];

  if (!Component) {
    console.warn(`Section type "${type}" not found`);
    return (
      <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
        Unknown section type: {type}
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-2xl m-8 flex items-center justify-center text-gray-300 font-medium">Loading Section...</div>}>
      <Component config={config} />
    </Suspense>
  );
};

export default SectionRenderer;
