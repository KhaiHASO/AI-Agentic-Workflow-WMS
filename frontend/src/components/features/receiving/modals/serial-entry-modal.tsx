"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

interface SerialEntryModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (serial: string) => void;
  itemName: string;
  existingSerials: string[];
  requiredQty: number;
}

export const SerialEntryModal = ({ open, onClose, onConfirm, itemName, existingSerials, requiredQty }: SerialEntryModalProps) => {
  const [serial, setSerial] = useState("");

  const handleConfirm = () => {
    if (!serial) return;
    onConfirm(serial);
    setSerial("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nhập mã Serial</DialogTitle>
          <p className="text-sm text-default-500 font-medium">{itemName}</p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase text-default-500">
            <span>Đã nhập: {existingSerials.length} / {requiredQty}</span>
          </div>
          <div className="flex gap-2">
            <div className="grid gap-2 flex-1">
              <Input 
                id="serial" 
                value={serial} 
                onChange={(e) => setSerial(e.target.value)} 
                placeholder="Quét hoặc nhập serial..." 
                onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              />
            </div>
            <Button onClick={handleConfirm} disabled={!serial}>THÊM</Button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-2">
            {existingSerials.length > 0 ? (
              existingSerials.map((s, index) => (
                <div key={index} className="flex items-center justify-between bg-default-50 p-2 rounded text-sm">
                  <span className="font-mono">{s}</span>
                  <Icon icon="heroicons:check-circle" className="text-success w-4 h-4" />
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-xs text-default-400 italic">Chưa có serial nào</div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={onClose}>HOÀN TẤT</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
