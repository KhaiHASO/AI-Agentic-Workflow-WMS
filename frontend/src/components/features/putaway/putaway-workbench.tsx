"use client"

import { usePutawayStore, PutawayTask, AuditEvent, SuggestedLocation } from "@/store/putaway-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PutawayWorkbench = ({ taskId }: { taskId: string }) => {
  const router = useRouter();
  const { 
    tasks, 
    activeTaskId, 
    setActiveTask,
    scanStep, 
    setScanStep, 
    processScan, 
    confirmMove, 
    undoLastMove, 
    moveHistory,
    reportException,
    isHULevel,
    setIsHULevel,
    completeTask
  } = usePutawayStore();

  const task = useMemo(() => tasks.find(t => t.id === taskId) || tasks.find(t => t.id === activeTaskId), [tasks, taskId, activeTaskId]);
  
  const [barcode, setBarcode] = useState("");
  const [qtyValue, setQtyValue] = useState(0);
  const [destinationLoc, setDestinationLoc] = useState("");
  const [showAudit, setShowAudit] = useState(false);
  const [showHuContents, setShowHuContents] = useState(false);
  const [showExceptionModal, setShowExceptionModal] = useState(false);
  const [exceptionReason, setExceptionReason] = useState("");
  const [showQueue, setShowQueue] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task && !activeTaskId) {
        setActiveTask(task.id);
    }
  }, [task, activeTaskId, setActiveTask]);

  useEffect(() => {
    inputRef.current?.focus();
    if (scanStep === 'QTY' && task) {
        setQtyValue(task.qtyRemaining);
    }
  }, [scanStep, task]);

  if (!task) return <div className="p-8 text-center font-bold text-destructive">Không tìm thấy tác vụ.</div>;

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const result = processScan(barcode);
    if (result.success) {
        if (scanStep === 'LOCATION') {
            setDestinationLoc(barcode.trim().toUpperCase());
        }
        toast[result.type || 'success'](result.message);
    } else {
        toast.error(result.message);
    }
    setBarcode("");
  };

  const handleConfirm = () => {
    confirmMove(qtyValue, destinationLoc || task.suggestedLocation);
    toast.success(`Đã cất ${qtyValue} hàng vào ${destinationLoc || task.suggestedLocation}`);
    setDestinationLoc("");
  };

  const handleException = () => {
    reportException(exceptionReason);
    toast.info("Đã báo cáo ngoại lệ và gửi Supervisor");
    setShowExceptionModal(false);
  };

  const relatedTasks = tasks.filter(t => t.receiptNo === task.receiptNo && t.id !== task.id);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-6 bg-default-50 overflow-hidden">
      {/* 1. Header Cố định */}
      <header className="bg-white border-b border-default-200 p-3 md:p-4 px-4 md:px-6 flex items-center justify-between z-30 shadow-sm gap-2">
         <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => router.push('/inbound/putaway-tasks')}>
               <Icon icon="heroicons:arrow-left" className="w-5 h-5" />
            </Button>
            <div className="overflow-hidden">
               <div className="flex items-center gap-2">
                  <h1 className="text-sm md:text-xl font-black text-default-900 truncate">{task.taskNo}</h1>
                  <Badge variant="soft" color={task.overdue ? 'destructive' : 'info'} className="text-[8px] md:text-xs">
                     {task.status}
                  </Badge>
                  {task.overdue && <Badge color="destructive" className="animate-pulse hidden sm:inline-flex">OVERDUE</Badge>}
               </div>
               <div className="text-[8px] md:text-[10px] text-default-500 font-bold uppercase tracking-wider truncate">
                  {task.itemCode} • {task.receiptNo}
               </div>
            </div>
         </div>
         <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <Button variant="outline" size="sm" className="h-8 px-2 md:px-3 text-[10px] md:text-xs gap-1 xl:hidden" onClick={() => setShowQueue(true)}>
                <Icon icon="heroicons:list-bullet" />
                <span className="hidden sm:inline">Tasks</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-2 md:px-3 text-[10px] md:text-xs gap-1 2xl:hidden" onClick={() => setShowSuggestions(true)}>
                <Icon icon="heroicons:light-bulb" />
                <span className="hidden sm:inline">Gợi ý</span>
            </Button>
            <Button color="primary" size="sm" className="h-8 w-8 md:w-auto md:px-3 p-0 md:gap-1" onClick={() => setShowAudit(true)}>
                <Icon icon="heroicons:clock" className="w-4 h-4" />
                <span className="hidden md:inline">Audit</span>
            </Button>
         </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 2. Cột trái — Task Queue */}
        <aside className="w-72 border-e border-default-200 bg-white hidden xl:flex flex-col">
            <div className="p-4 border-b border-default-100 bg-default-50">
                <h3 className="text-xs font-black text-default-400 uppercase tracking-widest">Task Queue ({relatedTasks.length + 1})</h3>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-3 space-y-3">
                    <TaskCard task={task} active />
                    {relatedTasks.map(t => (
                        <TaskCard key={t.id} task={t} onClick={() => router.push(`/inbound/putaway-tasks/${t.id}`)} />
                    ))}
                </div>
            </ScrollArea>
        </aside>

        {/* 3. Khu giữa — Main Action Panel */}
        <main className="flex-1 flex flex-col bg-default-50/50 overflow-hidden">
            {/* Step Progress */}
            <div className="bg-white border-b border-default-100 p-2 flex justify-center gap-8">
                <StepItem step={1} label="Nguồn" active={scanStep === 'SOURCE'} done={['LOCATION', 'QTY', 'REVIEW', 'COMPLETE'].includes(scanStep)} />
                <StepItem step={2} label="Vị trí" active={scanStep === 'LOCATION'} done={['QTY', 'REVIEW', 'COMPLETE'].includes(scanStep)} />
                <StepItem step={3} label="Số lượng" active={scanStep === 'QTY'} done={['REVIEW', 'COMPLETE'].includes(scanStep)} />
                <StepItem step={4} label="Xác nhận" active={scanStep === 'REVIEW' || scanStep === 'COMPLETE'} done={scanStep === 'COMPLETE'} />
            </div>

            <ScrollArea className="flex-1">
                <div className="p-6 max-w-4xl mx-auto space-y-6">
                    {/* Scan Input Area */}
                    <Card className="shadow-xl border-t-4 border-primary overflow-hidden">
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-default-900 uppercase">
                                        {scanStep === 'SOURCE' ? 'Quét mã nguồn (HU/Item)' : 
                                         scanStep === 'LOCATION' ? 'Quét vị trí đích' : 
                                         'Xác nhận thông tin cất hàng'}
                                    </h2>
                                    <p className="text-sm text-default-500">
                                        {scanStep === 'SOURCE' ? `Vui lòng quét HU ${task.sourceHuId} hoặc SP ${task.itemCode}` : 
                                         scanStep === 'LOCATION' ? `Di chuyển đến ${task.suggestedLocation} và quét mã vị trí` : 
                                         'Kiểm tra lại số lượng và vị trí trước khi xác nhận'}
                                    </p>
                                </div>
                                <div className="flex gap-2 p-1 bg-default-100 rounded-lg">
                                    <button 
                                        className={cn("px-3 py-1 text-[10px] font-bold rounded-md transition-all", isHULevel ? "bg-white shadow-sm text-primary" : "text-default-500")}
                                        onClick={() => setIsHULevel(true)}
                                    >MOVE HU</button>
                                    <button 
                                        className={cn("px-3 py-1 text-[10px] font-bold rounded-md transition-all", !isHULevel ? "bg-white shadow-sm text-primary" : "text-default-500")}
                                        onClick={() => setIsHULevel(false)}
                                    >ITEM LEVEL</button>
                                </div>
                            </div>

                            {scanStep !== 'QTY' && scanStep !== 'REVIEW' && (
                                <form onSubmit={handleScan} className="relative">
                                    <Icon icon="heroicons:qr-code" className="absolute left-6 top-1/2 -translate-y-1/2 text-default-300 w-10 h-10" />
                                    <Input 
                                        ref={inputRef}
                                        className="h-24 ps-20 text-4xl font-black tracking-[0.2em] uppercase border-4 border-primary/20 focus:border-primary focus:ring-primary shadow-inner rounded-2xl bg-default-50/50"
                                        placeholder="SCAN CODE..."
                                        value={barcode}
                                        onChange={(e) => setBarcode(e.target.value)}
                                    />
                                </form>
                            )}

                            {scanStep === 'QTY' && (
                                <div className="bg-primary/5 p-8 rounded-2xl border-2 border-primary/10 flex flex-col items-center space-y-6">
                                    <div className="text-center">
                                        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Nhập số lượng cất hàng</div>
                                        <div className="flex items-center gap-4">
                                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => setQtyValue(Math.max(1, qtyValue - 1))}>
                                                <Icon icon="heroicons:minus" className="w-6 h-6" />
                                            </Button>
                                            <input 
                                                type="number" 
                                                className="w-32 text-5xl font-black text-center bg-transparent border-b-4 border-primary outline-none"
                                                value={qtyValue}
                                                onChange={(e) => setQtyValue(Number(e.target.value))}
                                            />
                                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full" onClick={() => setQtyValue(Math.min(task.qtyRemaining, qtyValue + 1))}>
                                                <Icon icon="heroicons:plus" className="w-6 h-6" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 w-full">
                                        <Button variant="outline" className="flex-1 font-bold h-12" onClick={() => setQtyValue(Math.ceil(task.qtyRemaining / 2))}>CHIA ĐÔI</Button>
                                        <Button color="primary" className="flex-1 font-black h-12" onClick={() => setScanStep('REVIEW')}>XÁC NHẬN QTY</Button>
                                    </div>
                                </div>
                            )}

                            {scanStep === 'REVIEW' && (
                                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-default-50 rounded-xl border border-default-200">
                                            <div className="text-[10px] font-bold text-default-400 uppercase mb-1">Mặt hàng</div>
                                            <div className="font-bold text-default-900">{task.itemName}</div>
                                            <div className="text-xs text-default-500 font-mono">{task.itemCode}</div>
                                        </div>
                                        <div className="p-4 bg-default-50 rounded-xl border border-default-200">
                                            <div className="text-[10px] font-bold text-default-400 uppercase mb-1">Số lượng move</div>
                                            <div className="text-2xl font-black text-primary">{qtyValue} <span className="text-xs text-default-400 font-medium">UNITS</span></div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-success/5 rounded-2xl border-2 border-success/20 flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-bold text-success uppercase mb-1">Vị trí đích đã xác nhận</div>
                                            <div className="text-3xl font-black text-success tracking-tight">{destinationLoc || task.suggestedLocation}</div>
                                        </div>
                                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success">
                                            <Icon icon="heroicons:check-circle" className="w-10 h-10" />
                                        </div>
                                    </div>
                                    <Button color="success" size="lg" className="w-full h-20 text-2xl font-black rounded-2xl shadow-xl shadow-success/20" onClick={handleConfirm}>
                                        XÁC NHẬN CẤT HÀNG
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Task Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2 border-b border-default-100 flex flex-row items-center justify-between">
                                <CardTitle className="text-xs font-black uppercase text-default-400">Chi tiết nguồn</CardTitle>
                                {task.huContents && (
                                    <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-primary" onClick={() => setShowHuContents(true)}>
                                        XEM HU CONTENTS
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-xs text-default-500">Source Location</span>
                                    <Badge variant="outline" className="font-mono">{task.sourceLocation}</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-default-500">Item Code</span>
                                    <span className="text-xs font-bold">{task.itemCode}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-xs text-default-500">Inventory Status</span>
                                    <Badge color={task.inventoryStatus === 'Available' ? 'success' : 'warning'} variant="soft" className="text-[10px]">
                                        {task.inventoryStatus}
                                    </Badge>
                                </div>
                                <div className="pt-2 border-t border-default-50 space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-default-400">
                                        <span>Tiến độ cất hàng</span>
                                        <span>{Math.round((task.qtyMoved / task.qtyTotal) * 100)}%</span>
                                    </div>
                                    <Progress value={(task.qtyMoved / task.qtyTotal) * 100} className="h-1.5" color="primary" />
                                    <div className="flex justify-between text-xs font-bold mt-1">
                                        <span className="text-default-500">Đã cất: {task.qtyMoved}</span>
                                        <span className="text-primary text-sm">Còn lại: {task.qtyRemaining}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-info/20">
                            <CardHeader className="pb-2 border-b border-info/10 bg-info/5">
                                <CardTitle className="text-xs font-black uppercase text-info">Gợi ý cất hàng</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-4">
                                <div className="text-center p-3 bg-info/5 rounded-xl border border-info/10">
                                    <div className="text-3xl font-black text-info tracking-tighter">{task.suggestedLocation}</div>
                                    <div className="text-[10px] text-info font-bold uppercase mt-1">Recommended Bin</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[10px]">
                                    <div className="bg-default-50 p-2 rounded border border-default-100">
                                        <div className="text-default-400 uppercase font-bold">Zone</div>
                                        <div className="font-bold text-default-700">ZONE-A</div>
                                    </div>
                                    <div className="bg-default-50 p-2 rounded border border-default-100">
                                        <div className="text-default-400 uppercase font-bold">Capacity</div>
                                        <div className="font-bold text-success">85% Available</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </ScrollArea>
        </main>

        {/* 4. Cột phải — Suggestions & History */}
        <aside className="w-80 border-s border-default-200 bg-white hidden 2xl:flex flex-col">
            <div className="p-4 border-b border-default-100 bg-default-50">
                <h3 className="text-xs font-black text-default-400 uppercase tracking-widest">Suggestions & Info</h3>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {/* Mode 1: Suggestions */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-default-400 uppercase tracking-wider px-1">Vị trí thay thế</h4>
                        {task.alternativeLocations.map((loc, idx) => (
                            <div key={idx} className="p-3 bg-white border border-default-200 rounded-xl hover:border-primary transition-colors cursor-pointer group" onClick={() => { setBarcode(loc.locationCode); handleScan({ preventDefault: () => {} } as any); }}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-lg font-black text-default-900 group-hover:text-primary">{loc.locationCode}</span>
                                    <Badge variant="soft" color="info" className="text-[8px]">{loc.recommendationReason}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-medium text-default-500">
                                    <span>Zone: {loc.zone}</span>
                                    <span className="text-right">Cap: {loc.availableCapacity}%</span>
                                    <span>Type: {loc.binType}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mode 3: Recent History */}
                    <div className="pt-6 border-t border-default-100 space-y-3">
                        <div className="flex justify-between items-center px-1">
                             <h4 className="text-[10px] font-bold text-default-400 uppercase tracking-wider">Lịch sử vừa xong</h4>
                             {moveHistory.length > 0 && (
                                <button className="text-[10px] font-bold text-destructive hover:underline" onClick={undoLastMove}>UNDO</button>
                             )}
                        </div>
                        <div className="space-y-2">
                            {moveHistory.length > 0 ? moveHistory.slice(0, 5).map(event => (
                                <div key={event.id} className="p-2 bg-default-50 rounded-lg border border-default-100 flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                                        <Icon icon="heroicons:check" className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] font-bold text-default-800 truncate">Move {event.qty} → {event.destination}</div>
                                        <div className="text-[8px] text-default-400">{event.timestamp}</div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-[10px] text-default-400 italic font-medium">Chưa có lượt di chuyển nào</div>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </aside>
      </div>

      {/* 5. Footer Sticky Bar */}
      <footer className="bg-white border-t border-default-200 p-4 px-8 flex items-center justify-between z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
          <div className="flex gap-8">
              <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Còn lại</div>
                  <div className="text-lg font-black text-primary">{task.qtyRemaining} <span className="text-xs text-default-400">UNITS</span></div>
              </div>
              <div>
                  <div className="text-[10px] font-bold text-default-400 uppercase">Trạng thái đích</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={cn("w-2 h-2 rounded-full", destinationLoc ? "bg-success" : "bg-warning")} />
                      <span className="text-xs font-bold text-default-700">{destinationLoc || 'Chờ xác nhận'}</span>
                  </div>
              </div>
          </div>
          <div className="flex gap-3">
              <Button variant="outline" className="font-bold" onClick={() => router.push('/inbound/putaway-tasks')}>Lưu tạm</Button>
              <Button 
                color="success" 
                className="font-black px-10 gap-2" 
                disabled={task.qtyRemaining > 0}
                onClick={() => {
                    completeTask(task.id);
                    toast.success("Đã hoàn tất toàn bộ task!");
                    router.push('/inbound/putaway-tasks');
                }}
              >
                  HOÀN TẤT TASK
                  <Icon icon="heroicons:check-badge" className="w-5 h-5" />
              </Button>
          </div>
      </footer>

      {/* Modals & Drawers */}
      <Sheet open={showAudit} onOpenChange={setShowAudit}>
          <SheetContent side="right" className="p-0 sm:max-w-md">
            <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center gap-2">
                    <Icon icon="heroicons:clock" className="text-primary" />
                    Audit Trail (Lịch sử thao tác)
                </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full pb-20">
                <div className="p-6 space-y-6">
                    {moveHistory.map((event, idx) => (
                        <div key={event.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-default-100 last:before:bg-transparent">
                            <div className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white" />
                            <div className="text-[10px] font-bold text-default-400 mb-1">{event.timestamp} — {event.user}</div>
                            <div className="p-3 bg-default-50 rounded-lg border border-default-200">
                                <div className="text-xs font-bold text-default-900">{event.action}</div>
                                <p className="text-xs text-default-500 mt-1">{event.message}</p>
                            </div>
                        </div>
                    ))}
                    {moveHistory.length === 0 && <div className="text-center py-20 text-default-400">Chưa có dữ liệu lịch sử</div>}
                </div>
            </ScrollArea>
          </SheetContent>
      </Sheet>

      <Sheet open={showHuContents} onOpenChange={setShowHuContents}>
          <SheetContent side="left" className="p-0 sm:max-w-md">
            <SheetHeader className="p-6 border-b">
                <SheetTitle className="flex items-center gap-2">
                    <Icon icon="heroicons:archive-box" className="text-primary" />
                    Nội dung HU: {task.sourceHuId}
                </SheetTitle>
            </SheetHeader>
            <div className="p-6 space-y-4">
                {task.huContents?.map(item => (
                    <div key={item.id} className="p-4 border rounded-xl space-y-2">
                        <div className="font-bold text-default-900">{item.itemName}</div>
                        <div className="flex justify-between text-xs">
                            <span className="text-default-500">Mã: {item.itemCode}</span>
                            <span className="font-black text-primary">{item.qty} {item.uom}</span>
                        </div>
                    </div>
                ))}
            </div>
          </SheetContent>
      </Sheet>

      <Dialog open={showExceptionModal} onOpenChange={setShowExceptionModal}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Báo cáo ngoại lệ Putaway</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                  <Label>Lý do ngoại lệ</Label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-default-200 outline-none focus:ring-2 ring-primary/20"
                    value={exceptionReason}
                    onChange={(e) => setExceptionReason(e.target.value)}
                  >
                      <option value="">Chọn lý do...</option>
                      <option value="loc_full">Vị trí đích đã đầy</option>
                      <option value="wrong_item">Sai mặt hàng thực tế</option>
                      <option value="damaged">Hàng bị hư hỏng</option>
                      <option value="missing">Thiếu hàng so với chứng từ</option>
                      <option value="other">Lý do khác...</option>
                  </select>
                  <textarea 
                    className="w-full h-32 p-3 rounded-md border border-default-200 outline-none focus:ring-2 ring-primary/20 text-sm"
                    placeholder="Mô tả chi tiết tình huống..."
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setShowExceptionModal(false)}>Hủy</Button>
                  <Button color="primary" onClick={handleException} disabled={!exceptionReason}>Gửi Supervisor</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Mobile Sidebars */}
      <Sheet open={showQueue} onOpenChange={setShowQueue}>
          <SheetContent side="left" className="p-0 w-[80%] sm:max-w-md">
            <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-sm font-black uppercase text-default-900">Task Queue</SheetTitle>
            </SheetHeader>
            <div className="p-4 space-y-4">
                <TaskCard task={task} active />
                {relatedTasks.map(t => (
                    <div key={t.id} onClick={() => { setActiveTask(t.id); setShowQueue(false); router.push(`/inbound/putaway-tasks/${t.id}`); }}>
                        <TaskCard task={t} />
                    </div>
                ))}
            </div>
          </SheetContent>
      </Sheet>

      <Sheet open={showSuggestions} onOpenChange={setShowSuggestions}>
          <SheetContent side="right" className="p-0 w-[80%] sm:max-w-md">
            <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-sm font-black uppercase text-default-900">Gợi ý & Lịch sử</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-100px)]">
                <div className="p-4 space-y-6 pb-20">
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-default-400 uppercase">Vị trí thay thế</h4>
                        {task.alternativeLocations.map((loc, idx) => (
                            <div key={idx} className="p-3 bg-white border border-default-200 rounded-xl" onClick={() => { setBarcode(loc.locationCode); setShowSuggestions(false); setScanStep('QTY'); setDestinationLoc(loc.locationCode); }}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-lg font-black">{loc.locationCode}</span>
                                    <Badge variant="soft" color="info" className="text-[8px]">{loc.recommendationReason}</Badge>
                                </div>
                                <div className="text-[10px] text-default-500">{loc.zone} • {loc.availableCapacity}% Cap</div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>
          </SheetContent>
      </Sheet>
    </div>
  );
};

const TaskCard = ({ task, active, onClick }: { task: PutawayTask, active?: boolean, onClick?: () => void }) => (
    <div 
        className={cn(
            "p-3 rounded-xl border transition-all cursor-pointer",
            active ? "bg-primary/5 border-primary shadow-sm" : "bg-white border-default-200 hover:border-default-300"
        )}
        onClick={onClick}
    >
        <div className="flex justify-between items-start mb-2">
            <span className={cn("text-xs font-black", active ? "text-primary" : "text-default-900")}>{task.taskNo}</span>
            <Badge variant="soft" color={task.overdue ? 'destructive' : 'default'} className="text-[8px] py-0">{task.qtyRemaining} units</Badge>
        </div>
        <div className="text-[10px] font-bold text-default-500 truncate mb-2">{task.itemName}</div>
        <div className="flex items-center gap-1">
            <Icon icon="heroicons:map-pin" className="text-default-400 w-3 h-3" />
            <span className="text-[10px] font-mono font-bold text-default-700">{task.suggestedLocation}</span>
        </div>
    </div>
);

const StepItem = ({ step, label, active, done }: { step: number, label: string, active: boolean, done: boolean }) => (
    <div className={cn(
        "flex items-center gap-2 pb-2 border-b-2 transition-all",
        active ? "border-primary" : done ? "border-success/50" : "border-transparent"
    )}>
        <div className={cn(
            "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all",
            active ? "bg-primary text-white" : done ? "bg-success text-white" : "bg-default-200 text-default-500"
        )}>
            {done ? <Icon icon="heroicons:check" className="w-3 h-3" /> : step}
        </div>
        <span className={cn(
            "text-[10px] font-bold uppercase tracking-tighter transition-all",
            active ? "text-primary" : done ? "text-success" : "text-default-400"
        )}>{label}</span>
    </div>
);
