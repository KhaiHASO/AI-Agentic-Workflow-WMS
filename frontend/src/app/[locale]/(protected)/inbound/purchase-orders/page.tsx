"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockPOs, PO } from "@/lib/mock-data/inbound";
import { useRouter } from "next/navigation";
import PODetailDialog from "@/components/features/receiving/modals/po-detail-dialog";
import { Icon } from "@iconify/react";

const PurchaseOrdersPage = () => {
  const router = useRouter();
  const [selectedPO, setSelectedPO] = useState<PO | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-default-900">Purchase Orders (PO)</h1>
          <p className="text-sm text-default-500 mt-1">Danh sách đơn mua hàng từ ERP</p>
        </div>
        <Button color="primary" className="gap-2">
          <Icon icon="heroicons:arrow-path" className="w-4 h-4" />
          Làm mới ERP
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-default-50">
              <TableRow>
                <TableHead className="font-bold">PO No.</TableHead>
                <TableHead className="font-bold">Nhà cung cấp</TableHead>
                <TableHead className="font-bold">ETA</TableHead>
                <TableHead className="font-bold">Trạng thái</TableHead>
                <TableHead className="text-right px-6 font-bold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPOs.map((po) => (
                <TableRow key={po.id} className="hover:bg-default-50 transition-colors">
                  <TableCell className="font-bold text-primary">{po.poNo}</TableCell>
                  <TableCell className="font-medium">{po.supplier}</TableCell>
                  <TableCell>{po.eta}</TableCell>
                  <TableCell>
                    <Badge color={po.status === 'Open' ? 'info' : 'default'} variant="soft">
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => setSelectedPO(po)}
                      >
                        Chi tiết
                      </Button>
                      <Button 
                        size="sm" 
                        color="primary" 
                        className="h-8"
                        onClick={() => router.push('/inbound/master-receipts')}
                      >
                        Tạo Master Receipt
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PODetailDialog 
        open={!!selectedPO} 
        onClose={() => setSelectedPO(null)} 
        po={selectedPO} 
      />
    </div>
  );
};

export default PurchaseOrdersPage;
