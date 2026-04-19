"use client"

import { useInventoryStore, OnHandItem } from "@/store/inventory-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const InventoryControlConsole = () => {
  const { onHand, ledger, transferStock, adjustStock, quarantineStock } = useInventoryStore();
  
  const [selectedItem, setSelectedItem] = useState<OnHandItem | null>(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [targetLoc, setTargetLoc] = useState("");
  const [transferQty, setTransferQty] = useState(1);
  const [adjustQty, setAdjustQty] = useState(0);

  const handleTransfer = () => {
    if (!selectedItem || !targetLoc) return;
    transferStock(selectedItem.id, targetLoc, transferQty);
    toast.success(`Đã điều chuyển ${transferQty} ${selectedItem.uom} sang ${targetLoc}`);
    setIsTransferOpen(false);
    setTargetLoc("");
  };

  const handleAdjust = () => {
    if (!selectedItem) return;
    adjustStock(selectedItem.id, adjustQty, "Manual Adjustment");
    toast.success(`Đã điều chỉnh ${adjustQty > 0 ? '+' : ''}${adjustQty} ${selectedItem.uom}`);
    setIsAdjustOpen(false);
    setAdjustQty(0);
  };

  const handleQuarantine = (item: OnHandItem) => {
    if (confirm(`Bạn có chắc muốn chuyển ${item.itemName} vào khu vực Quarantine?`)) {
       quarantineStock(item.id, "Manual Quarantine");
       toast.warning("Hàng đã được chuyển trạng thái Quarantine");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-4">
               <div className="text-[10px] font-bold text-primary uppercase">Tổng tồn On-hand</div>
               <div className="text-2xl font-black text-primary">12,500</div>
            </CardContent>
         </Card>
         <Card className="bg-success/5 border-success/10">
            <CardContent className="p-4">
               <div className="text-[10px] font-bold text-success uppercase">Khả dụng (Available)</div>
               <div className="text-2xl font-black text-success">11,200</div>
            </CardContent>
         </Card>
         <Card className="bg-warning/5 border-warning/10">
            <CardContent className="p-4">
               <div className="text-[10px] font-bold text-warning uppercase">Đang QC (In QC)</div>
               <div className="text-2xl font-black text-warning">850</div>
            </CardContent>
         </Card>
         <Card className="bg-destructive/5 border-destructive/10">
            <CardContent className="p-4">
               <div className="text-[10px] font-bold text-destructive uppercase">Quarantine</div>
               <div className="text-2xl font-black text-destructive">450</div>
            </CardContent>
         </Card>
      </div>

      <Tabs defaultValue="onhand" className="w-full">
         <TabsList className="bg-white border border-default-200 p-1 h-12">
            <TabsTrigger value="onhand" className="px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">ON-HAND STOCK</TabsTrigger>
            <TabsTrigger value="ledger" className="px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">INVENTORY LEDGER</TabsTrigger>
         </TabsList>

         <TabsContent value="onhand" className="mt-6">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest">Bảng kê tồn kho chi tiết</CardTitle>
                  <div className="flex gap-2">
                     <Input placeholder="Tìm mã hàng, vị trí, HU..." className="w-64 h-9 text-xs" />
                     <Button size="sm" variant="outline" className="h-9 gap-2">
                        <Icon icon="heroicons:funnel" /> Lọc nâng cao
                     </Button>
                  </div>
               </CardHeader>
               <CardContent className="p-0">
                  <Table>
                     <TableHeader className="bg-default-50">
                        <TableRow>
                           <TableHead className="ps-6">Sản phẩm</TableHead>
                           <TableHead>Vị trí / HU</TableHead>
                           <TableHead className="text-center">On-Hand</TableHead>
                           <TableHead className="text-center">Available</TableHead>
                           <TableHead>Trạng thái</TableHead>
                           <TableHead className="text-right pe-6">Thao tác</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {onHand.map((item) => (
                           <TableRow key={item.id} className="group hover:bg-default-50">
                              <TableCell className="ps-6">
                                 <div className="font-bold text-default-900">{item.itemName}</div>
                                 <div className="text-[10px] text-default-400 font-mono">{item.itemCode} | Lot: {item.lotNo || 'N/A'}</div>
                              </TableCell>
                              <TableCell>
                                 <div className="font-black text-info">{item.location}</div>
                                 <div className="text-[10px] text-default-400">{item.huNo || 'No HU'}</div>
                              </TableCell>
                              <TableCell className="text-center font-bold text-lg">{item.onHandQty}</TableCell>
                              <TableCell className="text-center font-bold text-success text-lg">{item.availableQty}</TableCell>
                              <TableCell>
                                 <Badge color={
                                    item.status === 'Available' ? 'success' :
                                    item.status === 'In QC' ? 'warning' :
                                    item.status === 'Hold' ? 'destructive' : 'destructive'
                                 } variant={item.status === 'Hold' ? 'solid' : 'soft'}>
                                    {item.status === 'Hold' ? 'QA HOLD' : item.status}
                                 </Badge>
                              </TableCell>
                              <TableCell className="text-right pe-6">
                                 <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => { setSelectedItem(item); setIsTransferOpen(true); }}>
                                       <Icon icon="heroicons:arrows-right-left" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-warning" onClick={() => { setSelectedItem(item); setIsAdjustOpen(true); }}>
                                       <Icon icon="heroicons:pencil-square" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => handleQuarantine(item)}>
                                       <Icon icon="heroicons:shield-exclamation" />
                                    </Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </TabsContent>

         <TabsContent value="ledger">
            <Card>
               <CardHeader><CardTitle className="text-sm uppercase tracking-widest">Nhật ký biến động kho (Ledger)</CardTitle></CardHeader>
               <CardContent className="p-0">
                  <Table>
                     <TableHeader className="bg-default-50">
                        <TableRow>
                           <TableHead className="ps-6">Thời gian</TableHead>
                           <TableHead>Sản phẩm</TableHead>
                           <TableHead>Loại</TableHead>
                           <TableHead className="text-center">Biến động</TableHead>
                           <TableHead className="text-center">Số dư sau</TableHead>
                           <TableHead>Chứng từ</TableHead>
                           <TableHead className="text-right pe-6">Người thực hiện</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {ledger.map((entry) => (
                           <TableRow key={entry.id}>
                              <TableCell className="ps-6 text-xs text-default-500">{entry.timestamp}</TableCell>
                              <TableCell>
                                 <div className="text-xs font-bold">{entry.itemCode}</div>
                                 <div className="text-[10px] text-default-400">{entry.location}</div>
                              </TableCell>
                              <TableCell>
                                 <Badge variant="outline" className="text-[10px]">{entry.type}</Badge>
                              </TableCell>
                              <TableCell className={`text-center font-bold ${entry.changeQty > 0 ? 'text-success' : 'text-destructive'}`}>
                                 {entry.changeQty > 0 ? '+' : ''}{entry.changeQty}
                              </TableCell>
                              <TableCell className="text-center font-black">{entry.afterQty}</TableCell>
                              <TableCell className="text-xs font-medium text-primary">{entry.docNo}</TableCell>
                              <TableCell className="text-right pe-6 text-xs font-bold text-default-600">{entry.user}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </TabsContent>
      </Tabs>

      {/* Transfer Modal */}
      <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
         <DialogContent>
            <DialogHeader><DialogTitle>Điều chuyển nội bộ (Transfer)</DialogTitle></DialogHeader>
            {selectedItem && (
               <div className="py-4 space-y-4">
                  <div className="p-3 bg-default-50 rounded-lg text-sm">
                     <div className="font-bold">{selectedItem.itemName}</div>
                     <div className="text-xs text-default-400">Hiện tại: {selectedItem.location} ({selectedItem.availableQty} khả dụng)</div>
                  </div>
                  <div className="grid gap-2">
                     <Label>Vị trí đích</Label>
                     <Input value={targetLoc} onChange={(e) => setTargetLoc(e.target.value.toUpperCase())} placeholder="Nhập mã vị trí kệ..." />
                  </div>
                  <div className="grid gap-2">
                     <Label>Số lượng điều chuyển</Label>
                     <Input type="number" value={transferQty} onChange={(e) => setTransferQty(Number(e.target.value))} />
                  </div>
               </div>
            )}
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsTransferOpen(false)}>HỦY</Button>
               <Button color="primary" onClick={handleTransfer}>XÁC NHẬN ĐIỀU CHUYỂN</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* Adjust Modal */}
      <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
         <DialogContent>
            <DialogHeader><DialogTitle>Điều chỉnh tồn kho (Adjustment)</DialogTitle></DialogHeader>
            {selectedItem && (
               <div className="py-4 space-y-4">
                  <div className="p-3 bg-default-50 rounded-lg text-sm font-bold text-center">
                     Tồn thực tế: {selectedItem.onHandQty} {selectedItem.uom}
                  </div>
                  <div className="grid gap-2">
                     <Label>Số lượng điều chỉnh (+/-)</Label>
                     <Input type="number" value={adjustQty} onChange={(e) => setAdjustQty(Number(e.target.value))} className="text-center text-2xl font-black h-14" />
                     <p className="text-[10px] text-default-400 text-center">Dùng số âm để giảm tồn, số dương để tăng tồn</p>
                  </div>
               </div>
            )}
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsAdjustOpen(false)}>HỦY</Button>
               <Button color="warning" onClick={handleAdjust}>GHI NHẬN ĐIỀU CHỈNH</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
