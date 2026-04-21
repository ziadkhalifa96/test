import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Upload, 
  Trash2, 
  Search, 
  Image as ImageIcon, 
  Grid, 
  List, 
  Info,
  Copy,
  Eye,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useLanguageStore } from '@/stores/languageStore';

const MediaLibrary = () => {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = React.useState('grid');

  const { data: media, isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/media`);
      return res.data.data;
    }
  });

  const { language } = useLanguageStore();
  const t = (en: string, ar: string) => language === 'ar' ? ar : en;

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/media/upload`, formData);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success(t('Image uploaded successfully', 'تم رفع الصورة بنجاح'));
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('Failed to upload media. Please try again.', 'فشل في رفع الصورة. المرجو المحاولة مجدداً.'));
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  return (
    <div className="space-y-8 animate-reveal pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{t('Media Library', 'مكتبة الوسائط')}</h2>
          <p className="text-slate-500 mt-1">{t('Upload and manage images for your website and products.', 'التحكم في معارض الصور والملفات المرئية الخاصة بموقعك.')}</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="file" 
            id="media-upload" 
            className="hidden" 
            onChange={handleFileUpload} 
            accept="image/*"
          />
          <Button 
            onClick={() => document.getElementById('media-upload')?.click()}
            className="px-6 py-3 bg-brand-gold text-white rounded-xl text-sm font-bold hover:bg-brand-gold-dark transition-all transform hover:-translate-y-1 shadow-md shadow-brand-gold/20 flex items-center justify-center gap-2 h-12"
          >
            <Upload className="w-5 h-5" />
            {t('Upload Media', 'رفع وسائط جديدة')}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-4 rtl:left-auto" />
          <Input 
            placeholder={t('Search media by filename...', 'ابحث عن الصور بواسطة الاسم...')} 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-medium h-12" 
          />
        </div>
        <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('grid')}
            className={cn("w-10 h-10 rounded-lg transition-colors", viewMode === 'grid' && "bg-white shadow-sm text-brand-gold")}
          >
            <Grid className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('list')}
            className={cn("w-10 h-10 rounded-lg transition-colors", viewMode === 'list' && "bg-white shadow-sm text-brand-gold")}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : !media || media.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400">
           <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
           <p className="font-semibold text-lg">{t('No media files found. Upload your first image to get started.', 'معرض الصور فارغ. قم برفع أول صورة للموقع لبدء العمل.')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media?.map((item: any) => (
            <div 
              key={item.id} 
              className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all cursor-pointer"
            >
              <img 
                src={`${import.meta.env.VITE_API_URL}${item.url}`} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/40">
                    <Eye className="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white/20 text-white hover:bg-white/40" onClick={() => {
                   navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}${item.url}`);
                   toast.success('Link copied to clipboard');
                 }}>
                    <Copy className="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-red-500/20 text-red-100 hover:bg-red-500/40">
                    <Trash2 className="w-4 h-4" />
                 </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                 <p className="text-[10px] text-white truncate font-medium">{item.filename}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper for class names
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default MediaLibrary;
