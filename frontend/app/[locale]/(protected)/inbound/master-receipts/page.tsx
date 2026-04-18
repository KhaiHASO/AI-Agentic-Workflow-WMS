"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockMasterReceipts } from "@/mock/inbound";
import { useRouter } from "next/navigation";
import { color } from "@/lib/type";

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Master Receipts</h1>
        <Button color="primary">Tạo mới</Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">5</div><div className="text-sm text-default-500">Tổng cộng</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-warning">1</div><div className="text-sm text-default-500">Đang Scan</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-info">1</div><div className="text-sm text-default-500">Ready</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-success">1</div><div className="text-sm text-default-500">Submitted</div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MR No.</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Số lượng dự kiến</TableHead>
                <TableHead>Đã nhận</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMasterReceipts.map((mr) => (
                <TableRow key={mr.id}>
                  <TableCell className="font-medium">{mr.mrNo}</TableCell>
                  <TableCell>{mr.supplier}</TableCell>
                  <TableCell>{mr.expectedQty}</TableCell>
                  <TableCell>{mr.receivedQty}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(mr.status)}>{mr.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/inbound/master-receipts/${mr.id}`)}>Mở</Button>
                      {mr.status === 'Draft' && <Button color="destructive" size="sm">Xóa</Button>}
                      {(mr.status === 'Draft' || mr.status === 'Ready') && <Button color="success" size="sm">Submit</Button>}
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

export default MasterReceiptsPage;
