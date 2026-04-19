"use client"

import { useState } from "react";
import { useReceivingStore } from "@/store/receiving-store";
import { ReceivingHeader } from "@/components/features/receiving/receiving-header";
import { ReceivingSummary } from "@/components/features/receiving/receiving-summary";
import { ReceivingScanArea } from "@/components/features/receiving/receiving-scan-area";
import { ReceivingLineTable } from "@/components/features/receiving/receiving-line-table";
import { ReceivingControlPanel } from "@/components/features/receiving/receiving-control-panel";
import { ReceivingFooter } from "@/components/features/receiving/receiving-footer";
import { VirtualScannerWidget } from "@/components/features/receiving/virtual-scanner-widget";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export default function ReceivingWorkbenchPage() {
  const { activeLineId, setActiveLine } = useReceivingStore();
  const [mobileView, setMobileView] = useState<'scan' | 'lines'>('scan');
  const [showSummary, setShowSummary] = useState(false);
  const [showControl, setShowControl] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-6 bg-default-50">
      <VirtualScannerWidget />
      <ReceivingHeader />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Cột trái - Summary (Desktop) */}
        <div className="w-80 border-e border-default-200 bg-default-50 overflow-y-auto hidden xl:block">
          <ReceivingSummary />
        </div>

        {/* Khu giữa - Main Workbench */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
            {/* Mobile View Toggles */}
            <div className="md:hidden sticky top-0 z-20 bg-white border-b border-default-100 flex p-1">
               <button 
                onClick={() => setMobileView('scan')}
                className={cn(
                  "flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2",
                  mobileView === 'scan' ? "bg-primary text-white shadow-sm" : "text-default-500"
                )}
               >
                 <Icon icon="heroicons:qr-code" className="w-4 h-4" />
                 QUÉT HÀNG
               </button>
               <button 
                onClick={() => setMobileView('lines')}
                className={cn(
                  "flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2",
                  mobileView === 'lines' ? "bg-primary text-white shadow-sm" : "text-default-500"
                )}
               >
                 <Icon icon="heroicons:list-bullet" className="w-4 h-4" />
                 DANH SÁCH
               </button>
            </div>

            <div className="p-4 md:p-6 space-y-6">
              <div className={cn("space-y-6", mobileView === 'lines' && "hidden md:block")}>
                <ReceivingScanArea />
              </div>
              <div className={cn(mobileView === 'scan' && "hidden md:block")}>
                <ReceivingLineTable />
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải - Resolution Panel (Desktop) */}
        <div className="w-96 border-s border-default-200 bg-default-50 overflow-y-auto hidden 2xl:block">
          <ReceivingControlPanel />
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-default-200 h-16 flex items-center justify-around px-4 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
           <MobileNavButton 
            icon="heroicons:chart-bar" 
            label="Tiến độ" 
            onClick={() => setShowSummary(true)} 
           />
           <div className="w-px h-8 bg-default-100" />
           <MobileNavButton 
            icon="heroicons:adjustments-horizontal" 
            label="Xử lý" 
            active={!!activeLineId}
            onClick={() => setShowControl(true)} 
           />
        </div>
      </div>

      {/* Desktop Footer (hidden on small mobile to avoid clutter) */}
      <div className="hidden md:block">
        <ReceivingFooter />
      </div>

      {/* Mobile Drawers */}
      <Sheet open={showSummary} onOpenChange={setShowSummary}>
        <SheetContent side="left" className="p-0 w-[85%] sm:max-w-md">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Icon icon="heroicons:chart-bar" className="text-primary" />
              Tổng quan nhận hàng
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full pb-20">
            <ReceivingSummary />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showControl} onOpenChange={setShowControl}>
        <SheetContent side="right" className="p-0 w-[85%] sm:max-w-md">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Icon icon="heroicons:adjustments-horizontal" className="text-primary" />
              Bảng điều khiển xử lý
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full pb-20">
            <ReceivingControlPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const MobileNavButton = ({ icon, label, onClick, active }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1 group"
  >
    <div className={cn(
      "p-2 rounded-xl transition-all group-active:scale-90",
      active ? "bg-primary/10 text-primary" : "text-default-500"
    )}>
      <Icon icon={icon} className="w-6 h-6" />
    </div>
    <span className={cn(
      "text-[10px] font-bold uppercase tracking-tighter",
      active ? "text-primary" : "text-default-400"
    )}>{label}</span>
  </button>
);
