"use client"

import { useShipmentStore } from "@/store/shipment-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const ShipmentPacking = () => {
  const { currentShipment, packages, createPackage, addItemToPackage, removeItemFromPackage, closePackage, confirmShipment, pushGI } = useShipmentStore();
  
  const [activePackageId, setActivePackageId] = useState<string | null>(packages[0]?.id || null);
  const [weightInput, setWeightInput] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (!currentShipment) return <div>Không tìm thấy thông tin Shipment.</div>;

  const totalQty = currentShipment.lines.reduce((acc, l) => acc + l.qty, 0);
  const packedTotal = currentShipment.lines.reduce((acc, l) => acc + l.packedQty, 0);
  const packingProgress = (packedTotal / totalQty) * 100;

  const handlePackItem = (itemCode: string) => {
    if (!activePackageId) {
      toast.error("Vui lòng chọn hoặc tạo package trước");
      return;
    }
    addItemToPackage(activePackageId, itemCode, 1);
    toast.success("Đã thêm 1 đơn vị vào kiện hàng");
  };

  const handleClosePackage = () => {
    if (!activePackageId || !weightInput) return;
    closePackage(activePackageId, Number(weightInput));
    setWeightInput("");
    toast.success("Đã đóng kiện hàng và ghi nhận cân nặng");
  };

  const handleConfirm = () => {
    confirmShipment();
    toast.success("Đã xác nhận Shipment!");
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] -m-6 bg-default-50">
      {/* Shipment Header */}
      <div className="bg-white border-b border-default-200 p-4 px-6 flex items-center justify-between sticky top-0 z-20">
         <div className="flex items-center gap-4">
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-default-900">{currentShipment.shipmentNo}</h1>
                  <Badge variant="soft" color={currentShipment.status === 'Confirmed' ? 'success' : 'info'}>
                     {currentShipment.status}
                  </Badge>
               </div>
               <div className="text-xs text-default-500 font-medium">Order: {currentShipment.orderNo} • Customer: {currentShipment.customer}</div>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-right">
               <div className="text-[10px] uppercase font-bold text-default-400">Tiến độ đóng gói</div>
               <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{Math.round(packingProgress)}%</span>
                  <div className="h-1.5 w-32 bg-default-100 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: `${packingProgress}%` }} />
                  </div>
               </div>
            </div>
            {currentShipment.status === 'Confirmed' ? (
               <Button color="success" className="font-bold gap-2" onClick={pushGI}>
                  <Icon icon="heroicons:paper-airplane" />
                  PUSH GI (ERP)
               </Button>
            ) : (
               <Button color="primary" className="font-bold" onClick={() => setIsConfirmOpen(true)}>
                  CONFIRM SHIPMENT
               </Button>
            )}
         </div>
      </div>

      <div className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
         {/* Cột trái: Lines to Pack */}
         <div className="col-span-12 lg:col-span-4 space-y-6 overflow-y-auto">
            <Card>
               <CardHeader className="pb-3 border-b border-default-100">
                  <CardTitle className="text-sm font-black uppercase flex items-center justify-between">
                     Danh sách sản phẩm
                     <Badge variant="soft">{currentShipment.lines.length} Lines</Badge>
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                  {currentShipment.lines.map(line => (
                     <div 
                        key={line.id} 
                        className={`p-4 border-b border-default-50 last:border-0 hover:bg-default-50 transition-colors cursor-pointer group ${line.packedQty === line.qty ? 'bg-success/5' : ''}`}
                        onClick={() => handlePackItem(line.itemCode)}
                     >
                        <div className="flex justify-between items-start mb-2">
                           <div className="font-bold text-sm text-default-900 group-hover:text-primary transition-colors">{line.itemName}</div>
                           {line.packedQty === line.qty && <Icon icon="heroicons:check-circle" className="text-success w-5 h-5" />}
                        </div>
                        <div className="flex justify-between items-end">
                           <div className="text-[10px] text-default-400 font-mono">{line.itemCode}</div>
                           <div className="text-right">
                              <div className="text-xs font-bold">
                                 <span className={line.packedQty > 0 ? 'text-primary' : ''}>{line.packedQty}</span> / {line.qty} {line.uom}
                              </div>
                              <Progress value={(line.packedQty / line.qty) * 100} className="h-1 w-20 mt-1" />
                           </div>
                        </div>
                     </div>
                  ))}
               </CardContent>
            </Card>

            <Card>
               <CardHeader><CardTitle className="text-xs uppercase text-default-400">Integration Status</CardTitle></CardHeader>
               <CardContent>
                  <div className={`p-3 rounded-lg flex items-center justify-between ${
                     currentShipment.integrationStatus === 'Success' ? 'bg-success/10 text-success' :
                     currentShipment.integrationStatus === 'Failed' ? 'bg-destructive/10 text-destructive' : 'bg-default-100 text-default-500'
                  }`}>
                     <div className="flex items-center gap-2 font-bold text-xs uppercase">
                        <Icon icon={currentShipment.integrationStatus === 'Success' ? "heroicons:check-circle" : "heroicons:arrow-path"} />
                        ERP Push: {currentShipment.integrationStatus}
                     </div>
                     <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold">RETRY</Button>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Cột giữa: Active Package Workspace */}
         <div className="col-span-12 lg:col-span-5 space-y-6 flex flex-col overflow-hidden">
            <Card className="flex-1 flex flex-col border-2 border-primary/20 shadow-xl overflow-hidden">
               <CardHeader className="bg-primary/5 border-b border-primary/10 flex flex-row items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                        <Icon icon="heroicons:archive-box" className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="text-xs font-black text-primary uppercase">Đang đóng kiện</div>
                        <div className="text-lg font-black text-default-900 leading-none">
                           {packages.find(p => p.id === activePackageId)?.packageNo || 'CHƯA CHỌN KIỆN'}
                        </div>
                     </div>
                  </div>
                  <Button variant="outline" size="sm" className="font-bold gap-2 bg-white" onClick={() => createPackage('Carton')}>
                     <Icon icon="heroicons:plus" /> KIỆN MỚI
                  </Button>
               </CardHeader>
               <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                     {activePackageId && packages.find(p => p.id === activePackageId)?.items.map((item, idx) => (
                        <div key={idx} className="bg-white border border-default-100 p-3 rounded-lg flex items-center justify-between group">
                           <div>
                              <div className="text-sm font-bold">{item.itemName}</div>
                              <div className="text-[10px] text-default-400">{item.itemCode}</div>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-lg font-black text-primary">x{item.qty}</span>
                              <Button 
                                 variant="ghost" 
                                 size="icon" 
                                 className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                 onClick={() => removeItemFromPackage(activePackageId, item.itemCode)}
                              >
                                 <Icon icon="heroicons:trash" />
                              </Button>
                           </div>
                        </div>
                     ))}
                     {(!activePackageId || packages.find(p => p.id === activePackageId)?.items.length === 0) && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30">
                           <Icon icon="heroicons:archive-box" className="w-20 h-20 mb-4" />
                           <p className="font-bold text-lg">Kiện hàng trống</p>
                           <p className="text-sm">Chọn sản phẩm ở cột trái để bắt đầu đóng gói vào kiện này</p>
                        </div>
                     )}
                  </div>
                  
                  <div className="p-6 bg-default-50 border-t border-default-100 space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-[10px] font-bold uppercase text-default-400">Trọng lượng (kg)</Label>
                           <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="font-black text-xl h-12"
                              value={weightInput}
                              onChange={(e) => setWeightInput(e.target.value)}
                           />
                        </div>
                        <div className="flex flex-col justify-end">
                           <Button 
                              className="h-12 font-black uppercase tracking-widest" 
                              color="primary"
                              disabled={!activePackageId || !weightInput}
                              onClick={handleClosePackage}
                           >
                              ĐÓNG KIỆN (CLOSE)
                           </Button>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Cột phải: Package List */}
         <div className="col-span-12 lg:col-span-3 space-y-6 overflow-y-auto">
            <h3 className="text-xs font-black text-default-500 uppercase tracking-widest px-2">Các kiện đã tạo ({packages.length})</h3>
            <div className="space-y-3">
               {packages.map(pkg => (
                  <Card 
                     key={pkg.id} 
                     className={`cursor-pointer transition-all border-l-4 ${activePackageId === pkg.id ? 'border-primary ring-2 ring-primary ring-inset' : 'border-default-200'}`}
                     onClick={() => setActivePackageId(pkg.id)}
                  >
                     <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                           <div className="font-bold text-sm">{pkg.packageNo}</div>
                           <Badge variant="soft" color={pkg.status === 'Closed' ? 'success' : 'warning'} className="text-[9px]">
                              {pkg.status}
                           </Badge>
                        </div>
                        <div className="flex justify-between items-end">
                           <div className="text-[10px] text-default-400">{pkg.type} • {pkg.items.reduce((acc, i) => acc + i.qty, 0)} items</div>
                           <div className="text-xs font-black text-default-700">{pkg.weight} kg</div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      </div>

      {/* Confirm Shipment Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-2xl font-black uppercase">Xác nhận Shipment</DialogTitle>
            </DialogHeader>
            <div className="py-6 space-y-4">
               <div className="bg-default-50 p-4 rounded-xl border border-default-100 space-y-2">
                  <div className="flex justify-between text-sm">
                     <span>Tổng số lượng yêu cầu:</span>
                     <span className="font-bold">{totalQty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span>Tổng số lượng đã đóng:</span>
                     <span className="font-bold text-primary">{packedTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span>Số kiện hàng:</span>
                     <span className="font-bold">{packages.length}</span>
                  </div>
               </div>
               {packedTotal < totalQty && (
                  <div className="p-3 bg-destructive/10 text-destructive text-xs font-bold rounded-lg flex gap-2">
                     <Icon icon="heroicons:exclamation-triangle" className="w-5 h-5 shrink-0" />
                     Cảnh báo: Bạn chưa đóng gói hết sản phẩm. Vẫn xác nhận shipment?
                  </div>
               )}
            </div>
            <DialogFooter className="gap-2">
               <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>QUAY LẠI</Button>
               <Button color="primary" className="font-bold uppercase tracking-widest px-8" onClick={handleConfirm}>
                  XÁC NHẬN (CONFIRM)
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
