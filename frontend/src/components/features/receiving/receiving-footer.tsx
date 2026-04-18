"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export const ReceivingFooter = () => {
  const { lines } = useReceivingStore();

  const totalExpected = lines.reduce((acc, curr) => acc + curr.expectedQty, 0);
  const totalReceived = lines.reduce((acc, curr) => acc + curr.receivedQty, 0);
  const totalExceptions = lines.filter(l => l.status === 'Exception').length;

  return (
    <div className="h-14 border-t border-default-200 bg-white flex items-center justify-between px-6 sticky bottom-0 z-10 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-default-400 uppercase font-bold tracking-widest">Dự kiến tổng:</span>
          <span className="text-sm font-black">{totalExpected}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-default-400 uppercase font-bold tracking-widest">Đã nhận tổng:</span>
          <span className="text-sm font-black text-primary">{totalReceived}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-default-400 uppercase font-bold tracking-widest">Ngoại lệ:</span>
          <span className="text-sm font-black text-destructive">{totalExceptions}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-success font-bold text-xs">
          <Icon icon="heroicons:check-circle" className="w-5 h-5" />
          DỮ LIỆU HỢP LỆ
        </div>
        <Button color="primary" className="font-bold uppercase tracking-widest h-10 px-8">
          XÁC NHẬN NHẬN HÀNG (SUBMIT)
        </Button>
      </div>
    </div>
  );
};
