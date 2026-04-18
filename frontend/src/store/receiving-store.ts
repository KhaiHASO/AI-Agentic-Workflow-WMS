import { create } from 'zustand';
import { ReceiptLine, ReceiptHeader, ScanEvent, mockReceivingDraft } from '@/lib/mock-data/receiving-workbench';

interface ReceivingState {
  header: ReceiptHeader;
  lines: ReceiptLine[];
  scanHistory: ScanEvent[];
  activeLineId: string | null;
  scanResult: { type: 'success' | 'warning' | 'error' | 'info'; message: string } | null;
  
  // Actions
  processScan: (barcode: string) => void;
  updateLineQty: (lineId: string, field: keyof ReceiptLine, value: number) => void;
  setActiveLine: (lineId: string | null) => void;
  undoLastScan: () => void;
  saveDraft: () => void;
  validateAll: () => void;
  submitReceipt: () => void;
}

export const useReceivingStore = create<ReceivingState>((set, get) => ({
  header: { ...mockReceivingDraft.header },
  lines: [...mockReceivingDraft.lines],
  scanHistory: [],
  activeLineId: null,
  scanResult: null,

  processScan: (barcode: string) => {
    const { lines, scanHistory } = get();
    const matchedLine = lines.find(l => l.barcode === barcode);

    if (matchedLine) {
      const updatedLines = lines.map(l => {
        if (l.id === matchedLine.id) {
          const newReceived = l.receivedQty + 1;
          const status = newReceived >= l.expectedQty ? 'Completed' : 'Partial';
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
        resultType: 'success',
        message: `Đã nhận +1 ${matchedLine.itemName}`,
      };

      set({ 
        lines: updatedLines, 
        scanHistory: [newEvent, ...scanHistory].slice(0, 50),
        activeLineId: matchedLine.id,
        scanResult: { type: 'success', message: newEvent.message }
      });
    } else {
      set({ 
        scanResult: { type: 'error', message: `Không tìm thấy mã vạch: ${barcode}` } 
      });
    }
  },

  updateLineQty: (lineId, field, value) => {
    set(state => ({
      lines: state.lines.map(l => l.id === lineId ? { ...l, [field]: value } : l)
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
           return { ...l, receivedQty: newQty, status: newQty === 0 ? 'Not Started' : 'Partial' };
         }
         return l;
       });
       set({ lines: updatedLines, scanHistory: scanHistory.slice(1) });
    }
  },

  saveDraft: () => {},
  validateAll: () => {},
  submitReceipt: () => {},
}));
