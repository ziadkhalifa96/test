import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Eye, 
  Trash2, 
  ExternalLink,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useLanguageStore } from '@/stores/languageStore';

const PageList = () => {
  const { language } = useLanguageStore();
  const t = (en: string, ar: string) => language === 'ar' ? ar : en;

  const { data: pages, isLoading, refetch } = useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pages`);
      return res.data.data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to move this page to trash?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/pages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('alraheeq-auth') ? JSON.parse(localStorage.getItem('alraheeq-auth')!).state.accessToken : ''}` }
      });
      toast.success('Page moved to trash');
      refetch();
    } catch (err) {
      toast.error('Failed to delete page');
    }
  };

  return (
    <div className="space-y-8 animate-reveal pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{t('Site Pages', 'إدارة صفحات الموقع')}</h2>
          <p className="text-slate-500 mt-1">{t('Manage your website structure and dynamic content.', 'يمكنك هنا إضافة وتعديل الصفحات ومحتواها المرئي بكل بساطة.')}</p>
        </div>
        <Link to="/admin/pages/new">
          <Button className="px-6 py-3 bg-brand-gold text-white rounded-xl text-sm font-bold hover:bg-brand-gold-dark transition-all transform hover:-translate-y-1 shadow-md shadow-brand-gold/20 flex items-center justify-center gap-2 h-12">
            <Plus className="w-5 h-5" />
            {t('Create New Page', 'إنشاء صفحة جديدة')}
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-4 rtl:left-auto" />
          <Input 
            placeholder={t('Search pages by title or slug...', 'ابحث عن الصفحات بالاسم أو المسار...')} 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-medium h-12" 
          />
        </div>
        <Button variant="outline" className="px-5 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 border border-slate-100 h-12">
          <Filter className="w-4 h-4" />
          {t('Filter', 'تصفية')}
        </Button>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left rtl:text-right border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-sm font-bold text-slate-500">{t('Title', 'العنوان')}</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500">{t('Slug', 'الرابط')}</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500">{t('Status', 'الحالة')}</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500">{t('Version', 'النسخة')}</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500">{t('Last Updated', 'آخر تحديث')}</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 text-right rtl:text-left">{t('Actions', 'الإجراءات')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={6} className="px-8 py-8"><div className="h-4 bg-slate-100 rounded-full w-full"></div></td>
                </tr>
              ))
            ) : pages?.map((page: any) => (
              <tr key={page.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 leading-tight text-lg">{page.title}</span>
                    <span className="text-xs font-semibold text-slate-400 mt-1">{page.description || t('No description', 'لا يوجد وصف')}</span>
                  </div>
                </td>
                <td className="px-8 py-5 font-mono text-sm text-brand-gold bg-brand-gold/10 rounded-xl inline-block my-5 mx-8 border border-brand-gold/20">
                  /{page.slug}
                </td>
                <td className="px-8 py-5">
                  <span className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap",
                    page.status === 'PUBLISHED' ? "bg-emerald-100 text-emerald-700" :
                    page.status === 'DRAFT' ? "bg-slate-100 text-slate-600" :
                    "bg-blue-100 text-blue-700"
                  )}>
                    {page.status === 'PUBLISHED' ? t('PUBLISHED', 'منشور') : page.status === 'DRAFT' ? t('DRAFT', 'مسودة') : t('SCHEDULED', 'مجدول')}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">v{page.version}</span>
                </td>
                <td className="px-8 py-5">
                  <div className="text-sm font-semibold text-slate-500">{format(new Date(page.updatedAt), 'MMM dd, yyyy')}</div>
                </td>
                <td className="px-8 py-5 text-right rtl:text-left">
                  <div className="flex items-center justify-end rtl:justify-start gap-2 opacity-100 lg:opacity-50 lg:group-hover:opacity-100 transition-opacity">
                    <Link to={`/admin/pages/builder/${page.id}`}>
                      <Button variant="ghost" size="icon" className="text-brand-gold hover:text-white hover:bg-brand-gold rounded-xl transition-all">
                        <Edit2 className="w-5 h-5" />
                      </Button>
                    </Link>
                    <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-100 rounded-xl">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2">
                        <DropdownMenuItem className="gap-3 cursor-pointer py-3 rounded-xl font-medium">
                          <Eye className="w-4 h-4 text-slate-400" />
                          {t('Duplicate', 'تكرار الصفحة')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-3 text-red-500 cursor-pointer focus:text-red-500 py-3 rounded-xl font-medium hover:bg-red-50"
                          onClick={() => handleDelete(page.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          {t('Delete', 'حذف نهائي')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper for status colors
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default PageList;
