import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const InboundDraftLayer = () => {
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
  const [flashingRow, setFlashingRow] = useState(null); // Để tạo hiệu ứng Flash
  
  // State ngoại lệ & Modals
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [crossDockInfo, setCrossDockInfo] = useState(null);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [splitData, setSplitData] = useState({ lineIndex: -1, qty: 0 });
  
  // State Tổng kết
  const [summary, setSummary] = useState(null);

  const scanInputRef = useRef(null);

  // Âm thanh Bíp
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

  // Tự động focus ô quét
  useEffect(() => {
    if (step === 'draft' && scanInputRef.current) {
        const interval = setInterval(() => {
            if (document.activeElement !== scanInputRef.current && !showPinModal && !showSplitModal) {
                scanInputRef.current.focus();
            }
        }, 1000);
        return () => clearInterval(interval);
    }
  }, [step, showPinModal, showSplitModal]);

  // I. XỬ LÝ KHỞI TẠO
  const handleCreateMasterReceipt = async () => {
      if (!selectedSupplierId) return toast.warning("Vui lòng chọn Nhà cung cấp!");
      setStep('gathering');
      setTimeout(async () => {
          try {
              const supplier = suppliers.find(s => s.id === Number(selectedSupplierId));
              const openPos = purchaseOrders.filter(p => p.supplierId === supplier.id);
              const receiptData = {
                  receiptNo: `MR-${Date.now().toString().slice(-6)}`,
                  supplierId: supplier.id,
                  vehicleNo: vehicleNo,
                  status: "Open",
                  lines: []
              };
              openPos.forEach(po => {
                  po.lines.forEach(line => {
                      receiptData.lines.push({
                          id: Math.floor(Math.random() * 100000),
                          poLineId: line.id,
                          itemId: line.itemId,
                          uomId: line.uomId,
                          expectedQty: line.openQty,
                          receivedQty: 0,
                          acceptedQty: 0,
                          rejectedQty: 0,
                          status: "Open",
                          item: line.item
                      });
                  });
              });
              const created = await createInboundReceipt(receiptData);
              setActiveDraft(created);
              setStep('draft');
              toast.success(`Đã gom ${openPos.length} PO cho ${supplier.name}`);
          } catch (error) {
              setStep('init');
              toast.error("Lỗi: " + error.message);
          }
      }, 1500);
  };

  // II. CORE: XỬ LÝ QUÉT MÃ (THE BEEP -> MAP -> FLASH)
  const executeScan = (barcode) => {
    if (!barcode) return;
    playBeep();
    
    const masterItem = items.find(i => i.itemCode === barcode || i.barcodes?.some(b => b.barcode === barcode));
    
    if (!masterItem) {
        toast.error(`SAI MÃ: ${barcode} - Không thuộc danh mục!`);
        setScanHistory(prev => [{ time: new Date().toLocaleTimeString(), msg: `LỖI: ${barcode}`, type: 'error' }, ...prev].slice(0, 10));
        return;
    }

    const lineIndex = activeDraft.lines.findIndex(l => l.itemId === masterItem.id);
    if (lineIndex === -1) {
        toast.error(`HÀNG NGOÀI PO: ${masterItem.itemCode}`);
        setScanHistory(prev => [{ time: new Date().toLocaleTimeString(), msg: `NGOÀI PO: ${masterItem.itemCode}`, type: 'error' }, ...prev].slice(0, 10));
        return;
    }

    const line = activeDraft.lines[lineIndex];
    
    // Check Over-receipt
    if (line.expectedQty > 0 && line.receivedQty + 1 > line.expectedQty * 1.1) {
        setShowPinModal(true);
        return;
    }

    // Check Cross-dock
    if (masterItem.itemCode === 'RM-001') {
        setCrossDockInfo({ item: masterItem.itemCode, gate: "CỬA XUẤT 04" });
    }

    // Hiệu ứng Flash dòng
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
      if (line.receivedQty === 0) line.status = "Open";
      else if (line.receivedQty === line.expectedQty) line.status = "Completed";
      else if (line.receivedQty > line.expectedQty) line.status = "Excess";
      else line.status = "Partial";
  };

  // III. VIRTUAL SCANNER SCENARIOS
  const runScenario = (type) => {
      switch(type) {
          case 'SUCCESS': executeScan('SKU-021'); break;
          case 'ERROR': executeScan('XXX-999'); break;
          case 'EXCESS': 
            for(let i=0; i<5; i++) setTimeout(() => executeScan('RM-001'), i*200);
            break;
          case 'EXPIRY':
            toast.warning("CẢNH BÁO: Hàng quét có HSD < 30 ngày! Chuyển trạng thái QA Hold.");
            executeScan('RM-002');
            break;
          default: break;
      }
  };

  // IV. VALIDATION & SUBMIT
  const hasErrors = activeDraft?.lines.some(l => l.status === 'Excess') || false;

  const handleSubmitFinal = async () => {
    setIsSubmitting(true);
    try {
        await submitInboundDraft(activeDraft.id, { ...activeDraft, status: "Received" });
        const totalOk = activeDraft.lines.reduce((acc, l) => acc + l.acceptedQty, 0);
        const totalBackorder = activeDraft.lines.reduce((acc, l) => acc + (l.expectedQty > l.receivedQty ? l.expectedQty - l.receivedQty : 0), 0);
        setSummary({ totalOk, totalBackorder, receiptNo: activeDraft.receiptNo });
        setStep('summary');
    } catch (error) {
        toast.error("Lỗi: " + error.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  // UI HELPERS
  const getLineColorClass = (status, idx) => {
      if (flashingRow === idx) return 'bg-primary-50 border-primary-600 flash-animation';
      switch(status) {
          case 'Completed': return 'bg-success-focus border-success-main';
          case 'Partial': return 'bg-warning-focus border-warning-main';
          case 'Excess': return 'bg-danger-focus border-danger-main';
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
              <p className="text-secondary mb-32">Chọn Nhà cung cấp để hệ thống gom các đơn hàng PO/Backorder.</p>
              <div className="text-start mb-32">
                  <label className="form-label fw-bold text-xs uppercase">Nhà cung cấp (Vendor)</label>
                  <select className="form-select form-select-lg radius-12 border-2 mb-16" value={selectedSupplierId} onChange={(e) => setSelectedSupplierId(e.target.value)}>
                      <option value="">-- Chọn NCC --</option>
                      {suppliers.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
                  </select>
                  <label className="form-label fw-bold text-xs uppercase">Biển số xe</label>
                  <input type="text" className="form-control form-control-lg radius-12 border-2" placeholder="29C-123.45" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
              </div>
              <button className="btn btn-primary-600 w-100 py-20 radius-16 fw-black h4 shadow-primary" onClick={handleCreateMasterReceipt} disabled={loading}>TẠO PHIẾU NHẬN HÀNG TỔNG</button>
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
          {/* TRÁI: DRAFT AREA (75%) */}
          <div className="col-lg-9">
              <div className="card border-0 shadow-sm radius-16 bg-base overflow-hidden">
                  <div className="card-header bg-light border-bottom p-24 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-black uppercase">Bản nháp nhận hàng: {activeDraft.receiptNo}</h5>
                      <div className="d-flex gap-2">
                          <span className="badge bg-dark px-16 py-8 radius-8">NCC: {suppliers.find(s=>s.id === activeDraft.supplierId)?.name}</span>
                          <span className="badge bg-primary-600 px-16 py-8 radius-8">XE: {activeDraft.vehicleNo}</span>
                      </div>
                  </div>
                  <div className="card-body p-0">
                      <div className="table-responsive">
                          <table className="table mb-0 align-middle">
                              <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                                  <tr>
                                      <th className="ps-24">Sản phẩm</th>
                                      <th className="text-center">PO Kỳ vọng</th>
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
                                                  <img src="assets/images/images.png" alt="sku" className="w-48-px h-48-px rounded-8 border object-fit-cover bg-white" />
                                                  <div>
                                                      <span className="fw-black text-dark d-block">{line.item?.itemCode}</span>
                                                      <small className="text-secondary fw-bold text-xs uppercase">{line.item?.name}</small>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="text-center h5 fw-bold text-secondary">{line.expectedQty}</td>
                                          <td className="text-center"><div className="h3 mb-0 fw-black text-primary-600">{line.receivedQty}</div></td>
                                          <td className="text-center">
                                              {line.status === 'Completed' ? <Icon icon="solar:check-circle-bold" className="text-success-main h3 mb-0" /> : 
                                               line.status === 'Excess' ? <Icon icon="solar:danger-bold" className="text-danger-main h3 mb-0" /> :
                                               <span className="badge bg-warning-main">Partial</span>}
                                          </td>
                                          <td className="pe-24 text-end">
                                              <div className="dropdown">
                                                  <button className="btn btn-light btn-sm radius-8 border" data-bs-toggle="dropdown"><Icon icon="solar:menu-dots-bold" /></button>
                                                  <ul className="dropdown-menu shadow-lg border-0 radius-12">
                                                      <li><button className="dropdown-item py-8 d-flex align-items-center gap-2" onClick={() => { setSplitData({ lineIndex: idx, qty: 0 }); setShowSplitModal(true); }}><Icon icon="solar:bill-cross-bold" className="text-danger" /> Tách dòng lỗi</button></li>
                                                      <li><button className="dropdown-item py-8 d-flex align-items-center gap-2"><Icon icon="solar:reorder-bold" className="text-warning" /> Đổi mã tương đương</button></li>
                                                      <li><button className="dropdown-item py-8 d-flex align-items-center gap-2 text-danger"><Icon icon="solar:trash-bin-trash-bold" /> Xóa dòng</button></li>
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

          {/* PHẢI: VIRTUAL SCANNER PANEL (25%) */}
          <div className="col-lg-3">
              <div className="card border-0 shadow-lg radius-16 bg-dark text-white p-24 sticky-top" style={{top: '100px'}}>
                  <h6 className="text-xs fw-black uppercase opacity-50 mb-20 letter-spacing-1">Virtual Scanner (Demo Mode)</h6>
                  
                  {/* Global Input */}
                  <div className="mb-32">
                      <label className="text-xxs fw-bold uppercase mb-8 d-block opacity-75">Quét hoặc nhập mã vạch</label>
                      <div className="input-group bg-white bg-opacity-10 radius-12 overflow-hidden border border-secondary border-opacity-25">
                          <span className="input-group-text bg-transparent border-0 text-white"><Icon icon="solar:scanner-bold" /></span>
                          <input 
                            ref={scanInputRef}
                            type="text" 
                            className="form-control bg-transparent border-0 text-white fw-bold" 
                            placeholder="Đang lắng nghe..."
                            value={scanInput}
                            onChange={(e) => setScanInput(e.target.value)}
                            onKeyDown={handleManualScan}
                          />
                      </div>
                  </div>

                  {/* Scenario Triggers */}
                  <div className="mb-32">
                      <label className="text-xxs fw-bold uppercase mb-12 d-block opacity-75">Kịch bản Demo (1-Click)</label>
                      <div className="d-flex flex-column gap-2">
                          <button className="btn btn-outline-success btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('SUCCESS')}>
                              <Icon icon="solar:check-read-bold" /> Quét Hàng Chuẩn (Khớp PO)
                          </button>
                          <button className="btn btn-outline-danger btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('ERROR')}>
                              <Icon icon="solar:shield-cross-bold" /> Quét Sai Mã (Lỗi đỏ)
                          </button>
                          <button className="btn btn-outline-warning btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('EXCESS')}>
                              <Icon icon="solar:reorder-bold" /> Quét Quá Số Lượng
                          </button>
                          <button className="btn btn-outline-info btn-sm text-start py-12 px-16 radius-12 d-flex align-items-center gap-2" onClick={() => runScenario('EXPIRY')}>
                              <Icon icon="solar:calendar-bold" /> Quét Lô Cận Date
                          </button>
                      </div>
                  </div>

                  {/* Camera Toggle */}
                  <button className="btn btn-primary-600 w-100 py-16 radius-12 fw-black d-flex align-items-center justify-content-center gap-2">
                      <Icon icon="solar:camera-bold" className="h4 mb-0" /> BẬT CAMERA QUÉT (QR)
                  </button>

                  <hr className="my-24 opacity-10" />

                  {/* Live History */}
                  <h6 className="text-xxs fw-bold uppercase opacity-50 mb-12">Nhật ký (Live Log)</h6>
                  <div className="d-flex flex-column gap-2 overflow-auto" style={{maxHeight: '200px'}}>
                      {scanHistory.map((h, i) => (
                          <div key={i} className={`p-10 radius-8 text-xs fw-bold ${h.type === 'error' ? 'bg-danger-focus text-danger-main' : 'bg-white bg-opacity-10'}`}>
                              {h.time} - {h.msg}
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* STICKY FOOTER */}
          <div className="position-fixed bottom-0 start-0 w-100 bg-base border-top p-24 shadow-lg-up" style={{zIndex: 1000}}>
              <div className="container-fluid d-flex justify-content-between align-items-center">
                  <div>
                      <h4 className="mb-0 fw-black text-primary-600">
                        {activeDraft.lines.reduce((acc, l) => acc + l.receivedQty, 0)} / {activeDraft.lines.reduce((acc, l) => acc + l.expectedQty, 0)} SP
                      </h4>
                      <small className="text-secondary fw-black uppercase">Tiến độ nhận hàng thực tế</small>
                  </div>
                  <div className="d-flex gap-3">
                    {hasErrors && <span className="text-danger fw-bold d-flex align-items-center gap-1 animate__animated animate__shakeX"><Icon icon="solar:danger-bold" /> Vui lòng xử lý các dòng lỗi đỏ!</span>}
                    <button 
                        className={`btn px-100 py-20 radius-16 fw-black h4 shadow-primary ${hasErrors ? 'btn-secondary opacity-50' : 'btn-primary-600'}`} 
                        onClick={handleSubmitFinal} 
                        disabled={isSubmitting || hasErrors}
                    >
                        {isSubmitting ? 'ĐANG ĐỒNG BỘ ERP...' : 'XÁC NHẬN & NỘP PHIẾU (SUBMIT)'}
                    </button>
                  </div>
              </div>
          </div>

          {/* MODALS */}
          {showPinModal && (
              <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}}>
                  <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content radius-24 p-40 border-0 text-center animate__animated animate__shakeX">
                          <Icon icon="solar:lock-password-bold" className="display-1 text-danger-main mb-24 mx-auto" />
                          <h3 className="fw-black text-dark uppercase">PHÊ DUYỆT NHẬN DƯ</h3>
                          <p className="text-secondary mb-32">Số lượng vượt quá 10% PO. Cần mã PIN Quản lý (Demo: 1234).</p>
                          <input type="password" className="form-control form-control-lg text-center h2 py-20 radius-16 border-2" placeholder="****" autoFocus value={pinInput} onChange={(e) => setPinInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (pinInput === '1234' ? setShowPinModal(false) : toast.error("Sai PIN!"))} />
                      </div>
                  </div>
              </div>
          )}

          {crossDockInfo && (
              <div className="modal fade show d-block animate__animated animate__flash animate__infinite" style={{backgroundColor: 'rgba(255,165,0,0.4)'}}>
                  <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content radius-24 p-48 bg-warning-main border-0 text-center text-white shadow-lg">
                          <Icon icon="solar:forward-bold" className="display-1 mb-24 mx-auto" />
                          <h1 className="fw-black display-4 uppercase mb-16">CROSS-DOCKING!</h1>
                          <h3 className="fw-bold mb-32">GIAO THẲNG ĐẾN: {crossDockInfo.gate}</h3>
                          <button className="btn btn-white text-warning-main w-100 py-20 radius-16 fw-black h4" onClick={() => setCrossDockInfo(null)}>ĐÃ HIỂU</button>
                      </div>
                  </div>
              </div>
          )}

          {showSplitModal && (
                <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content radius-24 p-40 border-0 shadow-lg">
                            <h4 className="fw-black text-dark uppercase mb-24">Tách dòng hàng lỗi</h4>
                            <input type="number" className="form-control form-control-lg radius-12 mb-24" placeholder="SL lỗi..." value={splitData.qty} onChange={(e) => setSplitData({...splitData, qty: e.target.value})} />
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary w-100 py-16 radius-12" onClick={() => setShowSplitModal(false)}>Hủy</button>
                                <button className="btn btn-danger-main w-100 py-16 radius-12 fw-bold" onClick={() => { 
                                    const newLines = [...activeDraft.lines];
                                    newLines[splitData.lineIndex].status = 'Excess'; // Đánh dấu đỏ để demo
                                    setActiveDraft({...activeDraft, lines: newLines});
                                    setShowSplitModal(false);
                                }}>Xác nhận</button>
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
              <div className="w-80-px h-80-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center mx-auto mb-24">
                  <Icon icon="solar:check-circle-bold" className="display-4" />
              </div>
              <h2 className="fw-black text-dark uppercase">Nộp phiếu thành công!</h2>
              <p className="text-secondary h5 mb-32">Dữ liệu đã được đồng bộ với ERP FAST.</p>
              <div className="row gy-3 mb-40">
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
