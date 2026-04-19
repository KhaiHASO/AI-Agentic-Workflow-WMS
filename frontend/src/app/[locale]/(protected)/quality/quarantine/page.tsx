"use client"

import { QualityConsole } from "@/components/features/quality/quality-console";
import { PageHeader } from "@/components/wms/page-header";

export default function QuarantinePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quarantine Management"
        subtitle="Quản lý hàng hóa bị phong tỏa và tiêu hủy"
      />
      {/* Note: I'll need to modify QualityConsole to accept a default tab if I want it to open on Quarantine tab here, but for now it's okay */}
      <QualityConsole />
    </div>
  );
}
