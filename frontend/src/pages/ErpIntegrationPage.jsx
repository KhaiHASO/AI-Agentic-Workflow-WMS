import React, { useState } from 'react';
import MasterLayout from '../masterLayout/MasterLayout';
import { MOCK_SYNC_LOGS } from '../mockData/integration/syncLogs';
import Breadcrumb from '../components/Breadcrumb';

const ErpIntegrationPage = () => {
  const [logs, setLogs] = useState(MOCK_SYNC_LOGS);
  const [activeTab, setActiveTab] = useState('logs');
  const [selectedLog, setSelectedLog] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success': return 'badge bg-success';
      case 'Failed': return 'badge bg-danger';
      case 'Processing': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Nhật ký Đồng bộ ERP" />
      <div className="container-fluid p-4">
        <h3 className="mb-4">Hệ thống Tích hợp ERP FAST</h3>

        {/* Tabs Menu */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'logs' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('logs')}>
              Nhật ký Đồng bộ
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'config' ? 'active fw-bold' : ''}`} onClick={() => setActiveTab('config')}>
              Cấu hình Kết nối
            </button>
          </li>
        </ul>

        {activeTab === 'logs' ? (
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Lịch sử Giao dịch</h5>
              <div className="d-flex gap-2">
                <input type="text" className="form-control form-control-sm" placeholder="Tìm số chứng từ..." />
                <button className="btn btn-sm btn-outline-primary">Lọc</button>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Loại</th>
                    <th>Số WMS</th>
                    <th>Số ERP</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td><span className="text-muted small">{log.type}</span></td>
                      <td className="fw-bold">{log.wms_doc}</td>
                      <td>{log.erp_doc}</td>
                      <td>{log.timestamp}</td>
                      <td><span className={getStatusBadge(log.status)}>{log.status}</span></td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-info" onClick={() => setSelectedLog(log)}>Chi tiết</button>
                          {log.can_retry && <button className="btn btn-sm btn-warning">Gửi lại</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">Cấu hình API ERP FAST</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">API Gateway URL</label>
                    <input type="text" className="form-control" defaultValue="https://api.fast.com.vn/v1/wms-sync" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">API Key / Token</label>
                    <input type="password" className="form-control" defaultValue="********-****-****-****-************" />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button className="btn btn-primary w-100">Kiểm tra Kết nối</button>
                    </div>
                    <div className="col-6">
                      <button className="btn btn-outline-success w-100">Đồng bộ Thủ công</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">Lịch trình (Cronjob)</div>
                <div className="card-body">
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Tự động kéo PO (Mỗi 15 phút)</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                    <label className="form-check-label">Đẩy GRN Realtime khi hoàn tất nhập kho</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Chốt tồn kho định kỳ (23:00 hàng ngày)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal View Payload (Giả lập) */}
        {selectedLog && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Chi tiết Payload: {selectedLog.wms_doc}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedLog(null)}></button>
                </div>
                <div className="modal-body bg-light">
                  <div className="mb-3">
                    <strong>Thông điệp hệ thống:</strong>
                    <p className={selectedLog.status === 'Failed' ? 'text-danger' : 'text-success'}>{selectedLog.message}</p>
                  </div>
                  <strong>Dữ liệu JSON:</strong>
                  <pre className="p-3 border rounded bg-dark text-white mt-2" style={{ fontSize: '0.85rem' }}>
                    {JSON.stringify(selectedLog.payload, null, 2)}
                  </pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedLog(null)}>Đóng</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default ErpIntegrationPage;
