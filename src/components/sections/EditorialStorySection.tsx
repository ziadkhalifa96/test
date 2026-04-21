import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

interface LangObj { ar: string; en: string }

interface EditorialStorySectionProps {
  config: {
    items: {
      type: 'text' | 'image' | 'split';
      title?: LangObj;
      content?: LangObj;
      image?: string;
      caption?: LangObj;
      reverse?: boolean;
    }[];
  };
}

export default function EditorialStorySection({ config }: EditorialStorySectionProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  if (!config?.items) return null;

  return (
    <section className="py-24 bg-[#FDFCF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {config.items.map((item, index) => {
            if (item.type === 'split') {
              return (
                <div 
                  key={index}
                  className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${item.reverse ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image with Organic Frame */}
                  <motion.div 
                    initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 relative"
                  >
                    <div className="relative group">
                      {/* Decorative Background for Image */}
                      <div className="absolute -inset-4 bg-brand-beige/20 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-700" />
                      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img 
                          src={item.image} 
                          alt="Company Story" 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      {/* Floating Caption/Badge */}
                      {item.caption && (
                        <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-white p-6 rounded-2xl shadow-xl border border-brand-green/5 max-w-[200px]`}>
                          <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">Estate Roots</p>
                          <p className="text-gray-900 font-medium text-sm leading-relaxed italic">{item.caption[lang]}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 space-y-8"
                  >
                    {item.title && (
                      <div>
                        <span className="text-brand-gold font-bold text-sm uppercase tracking-[0.3em] mb-4 block">Our Heritage</span>
                        <h2 className={`text-4xl lg:text-6xl font-bold text-gray-900 leading-tight ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                          {item.title[lang]}
                        </h2>
                      </div>
                    )}
                    
                    <div className="relative">
                      {/* Drop Cap Mockup for Editorial Feel */}
                      <div className="prose prose-xl prose-stone max-w-none">
                        <p className="text-xl text-gray-700 leading-[1.8] text-justify">
                          {item.content?.[lang]}
                        </p>
                      </div>
                      
                      {/* Subtle Botanical Decoration */}
                      <div className={`absolute top-0 ${isRTL ? '-right-12' : '-left-12'} text-brand-green/10 pointer-events-none`}>
                         <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
                           <path d="M50 0 C60 20 80 30 100 35 C80 40 60 50 50 100 C40 50 20 40 0 35 C20 30 40 20 50 0" />
                         </svg>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-4">
                       <div className="h-[1px] flex-grow bg-brand-green/10" />
                       <span className="text-brand-green/30 italic font-serif text-lg">Since 1993</span>
                    </div>
                  </motion.div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}
