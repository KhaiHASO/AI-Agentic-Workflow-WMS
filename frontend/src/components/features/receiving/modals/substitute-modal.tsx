"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface SubstituteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (sub: { itemCode: string; itemName: string }) => void;
  itemName: string;
  candidates: { itemCode: string; itemName: string }[];
}

export const SubstituteModal = ({ open, onClose, onConfirm, itemName, candidates }: SubstituteModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chọn mặt hàng thay thế</DialogTitle>
          <p className="text-sm text-default-500 font-medium">Hàng gốc: {itemName}</p>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {candidates.length > 0 ? (
            candidates.map((cand, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                onClick={() => onConfirm(cand)}
              >
                <div>
                   <div className="font-bold text-default-900">{cand.itemName}</div>
                   <div className="text-xs text-default-500 font-mono">{cand.itemCode}</div>
                </div>
                <Icon icon="heroicons:chevron-right" className="w-5 h-5 text-default-300" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-default-50 rounded-lg border-2 border-dashed border-default-200">
               <Icon icon="heroicons:no-symbol" className="w-10 h-10 text-default-300 mx-auto mb-2" />
               <p className="text-sm text-default-500 italic">Không có mặt hàng thay thế khả dụng</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={onClose}>ĐÓNG</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
