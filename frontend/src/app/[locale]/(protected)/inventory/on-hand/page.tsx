"use client"

import { InventoryControlConsole } from "@/components/features/inventory/inventory-control-console";
import { PageHeader } from "@/components/wms/page-header";

export default function InventoryOnHandPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Control Console"
        subtitle="Quản lý tồn kho, điều chuyển và điều chỉnh số lượng"
      />
      <InventoryControlConsole />
    </div>
  );
}
