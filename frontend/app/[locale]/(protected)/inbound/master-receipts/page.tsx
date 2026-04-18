"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockMasterReceipts } from "@/mock/inbound";
import { useRouter, useParams } from "next/navigation";
import { color } from "@/lib/type";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";

const getStatusColor = (status: string): color => {
  switch (status) {
    case 'Draft': return 'secondary';
    case 'Scanning': return 'warning';
    case 'Ready': return 'info';
    case 'Submitted': return 'success';
    case 'Closed': return 'default';
    default: return 'default';
  }
};

const MasterReceiptsPage = () => {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';
  const [activeTab, setActiveTab] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredReceipts = activeTab === "all" 
    ? mockMasterReceipts 
    : mockMasterReceipts.filter(mr => mr.status === activeTab);

  const stats = {
    total: mockMasterReceipts.length,
    scanning: mockMasterReceipts.filter(mr => mr.status === 'Scanning').length,
    ready: mockMasterReceipts.filter(mr => mr.status === 'Ready').length,
    submitted: mockMasterReceipts.filter(mr => mr.status === 'Submitted').length,
  };

  const handleSubmit = (id: string) => {
    toast.success(`Đã submit Master Receipt ${id} thành công!`);
  };

  const handleDelete = async () => {
    // In a real app, this would be an API call and state update
    toast.success(`Đã xóa Master Receipt thành công!`);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Master Receipts</h1>
          <p className="text-sm text-default-500 mt-1">Quản lý các chứng từ nhập kho tổng hợp</p>
        </div>
        <Button color="primary" className="flex items-center gap-2">
          <Icon icon="heroicons:plus" />
          Tạo mới MR
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-none shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
              {stats.total}
            </div>
            <div>
              <div className="text-sm text-default-600 font-medium">Tổng số</div>
              <div className="text-xs text-default-400">Chứng từ MR</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/5 border-none shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center text-warning text-xl font-bold">
              {stats.scanning}
            </div>
            <div>
              <div className="text-sm text-default-600 font-medium">Đang Scan</div>
              <div className="text-xs text-default-400">Cần xử lý tiếp</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/5 border-none shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center text-info text-xl font-bold">
              {stats.ready}
            </div>
            <div>
              <div className="text-sm text-default-600 font-medium">Sẵn sàng</div>
              <div className="text-xs text-default-400">Chờ Submit</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-none shadow-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center text-success text-xl font-bold">
              {stats.submitted}
            </div>
            <div>
              <div className="text-sm text-default-600 font-medium">Đã Submit</div>
              <div className="text-xs text-default-400">Chờ đẩy ERP</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-default-100 p-0 px-4">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">Tất cả</TabsTrigger>
              <TabsTrigger value="Draft" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">Nháp (Draft)</TabsTrigger>
              <TabsTrigger value="Scanning" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">Đang Scan</TabsTrigger>
              <TabsTrigger value="Ready" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">Sẵn sàng (Ready)</TabsTrigger>
              <TabsTrigger value="Submitted" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">Đã Submit</TabsTrigger>
              <TabsTrigger value="Closed" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-4">Đã Đóng</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-default-50">
                <TableHead className="w-[150px]">MR No.</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead className="text-center">Số lượng dự kiến</TableHead>
                <TableHead className="text-center">Đã nhận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReceipts.length > 0 ? (
                filteredReceipts.map((mr) => (
                  <TableRow key={mr.id} className="hover:bg-default-50/50 transition-colors">
                    <TableCell className="font-semibold text-primary">{mr.mrNo}</TableCell>
                    <TableCell>{mr.supplier}</TableCell>
                    <TableCell className="text-center">{mr.expectedQty}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span>{mr.receivedQty}</span>
                        <div className="w-16 h-1 bg-default-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.min((mr.receivedQty / mr.expectedQty) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge color={getStatusColor(mr.status)} className="capitalize">{mr.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="soft" 
                          size="sm" 
                          color="info"
                          onClick={() => router.push(`/${locale}/inbound/master-receipts/${mr.id}`)}
                        >
                          Mở
                        </Button>
                        
                        {mr.status === 'Draft' && (
                          <Button 
                            variant="soft" 
                            size="sm" 
                            color="destructive"
                            onClick={() => setDeleteId(mr.id)}
                          >
                            Xóa
                          </Button>
                        )}
                        
                        {(mr.status === 'Draft' || mr.status === 'Ready') && (
                          <Button 
                            size="sm" 
                            color="success"
                            onClick={() => handleSubmit(mr.mrNo)}
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-default-500">
                    Không có chứng từ nào trong mục này.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog 
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        toastMessage="Đã xóa chứng từ Master Receipt thành công"
      />
    </div>
  );
};

export default MasterReceiptsPage;
