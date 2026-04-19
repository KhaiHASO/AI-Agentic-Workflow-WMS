import { create } from 'zustand';
import { ReceiptLine, ReceiptHeader, ScanEvent, mockReceivingDraft } from '@/lib/mock-data/receiving-workbench';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface ReceivingState {
  header: ReceiptHeader;
  lines: ReceiptLine[];
  scanHistory: ScanEvent[];
  activeLineId: string | null;
  scanResult: { type: 'success' | 'warning' | 'error' | 'info'; message: string } | null;
  validation: ValidationResult | null;
  
  // Actions
  processScan: (barcode: string) => void;
  updateLineQty: (lineId: string, field: keyof ReceiptLine, value: any) => void;
  setActiveLine: (lineId: string | null) => void;
  undoLastScan: () => void;
  saveDraft: () => void;
  validateAll: () => void;
  submitReceipt: () => void;
  
  // Specific Receiving Actions
  addLotInfo: (lineId: string, lot: { lotNo: string; mfgDate: string; expiryDate: string; qty: number }) => void;
  addSerial: (lineId: string, serial: string) => void;
  recordQualitySplit: (lineId: string, data: { accepted: number; qc: number; damaged: number; rejected: number }) => void;
  handleSubstitution: (lineId: string, substituteItem: { itemCode: string; itemName: string }) => void;
  closeShort: (lineId: string, reason: string) => void;
}

