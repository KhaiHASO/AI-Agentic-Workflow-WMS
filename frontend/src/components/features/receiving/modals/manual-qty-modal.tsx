"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualQtyModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (qty: number) => void;
  itemName: string;
  currentQty: number;
}

export const ManualQtyModal = ({ open, onClose, onConfirm, itemName, currentQty }: ManualQtyModalProps) => {
  const [qty, setQty] = useState(currentQty);

  useEffect(() => {
    setQty(currentQty);
  }, [currentQty]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nhập số lượng thủ công</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
           <div className="bg-default-50 p-3 rounded-lg border border-default-100">
              <div className="text-xs text-default-500 uppercase font-bold">Sản phẩm</div>
              <div className="text-sm font-bold text-default-900">{itemName}</div>
           </div>
           <div className="space-y-2">
              <Label htmlFor="qty">Số lượng thực nhận</Label>
              <Input 
                id="qty" 
                type="number" 
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))}
                className="text-lg font-bold h-12"
              />
           </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button color="primary" onClick={() => onConfirm(qty)}>Cập nhật Qty</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
