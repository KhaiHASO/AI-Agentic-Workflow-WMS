"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const ReceivingFooter = () => {
  const { lines, validateAll, validation, submitReceipt } = useReceivingStore();

  const totalExpected = lines.reduce((acc, curr) => acc + curr.expectedQty, 0);
  const totalReceived = lines.reduce((acc, curr) => acc + curr.receivedQty, 0);
  const totalExceptions = lines.filter(l => l.status === 'Exception').length;

  return (
    <div className="h-16 border-t border-default-200 bg-white flex items-center justify-between px-6 sticky bottom-0 z-10 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-default-400 uppercase font-bold tracking-widest">Dự kiến tổng:</span>
          <span className="text-sm font-black">{totalExpected}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-default-400 uppercase font-bold tracking-widest">Đã nhận tổng:</span>
          <span className="text-sm font-black text-primary">{totalReceived}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-default-400 uppercase font-bold tracking-widest">Ngoại lệ:</span>
          <span className="text-sm font-black text-destructive">{totalExceptions}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {validation ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className={`font-bold gap-2 ${validation.isValid ? 'text-success' : 'text-destructive'}`}>
                <Icon icon={validation.isValid ? "heroicons:check-circle" : "heroicons:exclamation-triangle"} className="w-5 h-5" />
                {validation.isValid ? 'DỮ LIỆU HỢP LỆ' : `${validation.errors.length} LỖI CẦN XỬ LÝ`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
               <div className="p-3 border-b border-default-100 bg-default-50 font-bold text-xs uppercase">Kết quả kiểm tra</div>
               <div className="max-h-60 overflow-y-auto p-2 space-y-2">
                  {validation.errors.map((err, i) => (
                    <div key={i} className="text-xs text-destructive bg-destructive/5 p-2 rounded border border-destructive/10 flex gap-2">
                       <Icon icon="heroicons:x-circle" className="w-4 h-4 shrink-0" />
                       {err}
                    </div>
                  ))}
                  {validation.warnings.map((warn, i) => (
                    <div key={i} className="text-xs text-warning bg-warning/5 p-2 rounded border border-warning/10 flex gap-2">
                       <Icon icon="heroicons:exclamation-circle" className="w-4 h-4 shrink-0" />
                       {warn}
                    </div>
                  ))}
                  {validation.errors.length === 0 && validation.warnings.length === 0 && (
                    <div className="text-center py-4 text-xs text-success font-medium">Mọi thứ đều hợp lệ!</div>
                  )}
               </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="ghost" size="sm" className="font-bold gap-2 text-default-400" onClick={validateAll}>
            <Icon icon="heroicons:shield-check" className="w-5 h-5" />
            KIỂM TRA DỮ LIỆU (VALIDATE)
          </Button>
        )}

        <Button 
          color="primary" 
          className="font-bold uppercase tracking-widest h-11 px-8 shadow-lg shadow-primary/20"
          onClick={() => {
            if (!validation) {
              validateAll();
            }
            submitReceipt();
          }}
        >
          XÁC NHẬN NHẬN HÀNG (SUBMIT)
        </Button>
      </div>
    </div>
  );
};