export const useReceivingStore = create<ReceivingState>((set, get) => ({
  header: { ...mockReceivingDraft.header },
  lines: [...mockReceivingDraft.lines],
  scanHistory: [],
  activeLineId: null,
  scanResult: null,
  validation: null,

  processScan: (barcode: string) => {
    const { lines, scanHistory } = get();
    const matchedLine = lines.find(l => l.barcode === barcode);

    if (matchedLine) {
      const updatedLines = lines.map(l => {
        if (l.id === matchedLine.id) {
          const newReceived = l.receivedQty + 1;
          
          // Check over-receipt tolerance
          const toleranceLimit = l.expectedQty * (1 + l.overTolerancePct / 100);
          let status = l.status;
          let resultType: 'success' | 'warning' | 'error' = 'success';
          let message = `Đã nhận +1 ${l.itemName}`;
          let requiresPin = false;
          let isCrossDock = false;

          // Mock Cross-docking logic (e.g., if itemCode is MILK-01, it's needed for an urgent SO)
          if (l.itemCode === 'ITM-MILK-01' && l.receivedQty === 0) {
            isCrossDock = true;
          }

          if (newReceived > toleranceLimit) {
            status = 'Exception';
            resultType = 'error';
            message = `VƯỢT ĐỊNH MỨC: Cần mã Quản lý (PIN) để tiếp tục nhận ${l.itemName}`;
            requiresPin = true;
          } else if (newReceived > l.expectedQty) {
            status = 'Exception';
            resultType = 'warning';
            message = `Nhận dư trong ngưỡng cho phép cho ${l.itemName}`;
          } else if (newReceived >= l.expectedQty) {
            status = 'Completed';
          } else {
            status = 'Partial';
          }

          if (isCrossDock) {
             set({ 
               scanResult: { type: 'info', message: `🔥 CROSS-DOCK KHẨN: Đưa ngay sản phẩm ${l.itemCode} ra Cửa Xuất (Dock 04)!` } 
             });
          }

          return { ...l, receivedQty: newReceived, status };

          // Auto-prompt logic could be handled in UI based on l.requiresLot etc.
          return { ...l, receivedQty: newReceived, status };
        }
        return l;
      });

      const newEvent: ScanEvent = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        barcode,
        itemCode: matchedLine.itemCode,
        qty: 1,
        matchedLineNo: matchedLine.lineNo,
        resultType: matchedLine.receivedQty + 1 > matchedLine.expectedQty * (1 + matchedLine.overTolerancePct/100) ? 'warning' : 'success',
        message: `Đã nhận +1 ${matchedLine.itemName}`,
      };

      set({ 
        lines: updatedLines, 
        scanHistory: [newEvent, ...scanHistory].slice(0, 50),
        activeLineId: matchedLine.id,
        scanResult: { 
          type: newEvent.resultType, 
          message: newEvent.resultType === 'warning' ? `Nhận vượt ngưỡng: ${matchedLine.itemName}` : newEvent.message 
        }
      });
    } else {
      set({ 
        scanResult: { type: 'error', message: `Không tìm thấy mã vạch: ${barcode}` } 
      });
    }
  },

  updateLineQty: (lineId, field, value) => {
    set(state => ({
      lines: state.lines.map(l => {
        if (l.id === lineId) {
          const updatedLine = { ...l, [field]: value };
          // Recalculate status if receivedQty changed
          if (field === 'receivedQty') {
            const toleranceLimit = l.expectedQty * (1 + l.overTolerancePct / 100);
            if (value > toleranceLimit) {
              updatedLine.status = 'Exception';
            } else if (value >= l.expectedQty) {
              updatedLine.status = 'Completed';
            } else if (value > 0) {
              updatedLine.status = 'Partial';
            } else {
              updatedLine.status = 'Not Started';
            }
          }
          return updatedLine;
        }
        return l;
      })
    }));
  },

  setActiveLine: (lineId) => set({ activeLineId: lineId }),

  undoLastScan: () => {
    const { scanHistory, lines } = get();
    if (scanHistory.length === 0) return;

    const lastEvent = scanHistory[0];
    if (lastEvent.matchedLineNo) {
       const updatedLines = lines.map(l => {
         if (l.lineNo === lastEvent.matchedLineNo) {
           const newQty = Math.max(0, l.receivedQty - lastEvent.qty);
           // Simple status revert
           let status: any = 'Not Started';
           if (newQty >= l.expectedQty) status = 'Completed';
           else if (newQty > 0) status = 'Partial';

           return { ...l, receivedQty: newQty, status };
         }
         return l;
       });
       set({ lines: updatedLines, scanHistory: scanHistory.slice(1), scanResult: null });
    }
  },

  saveDraft: () => {
    set({ scanResult: { type: 'info', message: 'Đã lưu bản nháp thành công' } });
  },

  validateAll: () => {
    const { lines } = get();
    const errors: string[] = [];
    const warnings: string[] = [];

    lines.forEach(l => {
      if (l.requiresLot && (!l.lots || l.lots.length === 0) && l.receivedQty > 0) {
        errors.push(`Dòng ${l.lineNo}: Thiếu thông tin Lot`);
      }
      if (l.requiresSerial && (!l.serials || l.serials.length < l.receivedQty) && l.receivedQty > 0) {
        errors.push(`Dòng ${l.lineNo}: Thiếu thông tin Serial (${l.serials?.length || 0}/${l.receivedQty})`);
      }
      if (l.status === 'Exception') {
        errors.push(`Dòng ${l.lineNo}: Đang ở trạng thái ngoại lệ (vượt ngưỡng)`);
      }
      if (l.receivedQty < l.expectedQty && l.status !== 'Closed Short') {
        warnings.push(`Dòng ${l.lineNo}: Nhận thiếu so với dự kiến`);
      }
    });

    set({ 
      validation: {
        isValid: errors.length === 0,
        errors,
        warnings
      }
    });
  },

  submitReceipt: () => {
    const { validation } = get();
    if (validation && !validation.isValid) {
      set({ scanResult: { type: 'error', message: 'Không thể submit do có lỗi validation' } });
      return;
    }
    set({ 
      header: { ...get().header, status: 'Submitted' },
      scanResult: { type: 'success', message: 'Đã hoàn tất nhận hàng thành công!' } 
    });
  },

  addLotInfo: (lineId, lot) => {
    set(state => ({
      lines: state.lines.map(l => {
        if (l.id === lineId) {
          const existingLots = l.lots || [];
          return { ...l, lots: [...existingLots, lot] };
        }
        return l;
      })
    }));
  },

  addSerial: (lineId, serial) => {
    set(state => ({
      lines: state.lines.map(l => {
        if (l.id === lineId) {
          const existingSerials = l.serials || [];
          if (existingSerials.includes(serial)) return l; // Duplicate
          return { ...l, serials: [...existingSerials, serial] };
        }
        return l;
      })
    }));
  },

  recordQualitySplit: (lineId, data) => {
    set(state => ({
      lines: state.lines.map(l => {
        if (l.id === lineId) {
          return { 
            ...l, 
            acceptedQty: data.accepted,
            qcQty: data.qc,
            damagedQty: data.damaged,
            rejectedQty: data.rejected,
            status: data.qc > 0 ? 'QC Pending' : l.status
          };
        }
        return l;
      })
    }));
  },

  handleSubstitution: (lineId, substituteItem) => {
    set(state => ({
      lines: state.lines.map(l => {
        if (l.id === lineId) {
          return { 
            ...l, 
            itemName: `${l.itemName} (Thay thế bằng ${substituteItem.itemName})`,
            notes: `Hàng thay thế: ${substituteItem.itemCode}`
          };
        }
        return l;
      })
    }));
  },

  closeShort: (lineId, reason) => {
    set(state => ({
      lines: state.lines.map(l => {
        if (l.id === lineId) {
          return { ...l, status: 'Closed Short', notes: reason };
        }
        return l;
      })
    }));
  },
}));

