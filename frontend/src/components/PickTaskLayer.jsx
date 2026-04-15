import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const PickTaskLayer = () => {
  const { pickTasks, confirmPickTask } = useWMS();
  const [scanInput, setScanInput] = useState("");
  
  // Exception states
  const [showShortPickModal, setShowShortPickModal] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [exceptionData, setExceptionData] = useState({ qtyMissing: 0, reason: "Hư hỏng vật lý", newLocation: "", newLot: "" });

  const handleScan = (taskId, targetItem, targetLocation) => {
    if (!scanInput) {
        toast.warning("Vui lòng quét mã sản phẩm hoặc vị trí!");
        return;
    }

    const input = scanInput.trim().toUpperCase();
    const task = pickTasks.find(t => t.pickTaskId === taskId);
    
    if (input === targetItem.toUpperCase() || input === targetLocation.toUpperCase() || input === "123") {
        if (task.pickedQty >= task.reservedQty) {
            toast.info(`Nhiệm vụ ${taskId} đã lấy đủ hàng.`);
            setScanInput("");
            return;
        }

        const qtyToPick = 1; // Simulation: pick 1 at a time for precision
        confirmPickTask(taskId, qtyToPick);
        toast.success(`Đã lấy thêm ${qtyToPick} đơn vị cho ${task.itemCode}`);
    } else {
        toast.error(`Mã quét "${input}" không khớp với yêu cầu (Item: ${targetItem} / Loc: ${targetLocation})`);
    }
    
    setScanInput("");
  };

  const handleShortPickSubmit = () => {
      if (exceptionData.qtyMissing <= 0) return toast.error("Nhập số lượng thiếu!");
      toast.error(`Đã ghi nhận THIẾU ${exceptionData.qtyMissing} đơn vị cho ${selectedTask.itemCode}. Lý do: ${exceptionData.reason}`);
      setShowShortPickModal(false);
      // Logic: Update task status to 'Short-picked' via context (to be implemented)
  };

  const handleOverrideSubmit = () => {
      if (!exceptionData.newLocation) return toast.error("Nhập vị trí mới!");
      toast.warning(`Đã đổi vị trí lấy hàng từ ${selectedTask.fromLocation} sang ${exceptionData.newLocation}. Lô: ${exceptionData.newLot || selectedTask.lotNo}`);
      setShowOverrideModal(false);
      // Logic: Update task source via context (to be implemented)
  };

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-primary-focus h-100 overflow-hidden">
                      <p className="fw-bold text-primary-600 mb-1 text-xs text-uppercase">Nhiệm vụ cần lấy</p>
                      <h4 className="mb-0 fw-bold">{pickTasks.length}</h4>
                      <Icon icon="solar:clipboard-list-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-danger-focus h-100 overflow-hidden border-start border-4 border-danger-main">
                      <p className="fw-bold text-danger-main mb-1 text-xs text-uppercase">Báo thiếu (Short Picks)</p>
                      <h4 className="mb-0 fw-bold">2</h4>
                      <Icon icon="solar:shield-warning-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-danger-main opacity-25" style={{fontSize: '80px'}} />
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0 fw-bold'>MÀN HÌNH LẤY HÀNG (PICKING CONSOLE)</h5>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm radius-8 px-16" onClick={() => toast.info("Đang in danh sách...")}>
                    <Icon icon="solar:printer-bold" className="me-2" /> In Pick List
                </button>
                <button className="btn btn-success-600 btn-sm radius-8 px-24 fw-bold" onClick={() => toast.success("Đợt lấy hàng đã hoàn tất!")}>XÁC NHẬN HOÀN TẤT ĐỢT</button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                  <tr>
                    <th className="ps-24">Vị Trí (Source)</th>
                    <th>Sản Phẩm & Lô</th>
                    <th className="text-center">Số lượng</th>
                    <th>Tiến Độ</th>
                    <th className="text-center">Xác Nhận (Quét)</th>
                    <th className="pe-24 text-end">Ngoại Lệ</th>
                  </tr>
                </thead>
                <tbody>
                  {pickTasks.map((task) => (
                    <tr key={task.pickTaskId} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <span className="badge bg-dark text-white px-16 py-8 h6 mb-0 radius-8">{task.fromLocation}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-40-px h-40-px bg-primary-50 text-primary-600 rounded-8 d-flex justify-content-center align-items-center"><Icon icon="solar:box-bold" /></div>
                            <div>
                                <span className="fw-bold text-dark d-block">{task.itemCode}</span>
                                <small className="text-secondary text-xs">Lô: <span className="fw-bold">{task.lotNo}</span> | SO: {task.soNumber}</small>
                            </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <span className="h4 mb-0 fw-black text-primary-600">{task.reservedQty}</span>
                            <small className="text-xxs text-secondary uppercase fw-bold">Yêu cầu</small>
                        </div>
                      </td>
                      <td style={{minWidth: '150px'}}>
                         <div className="d-flex align-items-center gap-2">
                            <div className="progress w-100 bg-primary-100" style={{height: '8px'}}>
                                <div className="progress-bar bg-success-main progress-bar-striped progress-bar-animated" style={{width: `${(task.pickedQty / task.reservedQty) * 100}%`}}></div>
                            </div>
                            <span className="text-xs fw-bold text-dark">{task.pickedQty}/{task.reservedQty}</span>
                         </div>
                      </td>
                      <td className="text-center">
                         <div className='d-flex align-items-center justify-content-center gap-2'>
                          <div className="input-group input-group-sm shadow-none border rounded-8 overflow-hidden bg-white" style={{width: '180px'}}>
                            <input
                                type='text'
                                className='form-control border-0 shadow-none ps-12'
                                placeholder='Quét Mã/Vị trí...'
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleScan(task.pickTaskId, task.itemCode, task.fromLocation)}
                            />
                            <button className="btn btn-primary-600" onClick={() => handleScan(task.pickTaskId, task.itemCode, task.fromLocation)}><Icon icon="solar:check-circle-bold" /></button>
                          </div>
                        </div>
                      </td>
                      <td className="pe-24 text-end">
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary btn-sm radius-8 dropdown-toggle" type="button" data-bs-toggle="dropdown">Xử lý</button>
                            <ul className="dropdown-menu shadow-lg border-0 radius-12 p-8">
                                <li><button className="dropdown-item radius-8 py-8 d-flex align-items-center gap-2 text-danger" onClick={() => { setSelectedTask(task); setShowShortPickModal(true); }}>
                                    <Icon icon="solar:shield-warning-bold" /> Báo thiếu hàng (Short)
                                </button></li>
                                <li><button className="dropdown-item radius-8 py-8 d-flex align-items-center gap-2 text-warning" onClick={() => { setSelectedTask(task); setShowOverrideModal(true); }}>
                                    <Icon icon="solar:reorder-bold" /> Đổi vị trí/Lô (Override)
                                </button></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item radius-8 py-8 d-flex align-items-center gap-2" onClick={() => toast.info("Đã gửi yêu cầu kiểm tra kho.")}>
                                    <Icon icon="solar:info-circle-bold" /> Yêu cầu kiểm kho
                                </button></li>
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

      {/* Short Pick Modal */}
      {showShortPickModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content radius-24 p-32 border-0 shadow-lg">
                      <div className="text-center mb-24">
                          <div className="w-64-px h-64-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center mx-auto mb-16 h2"><Icon icon="solar:shield-warning-bold" /></div>
                          <h4 className="fw-black text-dark text-uppercase">XÁC NHẬN THIẾU HÀNG</h4>
                          <p className="text-secondary">Sản phẩm: <span className="fw-bold">{selectedTask.itemCode}</span> tại vị trí <span className="fw-bold">{selectedTask.fromLocation}</span></p>
                      </div>
                      <div className="row gy-3">
                          <div className="col-12">
                              <label className="form-label text-xs fw-bold uppercase">Số lượng thiếu thực tế</label>
                              <input type="number" className="form-control form-control-lg radius-12 border-danger" placeholder="Nhập SL..." value={exceptionData.qtyMissing} onChange={(e) => setExceptionData({...exceptionData, qtyMissing: e.target.value})} />
                          </div>
                          <div className="col-12">
                              <label className="form-label text-xs fw-bold uppercase">Lý do (Reason Code)</label>
                              <select className="form-select form-select-lg radius-12" value={exceptionData.reason} onChange={(e) => setExceptionData({...exceptionData, reason: e.target.value})}>
                                  <option value="Hư hỏng vật lý">Hư hỏng vật lý (Damaged)</option>
                                  <option value="Sai vị trí">Hàng không có ở vị trí gợi ý</option>
                                  <option value="Lỗi dữ liệu hệ thống">Dữ liệu tồn kho sai lệch (System Error)</option>
                                  <option value="Khác">Khác...</option>
                              </select>
                          </div>
                      </div>
                      <div className="d-flex gap-2 mt-32">
                          <button className="btn btn-outline-secondary w-100 radius-12 py-12" onClick={() => setShowShortPickModal(false)}>HỦY</button>
                          <button className="btn btn-danger-main w-100 radius-12 py-12 fw-bold" onClick={handleShortPickSubmit}>XÁC NHẬN THIẾU</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Override Source Modal */}
      {showOverrideModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)'}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content radius-24 p-32 border-0 shadow-lg">
                      <div className="text-center mb-24">
                          <div className="w-64-px h-64-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center mx-auto mb-16 h2"><Icon icon="solar:reorder-bold" /></div>
                          <h4 className="fw-black text-dark text-uppercase">ĐỔI VỊ TRÍ / LÔ LẤY HÀNG</h4>
                          <p className="text-secondary">Thay đổi vị trí <span className="fw-bold">{selectedTask.fromLocation}</span> bằng vị trí thực tế lấy được.</p>
                      </div>
                      <div className="row gy-3">
                          <div className="col-12">
                              <label className="form-label text-xs fw-bold uppercase">Vị trí mới (Quét/Nhập)</label>
                              <input type="text" className="form-control form-control-lg radius-12" placeholder="VD: A-01-02-L1" value={exceptionData.newLocation} onChange={(e) => setExceptionData({...exceptionData, newLocation: e.target.value.toUpperCase()})} />
                          </div>
                          <div className="col-12">
                              <label className="form-label text-xs fw-bold uppercase">Lô mới (Lot No - Tùy chọn)</label>
                              <input type="text" className="form-control form-control-lg radius-12" placeholder="VD: LOT-2024-001" value={exceptionData.newLot} onChange={(e) => setExceptionData({...exceptionData, newLot: e.target.value.toUpperCase()})} />
                          </div>
                      </div>
                      <div className="d-flex gap-2 mt-32">
                          <button className="btn btn-outline-secondary w-100 radius-12 py-12" onClick={() => setShowOverrideModal(false)}>HỦY</button>
                          <button className="btn btn-warning-main w-100 radius-12 py-12 fw-bold" onClick={handleOverrideSubmit}>XÁC NHẬN ĐỔI</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default PickTaskLayer;
