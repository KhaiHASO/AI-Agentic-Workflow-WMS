"use client"

import { useIntegrationStore } from "@/store/integration-store";
import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export const IntegrationConsole = () => {
  const { messages, retryMessage } = useIntegrationStore();

  const handleRetry = (id: string) => {
    retryMessage(id);
    toast.success("Đã đưa thông điệp vào hàng đợi thử lại.");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Integration Operations Console"
        subtitle="Quản lý hàng đợi và giám sát kết nối ERP"
        actions={[
          { label: "Sync Master Data", icon: "heroicons:arrow-path", onClick: () => {} }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-success/5 border-none shadow-none">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center text-2xl">
                  <Icon icon="heroicons:check-circle" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Trạng thái kết nối</div>
                  <div className="text-lg font-black text-success">CONNECTED</div>
               </div>
            </CardContent>
         </Card>
         <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
                  <Icon icon="heroicons:queue-list" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Thông điệp chờ</div>
                  <div className="text-lg font-black text-primary">12 Messages</div>
               </div>
            </CardContent>
         </Card>
         <Card className="bg-destructive/5 border-none shadow-none">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center text-2xl">
                  <Icon icon="heroicons:exclamation-triangle" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Lỗi đồng bộ</div>
                  <div className="text-lg font-black text-destructive">1 Failed</div>
               </div>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
           <CardTitle className="text-lg font-bold">Hàng đợi thông điệp (Message Queue)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
           <Table>
              <TableHeader className="bg-default-50">
                 <TableRow>
                    <TableHead className="ps-6">Mã Correlation</TableHead>
                    <TableHead>Topic / Nghiệp vụ</TableHead>
                    <TableHead>Hướng</TableHead>
                    <TableHead className="text-center">Số lần thử</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right pe-6">Thao tác</TableHead>
                 </TableRow>
              </TableHeader>
              <TableBody>
                 {messages.map((msg) => (
                   <TableRow key={msg.id} className="hover:bg-default-50/50">
                      <TableCell className="ps-6 font-mono text-xs font-bold">{msg.correlationId}</TableCell>
                      <TableCell className="font-bold text-default-700">{msg.topic}</TableCell>
                      <TableCell>
                         <Badge variant="soft" color={msg.direction === 'Inbound' ? 'info' : 'warning'}>
                            {msg.direction}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-center font-black">{msg.attempts}</TableCell>
                      <TableCell className="text-xs text-default-500">{msg.timestamp}</TableCell>
                      <TableCell>
                         <Badge color={msg.status === 'Success' ? 'success' : msg.status === 'Failed' ? 'destructive' : 'info'}>
                            {msg.status}
                         </Badge>
                      </TableCell>
                      <TableCell className="text-right pe-6">
                         <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                               <Icon icon="heroicons:eye" /> Payload
                            </Button>
                            {msg.status === 'Failed' && (
                              <Button size="sm" className="h-8 gap-2" color="destructive" onClick={() => handleRetry(msg.id)}>
                                 <Icon icon="heroicons:arrow-path" /> Retry
                              </Button>
                            )}
                         </div>
                      </TableCell>
                   </TableRow>
                 ))}
              </TableBody>
           </Table>
        </CardContent>
      </Card>
    </div>
  );
};
