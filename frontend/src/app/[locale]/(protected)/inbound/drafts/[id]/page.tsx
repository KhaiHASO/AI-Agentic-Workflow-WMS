"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { ReceivingHeader } from "@/components/features/receiving/receiving-header";
import { ReceivingSummary } from "@/components/features/receiving/receiving-summary";
import { ReceivingScanArea } from "@/components/features/receiving/receiving-scan-area";
import { ReceivingLineTable } from "@/components/features/receiving/receiving-line-table";
import { ReceivingControlPanel } from "@/components/features/receiving/receiving-control-panel";
import { ReceivingFooter } from "@/components/features/receiving/receiving-footer";

export default function ReceivingWorkbenchPage() {
  const { activeLineId, setActiveLine } = useReceivingStore();

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] -m-6">
      <ReceivingHeader />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Cột trái - Summary */}
        <div className="w-80 border-e border-default-200 bg-default-50 overflow-y-auto hidden xl:block">
          <ReceivingSummary />
        </div>

        {/* Khu giữa - Main Workbench */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            <ReceivingScanArea />
            <ReceivingLineTable />
          </div>
        </div>

        {/* Cột phải - Resolution Panel */}
        <div className="w-96 border-s border-default-200 bg-default-50 overflow-y-auto hidden 2xl:block">
          <ReceivingControlPanel />
        </div>
      </div>

      <ReceivingFooter />
    </div>
  );
}
