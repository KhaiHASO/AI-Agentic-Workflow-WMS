"use client"

import { useCountingStore } from "@/store/counting-store";
import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";

export const CountWorkbench = ({ sessionId }: { sessionId: string }) => {
  const { lines, processCount } = useCountingStore();
  const [activeLine, setActiveLine] = useState<any>(null);
  const [qty, setQty] = useState<string>("");

  const handleConfirm = () => {
    if (!activeLine || qty === "") return;
    processCount(activeLine.id, Number(qty));
    toast.success(`Đã ghi nhận số đếm cho vị trí ${activeLine.location}`);
    setActiveLine(null);
    setQty("");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Cycle Count Workbench: ${sessionId}`}
        subtitle="Thực hiện kiểm kê đối chiếu số lượng thực tế"
        backButton
        actions={[
          { label: "Submit Session", icon: "heroicons:check-circle", color: "success", onClick: () => {} }
        ]}
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
           <Card className="border-none shadow-sm">
              <CardHeader><CardTitle className="text-sm">Danh sách vị trí cần kiểm</CardTitle></CardHeader>
              <CardContent className="p-0">
                 <Table>
                    <TableHeader className="bg-default-50">
                       <TableRow>
                          <TableHead className="ps-6">Vị trí</TableHead>
                          <TableHead>Mặt hàng</TableHead>
                          <TableHead className="text-center">Số đếm</TableHead>
                          <TableHead>Trạng thái</TableHead>
                          <TableHead className="text-right pe-6">Thao tác</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       {lines.map((line) => (
                         <TableRow 
                           key={line.id} 
                           className={`cursor-pointer ${activeLine?.id === line.id ? 'bg-primary/5' : ''}`}
                           onClick={() => { setActiveLine(line); setQty(line.countedQty?.toString() || ""); }}
                         >
                            <TableCell className="ps-6 font-black text-info">{line.location}</TableCell>
                            <TableCell>
                               <div className="text-xs font-bold">{line.itemName}</div>
                               <div className="text-[10px] text-default-400">{line.itemCode}</div>
                            </TableCell>
                            <TableCell className="text-center font-black text-lg">
                               {line.countedQty !== null ? line.countedQty : "---"}
                            </TableCell>
                            <TableCell>
                               <Badge variant="soft" color={line.status === 'Counted' ? 'success' : line.status === 'Discrepancy' ? 'destructive' : 'default'}>
                                  {line.status}
                               </Badge>
                            </TableCell>
                            <TableCell className="text-right pe-6">
                               <Button variant="ghost" size="icon"><Icon icon="heroicons:chevron-right" /></Button>
                            </TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                 </Table>
              </CardContent>
           </Card>
        </div>

        <div className="col-span-12 lg:col-span-4">
           {activeLine ? (
             <Card className="border-primary border-2 shadow-xl animate-in fade-in slide-in-from-right-4">
                <CardHeader className="bg-primary/5">
                   <CardTitle className="text-primary uppercase font-black tracking-widest text-center">Đang kiểm vị trí</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="text-center space-y-1">
                      <div className="text-4xl font-black text-default-900">{activeLine.location}</div>
                      <div className="text-sm font-medium text-default-500">{activeLine.itemName}</div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-xs font-black uppercase text-default-400">NHẬP SỐ LƯỢNG THỰC TẾ</label>
                      <Input 
                        className="h-20 text-center text-5xl font-black border-2 border-primary/20 focus:border-primary"
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        autoFocus
                      />
                      <div className="grid grid-cols-2 gap-2">
                         <Button variant="outline" className="h-12 font-bold" onClick={() => setActiveLine(null)}>HỦY BỎ</Button>
                         <Button className="h-12 font-bold" color="primary" onClick={handleConfirm}>XÁC NHẬN SL</Button>
                      </div>
                   </div>
                </CardContent>
             </Card>
           ) : (
             <Card className="h-64 flex flex-col items-center justify-center text-center p-8 bg-default-50 border-dashed border-2 border-default-200 opacity-60">
                <Icon icon="heroicons:cursor-arrow-rays" className="w-12 h-12 text-default-300" />
                <p className="text-sm text-default-500 mt-2">Chọn một vị trí trong danh sách để bắt đầu đếm</p>
             </Card>
           )}
        </div>
      </div>
    </div>
  );
};
