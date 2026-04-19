"use client"

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

interface PrintMRLabelModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    mrNo: string;
    supplier: string;
    expectedQty: number;
    poNo?: string;
  } | null;
}

export const PrintMRLabelModal = ({ open, onClose, data }: PrintMRLabelModalProps) => {
  if (!data) return null;

  const handlePrint = () => {
    toast.success(`Đang gửi lệnh in cho nhãn ${data.mrNo}...`);
    // In a real app, this would trigger window.print() or an API call to a thermal printer
    setTimeout(() => {
        onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Icon icon="heroicons:printer" className="text-primary w-6 h-6" />
            In nhãn Master Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 flex flex-col items-center justify-center space-y-6">
          <div className="text-xs text-default-500 uppercase font-bold tracking-widest bg-default-50 px-3 py-1 rounded">Xem trước nhãn in (4x6 inch)</div>
          
          {/* Label Preview Card */}
          <div className="w-[300px] h-[450px] bg-white border-2 border-black rounded-sm p-4 flex flex-col shadow-xl relative overflow-hidden">
             {/* Thermal Paper texture effect */}
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
             
             <div className="border-b-2 border-black pb-2 mb-4 text-center">
                <div className="text-[10px] font-black uppercase leading-none mb-1">WMS Master Receipt Label</div>
                <div className="text-2xl font-black tracking-tighter">{data.mrNo}</div>
             </div>

             <div className="flex-1 space-y-4">
                <div className="space-y-1">
                   <div className="text-[8px] font-bold uppercase text-default-500">Supplier</div>
                   <div className="text-sm font-black truncate border-b border-default-100">{data.supplier}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <div className="text-[8px] font-bold uppercase text-default-500">Expected Qty</div>
                      <div className="text-xl font-black">{data.expectedQty} Units</div>
                   </div>
                   <div className="space-y-1 text-right">
                      <div className="text-[8px] font-bold uppercase text-default-500">Date</div>
                      <div className="text-xs font-bold">{new Date().toLocaleDateString()}</div>
                   </div>
                </div>

                <div className="space-y-1 pt-2">
                   <div className="text-[8px] font-bold uppercase text-default-500">PO Reference</div>
                   <div className="text-xs font-bold">{data.poNo || 'N/A'}</div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center py-4">
                   {/* Barcode Mock */}
                   <div className="w-full h-24 bg-white flex flex-col items-center justify-center space-y-1">
                      <div className="flex gap-[1px] h-16 w-full items-end justify-center">
                         {[...Array(40)].map((_, i) => (
                           <div 
                            key={i} 
                            className="bg-black" 
                            style={{ 
                                width: Math.random() > 0.7 ? '3px' : '1px',
                                height: `${40 + Math.random() * 40}%`
                            }} 
                           />
                         ))}
                      </div>
                      <div className="text-[10px] font-mono font-bold tracking-[0.3em]">{data.mrNo}</div>
                   </div>
                </div>
             </div>

             <div className="border-t-2 border-black pt-2 text-center">
                <div className="text-[8px] font-bold">SMART AGENTIC WMS - INTERNAL USE ONLY</div>
             </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-default-50/50 border-t border-default-100">
          <Button variant="outline" onClick={onClose}>Hủy bỏ</Button>
          <Button color="primary" className="gap-2" onClick={handlePrint}>
            <Icon icon="heroicons:printer" className="w-4 h-4" />
            Xác nhận In (Thermal)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
