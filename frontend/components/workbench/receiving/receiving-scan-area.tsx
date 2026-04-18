"use client"

import { useState, useRef, useEffect } from "react";
import { useReceivingStore } from "@/store/receiving-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UnknownBarcodeModal } from "./modals/unknown-barcode-modal";

export const ReceivingScanArea = () => {
  const [barcode, setBarcode] = useState("");
  const [unknownBarcode, setUnknownBarcode] = useState<string | null>(null);
  const { processScan, scanResult, undoLastScan, lines } = useReceivingStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBarcode = barcode.trim();
    if (!cleanBarcode) return;
    
    const matchedLine = lines.find(l => l.barcode === cleanBarcode);
    if (!matchedLine) {
       setUnknownBarcode(cleanBarcode);
       setBarcode("");
       return;
    }

    processScan(cleanBarcode);
    setBarcode("");
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [scanResult, unknownBarcode]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Icon 
            icon="heroicons:qr-code" 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 w-6 h-6" 
          />
          <Input
            ref={inputRef}
            className="h-14 ps-12 text-lg font-bold tracking-widest uppercase border-2 border-primary/20 focus:border-primary shadow-sm"
            placeholder="QUÉT MÃ VẠCH SẢN PHẨM..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            autoFocus
          />
        </div>
        <Button type="submit" size="lg" className="h-14 px-8 font-bold text-lg">SCAN</Button>
        <Button type="button" variant="outline" size="lg" className="h-14 px-4" onClick={undoLastScan}>
          <Icon icon="heroicons:arrow-path" className="w-6 h-6" />
        </Button>
      </form>

      {scanResult && (
        <Alert variant={scanResult.type === 'error' ? 'destructive' : 'default'} className={`animate-in fade-in slide-in-from-top-2 duration-300 ${scanResult.type === 'success' ? 'bg-success/10 border-success/50 text-success-700' : ''}`}>
          <div className="flex items-center gap-3">
             <Icon 
               icon={scanResult.type === 'success' ? 'heroicons:check-circle' : 'heroicons:exclamation-circle'} 
               className="w-6 h-6" 
             />
             <div>
               <AlertTitle className="font-bold uppercase text-xs">Kết quả Scan</AlertTitle>
               <AlertDescription className="text-sm font-medium">{scanResult.message}</AlertDescription>
             </div>
          </div>
        </Alert>
      )}

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
           <input type="checkbox" id="auto-select" defaultChecked className="rounded border-default-300 text-primary focus:ring-primary" />
           <label htmlFor="auto-select" className="text-xs font-medium text-default-600">Tự động chọn Line</label>
        </div>
        <div className="flex items-center gap-2">
           <input type="checkbox" id="auto-lot" className="rounded border-default-300 text-primary focus:ring-primary" />
           <label htmlFor="auto-lot" className="text-xs font-medium text-default-600">Tự động mở Lot/Serial</label>
        </div>
      </div>

      <UnknownBarcodeModal 
        open={!!unknownBarcode}
        onClose={() => setUnknownBarcode(null)}
        barcode={unknownBarcode || ""}
      />
    </div>
  );
};
