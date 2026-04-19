"use client"

import { useState } from "react";
import { useReceivingStore } from "@/store/receiving-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { LotExpiryModal } from "./modals/lot-expiry-modal";
import { SerialEntryModal } from "./modals/serial-entry-modal";
import { SubstituteModal } from "./modals/substitute-modal";
import { CloseShortModal } from "./modals/close-short-modal";
import { toast } from "sonner";

export const ReceivingControlPanel = () => {
  const { lines, activeLineId, scanHistory, addLotInfo, addSerial, handleSubstitution, closeShort } = useReceivingStore();
  const activeLine = lines.find(l => l.id === activeLineId);

  const [lotOpen, setLotOpen] = useState(false);
  const [serialOpen, setSerialOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [shortOpen, setShortOpen] = useState(false);

  const handleConfirmLot = (lot: any) => {
    if (activeLine) {
      addLotInfo(activeLine.id, lot);
      toast.success(`Đã thêm số Lot ${lot.lotNo}`);
    }
  };

  const handleConfirmSerial = (serial: string) => {
    if (activeLine) {
      addSerial(activeLine.id, serial);
      toast.success(`Đã thêm Serial ${serial}`);
    }
  };

  const handleConfirmSub = (sub: any) => {
    if (activeLine) {
      handleSubstitution(activeLine.id, sub);
      toast.success(`Đã thay thế bằng ${sub.itemName}`);
    }
  };

  const handleConfirmShort = (reason: string) => {
    if (activeLine) {
      closeShort(activeLine.id, reason);
      toast.success(`Đã đóng thiếu cho ${activeLine.itemName}`);
    }
  };

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
               
               <div className="space-y-3 pt-4 border-t border-default-100">
                  {activeLine.requiresLot && (
                    <div className="space-y-2">
                       <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Thông tin Lot ({activeLine.lots?.length || 0})</div>
                       <div className="space-y-1">
                          {activeLine.lots?.map((lot, idx) => (
                            <div key={idx} className="bg-default-50 p-2 rounded text-[10px] flex justify-between">
                               <span className="font-bold">{lot.lotNo}</span>
                               <span className="text-default-400">Exp: {lot.expiryDate}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}
                  {activeLine.requiresSerial && (
                    <div className="space-y-2">
                       <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Serials ({activeLine.serials?.length || 0} / {activeLine.receivedQty})</div>
                       <div className="flex flex-wrap gap-1">
                          {activeLine.serials?.slice(0, 5).map((s, idx) => (
                            <Badge key={idx} variant="outline" className="text-[9px] px-1 py-0">{s}</Badge>
                          ))}
                          {(activeLine.serials?.length || 0) > 5 && <span className="text-[9px] text-default-400">...</span>}
                       </div>
                    </div>
                  )}
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
             <Button 
               variant="outline" 
               size="sm" 
               className="justify-start gap-2 h-10"
               disabled={!activeLine.requiresLot && !activeLine.requiresSerial}
               onClick={() => activeLine.requiresLot ? setLotOpen(true) : setSerialOpen(true)}
             >
                <Icon icon="heroicons:tag" /> {activeLine.requiresLot ? 'Lot Info' : 'Serials'}
             </Button>
             <Button 
               variant="outline" 
               size="sm" 
               className="justify-start gap-2 h-10 text-destructive border-destructive/20 hover:bg-destructive/5"
             >
                <Icon icon="heroicons:beaker" /> Hư hỏng
             </Button>
             <Button 
               variant="outline" 
               size="sm" 
               className="justify-start gap-2 h-10 text-warning border-warning/20 hover:bg-warning/5"
               disabled={!activeLine.allowsSubstitution}
               onClick={() => setSubOpen(true)}
             >
                <Icon icon="heroicons:arrows-right-left" /> Thay thế
             </Button>
             <Button 
               variant="outline" 
               size="sm" 
               className="justify-start gap-2 h-10"
               onClick={() => setShortOpen(true)}
             >
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

      {/* Modals */}
      {activeLine && (
        <>
          <LotExpiryModal 
            open={lotOpen} 
            onClose={() => setLotOpen(false)} 
            onConfirm={handleConfirmLot} 
            itemName={activeLine.itemName} 
          />
          <SerialEntryModal 
            open={serialOpen} 
            onClose={() => setSerialOpen(false)} 
            onConfirm={handleConfirmSerial} 
            itemName={activeLine.itemName} 
            existingSerials={activeLine.serials || []}
            requiredQty={activeLine.receivedQty}
          />
          <SubstituteModal 
            open={subOpen} 
            onClose={() => setSubOpen(false)} 
            onConfirm={handleConfirmSub} 
            itemName={activeLine.itemName} 
            candidates={activeLine.substitutionCandidates || []} 
          />
          <CloseShortModal 
            open={shortOpen} 
            onClose={() => setShortOpen(false)} 
            onConfirm={handleConfirmShort} 
            itemName={activeLine.itemName} 
            shortQty={activeLine.expectedQty - activeLine.receivedQty} 
          />
        </>
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
