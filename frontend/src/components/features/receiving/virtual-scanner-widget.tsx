"use client"

import { useState } from "react";
import { useReceivingStore } from "@/store/receiving-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export const VirtualScannerWidget = () => {
  const { processScan, lines } = useReceivingStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleScan = (barcode: string, label: string) => {
    toast.info(`Bíp! Quét mã: ${label}`);
    processScan(barcode);
  };

  if (!isOpen) {
    return (
      <Button 
        className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-full shadow-2xl z-50 h-12 w-12 p-0"
        color="warning"
        onClick={() => setIsOpen(true)}
      >
        <Icon icon="heroicons:qr-code" className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed right-0 top-1/2 -translate-y-1/2 w-80 shadow-2xl z-50 border-l-4 border-warning animate-in slide-in-from-right-4">
      <CardHeader className="py-3 bg-warning/10 border-b border-warning/20 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-black uppercase text-warning-700 flex items-center gap-2">
           <Icon icon="heroicons:computer-desktop" />
           Virtual Scanner Widget
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
           <Icon icon="heroicons:x-mark" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-default-400 uppercase">Hàng chuẩn (Match PO)</p>
          <div className="grid grid-cols-1 gap-2">
            {lines.slice(0, 2).map(l => (
              <Button key={l.id} variant="soft" size="sm" className="justify-start text-[10px] h-8" onClick={() => handleScan(l.barcode, l.itemName)}>
                 Scan {l.itemCode}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-bold text-destructive uppercase">Kịch bản ngoại lệ</p>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="soft" color="destructive" size="sm" className="justify-start text-[10px] h-8" onClick={() => handleScan("UNKNOWN-999", "Mã lạ")}>
               Scan Mã chưa khai báo
            </Button>
            <Button variant="soft" color="destructive" size="sm" className="justify-start text-[10px] h-8" onClick={() => {
                const milk = lines.find(l => l.itemCode === 'ITM-MILK-01');
                if (milk) {
                   // Loop to trigger over-receipt
                   for(let i=0; i < milk.expectedQty + 5; i++) {
                      processScan(milk.barcode);
                   }
                   toast.error("Đã quét vượt định mức!");
                }
            }}>
               Scan Vượt định mức (PIN)
            </Button>
            <Button variant="soft" color="info" size="sm" className="justify-start text-[10px] h-8" onClick={() => handleScan("ITM-MILK-01", "Hàng Cross-dock")}>
               Scan Hàng Cross-dock
            </Button>
          </div>
        </div>

        <p className="text-[9px] text-default-400 italic text-center">
          Dùng Widget này để demo tính năng mà không cần thiết bị thật.
        </p>
      </CardContent>
    </Card>
  );
};
