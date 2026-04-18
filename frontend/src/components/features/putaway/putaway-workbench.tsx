"use client"

import { usePutawayStore } from "@/store/putaway-store";
import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const PutawayWorkbench = ({ taskId }: { taskId: string }) => {
  const router = useRouter();
  const { tasks, confirmPutaway } = usePutawayStore();
  const task = tasks.find(t => t.id === taskId);
  const [scannedLoc, setScannedLoc] = useState("");

  if (!task) return <div>Không tìm thấy tác vụ.</div>;

  const handleConfirm = () => {
    if (scannedLoc !== task.suggestedLocation) {
      toast.warning("Vị trí quét không khớp với đề xuất. Hệ thống sẽ ghi nhận vị trí mới.");
    }
    confirmPutaway(taskId, scannedLoc || task.suggestedLocation);
    toast.success("Xác nhận cất hàng thành công!");
    router.push('/inbound/putaway-tasks');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Putaway Workbench: ${task.taskNo}`}
        subtitle="Thực hiện cất hàng từ staging vào vị trí lưu trữ"
        backButton
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Nguồn hàng */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className="border-l-4 border-primary">
            <CardHeader><CardTitle className="text-sm">Nguồn hàng (Source)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <div className="p-3 bg-default-50 rounded-lg border border-default-100">
                  <div className="text-[10px] uppercase font-bold text-default-400">Vị trí hiện tại</div>
                  <div className="text-lg font-black text-primary">{task.sourceLocation}</div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span>Sản phẩm:</span><span className="font-bold">{task.itemName}</span></div>
                  <div className="flex justify-between text-sm"><span>Số lượng:</span><span className="font-bold text-primary">{task.qty} {task.uom}</span></div>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm">Gợi ý vị trí (Suggested)</CardTitle></CardHeader>
            <CardContent>
               <div className="text-center p-6 bg-info/5 border-2 border-dashed border-info/20 rounded-xl">
                  <div className="text-3xl font-black text-info tracking-tighter">{task.suggestedLocation}</div>
                  <div className="text-[10px] text-info/60 uppercase font-bold mt-2">Recommended Slot</div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Thao tác xác nhận */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="shadow-lg border-2 border-success/20">
            <CardHeader className="bg-success/5 border-b border-success/10">
               <CardTitle className="text-success flex items-center gap-2">
                  <Icon icon="heroicons:check-badge" className="w-6 h-6" />
                  Xác nhận vị trí đích
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
               <div className="space-y-4">
                  <label className="text-lg font-bold text-default-700 block">QUÉT MÃ VẠCH VỊ TRÍ (BIN/LOCATION)</label>
                  <div className="relative">
                    <Icon icon="heroicons:qr-code" className="absolute left-4 top-1/2 -translate-y-1/2 text-default-400 w-8 h-8" />
                    <Input 
                      className="h-20 ps-16 text-3xl font-black tracking-widest uppercase border-2 border-success/30 focus:border-success focus:ring-success"
                      placeholder="SCAN DESTINATION..."
                      value={scannedLoc}
                      onChange={(e) => setScannedLoc(e.target.value)}
                      autoFocus
                    />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="lg" className="h-16 text-lg font-bold gap-2" color="warning">
                     <Icon icon="heroicons:exclamation-triangle" />
                     Báo ngoại lệ
                  </Button>
                  <Button size="lg" className="h-16 text-lg font-bold gap-2" color="success" onClick={handleConfirm}>
                     <Icon icon="heroicons:arrow-down-tray" />
                     Xác nhận hoàn tất
                  </Button>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm uppercase text-default-400">Vị trí thay thế khả dụng</CardTitle></CardHeader>
            <CardContent className="flex gap-2">
               {['ZONE-A-01-03', 'ZONE-A-01-04', 'ZONE-A-02-01'].map(loc => (
                 <Button key={loc} variant="soft" color="secondary" size="sm" onClick={() => setScannedLoc(loc)}>{loc}</Button>
               ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
