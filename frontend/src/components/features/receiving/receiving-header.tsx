"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export const ReceivingHeader = () => {
  const { header } = useReceivingStore();

  return (
    <div className="h-16 border-b border-default-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-default-900">{header.receiptNo}</h2>
            <Badge color="warning" variant="soft">{header.status}</Badge>
          </div>
          <div className="text-xs text-default-500">
            PO: <span className="font-medium text-default-700">{header.poNumber}</span> | 
            Supplier: <span className="font-medium text-default-700">{header.supplier}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Icon icon="heroicons:archive-box" />
          Lưu Draft
        </Button>
        <Button variant="outline" size="sm" color="secondary" className="flex items-center gap-2">
          <Icon icon="heroicons:check-badge" />
          Validate
        </Button>
        <Button size="sm" color="success" className="flex items-center gap-2">
          <Icon icon="heroicons:paper-airplane" />
          Submit
        </Button>
        <div className="h-8 w-px bg-default-200 mx-2" />
        <Button variant="ghost" size="icon" color="destructive">
          <Icon icon="heroicons:trash" className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
