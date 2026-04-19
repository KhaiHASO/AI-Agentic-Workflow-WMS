"use client"

import { useWaveStore, SalesOrder, Wave } from "@/store/wave-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

export const WavePlanningConsole = () => {
  const { orderPool, waves, selectedOrderIds, toggleOrderSelection, createWave, releaseWave, cancelWave } = useWaveStore();
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateWave = () => {
    if (selectedOrderIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một đơn hàng để tạo đợt xuất");
      return;
    }
    createWave();
    toast.success("Đã tạo đợt xuất (Wave) mới thành công");
  };

  const handleRelease = (wave: Wave) => {
    releaseWave(wave.id);
    toast.success(`Đã giải phóng Wave ${wave.waveNo}. Pick Tasks đã được khởi tạo.`);
  };

  const handleCancel = (wave: Wave) => {
    if (confirm(`Bạn có chắc muốn hủy Wave ${wave.waveNo}?`)) {
       cancelWave(wave.id);
       toast.warning(`Đã hủy Wave ${wave.waveNo}`);
    }
  };

  const filteredOrders = orderPool.filter(so => 
    so.status === 'Released' && 
    (so.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
     so.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="bg-primary/5 border-primary/10">
            <CardContent className="p-4 flex items-center justify-between">
               <div>
                  <div className="text-[10px] font-bold text-primary uppercase">Đơn hàng đang chờ</div>
                  <div className="text-2xl font-black text-primary">{orderPool.filter(so => so.status === 'Released').length} SO</div>
               </div>
               <Icon icon="heroicons:shopping-bag" className="w-10 h-10 text-primary/20" />
            </CardContent>
         </Card>
         <Card className="bg-warning/5 border-warning/10">
            <CardContent className="p-4 flex items-center justify-between">
               <div>
                  <div className="text-[10px] font-bold text-warning uppercase">Waves đang Picking</div>
                  <div className="text-2xl font-black text-warning">{waves.filter(w => w.status === 'Picking').length} Waves</div>
               </div>
               <Icon icon="heroicons:truck" className="w-10 h-10 text-warning/20" />
            </CardContent>
         </Card>
         <Card className="bg-success/5 border-success/10">
            <CardContent className="p-4 flex items-center justify-between">
               <div>
                  <div className="text-[10px] font-bold text-success uppercase">Hoàn thành hôm nay</div>
                  <div className="text-2xl font-black text-success">8 Waves</div>
               </div>
               <Icon icon="heroicons:check-circle" className="w-10 h-10 text-success/20" />
            </CardContent>
         </Card>
      </div>

      <Tabs defaultValue="pool" className="w-full">
         <TabsList className="bg-white border border-default-200 p-1 h-12">
            <TabsTrigger value="pool" className="px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-widest">
               Order Pool
            </TabsTrigger>
            <TabsTrigger value="active-waves" className="px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white uppercase tracking-widest">
               Active Waves
            </TabsTrigger>
         </TabsList>

         <TabsContent value="pool" className="mt-6">
            <div className="grid grid-cols-12 gap-6">
               <div className="col-span-12 lg:col-span-9">
                  <Card>
                     <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-bold uppercase">Danh sách đơn hàng khả dụng</CardTitle>
                        <div className="flex gap-2">
                           <Input 
                              placeholder="Tìm SO, khách hàng..." 
                              className="w-64 h-9 text-xs" 
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                           />
                        </div>
                     </CardHeader>
                     <CardContent className="p-0">
                        <Table>
                           <TableHeader className="bg-default-50">
                              <TableRow>
                                 <TableHead className="w-12 ps-6"></TableHead>
                                 <TableHead>Order No</TableHead>
                                 <TableHead>Khách hàng</TableHead>
                                 <TableHead className="text-center">Ngày đặt</TableHead>
                                 <TableHead className="text-center">Số Lines</TableHead>
                                 <TableHead>Ưu tiên</TableHead>
                                 <TableHead className="text-right pe-6">Trạng thái</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {filteredOrders.length > 0 ? filteredOrders.map((so) => (
                                 <TableRow key={so.id} className={`hover:bg-default-50 transition-colors ${selectedOrderIds.includes(so.id) ? 'bg-primary/5' : ''}`}>
                                    <TableCell className="ps-6">
                                       <Checkbox 
                                          checked={selectedOrderIds.includes(so.id)}
                                          onCheckedChange={() => toggleOrderSelection(so.id)}
                                       />
                                    </TableCell>
                                    <TableCell className="font-bold text-default-900">{so.orderNo}</TableCell>
                                    <TableCell>
                                       <div className="text-xs font-medium text-default-700">{so.customer}</div>
                                       <div className="text-[10px] text-default-400">{so.warehouse}</div>
                                    </TableCell>
                                    <TableCell className="text-center text-xs font-medium text-default-500">{so.orderDate}</TableCell>
                                    <TableCell className="text-center font-black">{so.totalLines}</TableCell>
                                    <TableCell>
                                       <Badge 
                                          variant="soft" 
                                          color={so.priority === 'Urgent' ? 'destructive' : so.priority === 'High' ? 'warning' : 'info'}
                                          className="text-[10px]"
                                       >
                                          {so.priority}
                                       </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pe-6">
                                       <Badge color="default" variant="soft">{so.status}</Badge>
                                    </TableCell>
                                 </TableRow>
                              )) : (
                                 <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-default-400 italic">
                                       Không tìm thấy đơn hàng phù hợp
                                    </TableCell>
                                 </TableRow>
                              )}
                           </TableBody>
                        </Table>
                     </CardContent>
                  </Card>
               </div>

               <div className="col-span-12 lg:col-span-3">
                  <Card className="sticky top-24 border-2 border-primary/20 shadow-xl shadow-primary/5">
                     <CardHeader className="bg-primary/5 border-b border-primary/10">
                        <CardTitle className="text-sm font-black text-primary uppercase">Hoạch định Wave</CardTitle>
                     </CardHeader>
                     <CardContent className="p-6 space-y-6">
                        <div className="text-center space-y-2">
                           <div className="text-4xl font-black text-primary tracking-tighter">{selectedOrderIds.length}</div>
                           <div className="text-[10px] font-bold text-default-400 uppercase tracking-[0.2em]">Orders Selected</div>
                        </div>
                        
                        <div className="space-y-4 pt-4 border-t border-default-100">
                           <div className="flex justify-between items-center text-sm font-medium">
                              <span>Tổng số Lines:</span>
                              <span className="font-black text-default-900">
                                 {orderPool.filter(so => selectedOrderIds.includes(so.id)).reduce((acc, o) => acc + o.totalLines, 0)}
                              </span>
                           </div>
                           <div className="flex justify-between items-center text-sm font-medium">
                              <span>Dự kiến tải (Workload):</span>
                              <Badge variant="soft" color="info">~45 mins</Badge>
                           </div>
                        </div>

                        <Button 
                           className="w-full h-14 font-black uppercase tracking-widest shadow-lg shadow-primary/20" 
                           color="primary"
                           disabled={selectedOrderIds.length === 0}
                           onClick={handleCreateWave}
                        >
                           <Icon icon="heroicons:sparkles" className="mr-2 w-5 h-5" />
                           CREATE WAVE
                        </Button>
                        
                        <p className="text-[9px] text-default-400 text-center italic">
                           * Hệ thống sẽ gộp các đơn hàng đã chọn vào một đợt xuất chung để tối ưu hóa lộ trình Picking.
                        </p>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </TabsContent>

         <TabsContent value="active-waves" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {waves.map((wave) => (
                  <Card key={wave.id} className={`overflow-hidden border-t-4 ${
                     wave.status === 'Draft' ? 'border-default-400' :
                     wave.status === 'Released' ? 'border-info' :
                     wave.status === 'Picking' ? 'border-warning' :
                     wave.status === 'Completed' ? 'border-success' : 'border-destructive'
                  }`}>
                     <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div>
                           <CardTitle className="text-lg font-black text-default-900 leading-none mb-1">{wave.waveNo}</CardTitle>
                           <div className="text-[10px] text-default-400 font-bold uppercase">{wave.createdAt}</div>
                        </div>
                        <Badge variant="soft" color={
                           wave.status === 'Draft' ? 'default' :
                           wave.status === 'Released' ? 'info' :
                           wave.status === 'Picking' ? 'warning' :
                           wave.status === 'Completed' ? 'success' : 'destructive'
                        }>
                           {wave.status}
                        </Badge>
                     </CardHeader>
                     <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                           <div className="flex justify-between text-xs font-bold uppercase text-default-500">
                              <span>Tiến độ Picking</span>
                              <span>{wave.completedTasks} / {wave.totalTasks}</span>
                           </div>
                           <Progress value={(wave.completedTasks / wave.totalTasks) * 100} className="h-1.5" color={wave.status === 'Completed' ? 'success' : 'primary'} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-default-50">
                           <div className="text-center border-e border-default-50">
                              <div className="text-[10px] font-bold text-default-400 uppercase">Orders</div>
                              <div className="text-lg font-black">{wave.orders.length || 1}</div>
                           </div>
                           <div className="text-center">
                              <div className="text-[10px] font-bold text-default-400 uppercase">Load</div>
                              <div className="text-lg font-black">Med</div>
                           </div>
                        </div>

                        <div className="flex gap-2">
                           {wave.status === 'Draft' && (
                              <Button variant="soft" color="info" className="flex-1 font-bold h-10" onClick={() => handleRelease(wave)}>
                                 RELEASE
                              </Button>
                           )}
                           {wave.status !== 'Completed' && wave.status !== 'Cancelled' && (
                              <Button variant="soft" color="destructive" size="icon" className="h-10 w-10 shrink-0" onClick={() => handleCancel(wave)}>
                                 <Icon icon="heroicons:trash" />
                              </Button>
                           )}
                           <Button variant="outline" className="flex-1 font-bold h-10">VIEW DETAILS</Button>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </TabsContent>
      </Tabs>
    </div>
  );
};
