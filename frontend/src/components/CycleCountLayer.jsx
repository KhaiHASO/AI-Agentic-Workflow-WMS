import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const CycleCountLayer = () => {
  const { cycleCounts, approveCycleCount, startCycleCount, submitCountLine, items, locations } = useWMS();
  const [viewMode, setViewMode] = useState("manager"); // manager | scanner
  
  // Exception states
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [approvalData, setApprovalData] = useState({ reasonCode: "Sai số khi đếm", note: "" });

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
      setTimeout(() => toast.success(`Đã khởi tạo phiên ${id}. Bắt đầu quét vị trí!`), 0);
  };

  const handleOpenApproval = (session) => {
      setSelectedSession(session);
      setShowApprovalModal(true);
  };

  const handleApproveFinal = () => {
      setTimeout(() => toast.info(`Đang phê duyệt và ghi sổ chênh lệch cho ${selectedSession.sessionId}...`), 0);
      setTimeout(() => {
          approveCycleCount(selectedSession.sessionId);
          setTimeout(() => toast.success(`Đã phê duyệt thành công. Ledger Adjustment đã được đẩy về ERP FAST.`), 0);
          setShowApprovalModal(false);
      }, 1500);
  };

  const handleScannerSubmit = (e) => {
    if (e.key !== 'Enter') return;
    const val = scanInput.trim().toUpperCase();
    if (!val) return;

    if (countStep === "location") {
        const loc = locations.find(l => l.locationCode === val);
        if (!loc) return setTimeout(() => toast.error("Vị trí không tồn tại!"), 0);
        setCurrentLine({ ...currentLine, locationCode: val });
        setCountStep("item");
        setScanInput("");
    } else if (countStep === "item") {
        const item = items.find(i => i.erpItemCode === val || i.barcodes?.includes(val));
        if (!item) return setTimeout(() => toast.error("Sản phẩm không xác định!"), 0);
        setCurrentLine({ ...currentLine, itemCode: item.erpItemCode });
        setCountStep("qty");
        setScanInput("");
    } else if (countStep === "qty") {
        const qty = Number(val);
        if (isNaN(qty)) return setTimeout(() => toast.error("Số lượng phải là số!"), 0);

        submitCountLine(activeSessionId, { ...currentLine, countedQty: qty });
        setTimeout(() => toast.success(`Đã ghi nhận ${qty} ${currentLine.itemCode} tại ${currentLine.locationCode}`), 0);
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
                        <div><h5 className="mb-0">Scanner Mode: {activeSessionId}</h5><small className="opacity-50 text-uppercase letter-spacing-1">Đang kiểm Zone: {activeSession?.zone || "Toàn kho"}</small></div>
                      </div>
                      <button className="btn btn-outline-light btn-sm radius-12" onClick={() => setViewMode("manager")}>TẠM DỪNG / THOÁT</button>
                  </div>

                  <div className="text-center py-48 bg-white bg-opacity-10 radius-24 border border-white border-opacity-10 mb-24 shadow-inner">
                      {countStep === "location" && <><Icon icon="solar:map-point-bold" className="display-4 text-primary-600 mb-16" /><h4>QUÉT VỊ TRÍ</h4><p className="opacity-50">Vui lòng quét nhãn vị trí trên giá kệ</p></>}
                      {countStep === "item" && <><Icon icon="solar:box-bold" className="display-4 text-warning-main mb-16" /><h4>QUÉT SẢN PHẨM</h4><p className="opacity-50">Vị trí hiện tại: <span className="text-primary-600 fw-bold">{currentLine.locationCode}</span></p></>}
                      {countStep === "qty" && <><Icon icon="solar:clapperboard-edit-bold" className="display-4 text-success-main mb-16" /><h4>NHẬP SỐ LƯỢNG</h4><p className="opacity-50">Đang kiểm SKU: <span className="text-warning-main fw-bold">{currentLine.itemCode}</span></p></>}
                      
                      <input 
                        ref={scanInputRef}
                        type="text" 
                        className="form-control form-control-lg bg-transparent border-0 text-white text-center h1 fw-black py-20" 
                        placeholder="----"
                        value={scanInput}
                        onChange={(e) => setScanInput(e.target.value)}
                        onKeyDown={handleScannerSubmit}
                        autoFocus
                      />
                  </div>

                  <div className="scan-history">
                      <h6 className="text-xs fw-bold opacity-50 mb-12 text-uppercase">Gần đây trong phiên</h6>
                      <div className="d-flex flex-column gap-2">
                        {activeSession?.lines?.slice(-3).reverse().map((l, i) => (
                            <div key={i} className="p-16 bg-white bg-opacity-5 radius-16 d-flex justify-content-between align-items-center border border-white border-opacity-5">
                                <div className="d-flex align-items-center gap-3">
                                    <Icon icon="solar:check-circle-bold" className="text-success-main" />
                                    <div><span className="fw-bold d-block">{l.itemCode}</span><small className="text-primary-600 fw-bold">{l.locationCode}</small></div>
                                </div>
                                <div className="fw-black h5 mb-0 text-primary-600">{l.countedQty}</div>
                            </div>
                        ))}
                      </div>
                  </div>

                  <button className="btn btn-primary-600 w-100 py-16 radius-16 mt-32 fw-bold shadow-primary h5" onClick={() => { setViewMode("manager"); setTimeout(() => toast.info("Đã nộp phiên kiểm kê. Chuyển sang chế độ Quản lý để phê duyệt."), 0); }}>
                      NỘP PHIẾU ĐỢT (FINISH SESSION)
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
                    <div className="card p-24 border-0 shadow-sm bg-base h-100 radius-16 border-start border-4 border-warning-main">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-48-px h-48-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                                <Icon icon="solar:shield-warning-bold" />
                            </div>
                            <div>
                                <h6 className="mb-0 text-secondary-light fw-bold uppercase text-xs">Chờ phê duyệt</h6>
                                <h4 className="mb-0 fw-bold">{cycleCounts.filter(s => s.status === 'Pending Review').length}</h4>
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
                                <h6 className="mb-0 text-secondary-light fw-bold uppercase text-xs">Đã hoàn tất (Posted)</h6>
                                <h4 className="mb-0 fw-bold">{cycleCounts.filter(s => s.status === 'Posted').length}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-sm-6">
                    <button className="btn btn-primary-600 w-100 h-100 radius-16 d-flex flex-column justify-content-center align-items-center gap-2 py-20 shadow-primary" onClick={() => handleCreateSession("ZONE-A")}>
                        <Icon icon="solar:scanner-bold" className="display-4" />
                        <span className="fw-bold uppercase text-sm">BẮT ĐẦU PHIÊN QUÉT MỚI</span>
                    </button>
                </div>
            </div>
        </div>

        <div className='col-lg-12'>
            <div className='card border-0 shadow-sm radius-16 overflow-hidden'>
                <div className='card-header d-flex justify-content-between align-items-center bg-base py-24 px-32 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold uppercase'>PHÊ DUYỆT CHÊNH LỆCH KIỂM KÊ (VARIANCE APPROVAL)</h5>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary btn-sm radius-8 px-16" onClick={() => setTimeout(() => toast.info("Đang in báo cáo chênh lệch..."), 0)}>
                            <Icon icon="solar:printer-bold" className="me-2" /> In Báo Cáo
                        </button>
                    </div>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                        <table className='table mb-0 align-middle'>
                            <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                                <tr>
                                    <th className="ps-32">Mã Phiên / Vị trí</th>
                                    <th>Sản phẩm / Lô</th>
                                    <th className="text-center">Tồn hệ thống</th>
                                    <th className="text-center">Kiểm thực tế</th>
                                    <th className="text-center">Chênh lệch (Variance)</th>
                                    <th className="text-center">Trạng thái</th>
                                    <th className="pe-32 text-end">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cycleCounts.map((session) => (
                                    session.lines.map((line, idx) => (
                                        <tr key={`${session.sessionId}-${idx}`} className={`hover-bg-primary-50 ${line.variance !== 0 ? 'bg-warning-focus' : ''}`}>
                                            <td className="ps-32 py-24">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="w-40-px h-40-px bg-dark text-white rounded d-flex justify-content-center align-items-center fw-black text-xs">{session.sessionId.slice(-3)}</div>
                                                    <div>
                                                        <span className="fw-bold text-dark d-block">{session.sessionId}</span>
                                                        <small className="text-primary-600 fw-black uppercase text-xxs">{line.locationCode}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="fw-bold text-dark">{line.itemCode}</div>
                                                <small className="text-secondary text-xs">Lô: {line.lotNo || "N/A"}</small>
                                            </td>
                                            <td className="text-center fw-bold">{line.systemQty}</td>
                                            <td className="text-center"><h5 className="mb-0 fw-black text-primary-600">{line.countedQty}</h5></td>
                                            <td className="text-center">
                                                <span className={`badge ${line.variance === 0 ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'} px-16 py-8 radius-8 h6 mb-0`}>
                                                    {line.variance > 0 ? `+${line.variance}` : line.variance}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className={`px-12 py-6 rounded-pill fw-bold text-xxs text-uppercase ${session.status === 'Posted' ? 'bg-success-focus text-success-main' : 'bg-warning-focus text-warning-main'}`}>
                                                    {session.status}
                                                </span>
                                            </td>
                                            <td className="pe-32 text-end">
                                                {session.status === 'Pending Review' && line.variance !== 0 ? (
                                                    <button className='btn btn-warning-main btn-sm radius-8 fw-bold px-20' onClick={() => handleOpenApproval(session)}>
                                                        XEM XÉT & PHÊ DUYỆT
                                                    </button>
                                                ) : (
                                                    session.status === 'Posted' ? <Icon icon="solar:check-read-bold" className="text-success-main h4 mb-0" /> : <small className="text-secondary italic">Đang chờ quét...</small>
                                                )}
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

        {/* Approval Modal */}
        {showApprovalModal && (
            <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content radius-24 p-32 border-0 shadow-lg">
                        <div className="text-center mb-24">
                            <div className="w-64-px h-64-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center mx-auto mb-16 h2"><Icon icon="solar:shield-warning-bold" /></div>
                            <h4 className="fw-black text-dark text-uppercase">PHÊ DUYỆT CHÊNH LỆCH</h4>
                            <p className="text-secondary">Phiên kiểm: <span className="fw-bold">{selectedSession.sessionId}</span>. Xác nhận điều chỉnh tồn kho theo số liệu thực tế.</p>
                        </div>
                        <div className="row gy-3">
                            <div className="col-12">
                                <label className="form-label text-xs fw-bold uppercase">Lý do điều chỉnh (Reason Code)</label>
                                <select className="form-select form-select-lg radius-12" value={approvalData.reasonCode} onChange={(e) => setApprovalData({...approvalData, reasonCode: e.target.value})}>
                                    <option value="Sai số khi đếm">Sai số khi đếm (Worker Error)</option>
                                    <option value="Hàng hỏng chưa báo">Hàng hỏng chưa báo (Unreported Damage)</option>
                                    <option value="Lỗi hệ thống đồng bộ">Lỗi đồng bộ ERP (Sync Issue)</option>
                                    <option value="Khác">Lý do khác</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label text-xs fw-bold uppercase">Ghi chú nội bộ</label>
                                <textarea className="form-control radius-12" rows="2" placeholder="Nhập chi tiết giải trình..." value={approvalData.note} onChange={(e) => setApprovalData({...approvalData, note: e.target.value})}></textarea>
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-32">
                            <button className="btn btn-outline-secondary w-100 radius-12 py-12" onClick={() => setShowApprovalModal(false)}>HỦY BỎ</button>
                            <button className="btn btn-success-600 w-100 radius-12 py-12 fw-bold" onClick={handleApproveFinal}>PHÊ DUYỆT & GHI SỔ</button>
                        </div>
                        <div className="mt-24 p-12 bg-danger-focus radius-12">
                            <small className="text-danger-main fw-bold">CHÚ Ý: Hành động này sẽ tự động cập nhật số tồn kho trên ERP FAST và ghi nhận Ledger Adjustment.</small>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </>
  );

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
        {viewMode === "manager" ? renderManager() : renderScanner()}
    </div>
  );
};

export default CycleCountLayer;
