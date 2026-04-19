"use client"

import { KpiCard } from "@/components/wms/kpi-card";
import { PageHeader } from "@/components/wms/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title="Dashboard Điều Hành WMS" 
        subtitle="Tổng quan tình trạng vận hành kho bãi thời gian thực"
        actions={[
          { label: "Tạo Master Receipt", icon: "heroicons:plus", onClick: () => router.push('/inbound/master-receipts') },
          { label: "Xem Putaway", icon: "heroicons:truck", variant: "outline", onClick: () => router.push('/inbound/putaway-tasks') },
          { label: "Tạo Wave", icon: "heroicons:squares-plus", onClick: () => router.push('/outbound/waves') }
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Open PO" value="6" icon={<Icon icon="heroicons:shopping-cart" />} />
        <KpiCard title="Receipts Waiting" value="5" variant="warning" icon={<Icon icon="heroicons:clock" />} />
        <KpiCard title="Putaway Pending" value="8" variant="info" icon={<Icon icon="heroicons:arrow-down-tray" />} />
        <KpiCard title="Open SO" value="6" variant="success" icon={<Icon icon="heroicons:document-text" />} />
        <KpiCard title="Picking In Progress" value="10" variant="info" icon={<Icon icon="heroicons:hand-raised" />} />
        <KpiCard title="Quarantine Qty" value="4" variant="destructive" icon={<Icon icon="heroicons:shield-exclamation" />} />
        <KpiCard title="Failed Integrations" value="1" variant="destructive" icon={<Icon icon="heroicons:cloud-arrow-down" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
               <Icon icon="heroicons:bell-alert" className="text-destructive" />
               Cảnh báo vận hành (Alerts)
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary font-bold">Xem tất cả</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-default-50">
                <TableRow>
                  <TableHead className="ps-6">Mức độ</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead className="pe-6 text-right">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-default-50/50">
                  <TableCell className="ps-6"><Badge color="destructive" variant="soft">Critical</Badge></TableCell>
                  <TableCell className="font-medium">Integration failed for ERP Sync (SO-24001)</TableCell>
                  <TableCell className="pe-6 text-right text-xs text-default-400">10 phút trước</TableCell>
                </TableRow>
                <TableRow className="hover:bg-default-50/50">
                  <TableCell className="ps-6"><Badge color="warning" variant="soft">Warning</Badge></TableCell>
                  <TableCell className="font-medium">Putaway task PT-001 overdue (&gt; 2h)</TableCell>
                  <TableCell className="pe-6 text-right text-xs text-default-400">1 giờ trước</TableCell>
                </TableRow>
                <TableRow className="hover:bg-default-50/50 border-none">
                  <TableCell className="ps-6"><Badge color="info" variant="soft">Info</Badge></TableCell>
                  <TableCell className="font-medium">Wave WV-002 released thành công</TableCell>
                  <TableCell className="pe-6 text-right text-xs text-default-400">2 giờ trước</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Thao tác nghiệp vụ nhanh</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="soft" color="primary" className="h-20 flex-col gap-2 font-bold" onClick={() => router.push('/inbound/drafts/mr-1')}>
               <Icon icon="heroicons:qr-code" className="h-6 w-6" />
               Receiving Workbench
            </Button>
            <Button variant="soft" color="info" className="h-20 flex-col gap-2 font-bold" onClick={() => router.push('/outbound/pick-tasks')}>
               <Icon icon="heroicons:hand-raised" className="h-6 w-6" />
               Mở Pick Task
            </Button>
            <Button variant="soft" color="success" className="h-20 flex-col gap-2 font-bold" onClick={() => router.push('/counting/sessions')}>
               <Icon icon="heroicons:clipboard-document-check" className="h-6 w-6" />
               Kiểm kê kho
            </Button>
            <Button variant="soft" color="warning" className="h-20 flex-col gap-2 font-bold" onClick={() => router.push('/integration/erp-sync')}>
               <Icon icon="heroicons:arrow-path-rounded-square" className="h-6 w-6" />
               Đồng bộ ERP
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm">
          <CardHeader><CardTitle className="text-sm font-bold uppercase text-default-500">Inbound Trend</CardTitle></CardHeader>
          <CardContent className="h-48 flex flex-col items-center justify-center bg-default-50/50 border border-dashed border-default-200 rounded-xl m-4 mt-0">
             <Icon icon="heroicons:chart-bar" className="h-10 w-10 text-default-200" />
             <span className="text-xs text-default-400 mt-2 font-medium">Chart Placeholder</span>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle className="text-sm font-bold uppercase text-default-500">Outbound Trend</CardTitle></CardHeader>
          <CardContent className="h-48 flex flex-col items-center justify-center bg-default-50/50 border border-dashed border-default-200 rounded-xl m-4 mt-0">
             <Icon icon="heroicons:presentation-chart-line" className="h-10 w-10 text-default-200" />
             <span className="text-xs text-default-400 mt-2 font-medium">Chart Placeholder</span>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader><CardTitle className="text-sm font-bold uppercase text-default-500">Inventory Status</CardTitle></CardHeader>
          <CardContent className="h-48 flex flex-col items-center justify-center bg-default-50/50 border border-dashed border-default-200 rounded-xl m-4 mt-0">
             <Icon icon="heroicons:chart-pie" className="h-10 w-10 text-default-200" />
             <span className="text-xs text-default-400 mt-2 font-medium">Chart Placeholder</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
