"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";

export default function InventoryOnHand() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Tồn kho hiện tại (On-hand)</h1>
          <p className="text-sm text-default-500">Xem chi tiết tồn kho theo vị trí và trạng thái</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Icon icon="heroicons:arrow-up-tray" /> Xuất Excel
          </Button>
          <Button color="primary" className="flex items-center gap-2">
            <Icon icon="heroicons:plus" /> Điều chỉnh kho
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex-1">
            <Input placeholder="Tìm kiếm theo mã hàng, tên hàng hoặc vị trí..." />
          </div>
          <Button variant="outline" color="secondary">Bộ lọc nâng cao</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-default-50">
                <TableHead>Mã hàng</TableHead>
                <TableHead>Tên hàng hóa</TableHead>
                <TableHead>Vị trí (Location)</TableHead>
                <TableHead className="text-center">Tồn kho</TableHead>
                <TableHead className="text-center">Sẵn dụng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-primary">ITM-01</TableCell>
                <TableCell>Sữa tươi Vinamilk 1L</TableCell>
                <TableCell><Badge variant="soft" color="info">ZONE-A-01-01</Badge></TableCell>
                <TableCell className="text-center font-bold">500</TableCell>
                <TableCell className="text-center text-success font-bold">450</TableCell>
                <TableCell><Badge color="success">Available</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-primary">ITM-02</TableCell>
                <TableCell>Sữa chua TH True Milk</TableCell>
                <TableCell><Badge variant="soft" color="info">ZONE-B-02-05</Badge></TableCell>
                <TableCell className="text-center font-bold">200</TableCell>
                <TableCell className="text-center text-success font-bold">200</TableCell>
                <TableCell><Badge color="success">Available</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-primary">ITM-03</TableCell>
                <TableCell>Bánh quy Oreo</TableCell>
                <TableCell><Badge variant="soft" color="warning">QC-STAGING</Badge></TableCell>
                <TableCell className="text-center font-bold">100</TableCell>
                <TableCell className="text-center text-warning font-bold">0</TableCell>
                <TableCell><Badge color="warning">In QC</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
