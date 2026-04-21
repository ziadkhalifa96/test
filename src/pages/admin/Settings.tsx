import React, { useState } from 'react';
import { Save, Globe, Lock, Bell, Store } from 'lucide-react';
import { useLanguageStore } from '@/stores/languageStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const Settings = () => {
  const { language } = useLanguageStore();
  const [activeTab, setActiveTab] = useState('general');

  const t = (en: string, ar: string) => language === 'ar' ? ar : en;

  const tabs = [
    { id: 'general', label: t('General Details', 'التفاصيل العامة'), icon: Store },
    { id: 'contact', label: t('Contact Info', 'معلومات التواصل'), icon: Globe },
    { id: 'security', label: t('Security & Admin', 'الأمان والإدارة'), icon: Lock },
    { id: 'notifications', label: t('Notifications', 'الإشعارات'), icon: Bell },
  ];

  return (
    <div className="space-y-8 animate-reveal pb-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{t('Platform Settings', 'إعدادات المنصة')}</h2>
          <p className="text-slate-500 mt-1">{t('Configure global behaviors, branding, and contact details.', 'ضبط الإعدادات العامة، تفاصيل التواصل، والهوية.')}</p>
        </div>
        <Button className="px-8 py-3 bg-brand-gold text-white rounded-xl text-sm font-bold hover:bg-brand-gold-dark transition-all transform hover:-translate-y-1 shadow-md shadow-brand-gold/20 flex items-center justify-center gap-2 h-12">
          <Save className="w-5 h-5" />
          {t('Save Changes', 'حفظ التعديلات')}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === tab.id 
                    ? "bg-white text-brand-gold shadow-sm border border-slate-100" 
                    : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
          
          {activeTab === 'general' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{t('General Details', 'التفاصيل العامة')}</h3>
                <p className="text-sm text-slate-500 mt-1">{t('This information will be displayed publicly on your website.', 'هذه المعلومات ستظهر علناً في موقعك للمستخدمين.')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">{t('Website Name', 'اسم الموقع')}</Label>
                  <Input id="siteName" defaultValue="Alraheeq Herbs" className="rounded-xl h-12 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteTagline">{t('Tagline / Slogan', 'الشعار اللفظي')}</Label>
                  <Input id="siteTagline" defaultValue="Premium Botanical Exports" className="rounded-xl h-12 bg-slate-50 border-slate-200" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="seoDesc">{t('Global SEO Description', 'وصف SEO العالمي')}</Label>
                  <Textarea id="seoDesc" className="rounded-xl min-h-[100px] bg-slate-50 border-slate-200" defaultValue="Leading Egyptian exporter of premium botanicals, herbs, and spices." />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{t('Contact Information', 'معلومات التواصل')}</h3>
                <p className="text-sm text-slate-500 mt-1">{t('Used in the footer and contact forms.', 'تستخدم في تذييل الموقع ونماذج الاتصال.')}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('Official Email', 'البريد الرسمي')}</Label>
                  <Input id="email" type="email" defaultValue="info@alraheeqherbs.com" className="rounded-xl h-12 bg-slate-50 text-left" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('Phone Number', 'رقم الهاتف')}</Label>
                  <Input id="phone" defaultValue="+20 123 456 7890" className="rounded-xl h-12 bg-slate-50 text-left" dir="ltr" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">{t('Headquarters Address', 'عنوان المقر')}</Label>
                  <Input id="address" defaultValue="Cairo, Egypt" className="rounded-xl h-12 bg-slate-50" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{t('Security & System', 'الأمان والنظام')}</h3>
                <p className="text-sm text-slate-500 mt-1">{t('Manage critical system thresholds and access.', 'إدارة حدود النظام الحرجة والوصول.')}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900">{t('Maintenance Mode', 'وضع الصيانة')}</h4>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">{t('Take the site offline for visitors while you make changes.', 'إخفاء الموقع عن الزوار وعرض صفحة "تحت الصيانة" حتى تنتهي من تعديلاتك.')}</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900">{t('Force HTTPS', 'إجبار الحماية HTTPS')}</h4>
                    <p className="text-sm text-slate-500 mt-1 max-w-sm">{t('Ensure all traffic is encrypted.', 'التأكد من أن جميع اتصالات الزوار آمنة ومُشفرة.')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-fade-in">
               <div className="flex flex-col items-center justify-center py-20 text-center">
                 <Bell className="w-16 h-16 text-slate-200 mb-6" />
                 <h3 className="text-xl font-bold text-slate-800">{t('No specific notifications configured yet', 'لا توجد إشعارات مُخصصة حالياً')}</h3>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
