"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockWaves } from "@/mock/outbound";
import { useRouter } from "next/navigation";

export default function WavesPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quản lý Đợt xuất hàng (Waves)</h1>
        <Button color="primary">Tạo Wave mới</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Wave</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Số đơn hàng</TableHead>
                <TableHead className="text-center">Số tác vụ</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWaves.map((wv) => (
                <TableRow key={wv.id}>
                  <TableCell className="font-medium text-primary">{wv.waveNo}</TableCell>
                  <TableCell><Badge color={wv.status === 'Open' ? 'info' : 'success'}>{wv.status}</Badge></TableCell>
                  <TableCell className="text-center">{wv.orderCount}</TableCell>
                  <TableCell className="text-center">{wv.taskCount}</TableCell>
                  <TableCell>{wv.createdAt}</TableCell>
                  <TableCell className="text-right px-6">
                    <Button variant="soft" size="sm" onClick={() => router.push(`/en/outbound/waves/${wv.id}`)}>Chi tiết</Button>
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
