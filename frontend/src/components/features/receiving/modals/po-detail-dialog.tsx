"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { PO } from "@/lib/mock-data/inbound";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface PODetailDialogProps {
  open: boolean;
  onClose: () => void;
  po: PO | null;
}

const PODetailDialog = ({ open, onClose, po }: PODetailDialogProps) => {
  const router = useRouter();
  if (!po) return null;

  const handleStartReceiving = () => {
    router.push('/inbound/master-receipts');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 border-b border-default-100">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Icon icon="heroicons:document-text" className="text-primary w-6 h-6" />
                PO: {po.poNo}
            </DialogTitle>
            <Badge color={po.status === 'Open' ? 'info' : 'default'} variant="soft">
              {po.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 grid grid-cols-2 gap-4 bg-default-50">
          <div className="space-y-1">
            <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Nhà cung cấp</div>
            <div className="text-sm font-bold text-default-900">{po.supplier}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] text-default-400 uppercase font-bold tracking-wider">Ngày dự kiến (ETA)</div>
            <div className="text-sm font-bold text-default-900">{po.eta}</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="px-6 py-4">
            <h3 className="text-sm font-bold text-default-900 uppercase flex items-center gap-2">
              Danh sách mặt hàng
              <span className="text-xs font-normal text-default-500">({po.lines.length} dòng)</span>
            </h3>
          </div>
          
          <ScrollArea className="flex-1 px-6 pb-6">
            <div className="border border-default-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-default-50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Mã hàng</TableHead>
                      <TableHead>Tên mặt hàng</TableHead>
                      <TableHead className="text-right">Số lượng</TableHead>
                      <TableHead className="text-center">ĐVT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {po.lines.length > 0 ? (
                      po.lines.map((line, index) => (
                        <TableRow key={line.id} className="hover:bg-default-50/50">
                          <TableCell className="text-center text-default-500 font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-mono text-xs font-bold whitespace-nowrap">
                            {line.itemCode}
                          </TableCell>
                          <TableCell className="text-sm min-w-[200px]">
                            {line.itemName}
                          </TableCell>
                          <TableCell className="text-right font-bold text-primary">
                            {line.qty}
                          </TableCell>
                          <TableCell className="text-center text-xs text-default-500 uppercase">
                            {line.uom}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-default-400 italic">
                          Không có dữ liệu mặt hàng trong PO này.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="p-6 bg-default-50 border-t border-default-100">
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" className="gap-2" onClick={() => onClose()}>
                <Icon icon="heroicons:arrow-path" className="w-4 h-4" />
                Đồng bộ lại
            </Button>
            <div className="flex gap-2">
                <Button variant="ghost" onClick={onClose}>
                    Đóng
                </Button>
                <Button color="primary" className="gap-2" onClick={handleStartReceiving}>
                    <Icon icon="heroicons:play-circle" className="w-4 h-4" />
                    Bắt đầu nhận hàng
                </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PODetailDialog;
