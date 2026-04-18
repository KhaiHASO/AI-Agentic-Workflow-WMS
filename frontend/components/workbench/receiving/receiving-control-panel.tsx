"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

export const ReceivingControlPanel = () => {
  const { lines, activeLineId, scanHistory } = useReceivingStore();
  const activeLine = lines.find(l => l.id === activeLineId);

  return (
    <div className="p-4 space-y-6">
      {activeLine ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-default-900 uppercase">Chi tiết dòng đang chọn</h3>
            <div className="bg-white rounded-lg border border-default-200 p-4 space-y-4">
               <div className="h-32 bg-default-50 rounded flex items-center justify-center border-2 border-dashed border-default-200">
                  <Icon icon="heroicons:photo" className="w-12 h-12 text-default-200" />
               </div>
               <div>
                  <div className="text-sm font-bold">{activeLine.itemName}</div>
                  <div className="text-xs text-default-500 mt-1">{activeLine.itemCode}</div>
               </div>
               <div className="grid grid-cols-2 gap-4 border-t border-default-100 pt-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Tolerance</div>
                    <div className="text-xs font-medium">± {activeLine.overTolerancePct}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">QC Policy</div>
                    <div className="text-xs font-medium text-warning">{activeLine.qcPolicy}</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <Button variant="outline" size="sm" className="justify-start gap-2 h-10">
                <Icon icon="heroicons:tag" /> Lot/Serial
             </Button>
             <Button variant="outline" size="sm" className="justify-start gap-2 h-10 text-destructive border-destructive/20 hover:bg-destructive/5">
                <Icon icon="heroicons:beaker" /> Hư hỏng
             </Button>
             <Button variant="outline" size="sm" className="justify-start gap-2 h-10 text-warning border-warning/20 hover:bg-warning/5">
                <Icon icon="heroicons:arrows-right-left" /> Thay thế
             </Button>
             <Button variant="outline" size="sm" className="justify-start gap-2 h-10">
                <Icon icon="heroicons:x-circle" /> Đóng thiếu
             </Button>
          </div>
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center p-8 space-y-4 bg-white rounded-lg border-2 border-dashed border-default-200 opacity-50">
           <Icon icon="heroicons:cursor-arrow-rays" className="w-12 h-12 text-default-300" />
           <p className="text-sm text-default-500">Chọn một dòng trong bảng hoặc quét mã vạch để xử lý chi tiết</p>
        </div>
      )}

      <div className="space-y-4 pt-6 border-t border-default-200">
         <h3 className="text-xs font-bold text-default-500 uppercase px-2">Lịch sử quét gần đây</h3>
         <div className="space-y-2">
            {scanHistory.length > 0 ? (
              scanHistory.slice(0, 5).map(event => (
                <div key={event.id} className="bg-white p-3 rounded-lg border border-default-100 flex items-start gap-3 relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-success" />
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-bold text-default-400">{event.timestamp}</span>
                         <Badge color="success" className="text-[8px] py-0 px-1">MATCHED</Badge>
                      </div>
                      <div className="text-[11px] font-bold text-default-700 truncate">{event.itemCode}</div>
                      <div className="text-[10px] text-default-500 truncate">{event.barcode}</div>
                   </div>
                   <div className="text-lg font-black text-primary">+{event.qty}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-default-400 italic">Chưa có lượt quét nào</div>
            )}
         </div>
         {scanHistory.length > 5 && (
           <Button variant="ghost" size="sm" className="w-full text-xs text-primary font-bold">Xem tất cả lịch sử</Button>
         )}
      </div>
    </div>
  );
};
