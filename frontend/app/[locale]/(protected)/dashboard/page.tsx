"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

// Mock KPI Component
const KpiCard = ({ title, value, variant }: { title: string, value: string | number, variant?: "default" | "destructive" | "warning" | "success" }) => (
  <Card>
    <CardContent className="p-4 flex flex-col justify-center items-center text-center">
      <div className="text-sm font-medium text-default-600 mb-2">{title}</div>
      <div className={`text-3xl font-bold ${variant === 'destructive' ? 'text-destructive' : variant === 'warning' ? 'text-warning' : variant === 'success' ? 'text-success' : 'text-primary'}`}>
        {value}
      </div>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold uppercase">Dashboard Điều Hành WMS</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push('/inbound/master-receipts')}>Tạo Master Receipt</Button>
          <Button variant="outline" onClick={() => router.push('/inbound/putaway-tasks')}>Xem Putaway</Button>
          <Button onClick={() => router.push('/outbound/waves')}>Tạo Wave</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Open PO" value="6" />
        <KpiCard title="Receipts Waiting" value="5" variant="warning" />
        <KpiCard title="Putaway Pending" value="8" variant="warning" />
        <KpiCard title="Open SO" value="6" />
        <KpiCard title="Picking In Progress" value="10" variant="success" />
        <KpiCard title="Quarantine Qty" value="4" variant="destructive" />
        <KpiCard title="Failed Integrations" value="1" variant="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cảnh báo (Alerts)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mức độ</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell><Badge color="destructive">Critical</Badge></TableCell>
                  <TableCell>Integration failed for ERP Sync</TableCell>
                  <TableCell>10 mins ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Badge color="warning">Warning</Badge></TableCell>
                  <TableCell>Putaway task PT-001 overdue</TableCell>
                  <TableCell>1 hour ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Badge color="info">Info</Badge></TableCell>
                  <TableCell>Wave WV-002 released</TableCell>
                  <TableCell>2 hours ago</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="soft" color="primary" onClick={() => router.push('/en/inbound/drafts/mr-1')}>Mở Receiving Workbench</Button>
            <Button variant="soft" color="info" onClick={() => router.push('/outbound/pick-tasks')}>Mở Pick Task</Button>
            <Button variant="soft" color="success" onClick={() => router.push('/counting/sessions')}>Kiểm kê kho</Button>
            <Button variant="soft" color="warning" onClick={() => router.push('/integration/erp-sync')}>Đồng bộ ERP</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card>
          <CardHeader><CardTitle>Xu hướng Nhập kho</CardTitle></CardHeader>
          <CardContent className="h-48 flex items-center justify-center bg-default-50 text-default-400 border border-dashed rounded">Chart Placeholder</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Xu hướng Xuất kho</CardTitle></CardHeader>
          <CardContent className="h-48 flex items-center justify-center bg-default-50 text-default-400 border border-dashed rounded">Chart Placeholder</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Trạng thái Tồn kho</CardTitle></CardHeader>
          <CardContent className="h-48 flex items-center justify-center bg-default-50 text-default-400 border border-dashed rounded">Chart Placeholder</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
