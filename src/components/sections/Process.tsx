import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sprout, SearchCheck, Ship, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import SectionBadge from '@/components/features/SectionBadge';

const iconMap: Record<string, any> = {
  Sprout: Sprout,
  SearchCheck: SearchCheck,
  Ship: Ship,
};

interface ProcessProps {
  config?: any;
}

export default function Process({ config }: ProcessProps) {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const steps = config?.steps || [
    {
      number: '01',
      title: t.home.process.step1Title,
      text: t.home.process.step1Text,
      icon: 'Sprout',
      color: 'from-emerald-500 to-brand-green',
    },
    {
      number: '02',
      title: t.home.process.step2Title,
      text: t.home.process.step2Text,
      icon: 'SearchCheck',
      color: 'from-brand-green to-brand-olive',
    },
    {
      number: '03',
      title: t.home.process.step3Title,
      text: t.home.process.step3Text,
      icon: 'Ship',
      color: 'from-brand-olive to-brand-gold',
    },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* Editorial aesthetic background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0C2F25 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-28">
          <SectionBadge className="mb-4">{config?.badge?.[isRTL ? 'ar' : 'en'] || t.home.process.badge}</SectionBadge>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl lg:text-6xl font-bold text-gray-900 mt-6 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}
          >
            {config?.title?.[isRTL ? 'ar' : 'en'] || t.home.process.title}{' '}
            <span className="text-brand-gold">{config?.titleAccent?.[isRTL ? 'ar' : 'en'] || t.home.process.titleAccent}</span>
          </motion.h2>
        </div>

        {/* Storytelling Timeline */}
        <div className="relative">
          {/* Central Vertical Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 right-0 bg-brand-gold origin-top"
              style={{ scaleY }}
            />
          </div>

          <div className="space-y-32 relative">
            {steps.map((step: any, i: number) => {
              const Icon = iconMap[step.icon] || Sprout;
              const isEven = i % 2 === 1;

              return (
                <div key={i} className="relative">
                  {/* Timeline Dot */}
                  <motion.div 
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-brand-gold z-10 shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ margin: "-150px" }}
                  />

                  <div className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Block */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full md:w-[42%] group"
                    >
                      <div className="relative p-10 bg-white rounded-[3rem] border border-brand-green/5 shadow-2xl shadow-brand-green/5 hover:border-brand-gold/20 transition-all duration-500">
                        {/* Step Label */}
                        <div className={`absolute -top-6 ${isRTL ? 'right-10' : 'left-10'} bg-brand-gold text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest shadow-xl flex items-center gap-2`}>
                          {isRTL ? 'المرحلة' : 'PHASE'} {step.number}
                        </div>

                        <div className="flex flex-col gap-8">
                          <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <Icon size={40} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h3 className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                              {step.title?.[isRTL ? 'ar' : 'en'] || step.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-lg">
                              {step.text?.[isRTL ? 'ar' : 'en'] || step.text}
                            </p>
                          </div>
                        </div>

                        {/* Professional checkmark reveal */}
                        <div className="absolute bottom-8 right-8 opacity-10 group-hover:opacity-100 transition-opacity">
                          <CheckCircle2 className="w-6 h-6 text-brand-green" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Placeholder for desktop layout balance */}
                    <div className="hidden md:block w-[42%]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
