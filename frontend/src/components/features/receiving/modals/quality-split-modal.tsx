"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

interface QualitySplitModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  itemName: string;
  totalQty: number;
}

export const QualitySplitModal = ({ open, onClose, onConfirm, itemName, totalQty }: QualitySplitModalProps) => {
  const [accepted, setAccepted] = useState(totalQty);
  const [damaged, setDamaged] = useState(0);
  const [qc, setQc] = useState(0);

  const total = Number(accepted) + Number(damaged) + Number(qc);
  const isInvalid = total !== totalQty;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon icon="heroicons:beaker" className="w-6 h-6 text-warning" />
            Phân loại chất lượng (Quality Split)
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
           <div className="bg-default-50 p-3 rounded-lg border border-default-100 flex justify-between items-center">
              <div>
                 <div className="text-xs text-default-500 uppercase font-bold">Sản phẩm</div>
                 <div className="text-sm font-bold text-default-900">{itemName}</div>
              </div>
              <div className="text-right">
                 <div className="text-xs text-default-500 uppercase font-bold">Tổng nhận</div>
                 <div className="text-lg font-black text-primary">{totalQty}</div>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                 <Label className="text-success font-bold">1. Đạt chất lượng (Accepted)</Label>
                 <Input type="number" value={accepted} onChange={(e) => setAccepted(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                 <Label className="text-warning font-bold">2. Cần kiểm định (QC Pending)</Label>
                 <Input type="number" value={qc} onChange={(e) => setQc(Number(e.target.value))} />
              </div>
              <div className="space-y-2">
                 <Label className="text-destructive font-bold">3. Hư hỏng (Damaged/Quarantine)</Label>
                 <Input type="number" value={damaged} onChange={(e) => setDamaged(Number(e.target.value))} />
              </div>
           </div>

           {isInvalid && (
             <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-xs font-medium">
                Tổng số lượng phân loại ({total}) phải bằng tổng số lượng đã nhận ({totalQty}).
             </div>
           )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button color="primary" disabled={isInvalid} onClick={() => onConfirm({ accepted, damaged, qc })}>Xác nhận phân loại</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
