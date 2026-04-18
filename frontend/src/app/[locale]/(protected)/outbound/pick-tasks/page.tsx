"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPickTasks } from "@/lib/mock-data/outbound";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export default function PickTasksPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold uppercase">Nhiệm vụ lấy hàng (Picking Tasks)</h1>
          <p className="text-sm text-default-500 mt-1">Danh sách các lệnh lấy hàng từ kệ đã được giải phóng</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead>Mã Tác vụ</TableHead>
                <TableHead>Khu vực (Zone)</TableHead>
                <TableHead>Mã Wave</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPickTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-default-50/50 transition-colors">
                  <TableCell className="font-bold text-primary">{task.taskNo}</TableCell>
                  <TableCell><Badge variant="soft" color="warning">{task.zone}</Badge></TableCell>
                  <TableCell className="font-medium text-default-600">{task.waveId}</TableCell>
                  <TableCell>
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold uppercase">AD</div>
                        <span className="text-xs font-medium">{task.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-default-400 italic">Chưa gán</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge color={task.status === 'Open' ? 'info' : 'warning'}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <Button 
                      size="sm" 
                      color="primary"
                      onClick={() => router.push(`/outbound/pick-tasks/${task.id}`)}
                    >
                      Bắt đầu Picking
                    </Button>
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
