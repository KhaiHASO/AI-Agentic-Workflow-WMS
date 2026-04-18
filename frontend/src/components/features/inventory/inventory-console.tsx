"use client"

import { useInventoryStore } from "@/store/inventory-store";
import { PageHeader } from "@/components/wms/page-header";
import { KpiCard } from "@/components/wms/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Sheet, SheetContent, Header, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export const InventoryConsole = () => {
  const { onHand } = useInventoryStore();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Control Console"
        subtitle="Trung tâm điều khiển và giám sát tồn kho chi tiết"
        actions={[
          { label: "Điều chỉnh tồn", icon: "heroicons:adjustments-horizontal", variant: "outline", onClick: () => {} },
          { label: "Chuyển kho nội bộ", icon: "heroicons:arrows-right-left", onClick: () => {} }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Tổng tồn kho" value="800" icon={<Icon icon="heroicons:cube" />} />
        <KpiCard title="Hàng sẵn dụng" value="650" variant="success" icon={<Icon icon="heroicons:check-circle" />} />
        <KpiCard title="Đang kiểm định" value="100" variant="warning" icon={<Icon icon="heroicons:beaker" />} />
        <KpiCard title="Hàng biệt trữ" value="50" variant="destructive" icon={<Icon icon="heroicons:shield-exclamation" />} />
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center gap-4">
           <div className="relative flex-1">
              <Icon icon="heroicons:magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />
              <Input className="ps-10" placeholder="Tìm kiếm theo Mã hàng, Tên hàng, Vị trí hoặc Lô hàng..." />
           </div>
           <Button variant="soft" className="gap-2 font-bold">
              <Icon icon="heroicons:funnel" /> Bộ lọc nâng cao
           </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead className="ps-6">Sản phẩm</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead className="text-center">Tổng tồn</TableHead>
                <TableHead className="text-center">Sẵn dụng</TableHead>
                <TableHead className="text-center">Chờ QC</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right pe-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onHand.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="hover:bg-default-50/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedItem(item)}
                >
                  <TableCell className="ps-6">
                    <div className="flex flex-col">
                       <span className="font-bold text-default-900">{item.itemName}</span>
                       <span className="text-xs text-default-500 font-mono">{item.itemCode}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="soft" color="info">{item.location}</Badge></TableCell>
                  <TableCell className="text-center font-black">{item.onHandQty}</TableCell>
                  <TableCell className="text-center font-bold text-success">{item.availableQty}</TableCell>
                  <TableCell className="text-center font-bold text-warning">{item.qcQty}</TableCell>
                  <TableCell>
                    <Badge color={item.status === 'Available' ? 'success' : 'warning'}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right pe-6">
                    <Button variant="ghost" size="icon">
                       <Icon icon="heroicons:ellipsis-vertical" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Drawer */}
      <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent className="w-[500px] sm:max-w-[600px] p-0">
           {selectedItem && (
             <div className="h-full flex flex-col">
                <SheetHeader className="p-6 border-b border-default-100">
                   <SheetTitle className="text-xl font-black uppercase text-primary">Chi tiết tồn kho</SheetTitle>
                   <div className="text-sm font-bold text-default-700 mt-2">{selectedItem.itemName}</div>
                   <div className="text-xs text-default-400 font-mono">{selectedItem.itemCode}</div>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-default-50 rounded-xl border border-default-100">
                         <div className="text-[10px] font-bold text-default-400 uppercase">Vị trí</div>
                         <div className="text-lg font-black text-info">{selectedItem.location}</div>
                      </div>
                      <div className="p-4 bg-default-50 rounded-xl border border-default-100">
                         <div className="text-[10px] font-bold text-default-400 uppercase">Trạng thái</div>
                         <div className="mt-1"><Badge color="success">{selectedItem.status}</Badge></div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase text-default-400 border-b border-default-100 pb-2">Phân bổ số lượng</h4>
                      <div className="space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Tổng tồn kho (On-hand)</span>
                            <span className="text-lg font-black">{selectedItem.onHandQty}</span>
                         </div>
                         <div className="flex justify-between items-center text-success">
                            <span className="text-sm font-medium">Sẵn dụng (Available)</span>
                            <span className="text-lg font-black">{selectedItem.availableQty}</span>
                         </div>
                         <div className="flex justify-between items-center text-warning">
                            <span className="text-sm font-medium">Đang kiểm định (QC)</span>
                            <span className="text-lg font-black">{selectedItem.qcQty}</span>
                         </div>
                         <div className="flex justify-between items-center text-destructive">
                            <span className="text-sm font-medium">Hư hỏng (Damaged)</span>
                            <span className="text-lg font-black">{selectedItem.damagedQty}</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase text-default-400 border-b border-default-100 pb-2">Hành động nhanh</h4>
                      <div className="grid grid-cols-2 gap-2">
                         <Button variant="outline" className="gap-2"><Icon icon="heroicons:arrow-path" /> Xem Ledger</Button>
                         <Button variant="outline" className="gap-2"><Icon icon="heroicons:printer" /> In nhãn hàng</Button>
                         <Button variant="outline" className="gap-2 text-destructive border-destructive/20"><Icon icon="heroicons:shield-exclamation" /> Quarantine</Button>
                         <Button variant="outline" className="gap-2 text-primary border-primary/20"><Icon icon="heroicons:arrows-right-left" /> Di dời HU</Button>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
