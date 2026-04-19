"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/wms/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export default function ErpConfigPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="ERP Connectivity Configuration"
        subtitle="Cấu hình kết nối và lịch trình đồng bộ với FAST ERP"
      />
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-sm font-bold uppercase">Thông số kết nối API</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <div className="grid gap-2">
                  <Label>Fast ERP API Gateway URL</Label>
                  <Input defaultValue="https://api.fast-erp.vn/v1/wms-integration" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                     <Label>API Key / Client ID</Label>
                     <Input type="password" defaultValue="*********" />
                  </div>
                  <div className="grid gap-2">
                     <Label>Secret Key</Label>
                     <Input type="password" defaultValue="*********" />
                  </div>
               </div>
               <div className="pt-2">
                  <Button className="gap-2" onClick={() => toast.success("Kết nối thành công tới ERP!")}>
                     <Icon icon="heroicons:bolt" /> TEST CONNECTION
                  </Button>
               </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-sm font-bold uppercase">Lịch trình đồng bộ (Synchronization Schedule)</CardTitle></CardHeader>
            <CardContent className="space-y-6">
               {[
                  { label: "Đồng bộ Master Data (Items, UoM, Suppliers)", interval: "60 mins" },
                  { label: "Pull Inbound POs (Open Orders)", interval: "15 mins" },
                  { label: "Pull Outbound SOs (Confirmed)", interval: "10 mins" },
                  { label: "Push GRN/GI Results (Real-time)", interval: "Immediate" },
               ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-default-50 rounded-lg border border-default-100">
                     <div>
                        <div className="text-sm font-bold text-default-900">{item.label}</div>
                        <div className="text-xs text-default-500">Chu kỳ: {item.interval}</div>
                     </div>
                     <Switch defaultChecked />
                  </div>
               ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4">
           <Card className="bg-primary/5 border-primary/20">
              <CardHeader><CardTitle className="text-sm font-black text-primary uppercase">Trạng thái hiện tại</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-default-500 font-medium">Uptime:</span>
                    <span className="font-bold text-success">99.9%</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-default-500 font-medium">Last Sync:</span>
                    <span className="font-bold">2 phút trước</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-default-500 font-medium">Payload Limit:</span>
                    <span className="font-bold">10MB / request</span>
                 </div>
                 <Button color="primary" className="w-full font-black uppercase mt-4" onClick={() => toast.info("Đang ép đồng bộ toàn bộ dữ liệu...")}>
                    FORCE FULL SYNC NOW
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
