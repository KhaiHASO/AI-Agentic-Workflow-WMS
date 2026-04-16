import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const InboundDraftLayer = () => {
  const location = useLocation();
  const { 
    purchaseOrders, suppliers, items, shipments,
    createInboundReceipt, submitInboundDraft, loading 
  } = useWMS();

  // 1. LUỒNG TRẠNG THÁI (STEPS)
  const [step, setStep] = useState('init'); // 'init' | 'gathering' | 'draft' | 'summary'
  
  // State khởi tạo
  const [selectedSupplierId, setSelectedSupplierId] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  
  // State làm việc (Draft)
  const [activeDraft, setActiveDraft] = useState(null);
  const [scanInput, setScanInput] = useState("");
  const [scanHistory, setScanHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashingRow, setFlashingRow] = useState(null);
  
  // State ngoại lệ & Modals
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [crossDockInfo, setCrossDockInfo] = useState(null);
  
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitData, setSplitData] = useState({ lineIndex: -1, qty: 0 });
  
  const [showSubstituteModal, setShowSubstituteModal] = useState(false);
  const [substituteData, setSubstituteData] = useState({ lineIndex: -1, newItemCode: "" });
  
  // State Tổng kết
  const [summary, setSummary] = useState(null);

  const scanInputRef = useRef(null);

  // Tự động xử lý nếu đi từ màn hình PO Management qua
  useEffect(() => {
    if (location.state && location.state.poNumbers && location.state.vendor) {
      const vendorCode = location.state.vendor;
      let supplier = suppliers.find(s => s.code === vendorCode || s.name === vendorCode);
      
      if (!supplier) {
        supplier = { id: 9999, code: vendorCode, name: vendorCode === "SUP-FAST-01" ? "Công ty Cung ứng Toàn Cầu" : "Nhà máy Sản xuất EPE" };
      }
      
      setSelectedSupplierId(supplier.id.toString());
      setVehicleNo("XE-AUTO-SYNC");
      handleAutoCreateMaster(supplier, location.state.poNumbers);
    }
  }, [location.state, suppliers]);

  const handleAutoCreateMaster = async (supplier, poNumbers) => {
    setStep('gathering');
    try {
        let receiptLines = [];
        const realPos = purchaseOrders.filter(p => poNumbers.includes(p.poNumber));
        
        if (realPos.length > 0) {
          realPos.forEach(po => {
            po.lines.forEach(line => {
              receiptLines.push({
                id: 0, // Let backend assign
                poLineId: line.id,
                itemId: line.itemId,
                uomId: line.uomId,
                expectedQty: line.openQty,
                receivedQty: 0,
                acceptedQty: 0,
                rejectedQty: 0,
                status: "Open"
              });
            });
          });
        } else {
          // Fallback if no real POs (mostly for dev/demo)
          const MOCK_ITEMS = [
            { itemCode: 'SKU-A', id: items.find(i => i.itemCode === 'SKU-A')?.id || 101 },
            { itemCode: 'SKU-B', id: items.find(i => i.itemCode === 'SKU-B')?.id || 102 }
          ];
          
          MOCK_ITEMS.forEach(m => {
            receiptLines.push({
              id: 0,
              itemId: m.id,
              uomId: 1,
              expectedQty: 10,
              receivedQty: 0,
              acceptedQty: 0,
              rejectedQty: 0,
              status: "Open"
            });
          });
        }

        const receiptData = {
            receiptNo: location.state?.receiptId || `MR-${Date.now().toString().slice(-6)}`,
            supplierId: supplier.id,
            vehicleNo: vehicleNo || "XE-AUTO-SYNC",
            status: "Open",
            lines: receiptLines
        };

        const newDraft = await createInboundReceipt(receiptData);
        setActiveDraft(newDraft);
        setStep('draft');
    } catch (error) {
        setStep('init');
        toast.error("Lỗi khởi tạo: " + error.message);
    }
  };

  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  };

  useEffect(() => {
    if (step === 'draft' && scanInputRef.current) {
        const interval = setInterval(() => {
            if (document.activeElement !== scanInputRef.current && !showPinModal && !showSplitModal && !showSubstituteModal) {
                scanInputRef.current.focus();
            }
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [step, showPinModal, showSplitModal, showSubstituteModal]);

  const executeScan = (barcode) => {
    if (!barcode) return;
    playBeep();
    
    const MASTER_CATALOG = [
        { id: 101, itemCode: "SKU-A", name: "Hàng chuẩn - Máy in HP" },
        { id: 102, itemCode: "SKU-B", name: "Hàng Lot/Date - Mực in (FEFO)" },
        { id: 103, itemCode: "SKU-C", name: "Hàng quy đổi - Giấy cuộn" },
        { id: 104, itemCode: "SKU-DP", name: "Hàng thay thế - Chip v2.0" }
    ];

    let masterItem = items.find(i => i.itemCode === barcode || i.barcodes?.some(b => b.barcode === barcode));
    if (!masterItem) masterItem = MASTER_CATALOG.find(i => i.itemCode === barcode);
    
    if (!masterItem) {
        toast.error(`SAI MÃ: ${barcode} - Không thuộc danh mục!`);
        setScanHistory(prev => [{ time: new Date().toLocaleTimeString(), msg: `LỖI: ${barcode}`, type: 'error' }, ...prev].slice(0, 10));
        return;
    }

    const lineIndex = activeDraft.lines.findIndex(l => l.itemId === masterItem.id || (l.item && l.item.itemCode === masterItem.itemCode));
    if (lineIndex === -1) {
        toast.error(`HÀNG NGOÀI PO: ${masterItem.itemCode}`);
        setScanHistory(prev => [{ time: new Date().toLocaleTimeString(), msg: `NGOÀI PO: ${masterItem.itemCode}`, type: 'error' }, ...prev].slice(0, 10));
        return;
    }

    const line = activeDraft.lines[lineIndex];
    if (line.expectedQty > 0 && line.receivedQty + 1 > line.expectedQty * 1.1) {
        setShowPinModal(true);
        return;
    }

    setFlashingRow(lineIndex);
    setTimeout(() => setFlashingRow(null), 800);

    const newLines = [...activeDraft.lines];
    newLines[lineIndex].receivedQty += 1;
    newLines[lineIndex].acceptedQty += 1;
    updateLineVisualStatus(newLines[lineIndex]);
    
    setActiveDraft({ ...activeDraft, lines: newLines });
    setScanHistory(prev => [{ time: new Date().toLocaleTimeString(), msg: `Bíp! ${masterItem.itemCode}`, type: 'success' }, ...prev].slice(0, 10));
  };

  const handleManualScan = (e) => {
    if (e.key === "Enter") {
        executeScan(scanInput.trim().toUpperCase());
        setScanInput("");
    }
  };

  const updateLineVisualStatus = (line) => {
      if (line.status === 'Rejected') return; // Không đổi status của dòng đã rejected
      if (line.receivedQty === 0) line.status = "Open";
      else if (line.receivedQty === line.expectedQty) line.status = "Completed";
      else if (line.receivedQty > line.expectedQty) line.status = "Excess";
      else line.status = "Partial";
  };

  const runScenario = (type) => {
      switch(type) {
          case 'SUCCESS': executeScan('SKU-A'); break;
          case 'ERROR': executeScan('XXX-999'); break;
          case 'EXCESS': for(let i=0; i<3; i++) setTimeout(() => executeScan('SKU-A'), i*200); break;
          case 'EXPIRY':
            toast.warning("CẢNH BÁO: Hàng quét có HSD < 30 ngày! Chuyển trạng thái QA Hold.");
            executeScan('SKU-B');
            break;
          default: break;
      }
  };

  const handleConfirmSplit = () => {
    const qtyToSplit = Number(splitData.qty);
    if (qtyToSplit <= 0) return toast.error("Số lượng phải lớn hơn 0");
    const newLines = [...activeDraft.lines];
    const targetLine = newLines[splitData.lineIndex];
    if (qtyToSplit > targetLine.receivedQty) return toast.error("Không thể tách quá số lượng đã nhận!");

    targetLine.receivedQty -= qtyToSplit;
    targetLine.acceptedQty -= qtyToSplit;
    updateLineVisualStatus(targetLine);

    newLines.splice(splitData.lineIndex + 1, 0, {
      ...targetLine,
      id: 0, // Backend will assign
      receivedQty: qtyToSplit,
      acceptedQty: 0,
      rejectedQty: qtyToSplit,
      status: "Rejected",
      isSplit: true
    });

    setActiveDraft({ ...activeDraft, lines: newLines });
    setShowSplitModal(false);
    toast.warning(`Đã tách ${qtyToSplit} sản phẩm lỗi sang dòng riêng.`);
  };

  const handleConfirmSubstitute = () => {
    if (!substituteData.newItemCode) return toast.error("Vui lòng chọn mã thay thế!");
    const newLines = [...activeDraft.lines];
    const targetLine = newLines[substituteData.lineIndex];
    
    const MASTER_CATALOG = [
        { id: 101, itemCode: "SKU-A", name: "Hàng chuẩn - Máy in HP" },
        { id: 102, itemCode: "SKU-B", name: "Hàng Lot/Date - Mực in (FEFO)" },
        { id: 103, itemCode: "SKU-C", name: "Hàng quy đổi - Giấy cuộn" },
        { id: 104, itemCode: "SKU-DP", name: "Hàng thay thế - Chip v2.0" }
    ];
    const newItem = MASTER_CATALOG.find(i => i.itemCode === substituteData.newItemCode);
    
    targetLine.itemId = newItem.id;
    // We keep the UI item object for display if possible, or let the next render handle it via items from context
    targetLine.item = { itemCode: newItem.itemCode, name: newItem.name };
    setActiveDraft({ ...activeDraft, lines: newLines });
    setShowSubstituteModal(false);
    toast.info(`Đã đổi sang mã thay thế ${substituteData.newItemCode}`);
  };

  const handleDeleteLine = (index) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dòng hàng này khỏi phiếu nhận?")) {
      const newLines = activeDraft.lines.filter((_, i) => i !== index);
      setActiveDraft({ ...activeDraft, lines: newLines });
      toast.success("Đã xóa dòng hàng.");
    }
  };

  const handleSubmitFinal = async () => {
    if (!activeDraft || !activeDraft.id) {
        toast.error("Không tìm thấy thông tin phiếu!");
        return;
    }
    
    setIsSubmitting(true);
    try {
        // Prepare data for backend: remove circular refs or unnecessary UI-only fields if any
        const submitData = {
            ...activeDraft,
            status: "Received",
            lines: activeDraft.lines.map(l => ({
                id: l.id,
                receiptHeaderId: activeDraft.id,
                itemId: l.itemId,
                poLineId: l.poLineId,
                uomId: l.uomId,
                expectedQty: l.expectedQty,
                receivedQty: l.receivedQty,
                acceptedQty: l.acceptedQty,
                rejectedQty: l.rejectedQty,
                status: l.status
            }))
        };

        await submitInboundDraft(activeDraft.id, submitData);
        
        const totalOk = activeDraft.lines.reduce((acc, l) => acc + (l.acceptedQty || 0), 0);
        const totalBackorder = activeDraft.lines.reduce((acc, l) => acc + (l.expectedQty > l.receivedQty ? l.expectedQty - l.receivedQty : 0), 0);
        
        setSummary({ totalOk, totalBackorder, receiptNo: activeDraft.receiptNo });
        setStep('summary');
        toast.success("Đã nộp phiếu hoàn thiện!");
    } catch (error) {
        toast.error("Lỗi nộp phiếu: " + error.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  const getLineColorClass = (status, idx) => {
      if (flashingRow === idx) return 'bg-primary-50 border-primary-600 flash-animation';
      switch(status) {
          case 'Completed': return 'bg-success-focus border-success-main';
          case 'Partial': return 'bg-warning-focus border-warning-main';
          case 'Excess': return 'bg-danger-focus border-danger-main';
          case 'Rejected': return 'bg-danger-focus border-danger-600 opacity-75';
          default: return 'bg-base';
      }
  };

  if (step === 'init') return (
      <div className="col-12 d-flex justify-content-center align-items-center" style={{minHeight: '70vh'}}>
          <div className="card border-0 shadow-lg radius-24 p-48 text-center" style={{maxWidth: '500px'}}>
              <div className="w-80-px h-80-px bg-primary-100 text-primary-600 rounded-circle d-flex justify-content-center align-items-center mx-auto mb-24">
                  <Icon icon="solar:delivery-bold" className="display-4" />
              </div>
              <h3 className="fw-black text-dark uppercase mb-8">Khởi tạo nhận hàng</h3>
              <div className="text-start mb-32">
                  <label className="form-label fw-bold text-xs uppercase">Nhà cung cấp (Vendor)</label>
                  <select className="form-select form-select-lg radius-12 border-2 mb-16" value={selectedSupplierId} onChange={(e) => setSelectedSupplierId(e.target.value)}>
                      <option value="">-- Chọn NCC --</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
                  </select>
                  <label className="form-label fw-bold text-xs uppercase">Biển số xe</label>
                  <input type="text" className="form-control form-control-lg radius-12 border-2" placeholder="29C-123.45" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
              </div>
              <button className="btn btn-primary-600 w-100 py-20 radius-16 fw-black h4 shadow-primary" onClick={() => handleAutoCreateMaster(suppliers.find(s=>s.id === Number(selectedSupplierId)), [])}>TẠO PHIẾU NHẬN HÀNG TỔNG</button>
          </div>
      </div>
  );

  if (step === 'gathering') return (
    <div className="col-12 text-center py-100">
        <div className="spinner-grow text-primary mb-24" style={{width: '3rem', height: '3rem'}}></div>
        <h4 className="fw-bold animate__animated animate__pulse animate__infinite uppercase">Đang gom dữ liệu PO & Backorder...</h4>
    </div>
  );

  if (step === 'draft') return (
      <div className="row gy-4 pb-120">
          <div className="col-lg-9">
              <div className="card border-0 shadow-sm radius-16 bg-base overflow-hidden">
                  <div className="card-header bg-light border-bottom p-24 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-black uppercase">Nhận hàng: {activeDraft.receiptNo}</h5>
                      <div className="d-flex gap-2">
                          <span className="badge bg-dark px-16 py-8 radius-8">NCC: {suppliers.find(s=>s.id === activeDraft.supplierId)?.name || activeDraft.supplierId}</span>
                          <span className="badge bg-primary-600 px-16 py-8 radius-8">XE: {activeDraft.vehicleNo}</span>
                      </div>
                  </div>
                  <div className="card-body p-0">
                      <div className="table-responsive">
                          <table className="table mb-0 align-middle">
                              <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                                  <tr>
                                      <th className="ps-24">Sản phẩm</th>
                                      <th className="text-center">Kỳ vọng</th>
                                      <th className="text-center">Thực nhận</th>
                                      <th className="text-center">Trạng thái</th>
                                      <th className="pe-24 text-end">Thao tác</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {activeDraft.lines.map((line, idx) => (
                                      <tr key={idx} className={`border-start border-4 transition-all ${getLineColorClass(line.status, idx)}`}>
                                          <td className="ps-24 py-20">
                                              <div className="d-flex align-items-center gap-3">
                                                  <div className="w-48-px h-48-px rounded-8 border bg-white d-flex align-items-center justify-content-center fw-bold text-primary">SKU</div>
                                                  <div>
                                                      <span className="fw-black text-dark d-block">{line.item?.itemCode}</span>
                                                      <small className="text-secondary fw-bold text-xs uppercase">{line.item?.name}</small>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="text-center h5 fw-bold text-secondary">{line.expectedQty}</td>
                                          <td className="text-center"><div className="h3 mb-0 fw-black text-primary-600">{line.receivedQty}</div></td>
                                          <td className="text-center">
                                              <span className={`badge ${line.status === 'Completed' ? 'bg-success-main' : line.status === 'Rejected' ? 'bg-danger-600' : 'bg-warning-main'}`}>{line.status}</span>
                                          </td>
                                          <td className="pe-24 text-end">
                                              <div className="dropdown">
                                                  <button className="btn btn-light btn-sm radius-8 border" data-bs-toggle="dropdown"><Icon icon="solar:menu-dots-bold" /></button>
                                                  <ul className="dropdown-menu shadow-lg border-0 radius-12">
                                                      <li><button className="dropdown-item py-8 d-flex align-items-center gap-2" onClick={() => { setSplitData({ lineIndex: idx, qty: 0 }); setShowSplitModal(true); }}><Icon icon="solar:bill-cross-bold" className="text-danger" /> Tách dòng lỗi</button></li>
                                                      <li><button className="dropdown-item py-8 d-flex align-items-center gap-2" onClick={() => { setSubstituteData({ lineIndex: idx, newItemCode: "" }); setShowSubstituteModal(true); }}><Icon icon="solar:reorder-bold" className="text-warning" /> Đổi mã tương đương</button></li>
                                                      <li><button className="dropdown-item py-8 d-flex align-items-center gap-2 text-danger" onClick={() => handleDeleteLine(idx)}><Icon icon="solar:trash-bin-trash-bold" /> Xóa dòng</button></li>
                                                  </ul>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>

          <div className="col-lg-3">
              <div className="card border-0 shadow-lg radius-16 bg-dark text-white p-24 sticky-top" style={{top: '100px'}}>
                  <h6 className="text-xs fw-black uppercase opacity-50 mb-20 letter-spacing-1">Scanner Panel</h6>
                  <div className="mb-32">
                      <label className="text-xxs fw-bold uppercase mb-8 d-block opacity-75">Quét mã vạch</label>
                      <input ref={scanInputRef} type="text" className="form-control bg-white bg-opacity-10 border-0 text-white fw-bold" placeholder="Đang lắng nghe..." value={scanInput} onChange={(e) => setScanInput(e.target.value)} onKeyDown={handleManualScan} />
                  </div>
                  <div className="d-flex flex-column gap-2 mb-32">
                      <button className="btn btn-outline-success btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('SUCCESS')}><Icon icon="solar:check-read-bold" /> Quét SKU-A</button>
                      <button className="btn btn-outline-danger btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('ERROR')}><Icon icon="solar:shield-cross-bold" /> Quét Sai Mã</button>
                      <button className="btn btn-outline-warning btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('EXCESS')}><Icon icon="solar:reorder-bold" /> Quét Vượt SL</button>
                  </div>
                  <h6 className="text-xxs fw-bold uppercase opacity-50 mb-12">Lịch sử quét</h6>
                  <div className="d-flex flex-column gap-2 overflow-auto" style={{maxHeight: '150px'}}>
                      {scanHistory.map((h, i) => (
                          <div key={i} className={`p-10 radius-8 text-xs fw-bold ${h.type === 'error' ? 'bg-danger-focus text-danger-main' : 'bg-white bg-opacity-10'}`}>{h.time} - {h.msg}</div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="position-fixed bottom-0 start-0 w-100 bg-base border-top p-24 shadow-lg-up" style={{zIndex: 1000}}>
              <div className="container-fluid d-flex justify-content-between align-items-center">
                  <div>
                      <h4 className="mb-0 fw-black text-primary-600">{activeDraft.lines.reduce((acc, l) => acc + l.receivedQty, 0)} / {activeDraft.lines.reduce((acc, l) => acc + l.expectedQty, 0)} SP</h4>
                  </div>
                  <button className="btn btn-primary-600 px-100 py-20 radius-16 fw-black h4" onClick={handleSubmitFinal} disabled={isSubmitting}>XÁC NHẬN NỘP PHIẾU</button>
              </div>
          </div>

          {showSplitModal && (
                <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content radius-24 p-40 border-0 shadow-lg">
                            <h4 className="fw-black text-dark uppercase mb-8">Tách dòng hàng lỗi</h4>
                            <input type="number" className="form-control form-control-lg radius-12 mb-24" placeholder="SL lỗi..." value={splitData.qty} onChange={(e) => setSplitData({...splitData, qty: e.target.value})} />
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary w-100 py-16 radius-12" onClick={() => setShowSplitModal(false)}>Hủy</button>
                                <button className="btn btn-danger-main w-100 py-16 radius-12 fw-bold" onClick={handleConfirmSplit}>XÁC NHẬN TÁCH</button>
                            </div>
                        </div>
                    </div>
                </div>
          )}

          {showSubstituteModal && (
                <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content radius-24 p-40 border-0 shadow-lg">
                            <h4 className="fw-black text-dark uppercase mb-8">Đổi mã tương đương</h4>
                            <select className="form-select form-select-lg radius-12 mb-24" value={substituteData.newItemCode} onChange={(e) => setSubstituteData({...substituteData, newItemCode: e.target.value})}>
                                <option value="">-- Chọn mã thay thế --</option>
                                <option value="SKU-DP">SKU-DP: Hàng thay thế - Chip v2.0</option>
                                <option value="SKU-A">SKU-A: Hàng chuẩn - Máy in HP</option>
                            </select>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary w-100 py-16 radius-12" onClick={() => setShowSubstituteModal(false)}>Hủy</button>
                                <button className="btn btn-warning-main w-100 py-16 radius-12 fw-bold" onClick={handleConfirmSubstitute}>XÁC NHẬN ĐỔI MÃ</button>
                            </div>
                        </div>
                    </div>
                </div>
          )}
      </div>
  );

  if (step === 'summary') return (
      <div className="col-12 d-flex justify-content-center align-items-center" style={{minHeight: '70vh'}}>
          <div className="card border-0 shadow-lg radius-24 p-48 text-center animate__animated animate__backInUp" style={{maxWidth: '600px'}}>
              <h2 className="fw-black text-dark uppercase">Nộp phiếu thành công!</h2>
              <div className="row gy-3 my-40">
                  <div className="col-6"><div className="p-24 bg-success-focus radius-16"><h2 className="fw-black text-success-main mb-0">{summary.totalOk}</h2><small className="success-main fw-bold uppercase">Thành công</small></div></div>
                  <div className="col-6"><div className="p-24 bg-warning-focus radius-16"><h2 className="fw-black text-warning-main mb-0">{summary.totalBackorder}</h2><small className="warning-main fw-bold uppercase">Backorder</small></div></div>
              </div>
              <button className="btn btn-primary-600 w-100 py-20 radius-16 fw-black h4 shadow-primary" onClick={() => window.location.reload()}>BẮT ĐẦU CHUYẾN MỚI</button>
          </div>
      </div>
  );

  return null;
};

export default InboundDraftLayer;
