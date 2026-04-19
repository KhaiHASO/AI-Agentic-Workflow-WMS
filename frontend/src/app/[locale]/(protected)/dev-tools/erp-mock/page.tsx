"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/wms/page-header";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";

export default function ErpMockPanelPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`Đã tạo giả lập dữ liệu ${type} thành công! Kiểm tra trong các bảng Inbound/Outbound.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Developer ERP Mock Panel"
        subtitle="Công cụ giả lập đẩy dữ liệu từ ERP sang WMS phục vụ Demo & Test"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-primary">
          <CardHeader><CardTitle className="text-sm font-bold uppercase">Mock Inbound PO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <p className="text-xs text-default-500 font-medium">Sinh ra các Đơn mua hàng (PO) mới với các kịch bản: Hàng chuẩn, hàng có Lot, hàng cần QC.</p>
             <Button className="w-full gap-2" variant="soft" color="primary" onClick={() => handleGenerate('PO')}>
                <Icon icon="heroicons:plus-circle" /> GENERATE NEW POs
             </Button>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-warning">
          <CardHeader><CardTitle className="text-sm font-bold uppercase">Mock Outbound SO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <p className="text-xs text-default-500 font-medium">Sinh ra các Đơn bán hàng (SO) cần xuất gấp để test luồng Wave Planning và Cross-docking.</p>
             <Button className="w-full gap-2" variant="soft" color="warning" onClick={() => handleGenerate('SO')}>
                <Icon icon="heroicons:shopping-cart" /> GENERATE URGENT SOs
             </Button>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-success">
          <CardHeader><CardTitle className="text-sm font-bold uppercase">Mock Master Data</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <p className="text-xs text-default-500 font-medium">Làm mới danh mục Vật tư, Nhà cung cấp, Khách hàng từ ERP giả lập.</p>
             <Button className="w-full gap-2" variant="soft" color="success" onClick={() => handleGenerate('Master Data')}>
                <Icon icon="heroicons:database" /> REFRESH MASTER DATA
             </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 text-slate-100">
         <CardHeader className="border-b border-slate-800">
            <CardTitle className="text-xs font-black uppercase text-slate-400">JSON Payload Debugger (Giả lập phản hồi từ ERP)</CardTitle>
         </CardHeader>
         <CardContent className="p-6">
            <div className="font-mono text-xs text-green-400">
               <pre>
{`{
  "status": "success",
  "data": {
    "poNo": "PO-MOCK-9999",
    "vendor": "MOCK SUPPLIER CO., LTD",
    "items": [
      { "itemCode": "ITM-001", "qty": 100, "uom": "EA" },
      { "itemCode": "ITM-002", "qty": 50, "uom": "BOX", "requiresLot": true }
    ]
  },
  "timestamp": "2024-05-18T14:30:00Z"
}`}
               </pre>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
