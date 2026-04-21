import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';

interface LangObj { ar: string; en: string }

interface ContactInfoSectionProps {
  config: {
    badge?: LangObj;
    title?: LangObj;
    subtitle?: LangObj;
    items: {
      type: 'email' | 'phone' | 'address';
      label: LangObj;
      value: LangObj;
      iconBg: string;
    }[];
    formTitle?: LangObj;
    formSubtitle?: LangObj;
  };
}

const iconMap = {
  email: Mail,
  phone: Phone,
  address: MapPin,
};

export default function ContactInfoSection({ config }: ContactInfoSectionProps) {
  const { isRTL } = useLanguage();
  const lang = isRTL ? 'ar' : 'en';

  if (!config?.items || !Array.isArray(config.items)) {
    return null;
  }

  // Find address string from config
  const addressItem = config.items.find(i => i.type === 'address');
  const addressValue = addressItem?.value?.[lang] || (isRTL ? 'بني سويف - مركز سمسطا - منشأة أبو مليح' : 'Manchat Abu Malih, Samasta, Beni Suef, Egypt');

  return (
    <section className="py-24 bg-[#FDFCF9] relative overflow-hidden">
      {/* Botanical accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 blur-3xl rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24">
          
          {/* Left Side: Contact Information */}
          <div className="w-full lg:w-5/12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                  {config.title?.[lang] || (isRTL ? 'تواصل معنا' : 'Contact Us')}
                </h2>
                <p className="text-xl text-brand-green font-medium mb-8">
                  {config.subtitle?.[lang] || (isRTL ? 'لنبدأ شراكة ناجحة' : 'Let’s Build Business Together')}
                </p>
                <div className="w-20 h-1.5 bg-brand-gold rounded-full" />
              </div>

              <div className="space-y-6 pt-4">
                {config.items.map((item, i) => {
                  const Icon = iconMap[item.type] || Mail;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-6 group p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-brand-green/5 transition-all duration-500 border border-transparent hover:border-brand-green/5"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${item.iconBg || 'bg-brand-green'} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-gold uppercase tracking-[0.2em] mb-1">
                          {item.label?.[lang]}
                        </p>
                        <p className={`text-gray-900 font-bold ${isRTL ? 'text-xl' : 'text-lg'} break-words`}>
                          {item.value?.[lang]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Company Note */}
              <div className="p-8 rounded-[2rem] bg-brand-green text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <MessageSquare size={80} />
                </div>
                <p className="relative z-10 text-lg leading-relaxed opacity-90 italic">
                  {isRTL 
                    ? "نحن مستعدون لدعم احتياجاتكم من الأعشاب والتوابل والبذور والخضروات المجففة المصرية عالية الجودة."
                    : "We are ready to support your sourcing needs with premium Egyptian herbs, spices, seeds, and dehydrated vegetables."}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Professional Contact Form */}
          <div className="w-full lg:w-7/12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl shadow-brand-green/5 border border-brand-green/5"
            >
              <div className="mb-10 text-center lg:text-left">
                <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
                  {isRTL ? 'أرسل لنا رسالة' : 'Send us a Message'}
                </h3>
                <p className="text-gray-400">
                  {isRTL ? 'سنقوم بالرد عليك خلال 24 ساعة عمل.' : 'We will get back to you within 24 business hours.'}
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{isRTL ? 'الاسم بالكامل' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl bg-brand-beige/30 border border-brand-green/5 focus:border-brand-gold focus:ring-0 transition-all placeholder:text-gray-300" 
                      placeholder={isRTL ? 'مثال: محمد علي' : 'e.g. John Doe'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input 
                      type="email" 
                      className="w-full px-6 py-4 rounded-2xl bg-brand-beige/30 border border-brand-green/5 focus:border-brand-gold focus:ring-0 transition-all placeholder:text-gray-300" 
                      placeholder="info@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{isRTL ? 'الموضوع' : 'Subject'}</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 rounded-2xl bg-brand-beige/30 border border-brand-green/5 focus:border-brand-gold focus:ring-0 transition-all placeholder:text-gray-300" 
                    placeholder={isRTL ? 'اهتمام بالتوريد، طلب عرض سعر...' : 'Inquiry, Sourcing, Quote...'}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{isRTL ? 'رسالتك' : 'Your Message'}</label>
                  <textarea 
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl bg-brand-beige/30 border border-brand-green/5 focus:border-brand-gold focus:ring-0 transition-all placeholder:text-gray-300 resize-none" 
                    placeholder={isRTL ? 'اكتب تفاصل استفسارك هنا...' : 'Write your inquiry details here...'}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-brand-gold text-white font-bold text-lg hover:bg-brand-gold/90 transform hover:-translate-y-1 transition-all shadow-xl shadow-brand-gold/20 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Interactive Map - Pointed specifically to Manchat Abu Malih */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-green/10 border-8 border-white relative group"
        >
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.611403287019!2d30.835!3d28.922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a4f78696b001d%3A0x464227303f8fdee!2sManchat%20Abu%20Malih%2C%20Samasta%2C%20Beni%20Suef%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1713697000000!5m2!1sen!2seg`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[0.3] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
          />
          
          <div className="absolute top-6 left-6 right-6 lg:left-10 lg:right-auto lg:w-96">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-brand-green/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest">
                  {isRTL ? 'بني سويف - منشأة أبو مليح' : 'Beni Suef - Manchat Abu Malih'}
                </span>
              </div>
              <p className="text-gray-900 font-bold text-lg">
                {addressValue}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
