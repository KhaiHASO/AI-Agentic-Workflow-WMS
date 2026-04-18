"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockWaves } from "@/lib/mock-data/outbound";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { PageHeader } from "@/components/wms/page-header";

export default function WavesPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quản lý Đợt xuất (Waves)"
        subtitle="Điều phối và giải phóng lệnh lấy hàng theo đợt"
        actions={[
          { label: "Tạo đợt xuất mới", icon: "heroicons:squares-plus", onClick: () => {} }
        ]}
      />

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead className="ps-6">Mã Wave</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Số đơn con</TableHead>
                <TableHead className="text-center">Số tác vụ Picking</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right pe-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWaves.map((wv) => (
                <TableRow key={wv.id} className="hover:bg-default-50/50 transition-colors">
                  <TableCell className="ps-6 font-black text-primary">{wv.waveNo}</TableCell>
                  <TableCell>
                    <Badge color={wv.status === 'Open' ? 'info' : 'success'}>
                      {wv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-bold">{wv.orderCount}</TableCell>
                  <TableCell className="text-center font-bold">{wv.taskCount}</TableCell>
                  <TableCell className="text-xs text-default-500">{wv.createdAt}</TableCell>
                  <TableCell className="text-right pe-6">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="soft" 
                        size="sm" 
                        color="info"
                        onClick={() => router.push(`/outbound/waves/${wv.id}`)}
                      >
                        Chi tiết
                      </Button>
                      {wv.status === 'Open' && (
                        <Button size="sm" color="success">Release</Button>
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
