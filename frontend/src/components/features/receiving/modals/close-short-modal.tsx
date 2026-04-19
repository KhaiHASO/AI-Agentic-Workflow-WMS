"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CloseShortModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  itemName: string;
  shortQty: number;
}

export const CloseShortModal = ({ open, onClose, onConfirm, itemName, shortQty }: CloseShortModalProps) => {
  const [reasonCode, setReasonCode] = useState("SUPPLIER_SHORT");
  const [note, setNote] = useState("");

  const handleConfirm = () => {
    onConfirm(`${reasonCode}: ${note}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đóng thiếu (Close Short)</DialogTitle>
          <p className="text-sm text-default-500 font-medium">Sản phẩm: {itemName}</p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-destructive/5 border border-destructive/20 p-3 rounded text-sm text-destructive font-bold flex justify-between">
             <span>Số lượng còn thiếu:</span>
             <span>{shortQty}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Lý do đóng thiếu</Label>
            <Select value={reasonCode} onValueChange={setReasonCode}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn lý do..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SUPPLIER_SHORT">Nhà cung cấp giao thiếu</SelectItem>
                <SelectItem value="DAMAGED_REJECTED">Hàng lỗi/Hư hỏng không nhận</SelectItem>
                <SelectItem value="WRONG_ITEM">Giao sai mã hàng</SelectItem>
                <SelectItem value="OTHER">Lý do khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note">Ghi chú chi tiết</Label>
            <Textarea 
              id="note" 
              placeholder="Nhập ghi chú..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>HỦY</Button>
          <Button color="destructive" onClick={handleConfirm}>XÁC NHẬN ĐÓNG THIẾU</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
