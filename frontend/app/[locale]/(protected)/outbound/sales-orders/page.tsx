"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockSOs } from "@/mock/outbound";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { color } from "@/lib/type";

const getStatusColor = (status: string): color => {
  switch (status) {
    case 'Open': return 'info';
    case 'Waved': return 'warning';
    case 'Picking': return 'warning';
    case 'Shipped': return 'success';
    case 'Cancelled': return 'destructive';
    default: return 'default';
  }
};

const SalesOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSOs = mockSOs.filter(so => 
    so.soNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    so.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    toast.success("Đã đồng bộ dữ liệu mới từ ERP");
  };

  const handleCheckStock = () => {
    toast.success("Đã kiểm tra tồn kho cho các đơn hàng đã chọn");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Sales Orders</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý các đơn bán hàng từ ERP</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <Icon icon="heroicons:arrow-path" className="mr-2" />
            Làm mới ERP
          </Button>
          <Button color="primary">
            <Icon icon="heroicons:plus" className="mr-2" />
            Tạo SO mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-info/5 border-none shadow-none">
          <CardContent className="p-4">
            <div className="text-sm text-info font-medium">Chờ xử lý</div>
            <div className="text-2xl font-bold mt-1">{mockSOs.filter(s => s.status === 'Open').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-warning/5 border-none shadow-none">
          <CardContent className="p-4">
            <div className="text-sm text-warning font-medium">Đang lấy hàng</div>
            <div className="text-2xl font-bold mt-1">{mockSOs.filter(s => s.status === 'Picking').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-none shadow-none">
          <CardContent className="p-4">
            <div className="text-sm text-success font-medium">Đã giao hàng</div>
            <div className="text-2xl font-bold mt-1">{mockSOs.filter(s => s.status === 'Shipped').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-default-50 border-none shadow-none">
          <CardContent className="p-4">
            <div className="text-sm text-default-500 font-medium">Tổng số đơn</div>
            <div className="text-2xl font-bold mt-1">{mockSOs.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-default-100">
          <div className="relative w-72">
            <Icon icon="heroicons:magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />
            <Input 
              placeholder="Tìm số đơn, khách hàng..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="soft" onClick={handleCheckStock}>Kiểm tra tồn</Button>
            <Button size="sm" variant="soft" color="warning">Thêm vào Wave</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">SO No.</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt hàng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSOs.map((so) => (
                <TableRow key={so.id}>
                  <TableCell className="font-semibold text-primary">{so.soNo}</TableCell>
                  <TableCell>{so.customer}</TableCell>
                  <TableCell>{so.orderDate}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(so.status)}>{so.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="soft" size="sm">Chi tiết</Button>
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

export default SalesOrdersPage;
