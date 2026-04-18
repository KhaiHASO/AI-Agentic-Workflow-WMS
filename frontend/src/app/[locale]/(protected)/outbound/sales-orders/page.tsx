"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSOs } from "@/lib/mock-data/outbound";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function SalesOrdersPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Danh sách Đơn xuất hàng (SO)</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý các yêu cầu xuất kho từ hệ thống ERP</p>
        </div>
        <Button color="primary" className="flex items-center gap-2">
          <Icon icon="heroicons:arrow-path" /> Làm mới từ ERP
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead>Mã đơn hàng (SO)</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSOs.map((so) => (
                <TableRow key={so.id} className="hover:bg-default-50/50 transition-colors">
                  <TableCell className="font-bold text-primary">{so.soNo}</TableCell>
                  <TableCell>{so.customer}</TableCell>
                  <TableCell>{so.orderDate}</TableCell>
                  <TableCell>
                    <Badge color={
                      so.status === 'Open' ? 'info' : 
                      so.status === 'Picking' ? 'warning' : 
                      so.status === 'Shipped' ? 'success' : 'default'
                    }>
                      {so.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button variant="soft" size="sm" color="info">Chi tiết</Button>
                      {so.status === 'Open' && (
                        <Button size="sm" color="primary" onClick={() => router.push('/outbound/waves')}>
                           Thêm vào Wave
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
}
