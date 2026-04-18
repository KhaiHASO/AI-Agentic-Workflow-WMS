"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockShipments } from "@/mock/outbound";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const ShipmentsPage = () => {
  const router = useRouter();

  const handleCreateShipment = () => {
    toast.success("Đang tạo Shipment mới từ Pick Tasks hoàn thành...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Shipment Management</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý đóng gói và giao hàng</p>
        </div>
        <Button color="primary" onClick={handleCreateShipment}>
          <Icon icon="heroicons:truck" className="mr-2" />
          Tạo Shipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-default-50 border-none">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{mockShipments.filter(s => s.status === 'Draft').length}</div>
            <div className="text-[10px] text-default-500 uppercase font-bold mt-1">Chờ Đóng Gói (Draft)</div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-none">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-info">{mockShipments.filter(s => s.status === 'Confirmed').length}</div>
            <div className="text-[10px] text-info uppercase font-bold mt-1">Đã Xác Nhận</div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-none">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">{mockShipments.filter(s => s.status === 'Shipped').length}</div>
            <div className="text-[10px] text-success uppercase font-bold mt-1">Đã Xuất Kho</div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-none">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{mockShipments.filter(s => s.status === 'Cancelled').length}</div>
            <div className="text-[10px] text-destructive uppercase font-bold mt-1">Đã Hủy</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Shipments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment No.</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Đơn vị vận chuyển</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShipments.map((sh) => (
                <TableRow key={sh.id}>
                  <TableCell className="font-semibold text-primary">{sh.shipmentNo}</TableCell>
                  <TableCell>{sh.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Icon icon="heroicons:building-office" className="text-default-400" />
                        {sh.carrier}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={sh.status === 'Shipped' ? 'success' : sh.status === 'Confirmed' ? 'info' : sh.status === 'Draft' ? 'secondary' : 'destructive'}>
                      {sh.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="soft" 
                        size="sm"
                        onClick={() => router.push(`/en/outbound/shipments/${sh.id}`)}
                      >
                        Mở
                      </Button>
                      {sh.status === 'Draft' && (
                        <Button size="sm" color="warning" onClick={() => toast.success(`Đã mở màn hình đóng gói cho ${sh.shipmentNo}`)}>
                          Pack
                        </Button>
                      )}
                      {sh.status === 'Confirmed' && (
                        <Button size="sm" color="success" onClick={() => toast.success(`Đã xác nhận xuất kho ${sh.shipmentNo}`)}>
                          Confirm GI
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsPage;
