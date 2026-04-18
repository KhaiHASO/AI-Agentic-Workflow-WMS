"use client"
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PutawayWorkbench() {
  const { id } = useParams();

  const handleConfirm = () => {
    toast.success("Xác nhận cất hàng thành công!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-primary uppercase font-bold text-2xl">
        <h1>Putaway Workbench: {id}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-primary">
          <CardHeader><CardTitle>Nguồn hàng (Source)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Sản phẩm:</span><strong>Sữa chua Vinamilk</strong></div>
            <div className="flex justify-between"><span>Số lượng cất:</span><strong>50 Thùng</strong></div>
            <div className="flex justify-between"><span>Đã lấy từ cửa nhận:</span><strong>GR-001</strong></div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-success">
          <CardHeader><CardTitle>Đích đến (Suggested Location)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Vị trí đề xuất:</span><Badge color="info" className="text-lg">ZONE-A-01-02</Badge></div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Quét vị trí đích thực tế</label>
              <Input placeholder="Quét Barcode vị trí..." />
            </div>
            <Button className="w-full" color="success" onClick={handleConfirm}>Xác nhận cất hàng</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
