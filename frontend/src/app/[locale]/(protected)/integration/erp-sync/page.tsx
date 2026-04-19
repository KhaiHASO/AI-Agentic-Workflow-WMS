"use client"

import { useIntegrationStore } from "@/store/integration-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/wms/page-header";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export default function ErpSyncPage() {
  const { syncTasks, runSyncTask, health } = useIntegrationStore();

  const handleRunSync = (id: string, name: string) => {
    runSyncTask(id);
    toast.info(`Đang bắt đầu đồng bộ ${name}...`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="ERP Data Synchronization"
        subtitle="Luồng 0: Chuẩn bị dữ liệu và đồng bộ định kỳ với FAST ERP"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Sync Tasks Grid */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
           {syncTasks.map((task) => (
             <Card key={task.id} className={`transition-all border-l-4 ${
               task.status === 'Running' ? 'border-primary shadow-lg ring-1 ring-primary/20' : 
               task.status === 'Success' ? 'border-success' : 'border-default-200'
             }`}>
               <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                           task.status === 'Running' ? 'bg-primary text-white animate-spin' : 
                           task.status === 'Success' ? 'bg-success/10 text-success' : 'bg-default-100 text-default-500'
                        }`}>
                           <Icon icon={task.status === 'Running' ? "heroicons:arrow-path" : "heroicons:cloud-arrow-down"} className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-lg font-black text-default-900 leading-none mb-1">{task.name}</h3>
                           <p className="text-xs text-default-500 font-medium">{task.description}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <Badge variant="soft" color={
                           task.status === 'Running' ? 'primary' : 
                           task.status === 'Success' ? 'success' : 'default'
                        }>
                           {task.status}
                        </Badge>
                        <div className="text-[10px] text-default-400 font-bold uppercase mt-2">Last Sync: {task.lastSync}</div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {task.status === 'Running' && (
                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                              <span>Downloading Data...</span>
                              <span>{task.progress}%</span>
                           </div>
                           <Progress value={task.progress} className="h-2" />
                        </div>
                     )}

                     {task.status === 'Success' && (
                        <div className="bg-success/5 p-3 rounded-lg border border-success/10 flex items-center justify-between">
                           <div className="flex items-center gap-2 text-xs font-bold text-success">
                              <Icon icon="heroicons:check-circle" />
                              Đã cập nhật {task.recordsSynced} bản ghi mới
                           </div>
                           <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-success hover:bg-success/10" onClick={() => handleRunSync(task.id, task.name)}>
                              SYNC AGAIN
                           </Button>
                        </div>
                     )}

                     {task.status === 'Idle' && (
                        <Button 
                           className="w-full font-black uppercase tracking-widest h-12" 
                           variant="outline"
                           onClick={() => handleRunSync(task.id, task.name)}
                        >
                           RUN SYNC TASK
                        </Button>
                     )}
                  </div>
               </CardContent>
             </Card>
           ))}
        </div>

        {/* Info Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
           <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden relative">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <CardHeader className="relative z-10 border-b border-white/10">
                 <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">ERP System Health</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6 relative z-10">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">FAST ERP Status:</span>
                    <Badge className="bg-success/20 text-success border-success/30 font-black">ONLINE</Badge>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                       <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Latency</div>
                       <div className="text-xl font-black">{health.apiLatency}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                       <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Sync Success</div>
                       <div className="text-xl font-black text-success">{health.successRate}%</div>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Interfaces</h4>
                    {[
                       { name: "PO_PULL_INTERFACE", status: "Active" },
                       { name: "SO_PULL_INTERFACE", status: "Active" },
                       { name: "GRN_PUSH_INTERFACE", status: "Active" },
                       { name: "GI_PUSH_INTERFACE", status: "Active" },
                    ].map((inf, idx) => (
                       <div key={idx} className="flex items-center gap-2 text-xs font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-success" />
                          <span className="text-slate-300 font-mono">{inf.name}</span>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           <Card>
              <CardHeader><CardTitle className="text-xs font-bold uppercase text-default-400">Lưu ý Luồng 0</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 <p className="text-xs text-default-500 leading-relaxed italic">
                    "Hệ thống tự động thực hiện Pull dữ liệu mỗi 15 phút. Người dùng chỉ nên bấm đồng bộ thủ công khi có yêu cầu khẩn cấp từ kho hoặc vừa cập nhật danh mục bên ERP FAST."
                 </p>
                 <div className="p-3 bg-warning/5 rounded-lg border border-warning/10 text-[10px] font-medium text-warning-700 flex gap-2">
                    <Icon icon="heroicons:information-circle" className="w-4 h-4 shrink-0" />
                    Đảm bảo dữ liệu ERP đã được chốt (Approve) trước khi bấm đồng bộ về WMS.
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
