import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { isRTL } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-beige px-4">
      <div className="text-center max-w-md">
        {/* 404 number with gradient */}
        <div className="text-8xl font-bold text-gradient mb-4 font-heading-en">404</div>

        <h1 className={`text-2xl font-bold text-gray-900 mb-3 ${isRTL ? 'font-heading-ar' : 'font-heading-en'}`}>
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-gray-500 mb-8">
          {isRTL
            ? 'عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gradient text-white font-semibold shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            {isRTL ? 'الصفحة الرئيسية' : 'Go Home'}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-green/30 text-brand-green font-semibold hover:bg-brand-green/5 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {isRTL ? 'تواصل معنا' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
