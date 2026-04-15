import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const PutawayTaskLayer = () => {
  const { putawayTasks, confirmPutaway, suggestLocations } = useWMS();
  const [scanLocation, setScanLocation] = useState("");
  const [processingId, setProcessingId] = useState(null);
  
  // Suggestion State
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [suggestedLocs, setSuggestedLocs] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);

  const scanInputRef = useRef(null);

  useEffect(() => {
    if (scanInputRef.current) scanInputRef.current.focus();
  }, [processingId, showSuggestModal]);

  const handleOpenSuggest = (task) => {
      setActiveTask(task);
      const suggestions = suggestLocations(task.itemCode);
      setSuggestedLocs(suggestions);
      setShowSuggestModal(true);
  };

  const handleSelectLoc = (loc) => {
      setSelectedDest(loc.locationCode);
      setShowSuggestModal(false);
      toast.info(`Đã đổi vị trí đích sang ${loc.locationCode}`);
  };

  const handleScanLocation = (taskId, targetLocation) => {
    const finalTarget = selectedDest || targetLocation;
    
    if (!scanLocation) {
        toast.warning("Vui lòng quét mã vị trí đích!");
        return;
    }

    if (scanLocation.trim().toUpperCase() !== finalTarget.toUpperCase()) {
        toast.error(`Sai vị trí! Đích là ${finalTarget}, bạn quét ${scanLocation}`);
        return;
    }

    setProcessingId(taskId);
    setTimeout(() => {
      confirmPutaway(taskId, finalTarget);
      setProcessingId(null);
      setScanLocation("");
      setSelectedDest(null);
      toast.success("Cất hàng hoàn tất!");
    }, 1200);
  };

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16 overflow-hidden'>
          <div className='card-header d-flex flex-wrap justify-content-between align-items-center bg-base py-24 px-32 border-bottom-0'>
            <div className="d-flex align-items-center gap-3">
                <div className="w-48-px h-48-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center shadow-primary">
                    <Icon icon="solar:transfer-vertical-bold" className="h4 mb-0" />
                </div>
                <div>
                    <h5 className='card-title mb-0 fw-bold'>Nhiệm Vụ Cất Hàng (Putaway)</h5>
                    <p className="text-secondary text-sm mb-0">Hệ thống đang gợi ý vị trí tối ưu dựa trên loại hàng.</p>
                </div>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                  <tr>
                    <th className="ps-32">Nhiệm vụ / Pallet</th>
                    <th>Sản phẩm</th>
                    <th className="text-center">Số lượng</th>
                    <th>Vị trí đích (Target)</th>
                    <th className="pe-32 text-center" style={{width: '350px'}}>Xác nhận quét</th>
                  </tr>
                </thead>
                <tbody>
                  {putawayTasks.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-60">
                            <Icon icon="solar:box-minimalistic-bold" className="display-1 text-primary-600 opacity-10 mb-24" />
                            <h5 className="text-secondary fw-bold">Tất cả hàng đã được cất đúng vị trí!</h5>
                        </td>
                    </tr>
                  ) : putawayTasks.map((task) => {
                    const isSelected = activeTask?.taskId === task.taskId;
                    const displayDest = (isSelected && selectedDest) ? selectedDest : task.toLocation;
                    
                    return (
                        <tr key={task.taskId} className="hover-bg-primary-50">
                        <td className="ps-32 py-20">
                            <div className="d-flex align-items-center gap-3">
                                <div className="w-40-px h-40-px bg-white border rounded-8 d-flex justify-content-center align-items-center text-primary-600 shadow-sm"><Icon icon="solar:tag-bold" /></div>
                                <div>
                                    <span className="fw-bold text-dark d-block">#{task.taskId}</span>
                                    <small className="text-secondary">Pallet: <span className="fw-bold text-primary-600">{task.handlingUnitBarcode}</span></small>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="fw-bold text-dark">{task.itemCode}</div>
                            <span className="badge bg-info-light text-info-main px-8 py-2 text-xxs">NGUYÊN VẬT LIỆU</span>
                        </td>
                        <td className="text-center"><h6 className="mb-0 fw-black text-primary-600">{task.qty}</h6></td>
                        <td>
                            <div className="d-flex align-items-center gap-2">
                                <span className={`badge ${selectedDest && isSelected ? 'bg-warning-main' : 'bg-success-main'} px-12 py-8 radius-8 shadow-sm h6 mb-0`}>
                                    <Icon icon="solar:map-point-bold" className="me-1" /> {displayDest}
                                </span>
                                <button className="btn btn-outline-primary btn-xs radius-4 px-8" title="Gợi ý vị trí khác" onClick={() => handleOpenSuggest(task)}>
                                    <Icon icon="solar:magic-stick-bold" />
                                </button>
                            </div>
                        </td>
                        <td className="pe-32 text-center">
                            <div className='d-flex align-items-center justify-content-end gap-2'>
                            <div className={`input-group shadow-sm border rounded-12 overflow-hidden bg-base ${processingId === task.taskId ? 'opacity-50' : ''}`} style={{width: '240px'}}>
                                <span className="input-group-text bg-transparent border-0 pe-0"><Icon icon="solar:scanner-bold" className="text-primary-600" /></span>
                                <input
                                    ref={isSelected ? scanInputRef : null}
                                    type='text'
                                    className='form-control border-0 shadow-none fw-bold'
                                    placeholder='QUÉT VỊ TRÍ...'
                                    value={processingId === task.taskId ? displayDest : (isSelected ? scanLocation : "")}
                                    onChange={(e) => { setActiveTask(task); setScanLocation(e.target.value.toUpperCase()); }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleScanLocation(task.taskId, displayDest)}
                                    disabled={processingId === task.taskId}
                                />
                            </div>
                            <button
                                className={`btn ${processingId === task.taskId ? 'btn-secondary' : 'btn-primary-600'} px-20 radius-12 fw-bold d-flex align-items-center gap-2 shadow-sm`}
                                onClick={() => handleScanLocation(task.taskId, displayDest)}
                                disabled={processingId !== null}
                            >
                                {processingId === task.taskId ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : "XÁC NHẬN"}
                            </button>
                            </div>
                        </td>
                        </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Modal */}
      {showSuggestModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content radius-24 p-24 border-0 animate__animated animate__zoomIn">
                      <div className="modal-header border-0 pb-0">
                          <div className="d-flex align-items-center gap-3">
                              <div className="w-56-px h-56-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center"><Icon icon="solar:magic-stick-bold" className="h3 mb-0" /></div>
                              <div>
                                  <h4 className="fw-black text-dark mb-0">THAY ĐỔI VỊ TRÍ GỢI Ý</h4>
                                  <p className="text-secondary mb-0">Tìm kiếm vị trí trống tối ưu cho <strong>{activeTask?.itemCode}</strong></p>
                              </div>
                          </div>
                          <button type="button" className="btn-close" onClick={() => setShowSuggestModal(false)}></button>
                      </div>
                      <div className="modal-body py-32">
                          <div className="row gy-3">
                              {suggestedLocs.map((loc, idx) => (
                                  <div key={idx} className="col-md-4">
                                      <div 
                                        className="card border h-100 radius-16 hover-border-primary cursor-pointer p-20 transition-all hvr-grow"
                                        onClick={() => handleSelectLoc(loc)}
                                      >
                                          <div className="d-flex justify-content-between align-items-start mb-12">
                                              <span className="badge bg-primary-600 text-white radius-8 px-12 py-6 fw-bold h5 mb-0">{loc.locationCode}</span>
                                              <Icon icon="solar:check-circle-bold" className="text-success-main h4 mb-0 opacity-25" />
                                          </div>
                                          <div className="mt-16">
                                              <div className="text-xxs fw-bold text-secondary text-uppercase mb-4">Sức chứa</div>
                                              <div className="progress overflow-hidden mb-8" style={{height: '6px'}}>
                                                  <div className="progress-bar bg-primary-600" style={{width: '40%'}}></div>
                                              </div>
                                              <div className="d-flex justify-content-between text-xs fw-bold">
                                                  <span>Zone: {loc.zoneCode}</span>
                                                  <span className="text-primary-600">Còn 4 chỗ</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                              {suggestedLocs.length === 0 && <div className="col-12 text-center py-20 text-secondary italic">Không tìm thấy vị trí trống phù hợp nguyên tắc cất hàng.</div>}
                          </div>
                      </div>
                      <div className="modal-footer border-0 pt-0">
                          <button className="btn btn-outline-secondary px-32 radius-12 fw-bold w-100 py-16" onClick={() => setShowSuggestModal(false)}>HỦY BỎ & GIỮ NGUYÊN VỊ TRÍ GỐC</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default PutawayTaskLayer;
