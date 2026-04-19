"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { mockPOs, PO } from "@/lib/mock-data/inbound";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CreateMasterReceiptDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateMasterReceiptDialog = ({
  open,
  onClose,
}: CreateMasterReceiptDialogProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPOs, setSelectedPOs] = useState<string[]>([]);

  const filteredPOs = mockPOs.filter(
    (po) =>
      po.poNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTogglePO = (poId: string) => {
    setSelectedPOs((prev) =>
      prev.includes(poId) ? prev.filter((id) => id !== poId) : [...prev, poId]
    );
  };

  const handleCreate = () => {
    if (selectedPOs.length === 0) {
      toast.error("Vui lòng chọn ít nhất một PO");
      return;
    }

    // Mock creation
    const newMrId = `mr-new-${Math.floor(Math.random() * 1000)}`;
    toast.success(`Đã tạo Master Receipt ${newMrId} từ ${selectedPOs.length} PO`);
    
    // Simulate navigation to the workbench for the newly created MR
    // In a real app, this would be /inbound/drafts/[id] or /inbound/master-receipts/[id]
    // Based on menu: /inbound/drafts/mr-1 is the Receiving Workbench (Draft)
    router.push(`/inbound/drafts/mr-1`); 
    onClose();
  };

  const totalLines = mockPOs
    .filter((po) => selectedPOs.includes(po.id))
    .reduce((acc, po) => acc + po.lines.length, 0);

  const totalQty = mockPOs
    .filter((po) => selectedPOs.includes(po.id))
    .reduce(
      (acc, po) => acc + po.lines.reduce((lineAcc, line) => lineAcc + line.qty, 0),
      0
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Icon icon="heroicons:plus-circle" className="text-primary w-6 h-6" />
            Tạo mới Master Receipt (Gom PO)
          </DialogTitle>
          <p className="text-sm text-default-500">
            Chọn một hoặc nhiều đơn mua hàng (PO) để bắt đầu quá trình nhận hàng tập trung.
          </p>
        </DialogHeader>

        <div className="px-6 py-4 flex gap-4 items-center border-b border-default-100">
          <div className="relative flex-1">
            <Icon
              icon="heroicons:magnifying-glass"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 w-4 h-4"
            />
            <Input
              placeholder="Tìm theo số PO hoặc Nhà cung cấp..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm font-medium whitespace-nowrap">
            Đã chọn: <span className="text-primary">{selectedPOs.length} PO</span>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Số PO</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Ngày dự kiến (ETA)</TableHead>
                <TableHead className="text-center">Số dòng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPOs.length > 0 ? (
                filteredPOs.map((po) => (
                  <TableRow
                    key={po.id}
                    className="cursor-pointer hover:bg-default-50"
                    onClick={() => handleTogglePO(po.id)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedPOs.includes(po.id)}
                        onCheckedChange={() => handleTogglePO(po.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-default-900">
                      {po.poNo}
                    </TableCell>
                    <TableCell>{po.supplier}</TableCell>
                    <TableCell>{po.eta}</TableCell>
                    <TableCell className="text-center">
                      {po.lines.length}
                    </TableCell>
                    <TableCell>
                      <Badge color="info" variant="soft">
                        {po.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center text-default-400">
                      <Icon icon="heroicons:inbox" className="w-12 h-12 mb-2" />
                      <p>Không tìm thấy PO nào phù hợp</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        {selectedPOs.length > 0 && (
          <div className="bg-primary/5 p-4 px-6 border-t border-primary/10">
            <div className="flex justify-between items-center text-sm">
              <div className="flex gap-6">
                <div>
                  <span className="text-default-500">Tổng số PO:</span>
                  <span className="ml-2 font-bold text-default-900">
                    {selectedPOs.length}
                  </span>
                </div>
                <div>
                  <span className="text-default-500">Tổng số Line:</span>
                  <span className="ml-2 font-bold text-default-900">
                    {totalLines}
                  </span>
                </div>
                <div>
                  <span className="text-default-500">Tổng Qty dự kiến:</span>
                  <span className="ml-2 font-bold text-default-900">
                    {totalQty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="p-6 pt-2 border-t border-default-100">
          <Button variant="outline" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button 
            disabled={selectedPOs.length === 0} 
            onClick={handleCreate}
            className="gap-2"
          >
            <Icon icon="heroicons:check-circle" className="w-4 h-4" />
            Bắt đầu Nhận hàng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMasterReceiptDialog;
