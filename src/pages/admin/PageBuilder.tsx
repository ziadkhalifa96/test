import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  CheckCircle2, 
  Eye, 
  Plus, 
  Trash2, 
  GripVertical, 
  Settings2, 
  ChevronLeft,
  Monitor,
  Smartphone,
  Tablet,
  History,
  Zap,
  Copy,
  PlusCircle,
  Shapes,
  Settings,
  Calendar,
  Globe,
  Search,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SectionRenderer from '@/components/cms/SectionRenderer';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const PageBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState('desktop');
  const [activeSection, setActiveSection] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [showVersions, setShowVersions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pageData, setPageData] = useState<any>({});

  const { data: page, isLoading } = useQuery({
    queryKey: ['page-builder', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pages/${id}`);
      return res.data.data;
    },
  });

  const { data: versions, refetch: refetchVersions } = useQuery({
    queryKey: ['page-versions', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pages/${id}/versions`);
      return res.data.data;
    },
    enabled: showVersions
  });

  useEffect(() => {
    if (page) {
      setSections(page.sections || []);
      setPageData({
        title: page.title,
        slug: page.slug,
        description: page.description,
        status: page.status,
        publishAt: page.publishAt,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription
      });
    }
  }, [page]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        ...pageData,
        sections: sections.map((s, index) => ({
          id: s.id.startsWith('temp-') ? undefined : s.id,
          type: s.type,
          config: s.config,
          order: index + 1,
          isVisible: true
        }))
      };
      
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/pages/${id}`, data);
      toast.success('Page saved successfully!');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-builder', id] });
    }
  });

  const updateSectionConfig = (sectionId: string, path: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id !== sectionId) return s;
      
      const newConfig = { ...s.config };
      const keys = path.split('.');
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return { ...s, config: newConfig };
    }));
  };

  const addSection = (type = 'simple_text') => {
    const newSection = {
      id: `temp-${Date.now()}`,
      type,
      config: { 
        title: { ar: 'عنوان جديد', en: 'New Title' }, 
        subtitle: { ar: 'وصف جديد', en: 'New Subtitle' },
        content: { ar: 'محتوى جديد', en: 'New content here...' }
      },
      order: sections.length + 1
    };
    setSections([...sections, newSection]);
    setActiveSection(newSection);
  };

  const deleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
    if (activeSection?.id === sectionId) setActiveSection(null);
  };

  const rollbackMutation = useMutation({
    mutationFn: async (versionId: string) => {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/pages/${id}/rollback/${versionId}`);
      toast.success('Version restored!');
      setShowVersions(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-builder', id] });
    }
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]">Loading Page Builder...</div>;
  if (!page) return <div className="flex items-center justify-center min-h-[60vh] text-slate-500">Error: Page not found.</div>;

  return (
    <div className="fixed inset-0 bg-slate-100 flex flex-col z-50 overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pages')} className="text-slate-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <h1 className="text-sm font-bold leading-none">{page?.title || 'Unknown Page'}</h1>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 block">/{page?.slug || 'unknown'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('desktop')}
            className={cn("w-9 h-9 rounded-lg", viewMode === 'desktop' && "bg-slate-700 text-white")}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('tablet')}
            className={cn("w-9 h-9 rounded-lg", viewMode === 'tablet' && "bg-slate-700 text-white")}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('mobile')}
            className={cn("w-9 h-9 rounded-lg", viewMode === 'mobile' && "bg-slate-700 text-white")}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setShowSettings(true)}
            className="text-slate-400 gap-2 hover:text-white"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setShowVersions(!showVersions)}
            className={cn("text-slate-400 gap-2 hover:text-white", showVersions && "bg-slate-800 text-white")}
          >
            <History className="w-4 h-4" />
            History
          </Button>
          <Button variant="outline" className="bg-transparent border-slate-700 text-slate-300 gap-2 hover:bg-slate-800">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button onClick={() => saveMutation.mutate()} className="bg-brand-gold hover:bg-brand-gold-dark text-white gap-2 shadow-gold border-0">
            <CheckCircle2 className="w-4 h-4" />
            Save Changes
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-600 text-white gap-2 border-0">
            <Zap className="w-4 h-4" />
            Deploy Site
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Sections List */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Shapes className="w-4 h-4 text-brand-gold" />
              Page Structure
            </h3>
            <Button size="icon" variant="ghost" onClick={() => addSection('simple_text')} className="text-brand-gold hover:bg-brand-gold/10 rounded-full h-8 w-8">
              <PlusCircle className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {sections?.map((section, idx) => (
              <div 
                key={section.id}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all group",
                  activeSection?.id === section.id 
                    ? "border-brand-gold bg-brand-gold/5 ring-1 ring-brand-gold" 
                    : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{section.type}</span>
                  <h4 className="text-sm font-medium text-slate-800 truncate">{section.config?.title?.en || 'Untitled Section'}</h4>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-7 h-7 text-slate-400 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection(section.id);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <Button variant="outline" className="w-full gap-2 border-slate-300 text-slate-600 rounded-xl hover:bg-white transition-all">
              <Copy className="w-4 h-4" />
              Use Template
            </Button>
          </div>
        </aside>

        {/* Center: Live Preview */}
        <div className="flex-1 bg-slate-200 p-8 overflow-auto flex justify-center">
          <div className={cn(
            "bg-white shadow-2xl transition-all duration-500 overflow-auto",
            viewMode === 'desktop' ? "w-full" : 
            viewMode === 'tablet' ? "w-[768px]" : "w-[375px]"
          )}>
            {sections.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Plus className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Your page is empty</h3>
                <p className="text-slate-500 mt-2 max-w-sm">Start building your page by adding a section from the left panel.</p>
                <Button onClick={() => addSection('simple_text')} className="mt-8 bg-brand-gold text-white rounded-xl h-11 px-8 shadow-gold">
                  Add Your First Section
                </Button>
              </div>
            ) : (
              <div className="pointer-events-none">
                {sections.map(section => (
                  <SectionRenderer key={section.id} type={section.type} config={section.config} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Settings */}
        <aside className="w-96 bg-white border-l border-slate-200 flex flex-col shrink-0">
          {activeSection ? (
            <div className="flex flex-col h-full overflow-hidden animate-reveal">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest leading-none">Editor</span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{activeSection.type} settings</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setActiveSection(null)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-6 space-y-8">
                {/* Visual Settings placeholder */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Content (English)</h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 ml-1">Section Title</label>
                      <input 
                        type="text" 
                        value={activeSection.config?.title?.en || ''} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                        onChange={(e) => updateSectionConfig(activeSection.id, 'title.en', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 ml-1">Subtitle</label>
                      <textarea 
                        rows={3}
                        value={activeSection.config?.subtitle?.en || ''} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all resize-none"
                        onChange={(e) => updateSectionConfig(activeSection.id, 'subtitle.en', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Content (Arabic)</h4>
                  <div className="space-y-4" dir="rtl">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 mr-1">عنوان القسم</label>
                      <input 
                        type="text" 
                        value={activeSection.config?.title?.ar || ''} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                        onChange={(e) => updateSectionConfig(activeSection.id, 'title.ar', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 mr-1">العنوان الفرعي</label>
                      <textarea 
                        rows={3}
                        value={activeSection.config?.subtitle?.ar || ''} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-gold outline-none transition-all resize-none"
                        onChange={(e) => updateSectionConfig(activeSection.id, 'subtitle.ar', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Advanced Config</h4>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Background</span>
                        <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-white shadow-sm" />
                     </div>
                     <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Spacing</span>
                        <span className="text-xs font-bold text-slate-900">Default (64px)</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
               <Settings2 className="w-12 h-12 mb-4 opacity-20" />
               <p className="text-sm">Select a section to edit its content and configuration.</p>
            </div>
          )}
        </aside>

        {/* Versions Panel Overlay */}
        {showVersions && (
          <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 animate-reveal-right">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Version History</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowVersions(false)}><ChevronLeft className="w-4 h-4 rotate-180" /></Button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {versions?.length === 0 ? (
                <div className="text-center p-8 text-slate-400 text-xs">No previous versions found.</div>
              ) : (
                versions?.map((ver: any) => (
                  <div key={ver.id} className="p-4 rounded-2xl border border-slate-100 hover:border-brand-gold transition-all bg-slate-50/30 group">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-600">v{ver.version}</span>
                       <span className="text-[10px] text-slate-400">{new Date(ver.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4">Modified by <span className="font-bold">{ver.user?.name}</span></p>
                    <Button 
                      size="sm" 
                      onClick={() => rollbackMutation.mutate(ver.id)}
                      className="w-full h-8 text-[10px] uppercase tracking-widest font-bold bg-slate-900 hover:bg-brand-gold text-white"
                    >
                      Restore this version
                    </Button>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}

        {/* Page Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-[600px] bg-white rounded-3xl overflow-hidden p-0 border-0 shadow-2xl">
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                   <DialogTitle className="text-xl">Page Settings</DialogTitle>
                   <p className="text-slate-400 text-xs">Configure publishing, SEO and URL status.</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8 overflow-auto max-h-[70vh]">
              {/* Publication Status */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-3 h-3 text-brand-gold" />
                  Publishing & Visibility
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700">Status</Label>
                    <Select 
                      value={pageData.status} 
                      onValueChange={(val) => setPageData({...pageData, status: val})}
                    >
                      <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {pageData.status === 'SCHEDULED' && (
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-700">Publish Date</Label>
                      <div className="relative">
                        <Input 
                          type="datetime-local" 
                          className="rounded-xl bg-slate-50 border-slate-200"
                          value={pageData.publishAt ? new Date(pageData.publishAt).toISOString().slice(0, 16) : ''}
                          onChange={(e) => setPageData({...pageData, publishAt: e.target.value})}
                        />
                        <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* URL & Identification */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-3 h-3 text-brand-gold" />
                  URL Configuration
                </h4>
                <div className="space-y-3">
                  <Label className="text-xs font-bold text-slate-700">Route Path (Slug)</Label>
                  <div className="flex gap-2">
                    <div className="bg-slate-100 px-4 py-2.5 rounded-xl text-slate-400 text-sm font-medium border border-slate-200 border-dashed">
                      /p/
                    </div>
                    <Input 
                      value={pageData.slug} 
                      onChange={(e) => setPageData({...pageData, slug: e.target.value})}
                      className="rounded-xl bg-slate-50 border-slate-200 font-mono text-sm"
                    />
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex gap-3 items-center mt-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                      Changing the slug will automatically create a redirect from the old URL to the new one to prevent broken links.
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO & Search */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Search className="w-3 h-3 text-brand-gold" />
                  SEO Metadata
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700">SEO Title</Label>
                    <Input 
                      value={pageData.seoTitle || ''} 
                      onChange={(e) => setPageData({...pageData, seoTitle: e.target.value})}
                      placeholder={pageData.title}
                      className="rounded-xl bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-700">SEO Description</Label>
                    <Textarea 
                      value={pageData.seoDescription || ''} 
                      onChange={(e) => setPageData({...pageData, seoDescription: e.target.value})}
                      placeholder="Enter a brief summary for search engines..."
                      className="rounded-xl bg-slate-50 border-slate-200 resize-none h-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 flex sm:justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowSettings(false)} className="rounded-xl">Cancel</Button>
              <Button 
                onClick={() => {
                  setShowSettings(false);
                  toast.info('Settings applied to draft. Remember to save changes.');
                }} 
                className="bg-slate-900 hover:bg-black text-white rounded-xl px-8"
              >
                Apply Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PageBuilder;
