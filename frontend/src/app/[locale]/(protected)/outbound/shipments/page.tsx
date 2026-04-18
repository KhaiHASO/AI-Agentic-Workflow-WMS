"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockShipments } from "@/lib/mock-data/outbound";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function ShipmentsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold uppercase">Danh sách Giao hàng (Shipments)</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý đóng gói và vận chuyển hàng ra khỏi kho</p>
        </div>
        <Button color="primary" className="flex items-center gap-2">
          <Icon icon="heroicons:plus" /> Tạo Shipment thủ công
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead>Mã Shipment</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Đơn vị vận chuyển</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShipments.map((sh) => (
                <TableRow key={sh.id} className="hover:bg-default-50/50 transition-colors">
                  <TableCell className="font-bold text-primary">{sh.shipmentNo}</TableCell>
                  <TableCell className="font-medium">{sh.customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Icon icon="heroicons:truck" className="text-default-400" />
                       <span className="text-sm">{sh.carrier}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color={sh.status === 'Confirmed' ? 'success' : 'secondary'}>
                      {sh.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                       <Button variant="soft" size="sm" color="info" onClick={() => router.push(`/outbound/shipments/${sh.id}`)}>
                          Chi tiết
                       </Button>
                       {sh.status === 'Confirmed' && (
                         <Button size="sm" color="success">Push GI</Button>
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
}
