"use client"
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WaveDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase font-bold text-primary">Chi tiết Wave: {id}</h1>
        <div className="flex gap-2">
          <Button color="success">Release Wave</Button>
          <Button variant="outline">Hủy Wave</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-0 px-4 border-b border-default-100">
          <Tabs defaultValue="orders">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger value="orders">Đơn hàng (Orders)</TabsTrigger>
              <TabsTrigger value="tasks">Nhiệm vụ (Tasks)</TabsTrigger>
              <TabsTrigger value="shortages">Thiếu hụt</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã SO</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-primary">SO-24001</TableCell>
                <TableCell>Bách Hóa Xanh</TableCell>
                <TableCell className="text-center">20</TableCell>
                <TableCell><Badge color="info">Open</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
