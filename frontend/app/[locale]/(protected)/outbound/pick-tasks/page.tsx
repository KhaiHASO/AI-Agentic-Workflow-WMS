"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockPickTasks } from "@/mock/outbound";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const PickTasksPage = () => {
  const router = useRouter();

  const handleAssign = () => {
    toast.info("Mở form gán nhân viên lấy hàng...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Picking Tasks</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý các công việc lấy hàng từ kho</p>
        </div>
        <Button color="primary" onClick={handleAssign}>
          <Icon icon="heroicons:user-plus" className="mr-2" />
          Gán Picker
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{mockPickTasks.filter(t => t.status === 'Open').length}</div>
            <div className="text-xs text-default-500 uppercase font-bold mt-1">Chờ gán / Mới</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-warning">{mockPickTasks.filter(t => t.status === 'In Progress').length}</div>
            <div className="text-xs text-default-500 uppercase font-bold mt-1">Đang thực hiện</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-success">{mockPickTasks.filter(t => t.status === 'Completed').length}</div>
            <div className="text-xs text-default-500 uppercase font-bold mt-1">Đã hoàn thành</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-default-600">{mockPickTasks.length}</div>
            <div className="text-xs text-default-500 uppercase font-bold mt-1">Tổng số Task</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Pick Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task No.</TableHead>
                <TableHead>Wave</TableHead>
                <TableHead>Vùng kho (Zone)</TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPickTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-semibold text-primary">{task.taskNo}</TableCell>
                  <TableCell>{task.waveId}</TableCell>
                  <TableCell>
                    <Badge variant="soft">{task.zone}</Badge>
                  </TableCell>
                  <TableCell>
                    {task.assignee ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                          {task.assignee.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-default-400 italic">Chưa gán</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge color={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'warning' : 'info'}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="soft" 
                        size="sm"
                        onClick={() => router.push(`/en/outbound/pick-tasks/${task.id}`)}
                      >
                        Lấy hàng
                      </Button>
                      <Button variant="outline" size="sm" color="destructive">
                        Short Pick
                      </Button>
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

export default PickTasksPage;
