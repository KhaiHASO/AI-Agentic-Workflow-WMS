"use client"

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";

export default function WaveDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <Icon icon="heroicons:arrow-left" />
          </Button>
          <h1 className="text-2xl font-bold uppercase text-default-900">Chi tiết Đợt xuất: {id}</h1>
        </div>
        <div className="flex gap-2">
          <Button color="success" className="gap-2">
            <Icon icon="heroicons:bolt" /> Release Wave
          </Button>
          <Button variant="outline" color="destructive">Hủy Wave</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-info"><CardContent className="p-4">
          <div className="text-[10px] font-bold text-default-400 uppercase">Trạng thái</div>
          <Badge color="info" className="mt-1">OPEN</Badge>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="text-[10px] font-bold text-default-400 uppercase">Tổng số đơn</div>
          <div className="mt-1 font-black">5 Đơn hàng</div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="text-[10px] font-bold text-default-400 uppercase">Tổng SKU</div>
          <div className="mt-1 font-black">12 Mặt hàng</div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="text-[10px] font-bold text-default-400 uppercase">Picking Progress</div>
          <div className="mt-1 font-black text-primary">0%</div>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader className="p-0 border-b border-default-100">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="bg-transparent h-14 px-4">
              <TabsTrigger value="orders">Đơn hàng con (5)</TabsTrigger>
              <TabsTrigger value="tasks" className="font-bold">Danh sách Tác vụ (Tasks)</TabsTrigger>
              <TabsTrigger value="shortages" className="text-destructive">Thiếu hàng (0)</TabsTrigger>
            </TabsList>
            
            <div className="p-0">
               <TabsContent value="tasks" className="m-0">
                  <Table>
                    <TableHeader className="bg-default-50">
                      <TableRow>
                        <TableHead>Mã Task</TableHead>
                        <TableHead>Vị trí lấy</TableHead>
                        <TableHead>Mặt hàng</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right px-6">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-bold text-primary">PK-24001</TableCell>
                        <TableCell><Badge variant="soft" color="warning">ZONE-A-05-10</Badge></TableCell>
                        <TableCell>Sữa tươi Vinamilk 1L</TableCell>
                        <TableCell className="text-center font-bold">20</TableCell>
                        <TableCell><Badge color="info">Ready</Badge></TableCell>
                        <TableCell className="text-right px-6">
                           <Button size="sm" color="primary" onClick={() => router.push(`/outbound/pick-tasks/ptk-1`)}>
                              Mở Picking
                           </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
               </TabsContent>
            </div>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
