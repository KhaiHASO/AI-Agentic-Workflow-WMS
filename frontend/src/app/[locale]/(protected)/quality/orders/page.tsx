"use client"

import { QualityConsole } from "@/components/features/quality/quality-console";
import { PageHeader } from "@/components/wms/page-header";

export default function QualityOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quality & Quarantine Console"
        subtitle="Kiểm định chất lượng hàng hóa và quản lý khu vực cách ly"
      />
      <QualityConsole />
    </div>
  );
}
