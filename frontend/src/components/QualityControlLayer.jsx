import React from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const QualityControlLayer = () => {
  const { qualityOrders = [], completeQualityOrder } = useWMS();

  const handleDecision = (id, decisionType) => {
      toast.info(`Đang ghi nhận quyết định: ${decisionType}...`);
      
      setTimeout(() => {
          completeQualityOrder(id, decisionType);
          
          if (decisionType === 'Chấp Nhận') {
              toast.success(`Đã phê duyệt phiếu ${id}. Hàng đã được giải phóng vào tồn khả dụng.`);
          } else if (decisionType === 'Từ Chối') {
              toast.error(`Đã từ chối phiếu ${id}. Hệ thống tự động tạo lệnh trả hàng NCC (RTV).`);
          } else {
              toast.warning(`Đã cách ly phiếu ${id}. Vui lòng kiểm tra tại khu vực Quarantine.`);
          }
      }, 1000);
  }

  return (
    <div className='row gy-4'>
      {/* Visual Header */}
      <div className="col-12">
          <div className="card p-24 border-0 shadow-sm bg-gradient-start-1 overflow-hidden scale-on-hover">
              <div className="d-flex align-items-center gap-3">
                  <div className="w-64-px h-64-px bg-white bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center text-primary-600 h3 mb-0">
                      <Icon icon="solar:shield-check-bold" />
                  </div>
                  <div>
                      <h4 className="mb-0 text-dark fw-bold">Kiểm Tra Chất Lượng (QC)</h4>
                      <p className="mb-0 text-primary-600 fw-medium text-sm">Đảm bảo hàng hóa nhập kho đạt tiêu chuẩn trước khi lưu trữ.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* QC Tasks Grid */}
      {qualityOrders.length === 0 ? (
          <div className="col-12 text-center py-40">
              <h6>Không có lệnh QC nào cần xử lý.</h6>
          </div>
      ) : qualityOrders.map((order) => (
        <div className="col-xxl-6 col-md-12" key={order.qualityOrderId}>
            <div className="card border-0 shadow-sm overflow-hidden scale-on-hover">
                <div className="card-header bg-base border-bottom p-24 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-primary-600 px-12 py-4">{order.qualityOrderId}</span>
                        <h6 className="mb-0">Lệnh Kiểm Tra</h6>
                    </div>
                    <span className="text-secondary text-sm">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="card-body p-24">
                    <div className="row gy-4">
                        <div className="col-md-6 border-end">
                            <div className="d-flex align-items-center gap-3 mb-24">
                                <div className="w-48-px h-48-px bg-secondary-focus rounded-8 d-flex justify-content-center align-items-center">
                                    <Icon icon="solar:box-bold" className="text-secondary text-2xl" />
                                </div>
                                <div>
                                    <small className="text-secondary d-block text-xs">SẢN PHẨM</small>
                                    <span className="fw-bold">{order.itemCode}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="w-48-px h-48-px bg-info-focus rounded-8 d-flex justify-content-center align-items-center">
                                    <Icon icon="solar:tag-bold" className="text-info-main text-2xl" />
                                </div>
                                <div>
                                    <small className="text-secondary d-block text-xs">LÔ (LOT NO)</small>
                                    <span className="fw-bold">{order.lotNo}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                             <div className="d-flex align-items-center gap-3 mb-24">
                                <div className="w-48-px h-48-px bg-warning-focus rounded-8 d-flex justify-content-center align-items-center">
                                    <Icon icon="solar:layers-bold" className="text-warning-main text-2xl" />
                                </div>
                                <div>
                                    <small className="text-secondary d-block text-xs">SỐ LƯỢNG</small>
                                    <span className="fw-bold h5 mb-0">{order.qty} UNIT</span>
                                </div>
                            </div>
                            <div className={`alert ${order.status === 'Pending' ? 'alert-info bg-info-50' : (order.status === 'Chấp Nhận' ? 'alert-success bg-success-50' : 'alert-danger bg-danger-50')} border-0 p-12 rounded-8 mb-0`}>
                                <small className="fw-medium">
                                    <Icon icon="lucide:info" className="me-1" /> 
                                    {order.status === 'Pending' ? 'Yêu cầu kiểm tra cảm quan và bao bì.' : `Trạng thái: ${order.status}`}
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 p-16 bg-light rounded-12 border border-dashed text-center cursor-pointer" onClick={() => toast.info("Đang mở camera thiết bị...")}>
                        <Icon icon="lucide:camera" className="text-secondary text-2xl mb-8" />
                        <p className="text-xs text-secondary mb-0">Chụp ảnh hoặc tải lên hình ảnh lỗi (nếu có)</p>
                    </div>
                </div>
                <div className="card-footer bg-base border-top p-24">
                    {order.status === 'Pending' ? (
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button className="btn btn-outline-danger-600 px-24 radius-8" onClick={() => handleDecision(order.qualityOrderId, 'Từ Chối')}>
                                <Icon icon="solar:close-circle-bold" className="me-1" /> Từ Chối
                            </button>
                            <button className="btn btn-outline-warning-600 px-24 radius-8" onClick={() => handleDecision(order.qualityOrderId, 'Cách Ly')}>
                                <Icon icon="solar:shield-warning-bold" className="me-1" /> Cách Ly
                            </button>
                            <button className="btn btn-success-600 px-32 radius-8" onClick={() => handleDecision(order.qualityOrderId, 'Chấp Nhận')}>
                                <Icon icon="solar:check-circle-bold" className="me-1" /> Chấp Nhận & Release
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <span className="text-secondary fw-bold">QUYẾT ĐỊNH ĐÃ ĐƯỢC GHI NHẬN</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
      ))}

      {/* QC Criteria Placeholder */}
      <div className="col-12">
          <div className="card border-0 shadow-sm p-24">
              <h6 className="mb-16">Tiêu Chí Đánh Giá (QC Checklist)</h6>
              <div className="row gy-3">
                  <div className="col-md-4">
                      <div className="form-check style-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" id="check1" defaultChecked />
                          <label className="form-check-label text-sm fw-medium ms-2" htmlFor="check1">Nguyên đai nguyên kiện</label>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="form-check style-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" id="check2" defaultChecked />
                          <label className="form-check-label text-sm fw-medium ms-2" htmlFor="check2">Thông tin nhãn mác rõ ràng</label>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="form-check style-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" id="check3" />
                          <label className="form-check-label text-sm fw-medium ms-2" htmlFor="check3">Không có dấu hiệu ẩm ướt</label>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default QualityControlLayer;
