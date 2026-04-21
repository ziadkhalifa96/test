import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  MessageSquare,
  ArrowRight,
  User,
  Phone,
  Building,
  Box
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Inquiries = () => {
  const queryClient = useQueryClient();
  const [selectedInquiry, setSelectedInquiry] = React.useState<any>(null);

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/inquiries`);
      return res.data.data;
    }
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/inquiries/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/inquiries/${id}`);
      toast.success('Inquiry deleted');
      setSelectedInquiry(null);
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    } catch (err) {
      toast.error('Failed to delete inquiry');
    }
  };

  const handleSelect = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.isRead) {
      markReadMutation.mutate(inquiry.id);
    }
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-6 animate-reveal">
      {/* Sidebar: List */}
      <div className="w-96 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900">Inquiries</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage customer messages and quotes.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search messages..." className="pl-10 h-10 rounded-xl border-slate-200 text-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-auto divide-y divide-slate-50">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="p-4 animate-pulse space-y-2">
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-2 bg-slate-100 rounded w-full" />
              </div>
            ))
          ) : inquiries?.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
               <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
               <p className="text-sm">No inquiries yet.</p>
            </div>
          ) : inquiries?.map((inquiry: any) => (
            <div 
              key={inquiry.id}
              onClick={() => handleSelect(inquiry)}
              className={cn(
                "p-4 cursor-pointer transition-all hover:bg-slate-50 relative group",
                selectedInquiry?.id === inquiry.id ? "bg-slate-50 ring-2 ring-brand-gold ring-inset" : "",
                !inquiry.isRead ? "bg-blue-50/30" : ""
              )}
            >
              {!inquiry.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-bold text-slate-900 truncate pr-4">{inquiry.name}</span>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{format(new Date(inquiry.createdAt), 'MMM dd')}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1">{inquiry.message}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 uppercase tracking-tighter">
                  {inquiry.product || 'General'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Panel: Preview */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        {selectedInquiry ? (
          <div className="flex-1 flex flex-col h-full animate-reveal">
             {/* Header */}
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold text-xl">
                   {selectedInquiry.name[0]}
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-900">{selectedInquiry.name}</h3>
                   <p className="text-xs text-slate-500">{selectedInquiry.email}</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500" onClick={() => handleDelete(selectedInquiry.id)}>
                   <Trash2 className="w-4 h-4" />
                 </Button>
               </div>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-auto p-8">
               <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                   <Phone className="w-5 h-5 text-brand-gold" />
                   <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">Phone</p>
                     <p className="text-sm font-bold text-slate-800">{selectedInquiry.phone || 'N/A'}</p>
                   </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                   <Building className="w-5 h-5 text-brand-gold" />
                   <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">Company</p>
                     <p className="text-sm font-bold text-slate-800">{selectedInquiry.company || 'N/A'}</p>
                   </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 col-span-2">
                   <Box className="w-5 h-5 text-brand-gold" />
                   <div>
                     <p className="text-[10px] text-slate-400 uppercase font-bold">Interested Product</p>
                     <p className="text-sm font-bold text-slate-800">{selectedInquiry.product || 'General Inquiry'}</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-4">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                   <MessageSquare className="w-4 h-4" />
                   Message Content
                 </h4>
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-800 leading-relaxed min-h-[200px]">
                   {selectedInquiry.message}
                 </div>
               </div>

               <div className="mt-10 flex gap-4">
                  <Button className="bg-brand-gold text-white rounded-xl gap-2 flex-1 h-12 shadow-gold group">
                    Reply via Email
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" className="rounded-xl flex-1 h-12 border-slate-200">
                    Mark as Processed
                  </Button>
               </div>
             </div>

             <div className="p-6 border-t border-slate-50 text-center">
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-2">
                  <Clock className="w-3 h-3" />
                  Received on {format(new Date(selectedInquiry.createdAt), 'PPPP p')}
                </p>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-10 h-10 opacity-20" />
             </div>
             <h3 className="text-xl font-bold text-slate-900">No Inquiry Selected</h3>
             <p className="text-sm mt-2 max-w-xs">Select a message from the list on the left to view the full details and respond.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
