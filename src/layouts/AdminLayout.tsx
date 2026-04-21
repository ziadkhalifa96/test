import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Grid3X3, 
  Layers, 
  Leaf, 
  Image as ImageIcon, 
  Inbox, 
  Sliders, 
  LogOut, 
  ChevronLeft,
  Menu,
  Globe
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useLanguageStore } from '@/stores/languageStore';
import { Button } from '@/components/ui/button';
import { usePageEffects } from '@/hooks/usePageEffects';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const { language, toggleLanguage } = useLanguageStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  usePageEffects(location.pathname);

  // Sync RTL automatically via store side-effect upon load, but here's a safety net
  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  React.useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const t = (en: string, ar: string) => language === 'ar' ? ar : en;

  const navItems = [
    { label: t('Overview', 'اللوحة الرئيسية'), icon: Grid3X3, href: '/admin' },
    { label: t('Site Pages', 'إدارة الصفحات'), icon: Layers, href: '/admin/pages' },
    { label: t('Products', 'المنتجات'), icon: Leaf, href: '/admin/products' },
    { label: t('Assets', 'مكتبة الوسائط'), icon: ImageIcon, href: '/admin/media' },
    { label: t('Inquiries', 'الاستفسارات'), icon: Inbox, href: '/admin/inquiries' },
    { label: t('Configuration', 'الإعدادات المتقدمة'), icon: Sliders, href: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-cairo">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-x border-slate-100 shadow-xl shadow-slate-200/20 transition-all duration-300 flex flex-col z-20",
        collapsed ? "w-20" : "w-72"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-slate-50">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Alraheeq<span className="text-brand-gold">CP</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control Panel</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-brand-gold hover:bg-brand-gold/5 transition-colors" onClick={() => setCollapsed(!collapsed)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                location.pathname === item.href 
                  ? "bg-brand-gold/10 text-brand-gold font-bold shadow-sm" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {location.pathname === item.href && (
                 <div className={cn("absolute top-0 bottom-0 w-1 bg-brand-gold rounded-r-full", language === 'ar' ? 'right-0' : 'left-0')} />
              )}
              <item.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300", location.pathname !== item.href && "group-hover:scale-110")} />
              {!collapsed && <span className="text-sm tracking-wide">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 py-6"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="font-bold">{t('Logout', 'تسجيل الخروج')}</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none -z-10" />
        
        {/* Header */}
        <header className="h-20 bg-white/60 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              {navItems.find(item => location.pathname === item.href)?.label || t('Admin Panel', 'لوحة التحكم')}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              className="gap-2 rounded-full border-slate-200 text-slate-600 hover:text-brand-gold hover:border-brand-gold bg-white/50 backdrop-blur"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'English' : 'عربي'}
            </Button>
            
            <div className="h-8 w-px bg-slate-200" />
            
            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex flex-col">
                 <span className="text-xs text-slate-400 font-medium leading-none mb-1">{t('Welcome,', 'مرحباً،')}</span>
                 <span className="text-sm font-bold text-slate-800 leading-none">{user?.name || 'Admin'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="p-8 flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
