"use client"

import { useQualityStore, QCOrder, QuarantineItem } from "@/store/quality-store";
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

export const QualityConsole = () => {
  const { qcOrders, quarantineItems, updateQCResult, releaseQuarantine, disposeQuarantine } = useQualityStore();
  
  const [selectedQC, setSelectedQC] = useState<QCOrder | null>(null);
  const [isQCResultOpen, setIsQCResultOpen] = useState(false);
  const [qcResults, setQCResults] = useState({ accepted: 0, rejected: 0, hold: 0 });

  const handleSaveQC = () => {
    if (!selectedQC) return;
    updateQCResult(selectedQC.id, {
      acceptedQty: qcResults.accepted,
      rejectedQty: qcResults.rejected,
      holdQty: qcResults.hold,
      reason: "Manual Inspection"
    });
    toast.success("Đã ghi nhận kết quả kiểm định");
    setIsQCResultOpen(false);
  };

  const handleRelease = (item: QuarantineItem) => {
    releaseQuarantine(item.id);
    toast.success(`Đã giải phóng ${item.itemName} về kho khả dụng`);
  };

  const handleDispose = (item: QuarantineItem) => {
    if (confirm(`Xác nhận tiêu hủy ${item.itemName}? Thao tác này không thể hoàn tác.`)) {
       disposeQuarantine(item.id);
       toast.error("Đã tiêu hủy hàng hóa");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="qc" className="w-full">
         <TabsList className="bg-white border border-default-200 p-1 h-12">
            <TabsTrigger value="qc" className="px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">QUALITY ORDERS</TabsTrigger>
            <TabsTrigger value="quarantine" className="px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">QUARANTINE QUEUE</TabsTrigger>
         </TabsList>

         <TabsContent value="qc" className="mt-6">
            <div className="grid grid-cols-12 gap-6">
               <div className="col-span-12 lg:col-span-8">
                  <Card>
                     <CardHeader><CardTitle className="text-sm font-bold uppercase">Danh sách lệnh kiểm định</CardTitle></CardHeader>
                     <CardContent className="p-0">
                        <Table>
                           <TableHeader className="bg-default-50">
                              <TableRow>
                                 <TableHead className="ps-6">QC Order</TableHead>
                                 <TableHead>Sản phẩm</TableHead>
                                 <TableHead className="text-center">Số lượng</TableHead>
                                 <TableHead>Trạng thái</TableHead>
                                 <TableHead className="text-right pe-6">Thao tác</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {qcOrders.map((order) => (
                                 <TableRow key={order.id} className="hover:bg-default-50">
                                    <TableCell className="ps-6 font-bold text-primary">{order.orderNo}</TableCell>
                                    <TableCell>
                                       <div className="text-xs font-bold">{order.itemName}</div>
                                       <div className="text-[10px] text-default-400">{order.itemCode} • {order.sourceDoc}</div>
                                    </TableCell>
                                    <TableCell className="text-center font-black text-lg">{order.qty}</TableCell>
                                    <TableCell>
                                       <Badge color={
                                          order.status === 'Accepted' ? 'success' :
                                          order.status === 'Rejected' ? 'destructive' :
                                          order.status === 'Pending' ? 'default' : 'warning'
                                       } variant="soft">
                                          {order.status}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pe-6">
                                       <Button size="sm" variant="outline" className="h-8 font-bold" onClick={() => { setSelectedQC(order); setQCResults({ accepted: order.qty, rejected: 0, hold: 0 }); setIsQCResultOpen(true); }}>
                                          RECORD RESULT
                                       </Button>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </CardContent>
                  </Card>
               </div>

               <div className="col-span-12 lg:col-span-4">
                  <Card className="h-full">
                     <CardHeader><CardTitle className="text-sm font-bold uppercase">QC Summary</CardTitle></CardHeader>
                     <CardContent className="space-y-6">
                        <div className="p-4 bg-default-50 rounded-xl border border-default-100 flex items-center justify-between">
                           <div className="text-sm font-medium">Lệnh chờ xử lý</div>
                           <div className="text-2xl font-black text-primary">{qcOrders.filter(o => o.status === 'Pending').length}</div>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-xs font-bold text-default-400 uppercase tracking-widest">Tiêu chuẩn kiểm định</h4>
                           <div className="space-y-2">
                              {['Ngoại quan sản phẩm', 'Hạn sử dụng (Shelf-life)', 'Tem nhãn & Bao bì', 'Trọng lượng tịnh'].map((std, idx) => (
                                 <div key={idx} className="flex items-center gap-2 text-xs font-medium text-default-600">
                                    <Icon icon="heroicons:check-circle" className="text-success w-4 h-4" />
                                    {std}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="quarantine" className="mt-6">
            <Card>
               <CardHeader><CardTitle className="text-sm font-bold uppercase">Hàng hóa đang bị phong tỏa (Quarantine)</CardTitle></CardHeader>
               <CardContent className="p-0">
                  <Table>
                     <TableHeader className="bg-default-50">
                        <TableRow>
                           <TableHead className="ps-6">Sản phẩm</TableHead>
                           <TableHead>Vị trí</TableHead>
                           <TableHead className="text-center">Số lượng</TableHead>
                           <TableHead>Lý do</TableHead>
                           <TableHead>Trạng thái</TableHead>
                           <TableHead className="text-right pe-6">Thao tác</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {quarantineItems.map((item) => (
                           <TableRow key={item.id}>
                              <TableCell className="ps-6">
                                 <div className="font-bold text-default-900">{item.itemName}</div>
                                 <div className="text-[10px] text-default-400 font-mono">{item.itemCode}</div>
                              </TableCell>
                              <TableCell className="font-black text-destructive">{item.location}</TableCell>
                              <TableCell className="text-center font-bold text-lg">{item.qty}</TableCell>
                              <TableCell className="max-w-[200px] truncate text-xs text-default-500 italic">{item.reason}</TableCell>
                              <TableCell>
                                 <Badge variant="soft" color={
                                    item.status === 'Released' ? 'success' :
                                    item.status === 'Disposed' ? 'destructive' : 'warning'
                                 }>{item.status}</Badge>
                              </TableCell>
                              <TableCell className="text-right pe-6">
                                 <div className="flex justify-end gap-2">
                                    <Button size="sm" variant="soft" color="success" className="h-8 font-bold" onClick={() => handleRelease(item)}>RELEASE</Button>
                                    <Button size="sm" variant="soft" color="destructive" className="h-8 font-bold" onClick={() => handleDispose(item)}>DISPOSE</Button>
                                 </div>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </CardContent>
            </Card>
         </TabsContent>
      </Tabs>

      {/* QC Result Modal */}
      <Dialog open={isQCResultOpen} onOpenChange={setIsQCResultOpen}>
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader><DialogTitle className="text-xl font-black">Record QC Result</DialogTitle></DialogHeader>
            {selectedQC && (
               <div className="py-6 space-y-6">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                     <div className="text-[10px] font-bold text-primary uppercase">Mặt hàng</div>
                     <div className="text-lg font-bold">{selectedQC.itemName}</div>
                     <div className="text-xs text-default-500">Tổng số lượng: {selectedQC.qty}</div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                           <Label className="text-success font-bold">Accepted</Label>
                           <Input type="number" value={qcResults.accepted} onChange={(e) => setQCResults({ ...qcResults, accepted: Number(e.target.value) })} className="border-success/30 font-bold" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-destructive font-bold">Rejected</Label>
                           <Input type="number" value={qcResults.rejected} onChange={(e) => setQCResults({ ...qcResults, rejected: Number(e.target.value) })} className="border-destructive/30 font-bold" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-warning font-bold">Hold</Label>
                           <Input type="number" value={qcResults.hold} onChange={(e) => setQCResults({ ...qcResults, hold: Number(e.target.value) })} className="border-warning/30 font-bold" />
                        </div>
                     </div>
                     
                     <div className="p-3 bg-default-50 rounded-lg flex justify-between items-center">
                        <span className="text-xs font-medium">Tổng đã nhập:</span>
                        <span className={`text-sm font-black ${qcResults.accepted + qcResults.rejected + qcResults.hold !== selectedQC.qty ? 'text-destructive' : 'text-success'}`}>
                           {qcResults.accepted + qcResults.rejected + qcResults.hold} / {selectedQC.qty}
                        </span>
                     </div>
                  </div>
               </div>
            )}
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsQCResultOpen(false)}>HỦY</Button>
               <Button 
                  color="primary" 
                  onClick={handleSaveQC} 
                  disabled={selectedQC ? qcResults.accepted + qcResults.rejected + qcResults.hold !== selectedQC.qty : true}
               >
                  XÁC NHẬN KẾT QUẢ
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
