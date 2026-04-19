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
    <div className="border border-default-200 rounded-lg overflow-hidden">
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
              className={`cursor-pointer transition-colors ${activeLineId === line.id ? 'bg-primary/5 ring-2 ring-primary ring-inset' : 'hover:bg-default-50/50'}`}
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
              <TableCell className={`text-center font-bold text-lg ${line.receivedQty > 0 ? 'text-primary' : 'text-default-300'}`}>
                {line.receivedQty}
              </TableCell>
              <TableCell className="text-center text-xs text-default-500">{line.uom}</TableCell>
              <TableCell>
                <Badge variant="soft" color={getStatusColor(line.status)}>{line.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                   <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-default-500"
                    title="Chỉnh sửa số lượng"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingLine(line);
                    }}
                   >
                     <Icon icon="heroicons:pencil-square" />
                   </Button>

                   {line.requiresLot && (
                     <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-info"
                      title="Nhập Lot/Expiry"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLotLine(line);
                      }}
                     >
                       <Icon icon="heroicons:tag" />
                     </Button>
                   )}

                   {line.requiresSerial && (
                     <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-info"
                      title="Nhập Serial"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSerialLine(line);
                      }}
                     >
                       <Icon icon="heroicons:qr-code" />
                     </Button>
                   )}

                   <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-warning"
                    title="Phân loại chất lượng"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQcLine(line);
                    }}
                   >
                     <Icon icon="heroicons:beaker" />
                   </Button>

                   {line.allowsSubstitution && (
                     <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-purple-500"
                      title="Sử dụng hàng thay thế"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSubLine(line);
                      }}
                     >
                       <Icon icon="heroicons:arrows-right-left" />
                     </Button>
                   )}

                   <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-destructive"
                    title="Đóng thiếu (Close Short)"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShortLine(line);
                    }}
                   >
                     <Icon icon="heroicons:x-circle" />
                   </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingLine && (
        <ManualQtyModal 
          open={!!editingLine}
          onClose={() => setEditingLine(null)}
          onConfirm={handleConfirmQty}
          itemName={editingLine.itemName}
          currentQty={editingLine.receivedQty}
        />
      )}

      {qcLine && (
        <QualitySplitModal
          open={!!qcLine}
          onClose={() => setQcLine(null)}
          onConfirm={handleConfirmQC}
          itemName={qcLine.itemName}
          totalQty={qcLine.receivedQty}
        />
      )}

      {lotLine && (
        <LotExpiryModal
          open={!!lotLine}
          onClose={() => setLotLine(null)}
          onConfirm={handleConfirmLot}
          itemName={lotLine.itemName}
        />
      )}

      {serialLine && (
        <SerialEntryModal
          open={!!serialLine}
          onClose={() => setSerialLine(null)}
          onConfirm={handleConfirmSerial}
          itemName={serialLine.itemName}
          existingSerials={serialLine.serials || []}
          requiredQty={serialLine.receivedQty}
        />
      )}

      {subLine && (
        <SubstituteModal
          open={!!subLine}
          onClose={() => setSubLine(null)}
          onConfirm={handleConfirmSub}
          itemName={subLine.itemName}
          candidates={subLine.substitutionCandidates || []}
        />
      )}

      {shortLine && (
        <CloseShortModal
          open={!!shortLine}
          onClose={() => setShortLine(null)}
          onConfirm={handleConfirmShort}
          itemName={shortLine.itemName}
          shortQty={shortLine.expectedQty - shortLine.receivedQty}
        />
      )}
    </div>

  );
};
