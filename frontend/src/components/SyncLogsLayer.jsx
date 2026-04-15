import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const SyncLogsLayer = () => {
  const { syncLogs } = useWMS();
  const [retryingIds, setRetryingIds] = useState(new Set());

  const handleRetry = (syncId) => {
    setRetryingIds(prev => new Set(prev).add(syncId));
    toast.info(`Đang phát lại bản tin ${syncId} về ERP FAST...`);
    
    // Simulate API call with Idempotency check
    setTimeout(() => {
        toast.success(`Đồng bộ lại thành công cho bản tin ${syncId}. Trạng thái ERP: UPDATED`);
        setRetryingIds(prev => {
            const next = new Set(prev);
            next.delete(syncId);
            return next;
        });
    }, 2000);
  };

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      {/* Visual Health Metrics */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-success-focus text-success-main h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-success-main text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:check-read-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-success-main fw-bold">98.5% THÀNH CÔNG</h6>
                              <p className="text-xs mb-0 text-secondary">Tỉ lệ đẩy tin về ERP FAST</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-danger-focus text-danger-main h-100 border-start border-4 border-danger-main">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-danger-main text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:shield-warning-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-danger-main fw-bold">1 BẢN TIN LỖI</h6>
                              <p className="text-xs mb-0 text-secondary">Cần "Retry" ngay lập tức</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0 fw-bold'>INTEGRATION INBOX / OUTBOX (WMS ⇄ ERP FAST)</h5>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm radius-8" onClick={() => toast.info("Đang lọc bản tin lỗi...")}>Lọc bản tin lỗi</button>
                <button className="btn btn-primary-600 btn-sm d-flex align-items-center gap-2 radius-8 fw-bold">
                    <Icon icon="solar:refresh-bold" /> BUỘC ĐỒNG BỘ TOÀN BỘ
                </button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                  <tr>
                    <th className="ps-24">Phiên / ID</th>
                    <th>Đối Tượng</th>
                    <th>Hướng</th>
                    <th>Thời Gian</th>
                    <th className="text-center">Số Bản Ghi</th>
                    <th>Trạng Thái</th>
                    <th>Nội Dung Lỗi / Log</th>
                    <th className="pe-24 text-end">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {syncLogs.map((log, idx) => (
                    <tr key={idx} className={`hover-bg-primary-50 ${log.status === 'Failed' ? 'bg-danger-focus' : ''}`}>
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <Icon icon="solar:link-bold" className="text-secondary" />
                            <span className="fw-bold">{log.syncId}</span>
                        </div>
                      </td>
                      <td><span className="badge bg-dark text-white px-12 py-4 radius-8">{log.entity}</span></td>
                      <td>
                        <span className={`text-xs fw-bold px-8 py-4 rounded-4 ${log.type === 'PULL' ? 'bg-info-focus text-info-main' : 'bg-warning-focus text-warning-main'}`}>
                            {log.type === 'PULL' ? '← PULL (ERP-IN)' : '→ PUSH (ERP-OUT)'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                            <span className="text-sm fw-medium">{new Date(log.startTime).toLocaleString()}</span>
                            <small className="text-secondary text-xxs fw-bold uppercase">Xử lý: 1m 5s</small>
                        </div>
                      </td>
                      <td className="text-center"><h6 className="mb-0 fw-black text-primary-600">{log.recordsProcessed}</h6></td>
                      <td>
                        <span className={`px-12 py-6 rounded-pill fw-bold text-xxs text-uppercase ${log.status === 'Success' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'}`}>
                            {log.status === 'Success' ? 'Khớp (Synced)' : 'Thất bại (Failed)'}
                        </span>
                      </td>
                      <td style={{maxWidth: '250px'}}>
                        {log.errorLog ? (
                            <div className="alert alert-danger border-0 bg-white bg-opacity-50 p-8 rounded-8 mb-0 text-xs fw-bold text-danger-main">
                                <Icon icon="solar:info-circle-bold" className="me-1" /> {log.errorLog}
                            </div>
                        ) : (
                            <span className="text-secondary italic text-xs">Sẵn sàng (Clean)</span>
                        )}
                      </td>
                      <td className="pe-24 text-end">
                        {log.status === 'Failed' && (
                            <button 
                                className={`btn btn-danger-main btn-sm radius-8 px-16 fw-bold ${retryingIds.has(log.syncId) ? 'disabled' : ''}`}
                                onClick={() => handleRetry(log.syncId)}
                            >
                                {retryingIds.has(log.syncId) ? <span className="spinner-border spinner-border-sm me-1"></span> : <Icon icon="solar:refresh-bold" className="me-1" />}
                                RETRY (PHÁT LẠI)
                            </button>
                        )}
                        {log.status === 'Success' && (
                            <button className="btn btn-outline-secondary btn-sm radius-8" title="Xem XML/JSON" onClick={() => toast.info("Đang tải payload...")}>
                                <Icon icon="solar:eye-bold" />
                            </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer bg-base border-top p-24 text-center">
             <p className="text-secondary text-sm mb-0">
                <Icon icon="solar:info-circle-bold" className="me-1" />
                Cơ chế <strong>Idempotency</strong> được kích hoạt: Trùng lặp mã UUID sẽ không tạo bản ghi mới trên ERP FAST.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncLogsLayer;
