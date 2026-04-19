"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { AuditLogDrawer } from "./modals/audit-log-drawer";
import { PrintMRLabelModal } from "./modals/print-mr-label-modal";
import { useState } from "react";

export const ReceivingHeader = () => {
  const { header, lines, validateAll, saveDraft, submitReceipt } = useReceivingStore();
  const [auditOpen, setAuditOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);

  const totalExpected = lines.reduce((acc, curr) => acc + curr.expectedQty, 0);

  const handleCancel = () => {
    if (confirm("Bạn có chắc chắn muốn hủy bản nháp này? Mọi dữ liệu chưa lưu sẽ bị mất.")) {
        toast.error("Đã hủy bản nháp nhận hàng");
    }
  };

  return (
    <div className="h-auto min-h-16 border-b border-default-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-6 py-3 md:py-0 sticky top-0 z-10 gap-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base md:text-lg font-bold text-default-900 leading-tight">{header.receiptNo}</h2>
            <Badge color="warning" variant="soft" className="text-[10px] md:text-xs">{header.status}</Badge>
          </div>
          <div className="text-[10px] md:text-xs text-default-500 mt-0.5">
            PO: <span className="font-medium text-default-700">{header.poNumber}</span> | 
            Sup: <span className="font-medium text-default-700">{header.supplier}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap w-full md:w-auto">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:flex-none h-8 md:h-9 text-[10px] md:text-xs gap-1 px-2" 
          onClick={() => setPrintOpen(true)}
        >
          <Icon icon="heroicons:printer" className="w-3.5 h-3.5" />
          In nhãn
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:flex-none h-8 md:h-9 text-[10px] md:text-xs gap-1 px-2" 
          onClick={() => setAuditOpen(true)}
        >
          <Icon icon="heroicons:clock" className="w-3.5 h-3.5" />
          Audit
        </Button>
        
        <div className="hidden md:block h-8 w-px bg-default-200 mx-1" />

        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 md:flex-none h-8 md:h-9 text-[10px] md:text-xs gap-1 px-2"
          onClick={saveDraft}
        >
          <Icon icon="heroicons:archive-box" className="w-3.5 h-3.5" />
          Draft
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          color="secondary" 
          className="flex-1 md:flex-none h-8 md:h-9 text-[10px] md:text-xs gap-1 px-2"
          onClick={validateAll}
        >
          <Icon icon="heroicons:check-badge" className="w-3.5 h-3.5" />
          Check
        </Button>
        <Button 
          size="sm" 
          color="success" 
          className="flex-[2] md:flex-none h-8 md:h-9 text-[10px] md:text-xs gap-1 px-3 font-bold"
          onClick={submitReceipt}
        >
          <Icon icon="heroicons:paper-airplane" className="w-3.5 h-3.5" />
          Submit
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          color="destructive"
          className="h-8 w-8 md:h-9 md:w-9"
          onClick={handleCancel}
        >
          <Icon icon="heroicons:trash" className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
      <AuditLogDrawer open={auditOpen} onClose={() => setAuditOpen(false)} />
      <PrintMRLabelModal 
        open={printOpen} 
        onClose={() => setPrintOpen(false)} 
        data={{
            mrNo: header.receiptNo,
            supplier: header.supplier,
            expectedQty: totalExpected,
            poNo: header.poNumber
        }} 
      />
    </div>
  );
};
