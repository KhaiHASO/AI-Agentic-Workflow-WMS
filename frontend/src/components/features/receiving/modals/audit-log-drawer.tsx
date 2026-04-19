"use client"

import React, { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useReceivingStore } from "@/store/receiving-store";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface AuditLogDrawerProps {
  open: boolean;
  onClose: () => void;
}

type FilterType = 'all' | 'success' | 'warning' | 'error';

export const AuditLogDrawer = ({ open, onClose }: AuditLogDrawerProps) => {
  const { scanHistory } = useReceivingStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<FilterType>('all');

  const filteredHistory = useMemo(() => {
    return scanHistory.filter(event => {
      const matchesSearch = 
        event.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || event.resultType === filterType;
      
      return matchesSearch && matchesType;
    });
  }, [scanHistory, searchTerm, filterType]);

  const stats = useMemo(() => ({
    all: scanHistory.length,
    success: scanHistory.filter(e => e.resultType === 'success').length,
    warning: scanHistory.filter(e => e.resultType === 'warning').length,
    error: scanHistory.filter(e => e.resultType === 'error').length,
  }), [scanHistory]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-default-100">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold">
            <Icon icon="heroicons:clock" className="text-primary" />
            Lịch sử nhận hàng (Audit Log)
          </SheetTitle>
          <p className="text-sm text-default-500">
            Chi tiết các thao tác quét và cập nhật trong phiên nhận hàng này.
          </p>
        </SheetHeader>

        {/* Search and Filter Section */}
        <div className="p-4 border-b border-default-100 bg-default-50/50 space-y-4">
          <div className="relative">
            <Icon 
              icon="heroicons:magnifying-glass" 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 w-4 h-4" 
            />
            <Input 
              placeholder="Tìm kiếm SP, mã vạch hoặc thông báo..." 
              className="pl-9 h-9 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-default-400 hover:text-default-600"
              >
                <Icon icon="heroicons:x-mark" className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterType('all')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all border",
                filterType === 'all' 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-white text-default-600 border-default-200 hover:border-primary/50"
              )}
            >
              Tất cả ({stats.all})
            </button>
            <button 
              onClick={() => setFilterType('success')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all border",
                filterType === 'success' 
                  ? "bg-success text-white border-success shadow-sm" 
                  : "bg-white text-success border-success/20 hover:bg-success/5"
              )}
            >
              Thành công ({stats.success})
            </button>
            <button 
              onClick={() => setFilterType('warning')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all border",
                filterType === 'warning' 
                  ? "bg-warning text-white border-warning shadow-sm" 
                  : "bg-white text-warning border-warning/20 hover:bg-warning/5"
              )}
            >
              Cảnh báo ({stats.warning})
            </button>
            <button 
              onClick={() => setFilterType('error')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold transition-all border",
                filterType === 'error' 
                  ? "bg-destructive text-white border-destructive shadow-sm" 
                  : "bg-white text-destructive border-destructive/20 hover:bg-destructive/5"
              )}
            >
              Lỗi ({stats.error})
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-4">
            {filteredHistory.length > 0 ? (
              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-default-200 before:to-transparent">
                {filteredHistory.map((event, idx) => (
                  <div key={event.id} className="relative flex items-start gap-4 animate-in fade-in slide-in-from-right-4 duration-300" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-sm shrink-0 z-10",
                      event.resultType === 'success' ? 'bg-success text-white' : 
                      event.resultType === 'warning' ? 'bg-warning text-white' : 'bg-destructive text-white'
                    )}>
                      <Icon icon={event.resultType === 'success' ? 'heroicons:check' : 'heroicons:exclamation-triangle'} className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 bg-default-50 rounded-lg p-4 border border-default-200 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-xs font-bold text-primary block uppercase tracking-wider">{event.timestamp}</span>
                          <h4 className="font-bold text-default-900">{event.itemCode}</h4>
                        </div>
                        <Badge variant="soft" color={event.resultType === 'success' ? 'success' : event.resultType === 'warning' ? 'warning' : 'destructive'} className="text-[10px]">
                          {event.resultType === 'success' ? 'MATCHED' : event.resultType === 'warning' ? 'WARNING' : 'ERROR'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs flex justify-between">
                          <span className="text-default-500">Mã vạch:</span>
                          <span className="font-medium">{event.barcode}</span>
                        </div>
                        <div className="text-xs flex justify-between">
                          <span className="text-default-500">Số lượng:</span>
                          <span className="font-bold text-success">+{event.qty}</span>
                        </div>
                        <div className="text-xs flex justify-between">
                          <span className="text-default-500">Dòng PO:</span>
                          <span className="font-medium">#{event.matchedLineNo}</span>
                        </div>
                      </div>
                      
                      <p className="mt-3 pt-2 border-t border-default-200 text-xs text-default-600 italic leading-relaxed">
                        &quot;{event.message}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-default-100 rounded-full flex items-center justify-center">
                  <Icon icon="heroicons:magnifying-glass" className="w-8 h-8 text-default-300" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-default-900">Không tìm thấy kết quả</p>
                  <p className="text-xs text-default-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
                  {(searchTerm || filterType !== 'all') && (
                    <button 
                      onClick={() => { setSearchTerm(""); setFilterType('all'); }}
                      className="text-xs text-primary font-bold mt-2 hover:underline"
                    >
                      Xóa tất cả bộ lọc
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-default-100 bg-default-50/50">
           <div className="flex justify-between items-center">
              <span className="text-sm text-default-500">Hiển thị: <strong>{filteredHistory.length}</strong> / {scanHistory.length} sự kiện</span>
              <button className="text-xs text-primary font-bold hover:underline">Xuất báo cáo (CSV)</button>
           </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
