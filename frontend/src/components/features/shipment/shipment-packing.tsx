"use client"

import { useShipmentStore } from "@/store/shipment-store";
import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

export const ShipmentPacking = ({ shipmentId }: { shipmentId: string }) => {
  const { packages, createPackage } = useShipmentStore();

  const handleCreatePackage = () => {
    createPackage('Carton');
    toast.success("Đã tạo kiện hàng (Package) mới.");
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Shipment Packing: ${shipmentId}`}
        subtitle="Thực hiện đóng gói hàng hóa vào kiện (Carton/Pallet)"
        backButton
        actions={[
          { label: "Tạo kiện mới", icon: "heroicons:plus-circle", onClick: handleCreatePackage },
          { label: "Xác nhận Giao hàng", icon: "heroicons:truck", color: "success", onClick: () => {} }
        ]}
      />

      <div className="grid grid-cols-12 gap-6">
         {/* Danh sách kiện hàng */}
         <div className="col-span-12 lg:col-span-8 space-y-4">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="border-none shadow-sm overflow-hidden">
                <CardHeader className="bg-default-50 border-b border-default-100 flex flex-row items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-primary/10 text-primary flex items-center justify-center">
                         <Icon icon={pkg.type === 'Carton' ? "heroicons:archive-box" : "heroicons:cube"} className="w-6 h-6" />
                      </div>
                      <div>
                         <CardTitle className="text-sm font-black">{pkg.packageNo}</CardTitle>
                         <div className="text-[10px] text-default-400 font-bold uppercase">{pkg.type} | {pkg.weight} KG</div>
                      </div>
                   </div>
                   <Badge color="info">{pkg.status}</Badge>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y divide-default-100">
                      {pkg.items.length > 0 ? pkg.items.map((item, idx) => (
                        <div key={idx} className="p-4 flex justify-between items-center hover:bg-default-50/50 transition-colors">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-default-700">{item.itemName}</span>
                              <span className="text-xs text-default-400">{item.itemCode}</span>
                           </div>
                           <div className="text-lg font-black text-primary">x{item.qty}</div>
                        </div>
                      )) : (
                        <div className="p-8 text-center text-default-400 italic text-sm">Chưa có sản phẩm nào trong kiện này</div>
                      )}
                   </div>
                   <div className="p-4 bg-default-50/50 flex justify-end gap-2 border-t border-default-100">
                      <Button variant="outline" size="sm" className="h-8 gap-2"><Icon icon="heroicons:printer" /> In nhãn kiện</Button>
                      <Button variant="soft" size="sm" className="h-8 gap-2"><Icon icon="heroicons:plus" /> Thêm hàng</Button>
                   </div>
                </CardContent>
              </Card>
            ))}
         </div>

         {/* Thông tin đơn hàng gốc */}
         <div className="col-span-12 lg:col-span-4">
            <Card className="sticky top-6">
               <CardHeader><CardTitle className="text-xs uppercase font-bold text-default-400 tracking-widest">Hàng chưa đóng gói</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-warning-700">Sữa tươi Vinamilk 1L</span>
                        <span className="text-lg font-black text-warning-700">10 / 20</span>
                     </div>
                     <div className="w-full h-1.5 bg-warning/20 rounded-full overflow-hidden">
                        <div className="h-full bg-warning w-1/2" />
                     </div>
                  </div>
                  <div className="p-4 bg-success/5 border border-success/20 rounded-xl opacity-50">
                     <div className="flex justify-between items-center text-success-700">
                        <span className="text-xs font-bold">Sữa chua Vinamilk</span>
                        <span className="text-lg font-black">15 / 15</span>
                     </div>
                     <div className="text-[10px] font-bold uppercase mt-1">ĐÃ ĐÓNG ĐỦ</div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
};
