"use client"

import { WavePlanningConsole } from "@/components/features/wave/wave-planning-console";
import { PageHeader } from "@/components/wms/page-header";

export default function WavesPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Wave Planning Console"
        subtitle="Hoạch định và giải phóng các đợt xuất hàng"
      />
      <WavePlanningConsole />
    </div>
  );
}
