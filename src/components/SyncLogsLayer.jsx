import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWMS } from "../context/WMSContext";

const SyncLogsLayer = () => {
  const { syncLogs } = useWMS();

  return (
    <div className='row gy-4'>
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
                              <h6 className="mb-0 text-success-main">98.5% Khớp</h6>
                              <p className="text-xs mb-0">Dữ liệu WMS vs ERP</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-primary-light text-primary-600 h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:refresh-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-primary-600">5 Phút/Lần</h6>
                              <p className="text-xs mb-0">Tần suất đồng bộ</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-danger-focus text-danger-main h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-danger-main text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:shield-warning-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-danger-main">1 Lỗi treo</h6>
                              <p className="text-xs mb-0">Cần xử lý thủ công</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-warning-focus text-warning-main h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-warning-main text-white rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                              <Icon icon="solar:history-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-warning-main">1,250 Bản ghi</h6>
                              <p className="text-xs mb-0">Tổng xử lý trong ngày</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Nhật Ký Tích Hợp Hệ Thống (ERP FAST - WMS)</h5>
            <button className="btn btn-primary-600 btn-sm d-flex align-items-center gap-2">
                <Icon icon="lucide:refresh-cw" /> Đồng Bộ Ngay
            </button>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary">
                  <tr>
                    <th className="ps-24">Phiên Đồng Bộ</th>
                    <th>Đối Tượng</th>
                    <th>Loại</th>
                    <th>Thời Gian & Thời Lượng</th>
                    <th>Bản Ghi</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24">Chi Tiết Lỗi</th>
                  </tr>
                </thead>
                <tbody>
                  {syncLogs.map((log, idx) => (
                    <tr key={idx} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <Icon icon="solar:link-bold" className="text-secondary" />
                            <span className="fw-bold">{log.syncId}</span>
                        </div>
                      </td>
                      <td><span className="badge bg-info-focus text-info-main">{log.entity}</span></td>
                      <td>
                        <span className={`text-xs fw-bold ${log.type === 'PULL' ? 'text-primary-600' : 'text-warning-main'}`}>
                            {log.type === 'PULL' ? 'ERP → WMS' : 'WMS → ERP'}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                            <span className="text-sm fw-medium">{new Date(log.startTime).toLocaleString()}</span>
                            <small className="text-secondary">Xử lý trong 1m 5s</small>
                        </div>
                      </td>
                      <td><h6 className="mb-0 text-md">{log.recordsProcessed}</h6></td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${log.status === 'Success' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'}`}>
                            <Icon icon={log.status === 'Success' ? 'lucide:check-circle' : 'lucide:alert-circle'} className="me-1" />
                            {log.status}
                        </span>
                      </td>
                      <td className="pe-24">
                        {log.errorLog ? (
                            <div className="alert alert-danger border-0 bg-danger-focus p-8 rounded-8 mb-0 text-xs fw-bold">
                                {log.errorLog}
                            </div>
                        ) : (
                            <span className="text-secondary italic text-xs">Không có lỗi</span>
                        )}
                      </td>
                    </tr>
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

export default SyncLogsLayer;
