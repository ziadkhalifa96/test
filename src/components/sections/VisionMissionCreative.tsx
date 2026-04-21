import { useLanguage } from '@/hooks/useLanguage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Target, Leaf } from 'lucide-react';

interface LangObj { ar: string; en: string }

interface VisionMissionCreativeProps {
  config: {
    vision: {
      badge: LangObj;
      title: LangObj;
      content: LangObj;
      image: string;
    };
    mission: {
      badge: LangObj;
      title: LangObj;
      content: LangObj;
      image: string;
    };
  };
}

export default function VisionMissionCreative({ config }: VisionMissionCreativeProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      {/* Central Connecting Vine/Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-green/10 hidden lg:block -translate-x-1/2">
        <motion.div 
          style={{ height: lineY }}
          className="absolute top-0 left-0 w-full bg-brand-gold shadow-[0_0_10px_rgba(196,160,82,0.5)]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#FDFCF9] rounded-full flex items-center justify-center border border-brand-green/5 text-brand-green">
           <Leaf size={24} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 lg:space-y-64">
        
        {/* Vision: The Sky */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 lg:pr-16"
          >
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-brand-gold/10 rounded-full border border-brand-gold/20">
              <Compass className="text-brand-gold" size={20} />
              <span className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">
                {config.vision.badge[lang]}
              </span>
            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {config.vision.title[lang]}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed italic">
              " {config.vision.content[lang]} "
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-brand-gold/20 to-transparent rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={config.vision.image} 
                  alt="Visionary Field" 
                  className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission: The Roots */}
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 lg:pl-16"
          >
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-brand-green/10 rounded-full border border-brand-green/20">
              <Target className="text-brand-green" size={20} />
              <span className="text-xs font-bold text-brand-green uppercase tracking-[0.2em]">
                {config.mission.badge[lang]}
              </span>
            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
              {config.mission.title[lang]}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {config.mission.content[lang]}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-bl from-brand-green/20 to-transparent rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={config.mission.image} 
                  alt="Quality Control" 
                  className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
