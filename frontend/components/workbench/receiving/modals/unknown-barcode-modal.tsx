"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface UnknownBarcodeModalProps {
  open: boolean;
  onClose: () => void;
  barcode: string;
}

export const UnknownBarcodeModal = ({ open, onClose, barcode }: UnknownBarcodeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Icon icon="heroicons:exclamation-triangle" className="w-6 h-6" />
            Mã vạch lạ (Unknown Barcode)
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 text-center space-y-4">
           <div className="text-4xl font-black tracking-tighter text-default-300">
              {barcode}
           </div>
           <p className="text-sm text-default-500">
              Mã vạch này không khớp với bất kỳ mặt hàng nào trong danh sách PO hoặc Master Data.
           </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
           <Button variant="outline" className="justify-start gap-3 h-12">
              <Icon icon="heroicons:magnifying-glass" className="w-5 h-5 text-primary" />
              Tìm kiếm hàng hóa trong hệ thống
           </Button>
           <Button variant="outline" className="justify-start gap-3 h-12">
              <Icon icon="heroicons:plus-circle" className="w-5 h-5 text-success" />
              Tạo mặt hàng Unexpected Receipt
           </Button>
           <Button variant="outline" className="justify-start gap-3 h-12 text-destructive border-destructive/20" onClick={onClose}>
              <Icon icon="heroicons:x-mark" className="w-5 h-5" />
              Bỏ qua lượt quét này
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
