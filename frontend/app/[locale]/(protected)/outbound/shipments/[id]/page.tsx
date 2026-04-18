"use client"
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShipmentDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase font-bold text-primary">Chi tiết Shipment: {id}</h1>
        <div className="flex gap-2">
          <Button color="success">Xác nhận Shipment</Button>
          <Button color="info">Push ERP (GI)</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><strong>Trạng thái:</strong> <Badge color="secondary">Draft</Badge></CardContent></Card>
        <Card><CardContent className="p-4"><strong>Khách hàng:</strong> Bách Hóa Xanh</CardContent></Card>
        <Card><CardContent className="p-4"><strong>Vận chuyển:</strong> GHTK</CardContent></Card>
        <Card><CardContent className="p-4"><strong>Số kiện:</strong> 2</CardContent></Card>
      </div>

      <Card>
        <CardHeader className="p-0 px-4 border-b border-default-100">
          <Tabs defaultValue="lines">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger value="lines">Danh sách hàng</TabsTrigger>
              <TabsTrigger value="packing">Đóng gói (Packing)</TabsTrigger>
              <TabsTrigger value="integration">Tích hợp ERP</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hàng</TableHead>
                <TableHead>Tên hàng</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ITM-01</TableCell>
                <TableCell>Sữa tươi 1L</TableCell>
                <TableCell className="text-center">20</TableCell>
                <TableCell><Badge color="success">Picked</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
