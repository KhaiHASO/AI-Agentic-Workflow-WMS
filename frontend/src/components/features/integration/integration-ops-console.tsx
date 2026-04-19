"use client"

import { useIntegrationStore, IntegrationMessage } from "@/store/integration-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const IntegrationOpsConsole = () => {
  const { health, messages, retryMessage, markResolved, syncItems, syncOrders } = useIntegrationStore();
  
  const [selectedMsg, setSelectedMsg] = useState<IntegrationMessage | null>(null);
  const [isPayloadOpen, setIsPayloadOpen] = useState(false);

  const handleRetry = (id: string) => {
    retryMessage(id);
    toast.info("Đã gửi yêu cầu gửi lại tin nhắn");
  };

  const handleSync = (type: string) => {
    if (type === 'items') syncItems();
    else syncOrders();
    toast.success(`Đang thực hiện đồng bộ ${type} từ ERP...`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Card className="border-l-4 border-success">
            <CardContent className="p-4">
               <div className="text-[10px] font-bold text-default-400 uppercase">ERP Connectivity</div>
               <div className="flex items-center gap-2 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                  <span className="text-xl font-black text-default-900 uppercase">ONLINE</span>
               </div>
            </CardContent>
         </Card>
         <Card>
            <CardContent className="p-4 text-center">
               <div className="text-[10px] font-bold text-default-400 uppercase">API Latency</div>
               <div className="text-xl font-black text-primary mt-1">{health.apiLatency}</div>
            </CardContent>
         </Card>
         <Card>
            <CardContent className="p-4 text-center">
               <div className="text-[10px] font-bold text-default-400 uppercase">Success Rate</div>
               <div className="text-xl font-black text-success mt-1">{health.successRate}%</div>
            </CardContent>
         </Card>
         <Card className={health.pendingQueue > 0 ? "bg-warning/5 border-warning/20" : ""}>
            <CardContent className="p-4 text-center">
               <div className="text-[10px] font-bold text-default-400 uppercase">Pending Queue</div>
               <div className="text-xl font-black text-warning mt-1">{health.pendingQueue} Msgs</div>
            </CardContent>
         </Card>
      </div>

      <div className="flex gap-4">
         <Button color="primary" className="font-bold gap-2" onClick={() => handleSync('items')}>
            <Icon icon="heroicons:arrow-path" /> SYNC MASTER DATA
         </Button>
         <Button variant="outline" className="font-bold gap-2" onClick={() => handleSync('orders')}>
            <Icon icon="heroicons:shopping-cart" /> SYNC SALES ORDERS
         </Button>
      </div>

      <Card>
         <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Recent Integration Messages</CardTitle>
            <div className="flex gap-2">
               <Input placeholder="Search by Correlation ID..." className="w-64 h-9 text-xs" />
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <Table>
               <TableHeader className="bg-default-50">
                  <TableRow>
                     <TableHead className="ps-6">Timestamp</TableHead>
                     <TableHead>Topic / Interface</TableHead>
                     <TableHead>Correlation ID</TableHead>
                     <TableHead>Direction</TableHead>
                     <TableHead className="text-center">Attempts</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead className="text-right pe-6">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {messages.map((msg) => (
                     <TableRow key={msg.id} className={msg.status === 'Failed' ? 'bg-destructive/5' : ''}>
                        <TableCell className="ps-6 text-xs text-default-500 font-medium">{msg.timestamp}</TableCell>
                        <TableCell className="font-bold text-xs">{msg.topic}</TableCell>
                        <TableCell className="font-mono text-[10px] text-default-400">{msg.correlationId}</TableCell>
                        <TableCell>
                           <Badge variant="outline" className="text-[9px] font-black">
                              {msg.direction === 'Inbound' ? 'ERP → WMS' : 'WMS → ERP'}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-center font-bold">{msg.attempts}</TableCell>
                        <TableCell>
                           <Badge color={
                              msg.status === 'Success' ? 'success' :
                              msg.status === 'Failed' ? 'destructive' : 'warning'
                           } variant="soft">
                              {msg.status}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-right pe-6">
                           <div className="flex justify-end gap-1">
                              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { setSelectedMsg(msg); setIsPayloadOpen(true); }}>
                                 <Icon icon="heroicons:eye" />
                              </Button>
                              {msg.status === 'Failed' && (
                                 <>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={() => handleRetry(msg.id)}>
                                       <Icon icon="heroicons:arrow-path" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-success" onClick={() => markResolved(msg.id)}>
                                       <Icon icon="heroicons:check-circle" />
                                    </Button>
                                 </>
                              )}
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>

      {/* Payload Modal */}
      <Dialog open={isPayloadOpen} onOpenChange={setIsPayloadOpen}>
         <DialogContent className="sm:max-w-[700px]">
            <DialogHeader><DialogTitle className="text-lg font-black uppercase">Message Payload Detail</DialogTitle></DialogHeader>
            {selectedMsg && (
               <div className="py-4 space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                     <div><span className="text-default-400 font-bold uppercase">Interface:</span> <span className="font-black ml-2">{selectedMsg.topic}</span></div>
                     <div><span className="text-default-400 font-bold uppercase">Correlation:</span> <span className="font-mono ml-2">{selectedMsg.correlationId}</span></div>
                  </div>
                  
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase text-default-400">JSON Payload</Label>
                     <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-[11px] overflow-x-auto">
                        <pre>{JSON.stringify(JSON.parse(selectedMsg.payload || '{}'), null, 2)}</pre>
                     </div>
                  </div>

                  {selectedMsg.error && (
                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase text-destructive">Error Log</Label>
                        <div className="bg-destructive/10 text-destructive p-3 rounded border border-destructive/20 text-xs font-medium">
                           {selectedMsg.error}
                        </div>
                     </div>
                  )}
               </div>
            )}
            <DialogFooter>
               <Button variant="outline" onClick={() => setIsPayloadOpen(false)}>CLOSE</Button>
               {selectedMsg?.status === 'Failed' && (
                  <Button color="primary" className="font-bold" onClick={() => { handleRetry(selectedMsg.id); setIsPayloadOpen(false); }}>RETRY NOW</Button>
               )}
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
};
