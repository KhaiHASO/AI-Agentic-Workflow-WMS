"use client"

import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export const QualityConsole = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quality / Quarantine Console"
        subtitle="Quản lý kiểm định chất lượng và hàng biệt trữ"
        actions={[
          { label: "Giải phóng hàng (Release)", icon: "heroicons:check-badge", color: "success", onClick: () => {} }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="border-none shadow-sm h-full">
            <CardHeader className="border-b border-default-100 flex flex-row items-center justify-between">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Icon icon="heroicons:beaker" className="text-warning" />
                  Lệnh kiểm QC đang mở
               </CardTitle>
               <Badge color="warning">4 Pending</Badge>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                 <TableBody>
                    {[
                      { id: 'QO-001', item: 'Sữa tươi Vinamilk', qty: 100, reason: 'New Supplier' },
                      { id: 'QO-002', item: 'Bánh quy Oreo', qty: 50, reason: 'Damaged Box' }
                    ].map((qo) => (
                      <TableRow key={qo.id}>
                         <TableCell className="ps-6">
                            <div className="text-sm font-bold">{qo.id}</div>
                            <div className="text-xs text-default-400">{qo.item}</div>
                         </TableCell>
                         <TableCell className="text-center font-black">x{qo.qty}</TableCell>
                         <TableCell className="text-xs italic">{qo.reason}</TableCell>
                         <TableCell className="pe-6 text-right">
                            <Button size="sm" variant="soft" color="warning">Record Result</Button>
                         </TableCell>
                      </TableRow>
                    ))}
                 </TableBody>
               </Table>
            </CardContent>
         </Card>

         <Card className="border-none shadow-sm h-full">
            <CardHeader className="border-b border-default-100 flex flex-row items-center justify-between">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Icon icon="heroicons:shield-exclamation" className="text-destructive" />
                  Khu vực biệt trữ (Quarantine)
               </CardTitle>
               <Badge color="destructive">2 Locked</Badge>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                 <TableBody>
                    {[
                      { id: 'LCK-99', item: 'Sữa chua TH Milk', qty: 15, loc: 'QUAR-01', reason: 'Expired' },
                      { id: 'LCK-102', item: 'Phô mai', qty: 2, loc: 'QUAR-02', reason: 'Contaminated' }
                    ].map((qo) => (
                      <TableRow key={qo.id}>
                         <TableCell className="ps-6">
                            <div className="text-sm font-bold">{qo.item}</div>
                            <div className="text-[10px] uppercase font-mono text-destructive">{qo.loc}</div>
                         </TableCell>
                         <TableCell className="text-center font-black">x{qo.qty}</TableCell>
                         <TableCell className="text-xs font-medium text-destructive">{qo.reason}</TableCell>
                         <TableCell className="pe-6 text-right">
                            <Button size="sm" variant="outline" color="destructive">Action</Button>
                         </TableCell>
                      </TableRow>
                    ))}
                 </TableBody>
               </Table>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-sm">
         <CardHeader><CardTitle className="text-sm uppercase font-black text-default-400">Lịch sử xử lý chất lượng</CardTitle></CardHeader>
         <CardContent className="h-32 flex items-center justify-center italic text-default-300 text-sm">
            Chưa có lịch sử giao dịch gần đây
         </CardContent>
      </Card>
    </div>
  );
};
