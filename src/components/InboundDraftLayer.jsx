import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const InboundDraftLayer = () => {
  const { inboundDrafts, submitInboundDraft, items, shipments } = useWMS();
  const [activeDraft, setActiveDraft] = useState(null);
  const [scanInput, setScanInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  
  // Handheld & Lot state
  const [isHandheldMode, setIsHandheldMode] = useState(false);
  const [lastScannedItem, setLastScannedItem] = useState(null);
  const [awaitingLotCapture, setAwaitingLotCapture] = useState(null);
  const [lotInput, setLotInput] = useState({ lot: "", expiry: "" });
  
  // Cross-dock state
  const [crossDockSuggest, setCrossDockSuggest] = useState(null);

  const scanInputRef = useRef(null);

  useEffect(() => {
    if (inboundDrafts.length > 0 && !activeDraft) {
      setActiveDraft(JSON.parse(JSON.stringify(inboundDrafts[0])));
    }
  }, [inboundDrafts, activeDraft]);

  useEffect(() => {
    if (scanInputRef.current) scanInputRef.current.focus();
  }, [activeDraft, awaitingLotCapture, isHandheldMode]);

  const handleScan = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!scanInput) return;
      const barcode = scanInput.trim().toUpperCase();
      const masterItem = items.find(i => i.erpItemCode === barcode || i.barcodes?.includes(barcode));
      
      if (!masterItem) {
          toast.error("Mã không xác định!");
          setScanInput("");
          return;
      }

      const lineIndex = activeDraft.lines.findIndex(l => l.itemCode === masterItem.erpItemCode);
      if (lineIndex === -1) {
          toast.warning("Hàng không có trong PO!");
          setScanInput("");
          return;
      }

      // Check for Cross-docking Opportunity (VIP Logic)
      // If we receive RM-001 and there's a SO needing RM-001
      const matchingSO = shipments.find(s => s.status === 'Ready for Dispatch'); 
      if (masterItem.erpItemCode === 'RM-001' && matchingSO) {
          setCrossDockSuggest({
              item: masterItem.erpItemCode,
              so: "SO-2026-001",
              qty: 10
          });
          toast.info("PHÁT HIỆN CƠ HỘI CROSS-DOCKING!", { position: "top-center", autoClose: false, toastId: 'cd-toast' });
      }

      if (masterItem.isLotControlled && !activeDraft.lines[lineIndex].lotNo && !awaitingLotCapture) {
          setAwaitingLotCapture({ ...activeDraft.lines[lineIndex], masterItem });
          setScanInput("");
          return;
      }

      processIncrement(lineIndex);
      setScanInput("");
    }
  };

  const processIncrement = (index, capturedLotData = null) => {
      const newLines = [...activeDraft.lines];
      const line = newLines[index];
      line.receivedQty += 1;
      line.acceptedQty += 1;
      if (capturedLotData) {
          line.lotNo = capturedLotData.lot;
          line.expiryDate = capturedLotData.expiry;
      }
      line.status = line.receivedQty >= line.expectedQty ? "Completed" : "Partial";
      setActiveDraft({ ...activeDraft, lines: newLines });
      setLastScannedItem(line);
      setScanHistory(prev => [{ time: new Date().toLocaleTimeString(), msg: `Quét ${line.itemCode}`, type: 'success' }, ...prev].slice(0, 10));
  };

  const handleCaptureLot = () => {
      if (!lotInput.lot) return toast.error("Nhập Lô!");
      processIncrement(activeDraft.lines.findIndex(l => l.lineId === awaitingLotCapture.lineId), lotInput);
      setAwaitingLotCapture(null);
      setLotInput({ lot: "", expiry: "" });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      submitInboundDraft(activeDraft.draftId);
      setIsSubmitting(false);
      setActiveDraft(null);
      toast.success("Nộp phiếu thành công!");
    }, 1500);
  };

  const totalExpected = activeDraft?.lines?.reduce((acc, line) => acc + (line.expectedQty || 0), 0) || 0;
  const totalReceived = activeDraft?.lines?.reduce((acc, line) => acc + (line.receivedQty || 0), 0) || 0;
  const completionRate = totalExpected > 0 ? Math.round((totalReceived / totalExpected) * 100) : 0;

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      {/* 1. Cross-docking Alert (Top Banner) */}
      {crossDockSuggest && (
          <div className="col-12">
              <div className="card border-0 bg-warning-focus p-16 radius-12 d-flex flex-row align-items-center justify-content-between shadow-sm border-start border-4 border-warning-main">
                  <div className="d-flex align-items-center gap-3">
                      <div className="w-48-px h-48-px bg-warning-main text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0 animate__animated animate__pulse animate__infinite">
                          <Icon icon="solar:forward-bold" />
                      </div>
                      <div>
                          <h6 className="mb-0 text-warning-main fw-bold">GỢI Ý CROSS-DOCKING (XUẤT THẲNG)</h6>
                          <p className="text-sm text-secondary mb-0">Sản phẩm <span className="fw-bold">{crossDockSuggest.item}</span> đang có đơn xuất <span className="fw-bold">{crossDockSuggest.so}</span> chờ sẵn. Chuyển thẳng ra Cửa Xuất để tối ưu!</p>
                      </div>
                  </div>
                  <div className="d-flex gap-2">
                      <button className="btn btn-warning-main btn-sm radius-8 fw-bold" onClick={() => { setCrossDockSuggest(null); toast.dismiss('cd-toast'); toast.success("Đã ghi nhận lệnh Cross-dock!"); }}>XÁC NHẬN XUẤT THẲNG</button>
                      <button className="btn btn-outline-secondary btn-sm radius-8" onClick={() => setCrossDockSuggest(null)}>BỎ QUA</button>
                  </div>
              </div>
          </div>
      )}

      {activeDraft && !isHandheldMode && (
          <>
            <div className="col-lg-9">
                <div className="card border-0 shadow-sm radius-16 bg-base overflow-hidden">
                    <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3 p-24 border-bottom-0">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-56-px h-56-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center shadow-primary"><Icon icon="solar:scanner-bold" className="h3 mb-0" /></div>
                            <div><h5 className='mb-0 fw-bold'>Phiếu Draft: {activeDraft.draftId}</h5><span className="badge bg-primary-light text-primary-600 px-12 py-4">CHUYẾN: {activeDraft.masterReceiptId}</span></div>
                        </div>
                        <div className="input-group w-auto shadow-sm radius-12 overflow-hidden border">
                            <input ref={scanInputRef} type="text" className="form-control border-0 ps-24 fw-bold" placeholder="QUÉT MÃ RM-001..." value={scanInput} onChange={(e) => setScanInput(e.target.value)} onKeyDown={handleScan} style={{width: '300px'}} />
                            <button className="btn btn-primary-600 px-24" onClick={handleScan}>QUÉT</button>
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
                                        <th>Tiến độ</th>
                                        <th className="pe-24 text-end">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeDraft.lines.map((line, idx) => (
                                        <tr key={idx} className="hover-bg-primary-50">
                                            <td className="ps-24 py-20">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="w-40-px h-40-px bg-white border rounded-8 d-flex justify-content-center align-items-center text-primary-600 shadow-sm"><Icon icon="solar:box-minimalistic-bold" /></div>
                                                    <div><span className="fw-bold text-dark d-block">{line.itemCode}</span><small className="text-secondary text-xs">Lô: {line.lotNo || "Chờ quét..."}</small></div>
                                                </div>
                                            </td>
                                            <td className="text-center fw-bold">{line.expectedQty}</td>
                                            <td className="text-center"><h5 className="mb-0 fw-black text-primary-600">{line.receivedQty}</h5></td>
                                            <td style={{minWidth: '120px'}}><div className="progress overflow-hidden" style={{height: '6px', width: '100px'}}><div className="progress-bar bg-primary-600" style={{width: `${(line.receivedQty/line.expectedQty)*100}%`}}></div></div></td>
                                            <td className="pe-24 text-end"><span className={`badge ${line.status === 'Completed' ? 'bg-success-main' : 'bg-warning-main'} px-12 py-6`}>{line.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-footer bg-base border-top p-24 text-end">
                        <button className="btn btn-primary-600 px-40 radius-12 fw-bold" onClick={handleSubmit} disabled={isSubmitting}>XÁC NHẬN & NỘP PHIẾU</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="card border-0 shadow-sm h-100 radius-16 bg-dark text-white p-20 overflow-hidden">
                    <h6 className="text-xs fw-bold mb-16 opacity-50 uppercase letter-spacing-1">Nhật ký quét thực tế</h6>
                    <div className="scan-log d-flex flex-column gap-12">
                        {scanHistory.map((h, i) => (<div key={i} className="p-12 rounded-8 bg-white bg-opacity-10 animate__animated animate__fadeInLeft">
                            <div className="d-flex justify-content-between mb-4"><span className="text-xs fw-bold text-success-main">{h.msg}</span><small className="opacity-50">{h.time}</small></div>
                            <div className="progress bg-white bg-opacity-10" style={{height: '2px'}}><div className="progress-bar bg-success-main" style={{width: '100%'}}></div></div>
                        </div>))}
                    </div>
                </div>
            </div>
          </>
      )}

      {/* Lot Capture Modal */}
      {awaitingLotCapture && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content radius-24 p-32 border-0 animate__animated animate__backInDown shadow-lg">
                      <div className="text-center mb-24">
                          <div className="w-64-px h-64-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center mx-auto mb-16 h2"><Icon icon="solar:tag-bold" /></div>
                          <h4 className="fw-black text-dark mb-0 text-uppercase">THU THẬP DỮ LIỆU LÔ</h4>
                          <p className="text-secondary fw-medium">Sản phẩm: <span className="text-primary-600 fw-bold">{awaitingLotCapture.itemCode}</span></p>
                      </div>
                      <div className="row gy-3">
                          <div className="col-12"><label className="form-label text-xs fw-bold text-secondary uppercase">Số Lô (Lot No)</label><input type="text" className="form-control form-control-lg radius-12 fw-bold" placeholder="QUÉT HOẶC NHẬP..." autoFocus value={lotInput.lot} onChange={(e) => setLotInput({...lotInput, lot: e.target.value.toUpperCase()})} /></div>
                          <div className="col-12"><label className="form-label text-xs fw-bold text-secondary uppercase">Ngày hết hạn</label><input type="date" className="form-control form-control-lg radius-12 fw-bold" value={lotInput.expiry} onChange={(e) => setLotInput({...lotInput, expiry: e.target.value})} /></div>
                      </div>
                      <button className="btn btn-primary-600 w-100 py-16 radius-16 fw-bold h5 mt-32" onClick={handleCaptureLot}>XÁC NHẬN THÔNG TIN</button>
                  </div>
              </div>
          </div>
      )}

      {!activeDraft && (
          <div className="col-12 text-center p-40 card border-0 shadow-sm radius-24 bg-base animate__animated animate__fadeIn">
              <Icon icon="solar:document-add-bold" className="display-1 text-primary-600 opacity-25 mb-24" />
              <h4 className="fw-bold">Hệ thống đang trống</h4>
              <button className="btn btn-primary-600 px-40 py-16 radius-12 mt-24 fw-bold shadow-primary hvr-grow" data-bs-toggle="modal" data-bs-target="#createDraftModal">KHỞI TẠO CHUYẾN HÀNG</button>
          </div>
      )}

      {/* Modal Create Draft (Simplified) */}
      <div className="modal fade" id="createDraftModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content radius-24 border-0 shadow-lg">
                  <div className="modal-header py-20 px-32 border-bottom bg-primary-600 text-white"><h5 className="modal-title fw-bold">Khởi Tạo Phiếu Nhận Hàng Động</h5><button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
                  <div className="modal-body p-32 text-center">
                      <Icon icon="solar:delivery-bold" className="display-1 text-primary-600 opacity-25 mb-24" />
                      <h4 className="fw-bold text-dark">Bạn có muốn bắt đầu nhận hàng?</h4>
                      <p className="text-secondary fw-medium">Hệ thống sẽ gom toàn bộ PO đang mở để đối soát tự động khi quét.</p>
                  </div>
                  <div className="modal-footer bg-light p-24 radius-b-24 border-0">
                      <button type="button" className="btn btn-outline-secondary px-32 radius-12" data-bs-dismiss="modal">HỦY BỎ</button>
                      <button type="button" className="btn btn-primary-600 px-40 radius-12 fw-bold shadow-primary" data-bs-dismiss="modal" onClick={() => { 
                          if (inboundDrafts && inboundDrafts.length > 0) {
                              setActiveDraft(JSON.parse(JSON.stringify(inboundDrafts[0]))); 
                              toast.success("Đã khởi tạo thành công."); 
                          } else {
                              toast.error("Không có bản nháp nào khả dụng!");
                          }
                      }}>BẮT ĐẦU NGAY</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default InboundDraftLayer;
