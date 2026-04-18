"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockPOs } from "@/lib/mock-data/inbound";
import { useRouter } from "next/navigation";

const PurchaseOrdersPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Purchase Orders (PO)</h1>
        <Button color="primary">Làm mới ERP</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO No.</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPOs.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.poNo}</TableCell>
                  <TableCell>{po.supplier}</TableCell>
                  <TableCell>{po.eta}</TableCell>
                  <TableCell>
                    <Badge color={po.status === 'Open' ? 'info' : 'default'}>{po.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Chi tiết</Button>
                      <Button size="sm" color="primary" onClick={() => router.push('/inbound/master-receipts')}>Tạo Master Receipt</Button>
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

export default PurchaseOrdersPage;
