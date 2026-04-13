import React from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const CycleCountLayer = () => {
  const { cycleCounts, approveCycleCount } = useWMS();

  const handleApprove = (sessionId) => {
      toast.info(`Đang xử lý phê duyệt chênh lệch cho phiên ${sessionId}...`);
      
      setTimeout(() => {
          approveCycleCount(sessionId);
          toast.success(`Đã duyệt điều chỉnh cho phiên ${sessionId}. Tồn kho đã được cập nhật khớp với thực tế.`);
      }, 1500);
  }

  return (
    <div className='row gy-4'>
      {/* Visual Stats for Cycle Count */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:history-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-secondary-light">Chờ duyệt</h6>
                              <h4 className="mb-0 fw-bold">{cycleCounts.filter(s => s.status === 'Pending Review').length}</h4>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
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
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:shield-warning-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-secondary-light">Sai lệch {">"} 5%</h6>
                              <h4 className="mb-0 fw-bold text-danger-main">2</h4>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-primary-light text-primary-600 h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:scanner-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0">Độ chính xác</h6>
                              <h4 className="mb-0 fw-bold">98.2%</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Phiên Kiểm Kê Định Kỳ (Cycle Count)</h5>
            <button className="btn btn-primary-600 btn-sm d-flex align-items-center gap-2" onClick={() => toast.info("Đang khởi tạo phiên kiểm kê mới cho Warehouse A...")}>
                <Icon icon="lucide:plus-circle" /> Tạo Phiên Mới
            </button>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary-light">
                  <tr>
                    <th className="ps-24">Phiên / Vị Trí</th>
                    <th>Sản Phẩm (Item)</th>
                    <th className="text-center">Hệ Thống</th>
                    <th className="text-center">Thực Tế</th>
                    <th className="text-center">Chênh Lệch</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24 text-end">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {cycleCounts.map((session) => (
                    session.lines.map((line, idx) => (
                        <tr key={`${session.sessionId}-${idx}`} className="hover-bg-primary-50">
                          <td className="ps-24">
                            <div className="d-flex align-items-center gap-2">
                                <Icon icon="solar:clipboard-check-bold" className="text-secondary-light" />
                                <div>
                                    <span className="fw-bold text-dark">{session.sessionId}</span><br/>
                                    <small className="text-primary-600 fw-bold">{line.locationCode}</small>
                                </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-bold">{line.itemCode}</div>
                            <small className="text-secondary-light">Lô: {line.lotNo}</small>
                          </td>
                          <td className="text-center fw-bold">{line.systemQty}</td>
                          <td className="text-center fw-bold text-primary-600">{line.countedQty}</td>
                          <td className="text-center">
                            <span className={`fw-bold h6 mb-0 ${line.variance < 0 ? 'text-danger-600' : (line.variance > 0 ? 'text-success-600' : 'text-secondary-light')}`}>
                                {line.variance > 0 ? `+${line.variance}` : line.variance}
                            </span>
                          </td>
                          <td>
                            <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${session.status === 'Pending Review' ? 'bg-warning-focus text-warning-main' : 'bg-success-focus text-success-main'}`}>
                                <Icon icon={session.status === 'Pending Review' ? 'lucide:clock' : 'lucide:check-circle'} className="me-1" />
                                {session.status === 'Pending Review' ? 'Chờ Duyệt' : 'Đã Khớp'}
                            </span>
                          </td>
                          <td className="pe-24 text-end">
                             {session.status === 'Pending Review' ? (
                                <button className='btn btn-success-600 btn-sm radius-8 d-inline-flex align-items-center gap-2 hvr-bounce-in' onClick={() => handleApprove(session.sessionId)}>
                                    <Icon icon='lucide:check' /> Duyệt & Cập Nhật
                                </button>
                             ) : (
                                <button className="btn btn-outline-secondary btn-sm radius-8" disabled>
                                    Đã Hoàn Tất
                                </button>
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
    </div>
  );
};

export default CycleCountLayer;
