import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { wmsApi } from "../services/wmsApi";
import { toast } from "react-toastify";

const SyncLogsLayer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayload, setSelectedPayload] = useState(null);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await wmsApi.fetchSyncOutbox();
      setLogs(data);
    } catch (error) {
      toast.error("Lỗi khi tải lịch sử đồng bộ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleRetry = async (id) => {
    try {
      await wmsApi.retrySync(id);
      toast.success("Đã đưa bản tin vào hàng chờ gửi lại!");
      loadLogs();
    } catch (error) {
      toast.error("Thử lại thất bại");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Success": return "bg-success-focus text-success-600";
      case "Failed": return "bg-danger-focus text-danger-600";
      case "Pending": return "bg-warning-focus text-warning-600";
      default: return "bg-info-focus text-info-600";
    }
  };

  return (
    <div className='row gy-4'>
      <div className='col-12'>
        <div className='card border-0 shadow-sm radius-12 p-24 bg-base'>
          <div className='d-flex align-items-center justify-content-between flex-wrap gap-3'>
            <div>
              <h5 className='mb-8 fw-bold'>Lịch Sử Đồng Bộ ERP (Integration Audit)</h5>
              <p className='text-sm text-secondary mb-0'>Giám sát các giao dịch giữa WMS Core và hệ thống ERP FAST.</p>
            </div>
            <button className='btn btn-outline-primary radius-8' onClick={loadLogs}>
              <Icon icon='solar:refresh-bold' className='me-2' /> Làm mới danh sách
            </button>
          </div>
        </div>
      </div>

      <div className='col-12'>
        <div className='card border-0 shadow-sm radius-12 overflow-hidden'>
          <div className='card-body p-0'>
            <div className='table-responsive scroll-sm'>
              <table className='table bordered-table sm-table mb-0'>
                <thead className='bg-light text-secondary-light'>
                  <tr>
                    <th className='ps-24'>MÃ ĐỊNH DANH (KEY)</th>
                    <th>LOẠI BẢN TIN</th>
                    <th>TRẠNG THÁI</th>
                    <th>SỐ LẦN THỬ</th>
                    <th>THỜI GIAN</th>
                    <th className='text-center'>HÀNH ĐỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan='6' className='text-center py-40'>Đang quét dữ liệu Integration...</td></tr>
                  ) : logs.length === 0 ? (
                    <tr><td colSpan='6' className='text-center py-40 text-secondary'>Chưa có lịch sử đồng bộ nào.</td></tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className='hover-bg-primary-50'>
                        <td className='ps-24'>
                          <span className='fw-bold text-dark'>{log.idempotencyKey}</span>
                        </td>
                        <td>
                          <span className='badge bg-info-focus text-info-main px-12 py-4'>{log.messageType}</span>
                        </td>
                        <td>
                          <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${getStatusBadge(log.status)}`}>
                            {log.status === "Success" ? "Thành Công" : log.status === "Failed" ? "Thất Bại" : "Đang Chờ"}
                          </span>
                        </td>
                        <td className='text-center fw-bold'>{log.retryCount}</td>
                        <td>{new Date(log.createdAt).toLocaleString()}</td>
                        <td className='text-center'>
                          <div className='d-flex align-items-center gap-2 justify-content-center'>
                            <button 
                                className='btn btn-sm btn-outline-info p-4 radius-4' 
                                title='Xem Payload'
                                data-bs-toggle="modal" data-bs-target="#payloadModal"
                                onClick={() => setSelectedPayload(log)}
                            >
                              <Icon icon='solar:eye-bold' />
                            </button>
                            {log.status === "Failed" && (
                              <button 
                                className='btn btn-sm btn-outline-danger p-4 radius-4' 
                                title='Gửi lại'
                                onClick={() => handleRetry(log.id)}
                              >
                                <Icon icon='solar:refresh-bold' />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal View Payload */}
      <div className="modal fade" id="payloadModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content radius-16 border-0 shadow-lg">
            {selectedPayload && (
              <>
                <div className="modal-header py-16 px-24 border-bottom bg-info-600 text-white">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <Icon icon="solar:code-bold" /> Chi tiết bản tin: {selectedPayload.messageType}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body p-24 bg-dark">
                  <div className="mb-16">
                    <span className="text-secondary-light text-xs fw-bold uppercase">Idempotency Key:</span>
                    <p className="text-info-main mb-0">{selectedPayload.idempotencyKey}</p>
                  </div>
                  <div className="mb-16">
                    <span className="text-secondary-light text-xs fw-bold uppercase">Nội dung JSON:</span>
                    <pre className="text-success-main mt-8 p-16 radius-8 bg-black border border-secondary" style={{maxHeight: '300px', overflow: 'auto'}}>
                      {JSON.stringify(JSON.parse(selectedPayload.payload), null, 2)}
                    </pre>
                  </div>
                  {selectedPayload.errorMessage && (
                    <div className="p-16 radius-8 bg-danger-focus border border-danger-main">
                      <span className="text-danger-600 text-xs fw-bold uppercase">Thông báo lỗi:</span>
                      <p className="text-danger-main mb-0 mt-4">{selectedPayload.errorMessage}</p>
                    </div>
                  )}
                </div>
                <div className="modal-footer bg-base border-top p-24">
                  <button className="btn btn-outline-secondary px-24 radius-8" data-bs-dismiss="modal">Đóng</button>
                  <button className="btn btn-info px-32 radius-8" onClick={() => {
                      navigator.clipboard.writeText(selectedPayload.payload);
                      toast.success("Đã sao chép nội dung JSON!");
                  }}>
                    <Icon icon="solar:copy-bold" className="me-2" /> Sao chép JSON
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncLogsLayer;
