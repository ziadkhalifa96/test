import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLanguageStore } from "@/stores/languageStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Quality from "./pages/Quality";
import Certificates from "./pages/Certificates";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/Login";
import PageList from "@/pages/admin/PageList";
import PageBuilder from "@/pages/admin/PageBuilder";
import DynamicPage from "@/components/cms/DynamicPage";

import MediaLibrary from "@/pages/admin/MediaLibrary";
import Inquiries from "@/pages/admin/Inquiries";
import AdminProducts from "@/pages/admin/Products";
import Settings from "@/pages/admin/Settings";

function AppContent() {
  const { language } = useLanguageStore();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<><Navbar /><Outlet /><Footer /><WhatsAppFloat /></>}>
          <Route path="/" element={<DynamicPage slug="home" />} />
          <Route path="/about" element={<DynamicPage slug="about" />} />
          <Route path="/products" element={<DynamicPage slug="products" />} />
          <Route path="/quality" element={<DynamicPage slug="quality" />} />
          <Route path="/certificates" element={<DynamicPage slug="certificates" />} />
          <Route path="/faq" element={<DynamicPage slug="faq" />} />
          <Route path="/contact" element={<DynamicPage slug="contact" />} />
          <Route path="/p/:slug" element={<DynamicPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<PageList />} />
          <Route path="pages/builder/:id" element={<PageBuilder />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
