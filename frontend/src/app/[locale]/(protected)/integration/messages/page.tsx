"use client"

import { IntegrationOpsConsole } from "@/components/features/integration/integration-ops-console";
import { PageHeader } from "@/components/wms/page-header";

export default function IntegrationMessagesPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Integration Operations Console"
        subtitle="Giám sát và quản lý luồng trao đổi dữ liệu với ERP"
      />
      <IntegrationOpsConsole />
    </div>
  );
}
