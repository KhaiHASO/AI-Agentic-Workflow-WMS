"use client"

import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export const WavePlanningConsole = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Wave Planning Console"
        subtitle="Gom đơn hàng và điều phối kế hoạch lấy hàng (Wave)"
        actions={[
          { label: "Tạo đợt xuất (Wave)", icon: "heroicons:plus-circle", onClick: () => {} }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm bg-info/5">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-info/10 text-info flex items-center justify-center text-2xl">
                  <Icon icon="heroicons:document-text" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Đơn hàng chờ xử lý</div>
                  <div className="text-2xl font-black text-info">124</div>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-warning/5">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center text-2xl">
                  <Icon icon="heroicons:exclamation-triangle" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Nguy cơ thiếu hàng</div>
                  <div className="text-2xl font-black text-warning">8 Đơn</div>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm bg-success/5">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="h-12 w-12 rounded-xl bg-success/10 text-success flex items-center justify-center text-2xl">
                  <Icon icon="heroicons:bolt" />
               </div>
               <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Ước tính tải picking</div>
                  <div className="text-2xl font-black text-success">Low Load</div>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         <div className="lg:col-span-8">
            <Card className="border-none shadow-sm h-full">
               <CardHeader className="flex flex-row items-center justify-between border-b border-default-100">
                  <CardTitle className="text-sm font-bold uppercase text-default-400 tracking-widest">Order Pool (Hàng đợi đơn hàng)</CardTitle>
                  <Badge variant="soft" color="info">Lọc theo: TPHCM | Standard Delivery</Badge>
               </CardHeader>
               <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-default-50">
                       <TableRow>
                          <TableHead className="w-10 text-center"><input type="checkbox" /></TableHead>
                          <TableHead>Mã đơn (SO)</TableHead>
                          <TableHead>Khách hàng</TableHead>
                          <TableHead>Mặt hàng</TableHead>
                          <TableHead>Số lượng</TableHead>
                          <TableHead>Trạng thái</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {[
                         { id: 'SO-001', customer: 'Bách Hóa Xanh', items: 3, qty: 50, status: 'Open' },
                         { id: 'SO-002', customer: 'WinMart', items: 1, qty: 10, status: 'Open' },
                         { id: 'SO-003', customer: 'Coop Mart', items: 12, qty: 240, status: 'Open' }
                       ].map((so) => (
                         <TableRow key={so.id}>
                            <TableCell className="text-center"><input type="checkbox" /></TableCell>
                            <TableCell className="font-bold text-primary">{so.id}</TableCell>
                            <TableCell className="text-xs font-medium">{so.customer}</TableCell>
                            <TableCell className="text-xs">{so.items} SKU</TableCell>
                            <TableCell className="font-bold">{so.qty}</TableCell>
                            <TableCell><Badge variant="soft" color="info">{so.status}</Badge></TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </div>

         <div className="lg:col-span-4 space-y-4">
            <Card className="border-primary border-t-4">
               <CardHeader><CardTitle className="text-sm uppercase font-bold text-default-400">Đã chọn cho Wave mới</CardTitle></CardHeader>
               <CardContent className="space-y-6">
                  <div className="text-center space-y-1">
                     <div className="text-4xl font-black text-primary">0</div>
                     <div className="text-xs font-bold text-default-500 uppercase">Đơn hàng được chọn</div>
                  </div>
                  <div className="p-4 bg-default-50 rounded-xl border border-default-100 text-center space-y-4">
                     <Icon icon="heroicons:shopping-cart" className="w-12 h-12 text-default-200 mx-auto" />
                     <p className="text-xs text-default-400 italic">Chọn các đơn hàng từ Order Pool bên trái để tạo kế hoạch lấy hàng (Wave).</p>
                  </div>
                  <Button className="w-full h-12 font-black uppercase tracking-widest" color="primary" disabled>
                     XÁC NHẬN TẠO WAVE
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
};
