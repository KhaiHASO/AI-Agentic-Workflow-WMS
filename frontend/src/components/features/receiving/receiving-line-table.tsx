"use client"

import { useState } from "react";
import { useReceivingStore } from "@/store/receiving-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ManualQtyModal } from "./modals/manual-qty-modal";
import { QualitySplitModal } from "./modals/quality-split-modal";
import { LotExpiryModal } from "./modals/lot-expiry-modal";
import { SerialEntryModal } from "./modals/serial-entry-modal";
import { SubstituteModal } from "./modals/substitute-modal";
import { CloseShortModal } from "./modals/close-short-modal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ReceivingLineTable = () => {
  const { lines, activeLineId, setActiveLine, updateLineQty, addLotInfo, addSerial, recordQualitySplit, handleSubstitution, closeShort } = useReceivingStore();
  const [editingLine, setEditingLine] = useState<any>(null);
  const [qcLine, setQcLine] = useState<any>(null);
  const [lotLine, setLotLine] = useState<any>(null);
  const [serialLine, setSerialLine] = useState<any>(null);
  const [subLine, setSubLine] = useState<any>(null);
  const [shortLine, setShortLine] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Partial': return 'info';
      case 'Exception': return 'destructive';
      case 'QC Pending': return 'warning';
      case 'Closed Short': return 'secondary';
      default: return 'default';
    }
  };

  const handleConfirmQty = (qty: number) => {
    if (editingLine) {
      updateLineQty(editingLine.id, 'receivedQty', qty);
      setEditingLine(null);
      toast.success(`Đã cập nhật số lượng cho ${editingLine.itemName}`);
    }
  };

  const handleConfirmQC = (data: any) => {
    if (qcLine) {
      recordQualitySplit(qcLine.id, data);
      setQcLine(null);
      toast.success(`Đã phân loại chất lượng cho ${qcLine.itemName}`);
    }
  };

  const handleConfirmLot = (lot: any) => {
    if (lotLine) {
      addLotInfo(lotLine.id, lot);
      setLotLine(null);
      toast.success(`Đã thêm số Lot ${lot.lotNo}`);
    }
  };

  const handleConfirmSerial = (serial: string) => {
    if (serialLine) {
      addSerial(serialLine.id, serial);
      setSerialLine(null);
      toast.success(`Đã thêm Serial ${serial}`);
    }
  };

  const handleConfirmSub = (sub: any) => {
    if (subLine) {
      handleSubstitution(subLine.id, sub);
      setSubLine(null);
      toast.success(`Đã thay thế bằng ${sub.itemName}`);
    }
  };

  const handleConfirmShort = (reason: string) => {
    if (shortLine) {
      closeShort(shortLine.id, reason);
      setShortLine(null);
      toast.success(`Đã đóng thiếu cho ${shortLine.itemName}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block border border-default-200 rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-default-50">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Mặt hàng</TableHead>
              <TableHead className="text-center">Expected</TableHead>
              <TableHead className="text-center">Received</TableHead>
              <TableHead className="text-center">UOM</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line) => (
              <TableRow 
                key={line.id} 
                className={cn(
                  "cursor-pointer transition-colors",
                  activeLineId === line.id ? "bg-primary/5 ring-2 ring-primary ring-inset" : "hover:bg-default-50/50"
                )}
                onClick={() => setActiveLine(line.id)}
              >
                <TableCell className="text-center font-bold text-default-400">{line.lineNo}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-default-900">{line.itemName}</span>
                    <span className="text-xs text-default-500 font-mono">{line.itemCode} | {line.barcode}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold">{line.expectedQty}</TableCell>
                <TableCell className={cn(
                  "text-center font-bold text-lg",
                  line.receivedQty > 0 ? "text-primary" : "text-default-300"
                )}>
                  {line.receivedQty}
                </TableCell>
                <TableCell className="text-center text-xs text-default-500">{line.uom}</TableCell>
                <TableCell>
                  <Badge variant="soft" color={getStatusColor(line.status)}>{line.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <ActionButton icon="heroicons:pencil-square" title="Chỉnh sửa số lượng" onClick={(e) => { e.stopPropagation(); setEditingLine(line); }} />
                    {line.requiresLot && <ActionButton icon="heroicons:tag" color="text-info" title="Nhập Lot/Expiry" onClick={(e) => { e.stopPropagation(); setLotLine(line); }} />}
                    {line.requiresSerial && <ActionButton icon="heroicons:qr-code" color="text-info" title="Nhập Serial" onClick={(e) => { e.stopPropagation(); setSerialLine(line); }} />}
                    <ActionButton icon="heroicons:beaker" color="text-warning" title="Phân loại chất lượng" onClick={(e) => { e.stopPropagation(); setQcLine(line); }} />
                    {line.allowsSubstitution && <ActionButton icon="heroicons:arrows-right-left" color="text-purple-500" title="Sử dụng hàng thay thế" onClick={(e) => { e.stopPropagation(); setSubLine(line); }} />}
                    <ActionButton icon="heroicons:x-circle" color="text-destructive" title="Đóng thiếu (Close Short)" onClick={(e) => { e.stopPropagation(); setShortLine(line); }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3 pb-20 md:pb-0">
        {lines.map((line) => (
          <div 
            key={line.id}
            className={cn(
              "bg-white border rounded-lg p-4 space-y-3 transition-all active:scale-[0.98]",
              activeLineId === line.id ? "border-primary ring-1 ring-primary shadow-md" : "border-default-200"
            )}
            onClick={() => setActiveLine(line.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-bold bg-default-100 text-default-600 w-6 h-6 rounded flex items-center justify-center">
                  {line.lineNo}
                </span>
                <Badge variant="soft" color={getStatusColor(line.status)} className="text-[10px]">
                  {line.status}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Tiến độ</div>
                <div className="text-sm font-black">
                  <span className={line.receivedQty > 0 ? "text-primary" : "text-default-400"}>{line.receivedQty}</span>
                  <span className="text-default-300 mx-1">/</span>
                  <span>{line.expectedQty}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-default-900 leading-tight">{line.itemName}</div>
              <div className="text-[10px] text-default-500 mt-1 font-mono uppercase">{line.itemCode}</div>
            </div>

            <div className="flex gap-2 pt-2 overflow-x-auto pb-1 no-scrollbar">
              <MobileActionButton icon="heroicons:pencil-square" label="Qty" onClick={() => setEditingLine(line)} />
              {line.requiresLot && <MobileActionButton icon="heroicons:tag" label="Lot" color="info" onClick={() => setLotLine(line)} />}
              {line.requiresSerial && <MobileActionButton icon="heroicons:qr-code" label="SN" color="info" onClick={() => setSerialLine(line)} />}
              <MobileActionButton icon="heroicons:beaker" label="QC" color="warning" onClick={() => setQcLine(line)} />
              {line.allowsSubstitution && <MobileActionButton icon="heroicons:arrows-right-left" label="Sub" color="primary" onClick={() => setSubLine(line)} />}
              <MobileActionButton icon="heroicons:x-circle" label="Short" color="destructive" onClick={() => setShortLine(line)} />
            </div>
          </div>
        ))}
      </div>

      {/* Shared Modals */}
      {editingLine && <ManualQtyModal open={!!editingLine} onClose={() => setEditingLine(null)} onConfirm={handleConfirmQty} itemName={editingLine.itemName} currentQty={editingLine.receivedQty} />}
      {qcLine && <QualitySplitModal open={!!qcLine} onClose={() => setQcLine(null)} onConfirm={handleConfirmQC} itemName={qcLine.itemName} totalQty={qcLine.receivedQty} />}
      {lotLine && <LotExpiryModal open={!!lotLine} onClose={() => setLotLine(null)} onConfirm={handleConfirmLot} itemName={lotLine.itemName} />}
      {serialLine && <SerialEntryModal open={!!serialLine} onClose={() => setSerialLine(null)} onConfirm={handleConfirmSerial} itemName={serialLine.itemName} existingSerials={serialLine.serials || []} requiredQty={serialLine.receivedQty} />}
      {subLine && <SubstituteModal open={!!subLine} onClose={() => setSubLine(null)} onConfirm={handleConfirmSub} itemName={subLine.itemName} candidates={subLine.substitutionCandidates || []} />}
      {shortLine && <CloseShortModal open={!!shortLine} onClose={() => setShortLine(null)} onConfirm={handleConfirmShort} itemName={shortLine.itemName} shortQty={shortLine.expectedQty - shortLine.receivedQty} />}
    </div>
  );
};

const ActionButton = ({ icon, color = "text-default-500", title, onClick }: any) => (
  <Button size="icon" variant="ghost" className={cn("h-8 w-8", color)} title={title} onClick={onClick}>
    <Icon icon={icon} />
  </Button>
);

const MobileActionButton = ({ icon, label, color = "default", onClick }: any) => (
  <Button 
    variant="soft" 
    size="sm" 
    color={color} 
    className="h-8 gap-1.5 px-2.5 flex-shrink-0" 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
  >
    <Icon icon={icon} className="w-3.5 h-3.5" />
    <span className="text-[10px] font-bold uppercase">{label}</span>
  </Button>
);
