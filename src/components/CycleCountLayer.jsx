import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const CycleCountLayer = () => {
  const { cycleCounts, approveCycleCount, startCycleCount, submitCountLine, items, locations } = useWMS();
  const [viewMode, setViewMode] = useState("manager"); // manager | scanner
  
  // Scanner Flow State
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [countStep, setCountStep] = useState("location"); // location | item | qty
  const [currentLine, setCurrentLine] = useState({ locationCode: "", itemCode: "", lotNo: "", countedQty: 0 });
  const [scanInput, setScanInput] = useState("");
  
  const scanInputRef = useRef(null);

  useEffect(() => {
    if (viewMode === "scanner" && scanInputRef.current) {
        scanInputRef.current.focus();
    }
  }, [viewMode, countStep, activeSessionId]);

  const handleCreateSession = (zone) => {
      const id = startCycleCount(zone);
      setActiveSessionId(id);
      setViewMode("scanner");
      setCountStep("location");
      toast.success(`Đã khởi tạo phiên ${id}. Bắt đầu quét vị trí!`);
  };

  const handleApprove = (sessionId) => {
      toast.info(`Đang duyệt phiên ${sessionId}...`);
      setTimeout(() => {
          approveCycleCount(sessionId);
          toast.success(`Đã hoàn tất kiểm kê phiên ${sessionId}.`);
      }, 1000);
  };

  const handleScannerSubmit = (e) => {
    if (e.key !== 'Enter') return;
    const val = scanInput.trim().toUpperCase();
    if (!val) return;

    if (countStep === "location") {
        const loc = locations.find(l => l.locationCode === val);
        if (!loc) return toast.error("Vị trí không tồn tại!");
        setCurrentLine({ ...currentLine, locationCode: val });
        setCountStep("item");
        setScanInput("");
    } else if (countStep === "item") {
        const item = items.find(i => i.erpItemCode === val || i.barcodes?.includes(val));
        if (!item) return toast.error("Sản phẩm không xác định!");
        setCurrentLine({ ...currentLine, itemCode: item.erpItemCode });
        setCountStep("qty");
        setScanInput("");
    } else if (countStep === "qty") {
        const qty = Number(val);
        if (isNaN(qty)) return toast.error("Số lượng phải là số!");
        
        submitCountLine(activeSessionId, { ...currentLine, countedQty: qty });
        toast.success(`Đã ghi nhận ${qty} ${currentLine.itemCode} tại ${currentLine.locationCode}`);
        
        // Reset for next item in same location or next location? 
        // Business rule: stay in location until worker scans another location
        setCountStep("item"); 
        setScanInput("");
        setCurrentLine({ ...currentLine, itemCode: "", lotNo: "", countedQty: 0 });
    }
  };

  const renderScanner = () => {
      const activeSession = cycleCounts.find(s => s.sessionId === activeSessionId);
      return (
          <div className="col-12 animate__animated animate__fadeIn">
              <div className="card border-0 shadow-lg radius-24 bg-dark text-white p-24">
                  <div className="d-flex justify-content-between align-items-center mb-24">
                      <div className="d-flex align-items-center gap-3">
                        <div className="w-48-px h-48-px bg-primary-600 rounded-circle d-flex justify-content-center align-items-center"><Icon icon="solar:scanner-bold" className="h4 mb-0" /></div>
                        <div><h5 className="mb-0">Scanner: {activeSessionId}</h5><small className="opacity-50">Khu vực: {activeSession?.zone || "Toàn kho"}</small></div>
                      </div>
                      <button className="btn btn-outline-light btn-sm radius-12" onClick={() => setViewMode("manager")}>THOÁT</button>
                  </div>

                  <div className="text-center py-40 bg-white bg-opacity-10 radius-24 border border-white border-opacity-10 mb-24">
                      {countStep === "location" && <><Icon icon="solar:map-point-bold" className="display-4 text-primary-600 mb-16" /><h4>QUÉT VỊ TRÍ</h4><p className="opacity-50">Vui lòng quét nhãn vị trí trên giá kệ</p></>}
                      {countStep === "item" && <><Icon icon="solar:box-bold" className="display-4 text-warning-main mb-16" /><h4>QUÉT SẢN PHẨM</h4><p className="opacity-50">Vị trí hiện tại: <span className="text-primary-600 fw-bold">{currentLine.locationCode}</span></p></>}
                      {countStep === "qty" && <><Icon icon="solar:clapperboard-edit-bold" className="display-4 text-success-main mb-16" /><h4>NHẬP SỐ LƯỢNG</h4><p className="opacity-50">Đang kiểm SKU: <span className="text-warning-main fw-bold">{currentLine.itemCode}</span></p></>}
                      
                      <input 
                        ref={scanInputRef}
                        type="text" 
                        className="form-control form-control-lg bg-transparent border-0 text-white text-center h2 fw-black" 
                        placeholder="----"
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        onKeyDown={handleScannerSubmit}
                        autoFocus
                      />
                  </div>

                  <div className="scan-history">
                      <h6 className="text-xs fw-bold opacity-50 mb-12">LỊCH SỬ KIỂM TRONG PHIÊN</h6>
                      <div className="d-flex flex-column gap-2">
                        {activeSession?.lines?.slice(-3).reverse().map((l, i) => (
                            <div key={i} className="p-12 bg-white bg-opacity-5 radius-12 d-flex justify-content-between align-items-center">
                                <div><span className="fw-bold">{l.itemCode}</span> tại <small className="text-primary-600">{l.locationCode}</small></div>
                                <div className="fw-black h6 mb-0">{l.countedQty}</div>
                            </div>
                        ))}
                      </div>
                  </div>

                  <button className="btn btn-primary-600 w-100 py-16 radius-16 mt-32 fw-bold" onClick={() => { setViewMode("manager"); toast.success("Đã nộp phiên kiểm kê chờ duyệt."); }}>
                      HOÀN TẤT & NỘP PHIẾU
                  </button>
              </div>
          </div>
      );
  };

  const renderManager = () => (
      <>
        <div className="col-lg-12">
            <div className="row gy-4">
                <div className="col-xxl-3 col-sm-6">
                    <div className="card p-24 border-0 shadow-sm bg-base h-100 radius-16">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-48-px h-48-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                                <Icon icon="solar:history-bold" />
                            </div>
                            <div>
                                <h6 className="mb-0 text-secondary-light">Đang thực hiện</h6>
                                <h4 className="mb-0 fw-bold">{cycleCounts.filter(s => s.status === 'Counting' || s.status === 'Pending Review').length}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                    <div className="card p-24 border-0 shadow-sm bg-base h-100 radius-16">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-48-px h-48-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                                <Icon icon="solar:check-circle-bold" />
                            </div>
                            <div>
                                <h6 className="mb-0 text-secondary-light">Đã hoàn tất</h6>
                                <h4 className="mb-0 fw-bold">{cycleCounts.filter(s => s.status === 'Posted').length}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                    <div className="card p-24 border-0 shadow-sm bg-danger-focus text-danger-main h-100 radius-16">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-48-px h-48-px bg-danger-main text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                                <Icon icon="solar:shield-warning-bold" />
                            </div>
                            <div>
                                <h6 className="mb-0 opacity-75">Tỷ lệ chính xác</h6>
                                <h4 className="mb-0 fw-bold text-white">96.5%</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                    <button className="btn btn-primary-600 w-100 h-100 radius-16 d-flex flex-column justify-content-center align-items-center gap-2 py-20 shadow-primary" onClick={() => handleCreateSession("ZONE-A")}>
                        <Icon icon="solar:add-circle-bold" className="display-4" />
                        <span className="fw-bold">TẠO PHIÊN KIỂM MỚI</span>
                    </button>
                </div>
            </div>
        </div>

        <div className='col-lg-12'>
            <div className='card border-0 shadow-sm radius-16 overflow-hidden'>
                <div className='card-header d-flex justify-content-between align-items-center bg-base py-24 px-32 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Lịch Sử & Phê Duyệt Kiểm Kê</h5>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary btn-sm radius-8 px-16" onClick={() => setViewMode("scanner")} disabled={!activeSessionId}>
                            <Icon icon="solar:scanner-bold" className="me-2" /> Quay lại Scanner
                        </button>
                    </div>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                        <table className='table mb-0 align-middle'>
                            <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                                <tr>
                                    <th className="ps-32">Mã Phiên / Zone</th>
                                    <th>Chi tiết kiểm</th>
                                    <th className="text-center">Hệ thống</th>
                                    <th className="text-center">Thực tế</th>
                                    <th className="text-center">Chênh lệch</th>
                                    <th>Trạng thái</th>
                                    <th className="pe-32 text-end">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cycleCounts.map((session) => (
                                    session.lines.length === 0 ? (
                                        <tr key={session.sessionId} className="border-bottom">
                                            <td className="ps-32 py-20 fw-bold">{session.sessionId} / {session.zone || "All"}</td>
                                            <td colSpan="5" className="text-secondary italic">Chưa có dữ liệu kiểm từ scanner...</td>
                                            <td className="pe-32 text-end"><span className="badge bg-warning-focus text-warning-main">Counting</span></td>
                                        </tr>
                                    ) : session.lines.map((line, idx) => (
                                        <tr key={`${session.sessionId}-${idx}`} className="hover-bg-primary-50">
                                            <td className="ps-32 py-20">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="w-32-px h-32-px bg-primary-light text-primary-600 rounded d-flex justify-content-center align-items-center fw-bold text-xs">{session.sessionId.slice(-3)}</div>
                                                    <div>
                                                        <span className="fw-bold text-dark">{session.sessionId}</span>
                                                        <small className="d-block text-secondary">Vị trí: <span className="text-primary-600 fw-bold">{line.locationCode}</span></small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="fw-bold text-dark">{line.itemCode}</div>
                                                <small className="text-secondary">Lô: {line.lotNo || "N/A"}</small>
                                            </td>
                                            <td className="text-center fw-bold">{line.systemQty}</td>
                                            <td className="text-center"><h6 className="mb-0 fw-black text-primary-600">{line.countedQty}</h6></td>
                                            <td className="text-center">
                                                <span className={`badge ${line.variance === 0 ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'} px-12 py-6 radius-8`}>
                                                    {line.variance > 0 ? `+${line.variance}` : line.variance}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${session.status === 'Posted' ? 'bg-success-main' : 'bg-warning-main'} px-12 py-6`}>
                                                    {session.status}
                                                </span>
                                            </td>
                                            <td className="pe-32 text-end">
                                                {session.status === 'Pending Review' || session.status === 'Counting' ? (
                                                    <button className='btn btn-success-600 btn-sm radius-8 fw-bold' onClick={() => handleApprove(session.sessionId)}>
                                                        XÁC NHẬN PHIẾU
                                                    </button>
                                                ) : <Icon icon="solar:check-circle-bold" className="text-success-main h4 mb-0" />}
                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </>
  );

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
        {viewMode === "manager" ? renderManager() : renderScanner()}
    </div>
  );
};

export default CycleCountLayer;
