"use client"

import { useReceivingStore } from "@/store/receiving-store";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

export const ReceivingSummary = () => {
  const { header, lines } = useReceivingStore();

  const totalExpected = lines.reduce((acc, curr) => acc + curr.expectedQty, 0);
  const totalReceived = lines.reduce((acc, curr) => acc + curr.receivedQty, 0);
  const progress = (totalReceived / totalExpected) * 100;

  return (
    <div className="p-4 space-y-6">
      <Card className="shadow-none border-none bg-primary/5">
        <CardContent className="p-4 space-y-3">
          <div className="text-sm font-semibold text-default-900 uppercase tracking-wider">Tiến độ nhận hàng</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span>{totalReceived} / {totalExpected} units</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" color="primary" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
             <div className="bg-white p-2 rounded border border-default-100">
                <div className="text-[10px] text-default-400 uppercase">Lines</div>
                <div className="text-lg font-bold text-default-700">
                  {lines.filter(l => l.status === 'Completed').length}/{lines.length}
                </div>
             </div>
             <div className="bg-white p-2 rounded border border-default-100">
                <div className="text-[10px] text-default-400 uppercase">Hỏng/QC</div>
                <div className="text-lg font-bold text-destructive">0</div>
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-default-500 uppercase px-2">Danh sách PO Lines</h3>
        <div className="space-y-1">
          {lines.map(line => (
            <div 
              key={line.id} 
              className={`p-3 rounded-lg border transition-all cursor-pointer ${line.status === 'Completed' ? 'bg-success/5 border-success/20' : 'bg-white border-default-100 hover:border-primary/50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-primary">#{line.lineNo}</span>
                <Badge 
                  variant="soft" 
                  color={line.status === 'Completed' ? 'success' : line.status === 'Partial' ? 'info' : 'default'}
                  className="text-[10px] px-1 py-0"
                >
                  {line.status}
                </Badge>
              </div>
              <div className="text-xs font-medium text-default-700 truncate">{line.itemName}</div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-[10px] text-default-400">{line.itemCode}</span>
                <span className="text-xs font-bold">{line.receivedQty}/{line.expectedQty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
