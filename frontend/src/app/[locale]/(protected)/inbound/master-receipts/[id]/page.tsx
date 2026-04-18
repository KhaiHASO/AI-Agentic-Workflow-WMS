"use client"

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Icon } from "@iconify/react";

export default function MasterReceiptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const locale = params?.locale || 'en';
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <Icon icon="heroicons:arrow-left" />
              </Button>
              <h1 className="text-2xl font-bold uppercase tracking-tight text-default-900">Chi tiết Master Receipt: {id}</h1>
           </div>
           <p className="text-sm text-default-500 ms-12">Xem và xử lý chứng từ nhập hàng tổng hợp</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
             <Icon icon="heroicons:printer" /> In nhãn MR
          </Button>
          <Button color="primary" className="flex items-center gap-2" onClick={() => router.push(`/inbound/drafts/${id}`)}>
             <Icon icon="heroicons:qr-code" /> Bắt đầu scan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-warning shadow-sm">
           <CardContent className="p-4">
              <div className="text-[10px] uppercase font-bold text-default-400">Trạng thái</div>
              <div className="mt-1"><Badge color="warning" variant="soft">SCANNING</Badge></div>
           </CardContent>
        </Card>
        <Card className="shadow-sm">
           <CardContent className="p-4">
              <div className="text-[10px] uppercase font-bold text-default-400">Nhà cung cấp</div>
              <div className="mt-1 font-bold text-default-700">Vinamilk (VNM-001)</div>
           </CardContent>
        </Card>
        <Card className="shadow-sm">
           <CardContent className="p-4">
              <div className="text-[10px] uppercase font-bold text-default-400">Ngày tạo</div>
              <div className="mt-1 font-bold text-default-700">18/05/2024 08:30</div>
           </CardContent>
        </Card>
        <Card className="shadow-sm">
           <CardContent className="p-4">
              <div className="text-[10px] uppercase font-bold text-default-400">Tiến độ</div>
              <div className="mt-1 font-bold text-primary text-lg">0 / 350 Units</div>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-0 px-4 border-b border-default-100">
          <Tabs defaultValue="lines" className="w-full">
            <TabsList className="bg-transparent h-14">
              <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Tổng quan</TabsTrigger>
              <TabsTrigger value="lines" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 font-bold">Danh sách hàng (Lines)</TabsTrigger>
              <TabsTrigger value="exceptions" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Ngoại lệ (0)</TabsTrigger>
              <TabsTrigger value="audit" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full">Lịch sử Audit</TabsTrigger>
            </TabsList>

            <div className="p-0">
               <TabsContent value="lines" className="m-0">
                  <Table>
                    <TableHeader className="bg-default-50">
                      <TableRow>
                        <TableHead>Mã hàng</TableHead>
                        <TableHead>Tên hàng hóa</TableHead>
                        <TableHead className="text-center">Số lượng dự kiến</TableHead>
                        <TableHead className="text-center">Đã nhận</TableHead>
                        <TableHead>UOM</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-primary">ITM-MILK-01</TableCell>
                        <TableCell>Sữa tươi Vinamilk 1L</TableCell>
                        <TableCell className="text-center font-bold">100</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell>Thùng</TableCell>
                        <TableCell><Badge color="default">Not Started</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-primary">ITM-YOGURT-01</TableCell>
                        <TableCell>Sữa chua Vinamilk Có Đường</TableCell>
                        <TableCell className="text-center font-bold">200</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell>Khay</TableCell>
                        <TableCell><Badge color="default">Not Started</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
               </TabsContent>
               <TabsContent value="overview" className="p-6">
                  <div className="grid grid-cols-2 gap-8 text-sm">
                     <div className="space-y-4">
                        <div className="flex justify-between border-b border-default-100 pb-2"><span>PO gốc:</span><span className="font-bold">PO-24001</span></div>
                        <div className="flex justify-between border-b border-default-100 pb-2"><span>Kho xử lý:</span><span className="font-bold text-success">KHO HCM (WH-HCM)</span></div>
                        <div className="flex justify-between border-b border-default-100 pb-2"><span>Cửa nhập (Dock):</span><span className="font-bold">DOCK-01</span></div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex justify-between border-b border-default-100 pb-2"><span>Người tạo:</span><span className="font-bold">Admin</span></div>
                        <div className="flex justify-between border-b border-default-100 pb-2"><span>Người vận hành:</span><span className="font-bold text-primary">Nguyễn Văn A</span></div>
                        <div className="flex justify-between border-b border-default-100 pb-2"><span>Loại chứng từ:</span><span className="font-bold uppercase">Purchase Receipt</span></div>
                     </div>
                  </div>
               </TabsContent>
            </div>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
