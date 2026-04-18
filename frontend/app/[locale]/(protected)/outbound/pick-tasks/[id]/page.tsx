"use client"
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PickingWorkbench() {
  const { id } = useParams();

  const handlePick = () => {
    toast.success("Đã hoàn thành lấy hàng (Picking)!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-primary uppercase font-bold text-2xl">
        <h1>Picking Workbench: {id}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-warning">
          <CardHeader><CardTitle>Vị trí lấy hàng (Source Location)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Vị trí:</span><Badge color="warning" className="text-lg">ZONE-B-05-10</Badge></div>
            <div className="flex justify-between"><span>Sản phẩm:</span><strong>Sữa tươi 1L</strong></div>
            <div className="flex justify-between"><span>Số lượng cần lấy:</span><strong className="text-xl text-primary">20</strong></div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-info">
          <CardHeader><CardTitle>Xác nhận lấy hàng</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quét mã vạch sản phẩm</label>
              <Input placeholder="Quét Barcode sản phẩm..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Số lượng thực tế</label>
              <Input type="number" defaultValue={20} />
            </div>
            <Button className="w-full" color="primary" onClick={handlePick}>Xác nhận lấy hàng</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
