"use client"

import { usePutawayStore, PutawayTask } from "@/store/putaway-store";
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

export const PutawayWorkbench = ({ taskId }: { taskId: string }) => {
  const router = useRouter();
  const { tasks, confirmPutaway, scanStep, setScanStep, splitTask, reportException, recentMoves } = usePutawayStore();
  const task = tasks.find(t => t.id === taskId);
  
  const [barcode, setBarcode] = useState("");
  const [splitDialogOpen, setSplitDialogOpen] = useState(false);
  const [splitValue, setSplitValue] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [scanStep]);

  if (!task) return <div className="p-8 text-center font-bold text-destructive">Không tìm thấy tác vụ.</div>;

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBarcode = barcode.trim().toUpperCase();
    if (!cleanBarcode) return;

    if (scanStep === 'SOURCE') {
      if (cleanBarcode === task.barcode || cleanBarcode === task.sourceHU) {
        toast.success("Xác nhận nguồn hàng thành công");
        setScanStep('LOCATION');
      } else {
        toast.error("Mã vạch không khớp với nguồn hàng");
      }
    } else if (scanStep === 'LOCATION') {
      if (cleanBarcode === task.suggestedLocation) {
        toast.success("Vị trí chính xác");
        setScanStep('CONFIRM');
      } else {
        toast.warning(`Vị trí ${cleanBarcode} khác với đề xuất ${task.suggestedLocation}`);
        setScanStep('CONFIRM');
      }
    }
    setBarcode("");
  };

  const handleFinalConfirm = () => {
    confirmPutaway(task.id, barcode || task.suggestedLocation, task.qty);
    toast.success("Đã hoàn tất cất hàng!");
    router.push('/inbound/putaway-tasks');
  };

  const handleSplit = () => {
    splitTask(task.id, splitValue);
    toast.success(`Đã tách task thành ${splitValue} và ${task.qty - splitValue}`);
    setSplitDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] -m-6 bg-default-50">
      {/* Task Progress Header */}
      <div className="bg-white border-b border-default-200 p-4 px-6 flex items-center justify-between sticky top-0 z-20">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
               <Icon icon="heroicons:arrow-left" className="w-6 h-6" />
            </Button>
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-default-900">{task.taskNo}</h1>
                  <Badge variant="soft" color={task.overdue ? 'destructive' : 'info'}>
                     {task.overdue ? 'Quá hạn' : 'Đang thực hiện'}
                  </Badge>
               </div>
               <div className="text-xs text-default-500 font-medium">Putaway Task • {task.itemCode}</div>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right">
               <div className="text-[10px] uppercase font-bold text-default-400">Tiến độ</div>
               <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-default-100 rounded-full overflow-hidden">
                     <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: scanStep === 'SOURCE' ? '33%' : scanStep === 'LOCATION' ? '66%' : '100%' }}
                     />
                  </div>
                  <span className="text-sm font-bold">{scanStep === 'SOURCE' ? '1/3' : scanStep === 'LOCATION' ? '2/3' : '3/3'}</span>
               </div>
            </div>
         </div>
      </div>

      <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-y-auto">
         {/* Cột trái: Thông tin & Gợi ý */}
         <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card>
               <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-default-400">Thông tin nguồn (Source)</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                     <div className="text-[10px] font-bold text-primary uppercase mb-1">Vị trí staging</div>
                     <div className="text-2xl font-black text-primary tracking-tight">{task.sourceLocation}</div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center border-b border-default-50 pb-2">
                        <span className="text-sm text-default-500">Sản phẩm</span>
                        <span className="text-sm font-bold text-default-900">{task.itemName}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-default-50 pb-2">
                        <span className="text-sm text-default-500">Số lượng</span>
                        <span className="text-lg font-black text-default-900">{task.qty} {task.uom}</span>
                     </div>
                     {task.sourceHU && (
                        <div className="flex justify-between items-center">
                           <span className="text-sm text-default-500">Mã HU/Pallet</span>
                           <Badge variant="outline" className="font-mono">{task.sourceHU}</Badge>
                        </div>
                     )}
                  </div>
               </CardContent>
            </Card>

            <Card className="border-2 border-info/20 shadow-lg shadow-info/5">
               <CardHeader className="pb-2 bg-info/5 border-b border-info/10">
                  <CardTitle className="text-xs uppercase text-info font-black flex items-center gap-2">
                     <Icon icon="heroicons:light-bulb" />
                     Vị trí đích đề xuất
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-4">
                  <div className="text-center space-y-1">
                     <div className="text-4xl font-black text-info tracking-tighter">{task.suggestedLocation}</div>
                     <div className="text-[10px] text-info/60 font-bold uppercase">SUGGESTED BIN</div>
                  </div>
                  <div className="pt-4 border-t border-default-100">
                     <div className="text-[10px] text-default-400 font-bold uppercase mb-2">Vị trí thay thế</div>
                     <div className="flex flex-wrap gap-2">
                        {task.alternateLocations.map(loc => (
                           <Button 
                              key={loc} 
                              variant="soft" 
                              color="secondary" 
                              size="sm" 
                              className="text-[10px] font-bold h-7"
                              onClick={() => {
                                 setBarcode(loc);
                                 setScanStep('LOCATION');
                              }}
                           >
                              {loc}
                           </Button>
                        ))}
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-default-400">Lịch sử vừa thực hiện</CardTitle></CardHeader>
               <CardContent className="space-y-3">
                  {recentMoves.length > 0 ? recentMoves.map(move => (
                     <div key={move.id} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-default-100">
                        <div className="w-8 h-8 rounded bg-success/10 flex items-center justify-center text-success">
                           <Icon icon="heroicons:check" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="text-[10px] font-bold text-default-900 truncate">{move.taskNo} → {move.location}</div>
                           <div className="text-[9px] text-default-400">{move.timestamp}</div>
                        </div>
                     </div>
                  )) : (
                     <div className="text-center py-4 text-xs text-default-400 italic">Chưa có lượt di chuyển nào</div>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* Cột phải: Workbench Thao tác */}
         <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card className="shadow-xl border-t-4 border-primary overflow-hidden h-full flex flex-col">
               <div className="p-8 flex-1 flex flex-col justify-center space-y-12">
                  <div className="text-center space-y-4">
                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4">
                        <Icon 
                           icon={scanStep === 'SOURCE' ? "heroicons:qr-code" : scanStep === 'LOCATION' ? "heroicons:map-pin" : "heroicons:check-badge"} 
                           className="w-10 h-10" 
                        />
                     </div>
                     <h2 className="text-3xl font-black text-default-900 uppercase tracking-tight">
                        {scanStep === 'SOURCE' ? 'Bước 1: Quét nguồn hàng' : 
                         scanStep === 'LOCATION' ? 'Bước 2: Quét vị trí đích' : 
                         'Bước 3: Xác nhận hoàn tất'}
                     </h2>
                     <p className="text-default-500 font-medium">
                        {scanStep === 'SOURCE' ? `Quét mã vạch sản phẩm hoặc HU tại ${task.sourceLocation}` : 
                         scanStep === 'LOCATION' ? `Di chuyển đến ${task.suggestedLocation} và quét mã vị trí` : 
                         `Kiểm tra lại thông tin và xác nhận cất hàng`}
                     </p>
                  </div>

                  <form onSubmit={handleScan} className="max-w-xl mx-auto w-full space-y-6">
                     <div className="relative">
                        <Icon icon="heroicons:qr-code" className="absolute left-6 top-1/2 -translate-y-1/2 text-default-300 w-10 h-10" />
                        <Input 
                           ref={inputRef}
                           className="h-24 ps-20 text-4xl font-black tracking-[0.2em] uppercase border-4 border-primary/20 focus:border-primary focus:ring-primary shadow-2xl rounded-2xl"
                           placeholder="SCAN NOW..."
                           value={barcode}
                           onChange={(e) => setBarcode(e.target.value)}
                           disabled={scanStep === 'CONFIRM'}
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <Button 
                           type="button" 
                           variant="outline" 
                           size="lg" 
                           className="h-16 text-lg font-bold gap-2 rounded-xl"
                           onClick={() => setSplitDialogOpen(true)}
                        >
                           <Icon icon="heroicons:arrows-right-left" className="w-6 h-6" />
                           Chia số lượng
                        </Button>
                        <Button 
                           type="button" 
                           variant="outline" 
                           size="lg" 
                           className="h-16 text-lg font-bold gap-2 text-destructive border-destructive/20 hover:bg-destructive/5 rounded-xl"
                           onClick={() => {
                              const reason = prompt("Nhập lý do ngoại lệ:");
                              if (reason) reportException(task.id, reason);
                           }}
                        >
                           <Icon icon="heroicons:exclamation-triangle" className="w-6 h-6" />
                           Báo ngoại lệ
                        </Button>
                     </div>

                     {scanStep === 'CONFIRM' && (
                        <Button 
                           type="button" 
                           size="lg" 
                           className="w-full h-20 text-2xl font-black gap-3 rounded-2xl shadow-xl shadow-success/20 animate-bounce"
                           color="success"
                           onClick={handleFinalConfirm}
                        >
                           <Icon icon="heroicons:check-circle" className="w-8 h-8" />
                           XÁC NHẬN CẤT HÀNG
                        </Button>
                     )}
                  </form>
               </div>

               <div className="bg-default-100 p-4 px-8 flex justify-between items-center text-xs font-bold text-default-500 uppercase tracking-widest">
                  <span>Task Status: {task.status}</span>
                  <div className="flex gap-4">
                     <span className={scanStep === 'SOURCE' ? 'text-primary' : ''}>1. Scan Source</span>
                     <Icon icon="heroicons:chevron-right" />
                     <span className={scanStep === 'LOCATION' ? 'text-primary' : ''}>2. Scan Location</span>
                     <Icon icon="heroicons:chevron-right" />
                     <span className={scanStep === 'CONFIRM' ? 'text-primary' : ''}>3. Complete</span>
                  </div>
               </div>
            </Card>
         </div>
      </div>

      {/* Split Quantity Dialog */}
      <Dialog open={splitDialogOpen} onOpenChange={setSplitDialogOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Chia nhỏ số lượng (Split Putaway)</DialogTitle>
            </DialogHeader>
            <div className="py-6 space-y-4">
               <div className="bg-default-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-sm font-medium">Tổng số lượng hiện tại:</span>
                  <span className="text-xl font-black text-primary">{task.qty} {task.uom}</span>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="split-qty">Số lượng muốn tách ra (Phần A)</Label>
                  <Input 
                     id="split-qty" 
                     type="number" 
                     value={splitValue} 
                     onChange={(e) => setSplitValue(Math.min(task.qty - 1, Math.max(1, Number(e.target.value))))}
                     className="text-2xl font-bold h-14"
                  />
                  <p className="text-[10px] text-default-400">Hệ thống sẽ tạo thêm một task mới với số lượng {task.qty - splitValue} {task.uom}</p>
               </div>
            </div>
            <DialogFooter>
               <Button variant="outline" onClick={() => setSplitDialogOpen(false)}>Hủy</Button>
               <Button color="primary" onClick={handleSplit}>Xác nhận tách</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
