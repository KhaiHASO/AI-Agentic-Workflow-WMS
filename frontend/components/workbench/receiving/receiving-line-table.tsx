"use client"

import { useState } from "react";
import { useReceivingStore } from "@/store/receiving-store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { ManualQtyModal } from "./modals/manual-qty-modal";
import { QualitySplitModal } from "./modals/quality-split-modal";
import { toast } from "sonner";

export const ReceivingLineTable = () => {
  const { lines, activeLineId, setActiveLine, updateLineQty } = useReceivingStore();
  const [editingLine, setEditingLine] = useState<any>(null);
  const [qcLine, setQcLine] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Partial': return 'info';
      case 'Exception': return 'destructive';
      case 'QC Pending': return 'warning';
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
      updateLineQty(qcLine.id, 'acceptedQty', data.accepted);
      updateLineQty(qcLine.id, 'damagedQty', data.damaged);
      updateLineQty(qcLine.id, 'qcQty', data.qc);
      setQcLine(null);
      toast.success(`Đã phân loại chất lượng cho ${qcLine.itemName}`);
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingLine(line);
                    }}
                   >
                     <Icon icon="heroicons:pencil-square" />
                   </Button>
                   <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      setQcLine(line);
                    }}
                   >
                     <Icon icon="heroicons:beaker" />
                   </Button>
                   <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                     <Icon icon="heroicons:exclamation-triangle" />
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
    </div>
  );
};
