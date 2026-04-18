"use client"

import { usePickingStore } from "@/store/picking-store";
import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const PickingWorkbench = ({ taskId }: { taskId: string }) => {
  const router = useRouter();
  const { tasks, confirmPick } = usePickingStore();
  const task = tasks.find(t => t.id === taskId);
  const [scannedItem, setScannedItem] = useState("");
  const [pickedQty, setPickedQty] = useState<number | string>("");
  const [step, setStep] = useState<'location' | 'item' | 'qty'>('location');
  const [scannedLoc, setScannedLoc] = useState("");
  
  if (!task) return <div>Không tìm thấy tác vụ Picking.</div>;

  const handleLocConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedLoc.toUpperCase() === task.sourceLocation.toUpperCase()) {
      toast.success("Vị trí chính xác. Vui lòng quét sản phẩm.");
      setStep('item');
    } else {
      toast.error("Sai vị trí lấy hàng!");
    }
  };

  const handleItemConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedItem === task.barcode || scannedItem === task.itemCode) {
      toast.success("Sản phẩm khớp. Nhập số lượng lấy.");
      setStep('qty');
      setPickedQty(task.qty);
    } else {
      toast.error("Mã vạch sản phẩm không khớp!");
    }
  };

  const handlePickComplete = () => {
    confirmPick(taskId, Number(pickedQty));
    if (Number(pickedQty) < task.qty) {
      toast.warning(`Hoàn tất với tình trạng thiếu (Short Pick: ${task.qty - Number(pickedQty)})`);
    } else {
      toast.success("Lấy hàng hoàn tất!");
    }
    router.push('/outbound/pick-tasks');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Picking Workbench: ${task.taskNo}`}
        subtitle={`Lấy hàng cho Đợt xuất: ${task.waveId}`}
        backButton
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Chỉ dẫn lấy hàng */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className={`border-l-4 ${step === 'location' ? 'border-primary scale-105 transition-transform' : 'border-default-200'}`}>
            <CardHeader><CardTitle className="text-xs uppercase font-bold text-default-400">BƯỚC 1: ĐẾN VỊ TRÍ</CardTitle></CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-primary tracking-tighter">{task.sourceLocation}</div>
               <div className="text-xs font-medium text-default-500 mt-1">{task.zone}</div>
            </CardContent>
          </Card>

          <Card className={`border-l-4 ${step === 'item' ? 'border-primary scale-105 transition-transform' : 'border-default-200'}`}>
            <CardHeader><CardTitle className="text-xs uppercase font-bold text-default-400">BƯỚC 2: QUÉT SẢN PHẨM</CardTitle></CardHeader>
            <CardContent className="space-y-2">
               <div className="font-bold text-default-800">{task.itemName}</div>
               <div className="text-xs font-mono bg-default-100 p-1 rounded inline-block">{task.itemCode}</div>
            </CardContent>
          </Card>

          <Card className={`border-l-4 ${step === 'qty' ? 'border-primary scale-105 transition-transform' : 'border-default-200'}`}>
            <CardHeader><CardTitle className="text-xs uppercase font-bold text-default-400">BƯỚC 3: XÁC NHẬN SL</CardTitle></CardHeader>
            <CardContent>
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-primary">{task.qty}</span>
                  <span className="text-sm font-bold text-default-500">{task.uom}</span>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Khu vực tác nghiệp */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-full flex flex-col shadow-xl">
             <div className="p-8 flex-1 flex flex-col justify-center space-y-8">
                {step === 'location' && (
                  <form onSubmit={handleLocConfirm} className="space-y-6 animate-in fade-in zoom-in duration-300">
                     <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">Xác nhận bạn đã đến vị trí</h3>
                        <p className="text-default-500">Quét mã vạch dán tại kệ hàng để tiếp tục</p>
                     </div>
                     <div className="relative">
                        <Icon icon="heroicons:map-pin" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 text-primary" />
                        <Input 
                          className="h-24 ps-16 text-4xl font-black uppercase tracking-widest border-4 border-primary/20 focus:border-primary"
                          placeholder="QUÉT VỊ TRÍ..."
                          value={scannedLoc}
                          onChange={(e) => setScannedLoc(e.target.value)}
                          autoFocus
                        />
                     </div>
                     <Button type="submit" className="w-full h-16 text-xl font-bold" color="primary">XÁC NHẬN VỊ TRÍ</Button>
                  </form>
                )}

                {step === 'item' && (
                  <form onSubmit={handleItemConfirm} className="space-y-6 animate-in fade-in zoom-in duration-300">
                     <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">Xác nhận đúng hàng hóa</h3>
                        <p className="text-default-500">Quét mã vạch in trên bao bì sản phẩm</p>
                     </div>
                     <div className="relative">
                        <Icon icon="heroicons:qr-code" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 text-primary" />
                        <Input 
                          className="h-24 ps-16 text-4xl font-black uppercase tracking-widest border-4 border-primary/20 focus:border-primary"
                          placeholder="QUÉT MÃ SẢN PHẨM..."
                          value={scannedItem}
                          onChange={(e) => setScannedItem(e.target.value)}
                          autoFocus
                        />
                     </div>
                     <div className="flex gap-4">
                        <Button type="button" variant="outline" className="flex-1 h-14 font-bold" onClick={() => setStep('location')}>QUAY LẠI</Button>
                        <Button type="submit" className="flex-[2] h-14 font-bold" color="primary">XÁC NHẬN HÀNG</Button>
                     </div>
                  </form>
                )}

                {step === 'qty' && (
                  <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                     <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">Xác nhận số lượng lấy</h3>
                        <p className="text-default-500">Kiểm tra và nhập số lượng thực tế bạn đã lấy</p>
                     </div>
                     <div className="flex items-center justify-center gap-6">
                        <Button variant="outline" size="icon" className="h-20 w-20 rounded-2xl border-2" onClick={() => setPickedQty(Math.max(0, Number(pickedQty) - 1))}>
                           <Icon icon="heroicons:minus" className="h-10 w-10" />
                        </Button>
                        <Input 
                          type="number"
                          className="h-24 w-48 text-center text-6xl font-black border-none bg-default-50 focus:ring-0"
                          value={pickedQty}
                          onChange={(e) => setPickedQty(e.target.value)}
                        />
                        <Button variant="outline" size="icon" className="h-20 w-20 rounded-2xl border-2" onClick={() => setPickedQty(Number(pickedQty) + 1)}>
                           <Icon icon="heroicons:plus" className="h-10 w-10" />
                        </Button>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-14 font-bold" color="warning" onClick={() => handlePickComplete()}>BÁO THIẾU (SHORT)</Button>
                        <Button className="h-14 font-bold" color="success" onClick={handlePickComplete}>HOÀN TẤT LẤY HÀNG</Button>
                     </div>
                  </div>
                )}
             </div>
             
             <div className="p-4 bg-default-50 border-t border-default-100 flex justify-between">
                <Button variant="ghost" color="destructive" className="font-bold gap-2">
                   <Icon icon="heroicons:x-circle" /> BỎ QUA TASK NÀY
                </Button>
                <div className="flex items-center gap-2 text-xs font-bold text-default-400">
                   <Icon icon="heroicons:information-circle" />
                   CẦN LẤY TỔNG: {task.qty} {task.uom}
                </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
