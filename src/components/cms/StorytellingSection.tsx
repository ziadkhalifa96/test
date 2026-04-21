import React, { useRef, useEffect } from 'react';
import gsap from '@/lib/gsap';

interface StorytellingSectionProps {
  children: React.ReactNode;
  animation?: 'reveal' | 'parallax' | 'fade-up';
}

const StorytellingSection: React.FC<StorytellingSectionProps> = ({ children, animation = 'reveal' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (animation === 'reveal') {
      gsap.fromTo(el, 
        { opacity: 0, y: 100, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            // markers: true, // For debugging
          }
        }
      );
    }
  }, [animation]);

  return (
    <div ref={sectionRef} className="will-change-transform">
      {children}
    </div>
  );
};

export default StorytellingSection;
