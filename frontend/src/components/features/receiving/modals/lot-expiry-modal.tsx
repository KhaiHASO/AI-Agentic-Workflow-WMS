"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LotExpiryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (lot: { lotNo: string; mfgDate: string; expiryDate: string; qty: number }) => void;
  itemName: string;
}

export const LotExpiryModal = ({ open, onClose, onConfirm, itemName }: LotExpiryModalProps) => {
  const [lotNo, setLotNo] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [qty, setQty] = useState(1);

  const handleConfirm = () => {
    onConfirm({ lotNo, mfgDate, expiryDate, qty });
    setLotNo("");
    setMfgDate("");
    setExpiryDate("");
    setQty(1);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nhập thông tin Lot/Expiry</DialogTitle>
          <p className="text-sm text-default-500 font-medium">{itemName}</p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="lotNo">Số Lot</Label>
            <Input id="lotNo" value={lotNo} onChange={(e) => setLotNo(e.target.value)} placeholder="Nhập số lot..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="mfgDate">Ngày sản xuất</Label>
              <Input id="mfgDate" type="date" value={mfgDate} onChange={(e) => setMfgDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiryDate">Ngày hết hạn</Label>
              <Input id="expiryDate" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="qty">Số lượng theo Lot này</Label>
            <Input id="qty" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={handleConfirm} disabled={!lotNo || !expiryDate}>Xác nhận</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
