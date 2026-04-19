"use client"

import { usePickingStore, PickTask } from "@/store/picking-store";
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
import { Textarea } from "@/components/ui/textarea";

export const PickingWorkbench = ({ taskId }: { taskId: string }) => {
  const router = useRouter();
  const { tasks, confirmPick, scanStep, setScanStep, shortPick, skipTask, changeSource, recentPicks } = usePickingStore();
  const task = tasks.find(t => t.id === taskId);
  
  const [barcode, setBarcode] = useState("");
  const [manualQty, setManualQty] = useState<number>(0);
  const [shortDialogOpen, setShortDialogOpen] = useState(false);
  const [shortReason, setShortReason] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) setManualQty(task.qty);
  }, [task]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [scanStep]);

  if (!task) return <div className="p-8 text-center font-bold text-destructive">Không tìm thấy tác vụ Picking.</div>;

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBarcode = barcode.trim().toUpperCase();
    if (!cleanBarcode) return;

    if (scanStep === 'LOCATION') {
      if (cleanBarcode === task.sourceLocation.toUpperCase()) {
        toast.success("Vị trí chính xác");
        setScanStep('ITEM');
      } else {
        toast.error(`Sai vị trí! Cần đến ${task.sourceLocation}`);
      }
    } else if (scanStep === 'ITEM') {
      if (cleanBarcode === task.barcode || cleanBarcode === task.itemCode) {
        toast.success("Hàng hóa chính xác");
        setScanStep('QUANTITY');
      } else {
        toast.error("Mã hàng không khớp!");
      }
    }
    setBarcode("");
  };

  const handleFinalConfirm = () => {
    if (manualQty < task.qty) {
       setShortDialogOpen(true);
       return;
    }
    confirmPick(task.id, manualQty);
    toast.success("Đã hoàn tất lấy hàng!");
    router.push('/outbound/pick-tasks');
  };

  const handleShortPickConfirm = () => {
    shortPick(task.id, manualQty, shortReason);
    toast.warning(`Xác nhận Short Pick: ${manualQty}/${task.qty}`);
    setShortDialogOpen(false);
    router.push('/outbound/pick-tasks');
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] -m-6 bg-default-50">
      {/* Header Điều hướng & Trạng thái */}
      <div className="bg-white border-b border-default-200 p-4 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
               <Icon icon="heroicons:arrow-left" className="w-6 h-6" />
            </Button>
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-default-900">{task.taskNo}</h1>
                  <Badge color="primary" variant="soft">{task.zone}</Badge>
                  <Badge color="secondary" variant="outline" className="font-mono text-[10px]">{task.waveId}</Badge>
               </div>
               <div className="text-xs text-default-500 font-medium">Picking Task • {task.itemCode}</div>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-right mr-4">
               <div className="text-[10px] uppercase font-bold text-default-400">Tiến độ đợt (Wave)</div>
               <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">85%</span>
                  <div className="h-1.5 w-24 bg-default-100 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: '85%' }} />
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
         {/* Cột trái: Thông tin lấy hàng */}
         <div className="col-span-12 lg:col-span-4 space-y-6 overflow-y-auto pr-2">
            <Card className="border-l-4 border-primary">
               <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-default-400">Vị trí lấy hàng (Source)</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                     <div className="text-4xl font-black text-primary tracking-tight">{task.sourceLocation}</div>
                     <div className="text-[10px] font-bold text-primary/60 uppercase mt-1">PICK FROM THIS BIN</div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center border-b border-default-50 pb-2">
                        <span className="text-sm text-default-500">Sản phẩm</span>
                        <span className="text-sm font-bold text-default-900">{task.itemName}</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-default-50 pb-2">
                        <span className="text-sm text-default-500">Mã hàng</span>
                        <span className="text-sm font-mono font-bold text-default-900">{task.itemCode}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-default-500">Cần lấy</span>
                        <div className="text-right">
                           <span className="text-2xl font-black text-primary">{task.qty}</span>
                           <span className="text-sm font-bold text-default-500 ml-1">{task.uom}</span>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {task.alternateSources && task.alternateSources.length > 0 && (
               <Card className="border-2 border-warning/20 shadow-lg shadow-warning/5">
                  <CardHeader className="pb-2 bg-warning/5 border-b border-warning/10">
                     <CardTitle className="text-xs uppercase text-warning font-black flex items-center gap-2">
                        <Icon icon="heroicons:arrows-right-left" />
                        Vị trí thay thế (Alternate)
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                     {task.alternateSources.map((alt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white border border-default-100 rounded-lg hover:border-warning cursor-pointer transition-colors"
                             onClick={() => changeSource(task.id, alt.location)}>
                           <div>
                              <div className="text-sm font-bold text-default-900">{alt.location}</div>
                              <div className="text-[10px] text-default-400">Tồn: {alt.qty} units</div>
                           </div>
                           <Icon icon="heroicons:chevron-right" className="text-default-300" />
                        </div>
                     ))}
                  </CardContent>
               </Card>
            )}

            <Card>
               <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-default-400">Lịch sử lấy hàng gần đây</CardTitle></CardHeader>
               <CardContent className="space-y-2">
                  {recentPicks.length > 0 ? recentPicks.map(pick => (
                     <div key={pick.id} className="flex items-center gap-3 p-2 rounded-lg bg-white border border-default-50">
                        <div className="w-8 h-8 rounded bg-success/10 flex items-center justify-center text-success">
                           <Icon icon="heroicons:shopping-cart" className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="text-[10px] font-bold text-default-900 truncate">Lấy {pick.qty} {pick.itemCode}</div>
                           <div className="text-[9px] text-default-400">{pick.timestamp}</div>
                        </div>
                     </div>
                  )) : (
                     <div className="text-center py-4 text-xs text-default-400 italic">Chưa có lượt lấy hàng nào</div>
                  )}
               </CardContent>
            </Card>
         </div>

         {/* Cột phải: Workbench Thao tác chính */}
         <div className="col-span-12 lg:col-span-8 space-y-6 overflow-hidden flex flex-col">
            <Card className="shadow-xl border-t-4 border-primary overflow-hidden flex-1 flex flex-col">
               <div className="p-8 flex-1 flex flex-col justify-center space-y-10">
                  <div className="text-center space-y-4">
                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-2">
                        <Icon 
                           icon={scanStep === 'LOCATION' ? "heroicons:map-pin" : scanStep === 'ITEM' ? "heroicons:qr-code" : scanStep === 'QUANTITY' ? "heroicons:calculator" : "heroicons:check-badge"} 
                           className="w-10 h-10" 
                        />
                     </div>
                     <h2 className="text-3xl font-black text-default-900 uppercase tracking-tight">
                        {scanStep === 'LOCATION' ? 'Quét vị trí nguồn' : 
                         scanStep === 'ITEM' ? 'Quét mã sản phẩm' : 
                         scanStep === 'QUANTITY' ? 'Xác nhận số lượng' :
                         'Xác nhận hoàn tất'}
                     </h2>
                     <p className="text-default-500 font-medium">
                        {scanStep === 'LOCATION' ? `Đến kệ ${task.sourceLocation} và quét mã vị trí` : 
                         scanStep === 'ITEM' ? `Quét mã vạch trên sản phẩm ${task.itemName}` : 
                         scanStep === 'QUANTITY' ? `Sử dụng phím +/- hoặc nhập tay SL lấy thực tế` :
                         `Nhấn xác nhận để đóng task và chuyển task tiếp theo`}
                     </p>
                  </div>

                  {scanStep === 'QUANTITY' ? (
                     <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-center gap-8">
                           <Button 
                              variant="outline" 
                              className="h-20 w-20 rounded-2xl border-2 text-3xl font-bold"
                              onClick={() => setManualQty(Math.max(0, manualQty - 1))}
                           >
                              -
                           </Button>
                           <div className="text-center">
                              <Input 
                                 type="number"
                                 className="h-24 w-40 text-center text-6xl font-black border-none bg-transparent focus:ring-0"
                                 value={manualQty}
                                 onChange={(e) => setManualQty(Number(e.target.value))}
                              />
                              <div className="text-xs font-bold text-default-400 uppercase mt-2">Đơn vị: {task.uom}</div>
                           </div>
                           <Button 
                              variant="outline" 
                              className="h-20 w-20 rounded-2xl border-2 text-3xl font-bold"
                              onClick={() => setManualQty(manualQty + 1)}
                           >
                              +
                           </Button>
                        </div>
                        <Button 
                           className="w-full h-20 text-2xl font-black gap-3 rounded-2xl shadow-xl shadow-primary/20"
                           onClick={() => setScanStep('CONFIRM')}
                        >
                           XÁC NHẬN SỐ LƯỢNG
                        </Button>
                     </div>
                  ) : (
                     <form onSubmit={handleScan} className="max-w-xl mx-auto w-full space-y-6">
                        <div className="relative">
                           <Icon icon="heroicons:qr-code" className="absolute left-6 top-1/2 -translate-y-1/2 text-default-300 w-10 h-10" />
                           <Input 
                              ref={inputRef}
                              className="h-24 ps-20 text-4xl font-black tracking-[0.2em] uppercase border-4 border-primary/20 focus:border-primary focus:ring-primary shadow-2xl rounded-2xl"
                              placeholder="SCAN BARCODE..."
                              value={barcode}
                              onChange={(e) => setBarcode(e.target.value)}
                              disabled={scanStep === 'CONFIRM'}
                           />
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
                              HOÀN TẤT LẤY HÀNG
                           </Button>
                        )}
                     </form>
                  )}

                  <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto w-full pt-4">
                     <Button 
                        variant="outline" 
                        size="lg" 
                        className="h-14 font-bold gap-2 rounded-xl text-default-500"
                        onClick={() => {
                           if (confirm("Bạn có chắc chắn muốn bỏ qua task này?")) skipTask(task.id);
                        }}
                     >
                        <Icon icon="heroicons:forward" /> Bỏ qua Task
                     </Button>
                     <Button 
                        variant="outline" 
                        size="lg" 
                        className="h-14 font-bold gap-2 text-warning border-warning/20 hover:bg-warning/5 rounded-xl"
                        onClick={() => setShortDialogOpen(true)}
                     >
                        <Icon icon="heroicons:exclamation-triangle" /> Báo thiếu (Short)
                     </Button>
                  </div>
               </div>

               <div className="bg-default-100 p-4 px-8 flex justify-between items-center text-xs font-bold text-default-500 uppercase tracking-widest">
                  <div className="flex gap-4">
                     <span className={scanStep === 'LOCATION' ? 'text-primary' : ''}>1. Scan Location</span>
                     <Icon icon="heroicons:chevron-right" />
                     <span className={scanStep === 'ITEM' ? 'text-primary' : ''}>2. Scan Item</span>
                     <Icon icon="heroicons:chevron-right" />
                     <span className={scanStep === 'QUANTITY' ? 'text-primary' : ''}>3. Qty Confirm</span>
                  </div>
                  <span>Pick Status: {task.status}</span>
               </div>
            </Card>
         </div>
      </div>

      {/* Short Pick Dialog */}
      <Dialog open={shortDialogOpen} onOpenChange={setShortDialogOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-warning flex items-center gap-2">
                  <Icon icon="heroicons:exclamation-triangle" className="w-6 h-6" />
                  Xác nhận Short Pick (Lấy thiếu)
               </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
               <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                     <span>Số lượng yêu cầu:</span>
                     <span className="font-bold">{task.qty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span>Số lượng thực lấy:</span>
                     <span className="font-bold text-warning">{manualQty}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-warning/10">
                     <span>Chênh lệch thiếu:</span>
                     <span className="font-black text-destructive">-{task.qty - manualQty}</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <Label>Lý do lấy thiếu</Label>
                  <Textarea 
                     placeholder="Nhập lý do (vị trí hết hàng, hàng hư hỏng...)" 
                     value={shortReason}
                     onChange={(e) => setShortReason(e.target.value)}
                  />
               </div>
               <p className="text-[10px] text-default-400 italic">
                  * Hệ thống sẽ tự động tạo Backorder cho số lượng còn thiếu.
               </p>
            </div>
            <DialogFooter className="gap-2">
               <Button variant="outline" onClick={() => setShortDialogOpen(false)}>Hủy</Button>
               <Button color="warning" onClick={handleShortPickConfirm} disabled={!shortReason}>Xác nhận Short Pick</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
