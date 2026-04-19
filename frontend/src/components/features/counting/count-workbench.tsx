"use client"

import { useCountingStore, CountLine } from "@/store/counting-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const CountWorkbench = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();
  const { header, lines, scanStep, setScanStep, currentLocation, setCurrentLocation, updateCount, submitSession } = useCountingStore();
  
  const [barcode, setBarcode] = useState("");
  const [countQty, setCountQty] = useState<number | string>("");
  const [activeLine, setActiveLine] = useState<CountLine | null>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [scanStep]);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBarcode = barcode.trim().toUpperCase();
    if (!cleanBarcode) return;

    if (scanStep === 'LOCATION') {
      const match = lines.find(l => l.location === cleanBarcode);
      if (match) {
        setCurrentLocation(cleanBarcode);
        toast.success(`Đã đến vị trí ${cleanBarcode}`);
        setScanStep('ITEM');
      } else {
        toast.error("Vị trí không thuộc phiên kiểm kê này");
      }
    } else if (scanStep === 'ITEM') {
      const match = lines.find(l => l.location === currentLocation && (l.barcode === cleanBarcode || l.itemCode === cleanBarcode));
      if (match) {
        setActiveLine(match);
        setCountQty(match.countedQty || "");
        toast.success(`Khớp sản phẩm: ${match.itemName}`);
        setScanStep('QUANTITY');
      } else {
        toast.error("Sản phẩm không khớp với vị trí hiện tại");
      }
    }
    setBarcode("");
  };

  const handleConfirmCount = () => {
    if (activeLine) {
      updateCount(activeLine.id, Number(countQty));
      toast.success("Đã ghi nhận số đếm");
      setScanStep('LOCATION');
      setActiveLine(null);
      setCountQty("");
      setCurrentLocation(null);
    }
  };

  const handleSubmit = () => {
    submitSession();
    toast.success("Đã gửi kết quả kiểm kê!");
    setSubmitDialogOpen(false);
    router.push('/counting/sessions');
  };

  const totalLines = lines.length;
  const countedLines = lines.filter(l => l.status !== 'Pending').length;
  const progress = (countedLines / totalLines) * 100;

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] -m-6 bg-default-50">
      {/* Session Progress Header */}
      <div className="bg-white border-b border-default-200 p-4 px-6 flex items-center justify-between sticky top-0 z-20">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
               <Icon icon="heroicons:arrow-left" className="w-6 h-6" />
            </Button>
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-default-900">{header.sessionNo}</h1>
                  <Badge variant="soft" color="info">{header.type}</Badge>
                  {header.blindCount && <Badge color="secondary" variant="outline">Blind Count</Badge>}
               </div>
               <div className="text-xs text-default-500 font-medium">Bắt đầu: {header.startedAt}</div>
            </div>
         </div>
         <div className="flex items-center gap-8">
            <div className="text-right">
               <div className="text-[10px] uppercase font-bold text-default-400">Tiến độ phiên</div>
               <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
                  <div className="h-1.5 w-32 bg-default-100 rounded-full overflow-hidden">
                     <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
               </div>
            </div>
            <Button color="success" size="sm" className="font-bold uppercase tracking-widest" onClick={() => setSubmitDialogOpen(true)}>
               SUBMIT SESSION
            </Button>
         </div>
      </div>

      <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
         {/* Cột trái: Queue vị trí */}
         <div className="col-span-12 lg:col-span-4 space-y-4 overflow-y-auto pr-2">
            <h3 className="text-xs font-black text-default-500 uppercase px-2 tracking-widest">Danh sách vị trí ({countedLines}/{totalLines})</h3>
            {lines.map(line => (
               <Card 
                  key={line.id} 
                  className={`cursor-pointer transition-all border-l-4 ${
                     currentLocation === line.location ? 'border-primary ring-2 ring-primary ring-inset' : 
                     line.status === 'Counted' ? 'border-success opacity-80' : 
                     line.status === 'Discrepancy' ? 'border-destructive' : 'border-default-200'
                  }`}
                  onClick={() => {
                     setCurrentLocation(line.location);
                     setScanStep('ITEM');
                  }}
               >
                  <CardContent className="p-4 flex items-center justify-between">
                     <div className="space-y-1">
                        <div className="text-lg font-black text-default-900 leading-none">{line.location}</div>
                        <div className="text-[10px] font-bold text-default-400 truncate max-w-[150px]">{line.itemName}</div>
                     </div>
                     <div className="text-right space-y-1">
                        {line.status === 'Pending' ? (
                           <Badge variant="soft" color="default" className="text-[9px]">PENDING</Badge>
                        ) : (
                           <div className="flex flex-col items-end">
                              <span className="text-lg font-black text-primary">{line.countedQty}</span>
                              <span className="text-[9px] font-bold text-default-400 uppercase">{line.uom}</span>
                           </div>
                        )}
                        {line.status === 'Discrepancy' && !header.blindCount && (
                           <Badge variant="soft" color="destructive" className="text-[9px]">
                              {line.discrepancyQty && line.discrepancyQty > 0 ? `+${line.discrepancyQty}` : line.discrepancyQty}
                           </Badge>
                        )}
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>

         {/* Cột phải: Workbench */}
         <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6">
            <Card className="shadow-xl border-t-4 border-primary flex-1 flex flex-col overflow-hidden">
               <div className="p-8 flex-1 flex flex-col justify-center space-y-10">
                  <div className="text-center space-y-4">
                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-2">
                        <Icon 
                           icon={scanStep === 'LOCATION' ? "heroicons:map-pin" : scanStep === 'ITEM' ? "heroicons:qr-code" : "heroicons:calculator"} 
                           className="w-10 h-10" 
                        />
                     </div>
                     <h2 className="text-3xl font-black text-default-900 uppercase tracking-tight">
                        {scanStep === 'LOCATION' ? 'Quét mã vị trí' : 
                         scanStep === 'ITEM' ? 'Quét sản phẩm' : 
                         'Nhập số đếm thực tế'}
                     </h2>
                     {currentLocation && (
                        <div className="text-xl font-black text-primary uppercase">Location: {currentLocation}</div>
                     )}
                  </div>

                  {scanStep === 'QUANTITY' ? (
                     <div className="max-w-md mx-auto w-full space-y-8 animate-in zoom-in duration-300">
                        <div className="text-center p-4 bg-default-50 rounded-xl border border-default-100">
                           <div className="text-sm font-bold text-default-700">{activeLine?.itemName}</div>
                           <div className="text-[10px] text-default-400 font-mono mt-1">{activeLine?.itemCode}</div>
                        </div>
                        <div className="flex items-center justify-center gap-6">
                           <Button 
                              variant="outline" 
                              className="h-20 w-20 rounded-2xl border-2 text-3xl font-bold"
                              onClick={() => setCountQty(Math.max(0, Number(countQty) - 1))}
                           >
                              -
                           </Button>
                           <Input 
                              type="number"
                              className="h-24 w-40 text-center text-6xl font-black border-none bg-transparent focus:ring-0"
                              value={countQty}
                              onChange={(e) => setCountQty(e.target.value)}
                              autoFocus
                           />
                           <Button 
                              variant="outline" 
                              className="h-20 w-20 rounded-2xl border-2 text-3xl font-bold"
                              onClick={() => setCountQty(Number(countQty) + 1)}
                           >
                              +
                           </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <Button variant="outline" className="h-14 font-bold rounded-xl" onClick={() => setScanStep('ITEM')}>QUAY LẠI</Button>
                           <Button className="h-14 text-lg font-black rounded-xl shadow-lg" color="primary" onClick={handleConfirmCount}>XÁC NHẬN SỐ ĐẾM</Button>
                        </div>
                     </div>
                  ) : (
                     <form onSubmit={handleScan} className="max-w-xl mx-auto w-full space-y-6">
                        <div className="relative">
                           <Icon icon="heroicons:qr-code" className="absolute left-6 top-1/2 -translate-y-1/2 text-default-300 w-10 h-10" />
                           <Input 
                              ref={inputRef}
                              className="h-24 ps-20 text-4xl font-black tracking-[0.2em] uppercase border-4 border-primary/20 focus:border-primary focus:ring-primary shadow-2xl rounded-2xl"
                              placeholder="SCAN NOW..."
                              value={barcode}
                              onChange={(e) => setBarcode(e.target.value)}
                           />
                        </div>
                        <div className="flex justify-center gap-4">
                           {scanStep === 'ITEM' && (
                              <Button variant="ghost" className="font-bold text-default-400 uppercase tracking-widest" onClick={() => {
                                 setCurrentLocation(null);
                                 setScanStep('LOCATION');
                              }}>
                                 <Icon icon="heroicons:arrow-path" className="mr-2" /> Đổi vị trí
                              </Button>
                           )}
                        </div>
                     </form>
                  )}
               </div>

               <div className="bg-default-100 p-4 px-8 flex justify-between items-center text-[10px] font-black text-default-400 uppercase tracking-[0.2em]">
                  <div className="flex gap-6">
                     <span className={scanStep === 'LOCATION' ? 'text-primary' : ''}>1. Scan Location</span>
                     <Icon icon="heroicons:chevron-right" />
                     <span className={scanStep === 'ITEM' ? 'text-primary' : ''}>2. Scan Item</span>
                     <Icon icon="heroicons:chevron-right" />
                     <span className={scanStep === 'QUANTITY' ? 'text-primary' : ''}>3. Count Confirm</span>
                  </div>
                  {header.blindCount && <div className="text-warning flex items-center gap-2"><Icon icon="heroicons:eye-slash" /> Blind Count Mode Active</div>}
               </div>
            </Card>
         </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="text-2xl font-black text-default-900 uppercase">Xác nhận Submit</DialogTitle>
            </DialogHeader>
            <div className="py-6 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-success/5 rounded-xl border border-success/10 text-center">
                     <div className="text-[10px] font-bold text-success uppercase mb-1">Đã kiểm</div>
                     <div className="text-3xl font-black text-success">{countedLines}</div>
                  </div>
                  <div className="p-4 bg-default-50 rounded-xl border border-default-100 text-center">
                     <div className="text-[10px] font-bold text-default-400 uppercase mb-1">Chưa kiểm</div>
                     <div className="text-3xl font-black text-default-400">{totalLines - countedLines}</div>
                  </div>
               </div>
               
               {totalLines > countedLines && (
                  <div className="bg-warning/10 p-4 rounded-lg flex gap-3 text-warning-700">
                     <Icon icon="heroicons:exclamation-triangle" className="w-6 h-6 shrink-0" />
                     <p className="text-xs font-medium">Bạn vẫn còn {totalLines - countedLines} vị trí chưa kiểm kê. Nếu submit bây giờ, các vị trí này sẽ được ghi nhận là không có hàng (qty = 0) hoặc cần recount.</p>
                  </div>
               )}
            </div>
            <DialogFooter className="gap-2 sm:justify-between">
               <Button variant="outline" className="font-bold h-12 px-6" onClick={() => setSubmitDialogOpen(false)}>QUAY LẠI</Button>
               <Button color="success" className="font-black h-12 px-8 uppercase tracking-widest shadow-lg shadow-success/20" onClick={handleSubmit}>
                  XÁC NHẬN SUBMIT
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
