"use client"

import { usePutawayStore, PutawayTask, TaskStatus } from "@/store/putaway-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'Open': return 'secondary';
    case 'Assigned': return 'info';
    case 'InProgress': return 'warning';
    case 'Completed': return 'success';
    case 'Exception': return 'destructive';
    case 'Cancelled': return 'default';
    default: return 'default';
  }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'destructive';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'secondary';
    }
};

export default function PutawayTasksPage() {
  const router = useRouter();
  const { tasks, startTask } = usePutawayStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
        const matchesSearch = task.taskNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             task.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             task.sourceHuId?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesTab = activeTab === "All" || 
                          (activeTab === "Overdue" && task.overdue) ||
                          (activeTab === "Exceptions" && task.status === 'Exception') ||
                          (task.status === activeTab);
        
        return matchesSearch && matchesTab;
    });
  }, [tasks, searchTerm, activeTab]);

  const stats = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'Open' || t.status === 'Assigned').length,
    overdue: tasks.filter(t => t.overdue).length,
    exception: tasks.filter(t => t.status === 'Exception').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  }), [tasks]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-default-900">Danh sách tác vụ cất hàng</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý và điều phối các lệnh cất hàng (Putaway Tasks)</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Icon icon="heroicons:arrow-path" />
                Làm mới
            </Button>
            <Button color="primary" className="gap-2">
                <Icon icon="heroicons:plus" />
                Tạo Task thủ công
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard label="Tất cả" value={stats.all} icon="heroicons:list-bullet" color="primary" onClick={() => setActiveTab("All")} active={activeTab === "All"} />
          <StatCard label="Chưa xử lý" value={stats.pending} icon="heroicons:clock" color="info" onClick={() => setActiveTab("Assigned")} active={activeTab === "Assigned"} />
          <StatCard label="Quá hạn" value={stats.overdue} icon="heroicons:exclamation-circle" color="destructive" onClick={() => setActiveTab("Overdue")} active={activeTab === "Overdue"} />
          <StatCard label="Ngoại lệ" value={stats.exception} icon="heroicons:shield-exclamation" color="warning" onClick={() => setActiveTab("Exceptions")} active={activeTab === "Exceptions"} />
          <StatCard label="Hoàn tất" value={stats.completed} icon="heroicons:check-circle" color="success" onClick={() => setActiveTab("Completed")} active={activeTab === "Completed"} />
      </div>

      <Card>
        <div className="p-4 border-b border-default-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
                <Icon icon="heroicons:magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400" />
                <Input 
                    placeholder="Tìm theo Task No, Item, HU..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">Bộ lọc nâng cao</Button>
                <Button variant="outline" size="sm">Xuất báo cáo</Button>
            </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead className="font-bold">Task No.</TableHead>
                <TableHead className="font-bold">Nguồn (HU/Item)</TableHead>
                <TableHead className="font-bold">Vị trí hiện tại</TableHead>
                <TableHead className="font-bold">Vị trí đích</TableHead>
                <TableHead className="text-center font-bold">Còn lại</TableHead>
                <TableHead className="font-bold">Độ ưu tiên</TableHead>
                <TableHead className="font-bold">Trạng thái</TableHead>
                <TableHead className="text-right px-6 font-bold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-default-50/50 transition-colors">
                  <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-primary">{task.taskNo}</span>
                        <span className="text-[10px] text-default-400">{task.receiptNo}</span>
                      </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="font-bold text-default-900">{task.sourceHuId || task.itemCode}</span>
                        <span className="text-[10px] text-default-500 truncate max-w-[150px]">{task.itemName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">{task.sourceLocation}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                        <Icon icon="heroicons:arrow-long-right" className="text-default-300" />
                        <Badge variant="soft" color="info" className="font-mono">{task.suggestedLocation}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold">{task.qtyRemaining}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="soft" color={getPriorityColor(task.priority)} className="text-[10px] uppercase font-black">
                        {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        <Badge color={getStatusColor(task.status)} variant="soft">{task.status}</Badge>
                        {task.overdue && <Badge color="destructive" className="text-[8px] py-0">OVERDUE</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        color="primary" 
                        className="h-8 font-bold"
                        onClick={() => {
                            startTask(task.id);
                            router.push(`/inbound/putaway-tasks/${task.id}`);
                        }}
                      >
                        Workbench
                      </Button>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="soft" size="sm" className="h-8 w-8 p-0">
                                <Icon icon="heroicons:ellipsis-vertical" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem>Gán người xử lý</DropdownMenuItem>
                              <DropdownMenuItem>Xem Audit Trail</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Hủy Task</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={8} className="h-40 text-center text-default-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <Icon icon="heroicons:inbox" className="w-10 h-10" />
                            <p>Không tìm thấy lệnh cất hàng nào</p>
                        </div>
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const StatCard = ({ label, value, icon, color, onClick, active }: any) => (
    <Card 
        className={cn(
            "cursor-pointer transition-all hover:ring-2 ring-primary/20",
            active ? "ring-2 ring-primary bg-primary/5 shadow-md" : "bg-white border-default-100 shadow-none"
        )}
        onClick={onClick}
    >
        <CardContent className="p-4 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-bold text-default-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-2xl font-black text-default-900">{value}</p>
            </div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", `bg-${color}`)}>
                <Icon icon={icon} className="w-6 h-6" />
            </div>
        </CardContent>
    </Card>
);
