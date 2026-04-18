"use client"

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockInboundReceipts, mockDraftLines } from "@/lib/mock-data/inbound";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const InboundReceiptDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const ir = mockInboundReceipts.find(m => m.id === id) || mockInboundReceipts[0];
  const lines = mockDraftLines.filter(l => l.mrId === ir.mrId);

  const handlePushERP = () => {
    toast.success("Đang đẩy dữ liệu sang ERP...");
  };

  const handleGeneratePutaway = () => {
    toast.success("Đã tạo Putaway Tasks thành công!");
    router.push("/en/inbound/putaway-tasks");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <Icon icon="heroicons:arrow-left" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">Inbound Receipt {ir.irNo}</h1>
              <Badge color={ir.status === 'Received' ? 'success' : 'secondary'}>{ir.status}</Badge>
            </div>
            <p className="text-sm text-default-500 mt-1">Chứng từ nhập kho chính thức</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button color="primary" onClick={handleGeneratePutaway}>Generate Putaway</Button>
          <Button variant="outline" onClick={handlePushERP}>Push GRN</Button>
          {ir.pushStatus === 'Failed' && (
            <Button color="warning" onClick={handlePushERP}>Retry Push</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-default-500 uppercase font-bold">Nhà cung cấp</div>
            <div className="text-lg font-semibold mt-1">{ir.supplier}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-default-500 uppercase font-bold">Ngày nhận</div>
            <div className="text-lg font-semibold mt-1">{ir.receivedDate}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-default-500 uppercase font-bold">Trạng thái đẩy ERP</div>
            <div className="mt-1">
              <Badge color={ir.pushStatus === 'Success' ? 'success' : ir.pushStatus === 'Failed' ? 'destructive' : 'warning'}>
                {ir.pushStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-xs text-default-500 uppercase font-bold">Master Receipt</div>
            <div className="text-lg font-semibold mt-1 text-primary">{ir.mrId}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lines">
        <TabsList>
          <TabsTrigger value="lines">Receipt Lines</TabsTrigger>
          <TabsTrigger value="putaway">Putaway Tasks</TabsTrigger>
          <TabsTrigger value="erp">ERP Push Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="lines" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã hàng</TableHead>
                    <TableHead>Tên hàng</TableHead>
                    <TableHead className="text-center">Số lượng nhận</TableHead>
                    <TableHead className="text-center">Số lượng chấp nhận</TableHead>
                    <TableHead className="text-center">Số lượng từ chối</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell className="font-medium">{line.itemCode}</TableCell>
                      <TableCell>{line.itemName}</TableCell>
                      <TableCell className="text-center">{line.scannedQty}</TableCell>
                      <TableCell className="text-center text-success font-bold">{line.acceptedQty}</TableCell>
                      <TableCell className="text-center text-destructive">{line.rejectedQty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="putaway" className="mt-4">
          <Card>
            <CardContent className="h-32 flex flex-col items-center justify-center gap-4">
              <div className="text-default-500">Chưa có Putaway Task nào được tạo cho Receipt này.</div>
              <Button size="sm" onClick={handleGeneratePutaway}>Tạo ngay</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="erp" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-default-50 rounded border border-default-100">
                  <div className="text-sm font-bold">Payload gửi ERP:</div>
                  <pre className="text-xs mt-2 overflow-x-auto">
                    {JSON.stringify({
                      irNo: ir.irNo,
                      supplier: ir.supplier,
                      lines: lines.map(l => ({ item: l.itemCode, qty: l.acceptedQty }))
                    }, null, 2)}
                  </pre>
                </div>
                {ir.pushStatus === 'Failed' && (
                  <div className="p-4 bg-destructive/5 rounded border border-destructive/20 text-destructive">
                    <div className="text-sm font-bold">Lỗi ERP:</div>
                    <div className="text-xs mt-1">500 Internal Server Error: Connection timeout to SAP.</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InboundReceiptDetail;
