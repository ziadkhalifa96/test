import React, { useState } from 'react';
import { Plus, Search, Filter, PackageOpen, MoreVertical, Edit2, Trash2, Tag, Loader2 } from 'lucide-react';
import { useLanguageStore } from '@/stores/languageStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

// Secure headers
const getHeaders = () => {
  const auth = localStorage.getItem('alraheeq-auth');
  if (auth) {
    const { state } = JSON.parse(auth);
    return { Authorization: `Bearer ${state.accessToken}` };
  }
  return {};
};

const Products = () => {
  const { language } = useLanguageStore();
  const t = (en: string, ar: string) => language === 'ar' ? ar : en;
  const qc = useQueryClient();

  const [search, setSearch] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    nameAr: '', nameEn: '', descAr: '', descEn: '', price: '', imageObj: '', categoryId: '', isVisible: true
  });
  
  const resetForm = () => {
    setFormData({ nameAr: '', nameEn: '', descAr: '', descEn: '', price: '', imageObj: '', categoryId: '', isVisible: true });
    setEditingId(null);
  };
  
  const [catFormData, setCatFormData] = useState({ nameAr: '', nameEn: '', descAr: '', descEn: '' });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      return res.data.data || [];
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/categories`);
      return res.data.data || [];
    }
  });

  const createProduct = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        price: data.price ? parseFloat(data.price) : 0,
        images: [{ url: data.imageObj || '/placeholder.png', alt: data.nameEn }],
        specifications: { "Origin": "Egypt", "Grade": "Premium A" }
      };
      const cleanedPayload = { ...payload };
      delete (cleanedPayload as any).imageObj;
      return axios.post(`${import.meta.env.VITE_API_URL}/api/products`, cleanedPayload, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success(t('Product added successfully', 'تم إضافة المنتج بنجاح'));
      setIsSheetOpen(false);
      qc.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(t('Creation failed: Check permissions', 'فشلت الإضافة: تأكد من الصلاحيات'));
    }
  });

  const updateProduct = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        price: data.price ? parseFloat(data.price) : 0,
        images: [{ url: data.imageObj || '/placeholder.png', alt: data.nameEn }]
      };
      const cleanedPayload = { ...payload };
      delete (cleanedPayload as any).imageObj;
      return axios.patch(`${import.meta.env.VITE_API_URL}/api/products/${editingId}`, cleanedPayload, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success(t('Product updated successfully', 'تم تحديث المنتج بنجاح'));
      setIsSheetOpen(false);
      qc.invalidateQueries({ queryKey: ['products'] });
      resetForm();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error(t('Update failed', 'فشل التعديل'));
    }
  });

  const createCategory = useMutation({
    mutationFn: async (data: any) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/api/products/categories`, data, { headers: getHeaders() });
    },
    onSuccess: () => {
      toast.success(t('Category added successfully', 'تم إضافة التصنيف بنجاح'));
      setIsCategorySheetOpen(false);
      qc.invalidateQueries({ queryKey: ['categories'] });
      setCatFormData({ nameAr: '', nameEn: '', descAr: '', descEn: '' });
      if (isSheetOpen) setIsSheetOpen(true); // stay on product sheet
    },
    onError: () => toast.error(t('Creation failed', 'فشلت عملية الإضافة'))
  });

  const deleteProduct = async () => {
    if (!deletingId) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${deletingId}`, { headers: getHeaders() });
      toast.success(t('Product deleted', 'تم الحذف بنجاح'));
      qc.invalidateQueries({ queryKey: ['products'] });
      setDeletingId(null);
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.status === 403 ? t('Permission denied', 'ليس لديك صلاحية للمسح') : t('Deletion failed', 'فشل الحذف');
      toast.error(msg);
      setDeletingId(null);
    }
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setFormData({
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      descAr: product.descAr || '',
      descEn: product.descEn || '',
      price: product.price?.toString() || '',
      imageObj: product.images?.[0]?.url || '',
      categoryId: product.categoryId,
      isVisible: product.isVisible
    });
    setIsSheetOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameAr || !formData.categoryId) {
      toast.error(t('Please fill required fields (Name, Category)', 'يرجى استكمال البيانات المطلوبة (الاسم، التصنيف)'));
      return;
    }
    if (editingId) {
      updateProduct.mutate(formData);
    } else {
      createProduct.mutate(formData);
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormData.nameAr) {
      toast.error(t('Name is required', 'الاسم مطلوب'));
      return;
    }
    createCategory.mutate(catFormData);
  };

  const filteredProducts = products?.filter((p: any) => 
    p.nameAr.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8 animate-reveal pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{t('Product Catalog', 'كتالوج المنتجات')}</h2>
          <p className="text-slate-500 mt-1">{t('Manage your botanical portfolio, categories, and inventory.', 'إدارة ملف المنتجات النباتية، التصنيفات، والمخزون الخاص بك.')}</p>
        </div>
        <div className="flex gap-2">
          {/* Category Trigger */}
          <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="px-6 py-3 rounded-xl text-sm font-bold border-brand-gold/30 text-brand-gold hover:bg-brand-gold/5 flex items-center justify-center gap-2 h-12">
                <Tag className="w-5 h-5" />
                {t('New Category', 'تصنيف جديد')}
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="text-left rtl:text-right mb-8">
                <SheetTitle className="text-2xl font-bold">{t('Add Category', 'إضافة تصنيف جديد')}</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleCategorySubmit} className="space-y-5">
                <div>
                  <Label>{t('Arabic Name', 'الاسم (عربي)*')}</Label>
                  <Input required placeholder="مثال: البذور والخضروات" value={catFormData.nameAr} onChange={e => setCatFormData({...catFormData, nameAr: e.target.value})} className="mt-1" />
                </div>
                <div>
                  <Label>{t('English Name', 'الاسم (إنجليزي)*')}</Label>
                  <Input required placeholder="eg. Seeds & Veggies" value={catFormData.nameEn} onChange={e => setCatFormData({...catFormData, nameEn: e.target.value})} className="mt-1" />
                </div>
                <Button type="submit" disabled={createCategory.isPending} className="w-full h-12 mt-4 bg-brand-gold hover:bg-brand-gold-dark text-white font-bold rounded-xl">
                  {createCategory.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : t('Save Category', 'حفظ التصنيف')}
                </Button>
              </form>
            </SheetContent>
          </Sheet>

          {/* Product Trigger */}
          <Sheet open={isSheetOpen} onOpenChange={(val) => {
            setIsSheetOpen(val);
            if (!val) resetForm();
          }}>
            <SheetTrigger asChild>
              <Button onClick={() => resetForm()} className="px-6 py-3 bg-brand-gold text-white rounded-xl text-sm font-bold hover:bg-brand-gold-dark transition-all transform hover:-translate-y-1 shadow-md shadow-brand-gold/20 flex items-center justify-center gap-2 h-12">
                <Plus className="w-5 h-5" />
                {t('Add New Product', 'إضافة منتج جديد')}
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-full sm:max-w-xl overflow-y-auto">
              <SheetHeader className="text-left rtl:text-right mb-8">
                <SheetTitle className="text-2xl font-bold">
                  {editingId ? t('Edit Product', 'تحديث بيانات المنتج') : t('Create Product', 'تسجيل منتج نباتي جديد')}
                </SheetTitle>
                <SheetDescription className="rtl:text-right">{t('Fill all required fields to publish a product onto your catalog.', 'أكمل البيانات الأساسية لإدراج المنتج وعرضه للعملاء.')}</SheetDescription>
              </SheetHeader>
              
              <form onSubmit={handleProductSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600 font-bold mb-2 block">{t('Arabic Name', 'اسم العشبة (عربي) *')}</Label>
                    <Input required value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} className="bg-slate-50 h-11 border-slate-200" placeholder="مثال: يانسون بلدي" />
                  </div>
                  <div>
                    <Label className="text-slate-600 font-bold mb-2 block">{t('English Name', 'اسم العشبة (إنجليزي) *')}</Label>
                    <Input required value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="bg-slate-50 h-11 border-slate-200" placeholder="e.g. Anise Seeds" />
                  </div>
                </div>

                <div>
                   <Label className="text-slate-600 font-bold mb-2 block">{t('Category', 'التصنيف *')}</Label>
                   <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full h-11 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold">
                      <option value="" disabled>{t('Select a category...', 'اختر تصنيفاً من القائمة...')}</option>
                      {categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>{language === 'ar' ? cat.nameAr : cat.nameEn}</option>
                      ))}
                   </select>
                   {categories?.length === 0 && (
                     <p className="text-xs text-red-500 mt-2 font-bold">{t('You must create a category first!', 'عفواً! يجب إضافة تصنيف جديد أولاً.')}</p>
                   )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600 font-bold mb-2 block">{t('Arabic Description', 'الوصف (عربي)')}</Label>
                    <Textarea value={formData.descAr} onChange={e => setFormData({...formData, descAr: e.target.value})} className="bg-slate-50 border-slate-200 resize-none h-24" />
                  </div>
                  <div>
                    <Label className="text-slate-600 font-bold mb-2 block">{t('English Description', 'الوصف (إنجليزي)')}</Label>
                    <Textarea value={formData.descEn} onChange={e => setFormData({...formData, descEn: e.target.value})} className="bg-slate-50 border-slate-200 resize-none h-24" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600 font-bold mb-2 block">{t('Price / Ton (Optional)', 'السعر للطن (اختياري)')}</Label>
                    <Input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="bg-slate-50 h-11 border-slate-200 ltr" placeholder="0.00" />
                  </div>
                  <div>
                    <Label className="text-slate-600 font-bold mb-2 block">{t('Image URL', 'رابط الصورة')}</Label>
                    <Input value={formData.imageObj} onChange={e => setFormData({...formData, imageObj: e.target.value})} className="bg-slate-50 h-11 border-slate-200 ltr" placeholder="/uploads/image.webp" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="space-y-0.5">
                    <Label className="text-base font-bold text-slate-800">{t('Visibility', 'حالة الظهور')}</Label>
                    <p className="text-sm text-slate-500">{t('Display this product on the public catalog?', 'هل ترغب بعرض هذا المنتج في متجر العملاء؟')}</p>
                  </div>
                  <Switch checked={formData.isVisible} onCheckedChange={(c) => setFormData({...formData, isVisible: c})} />
                </div>

                <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending || categories?.length === 0} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-4 shadow-lg shadow-emerald-600/20">
                  {(createProduct.isPending || updateProduct.isPending) ? <Loader2 className="w-5 h-5 animate-spin" /> : editingId ? t('Update Product', 'حفظ التعديلات') : t('Save Product', 'حفظ المنتج وتأكيد')}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AlertDialog open={!!deletingId} onOpenChange={(val) => !val && setDeletingId(null)}>
        <AlertDialogContent className="rounded-[2rem] border-slate-100">
          <AlertDialogHeader className="rtl:text-right">
            <AlertDialogTitle className="text-2xl font-bold text-slate-800">{t('Are you absolutely sure?', 'هل أنت متأكد تماماً؟')}</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 mt-2">
              {t('This action cannot be undone. This will permanently remove the product from your catalog.', 'هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج نهائياً من الكتالوج الخاص بك ومن قاعدة البيانات.')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3">
            <AlertDialogCancel className="rounded-xl border-slate-100 bg-slate-50 font-bold hover:bg-slate-100 h-12 px-6">{t('Cancel', 'إلغاء')}</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} className="rounded-xl bg-red-500 hover:bg-red-600 font-bold text-white shadow-lg shadow-red-500/20 h-12 px-6">
              {t('Delete Product', 'نعم، قم بالحذف')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-4 rtl:left-auto" />
          <Input 
            type="text" 
            placeholder={t('Search products by name or category...', 'ابحث عن المنتجات بالاسم أو التصنيف...')}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-medium h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoadingProducts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...Array(3)].map((_, i) => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl" />)}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center py-32 shadow-sm text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <PackageOpen className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{t('No products found', 'لا توجد منتجات مسجلة')}</h3>
          <p className="text-slate-500 max-w-sm mb-8">
             {t("Your catalog is currently empty. Start adding your premium herbs to display them on the storefront.", "الكتالوج الخاص بك فارغ حالياً. ابدأ بإضافة الأعشاب المميزة وعرضها على واجهة الموقع.")}
          </p>
          <Button onClick={() => setIsSheetOpen(true)} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2 h-12">
            <Plus className="w-5 h-5" />
            {t('Add Your First Product', 'إضافة أول منتج لك')}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
             <div key={product.id} className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300 group flex flex-col">
                <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden mb-4 relative">
                  {(product.images && Array.isArray(product.images) && product.images.length > 0) ? (
                    <img src={product.images[0].url.startsWith('http') ? product.images[0].url : `${import.meta.env.VITE_API_URL}${product.images[0].url}`} alt={product.nameAr} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><PackageOpen className="w-12 h-12 opacity-20" /></div>}
                  
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm"><Edit2 className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" onClick={() => setDeletingId(product.id)} className="w-10 h-10 rounded-full bg-red-500/20 text-red-100 hover:bg-red-500/40 backdrop-blur-sm"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="flex-1 px-2">
                  <div className="flex items-start justify-between">
                     <div>
                       <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{language === 'ar' ? product.nameAr : product.nameEn}</h3>
                       <p className="text-sm font-semibold text-brand-gold mt-1">{product.category?.[language === 'ar' ? 'nameAr' : 'nameEn']}</p>
                     </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                     {language === 'ar' ? product.descAr : product.descEn}
                  </p>
                </div>
                <div className="mt-4 px-2 flex items-center justify-between border-t border-slate-50 pt-4">
                   <div className="flex items-center gap-1.5">
                     <div className={`w-2 h-2 rounded-full ${product.isVisible ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                     <span className="text-[11px] font-bold text-slate-500">{product.isVisible ? t('Published', 'معروض') : t('Hidden', 'مخفي')}</span>
                   </div>
                   {product.price > 0 && <span className="text-sm font-black text-slate-800">${product.price}/t</span>}
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
