import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const ReturnsLayer = () => {
  const [returnType, setReturnType] = useState("RTV"); // RTV or RMA

  return (
    <div className='row gy-4'>
      {/* Visual Header with Tabs */}
      <div className="col-12">
          <div className="card p-0 border-0 shadow-sm overflow-hidden">
              <div className="card-body p-0">
                  <div className="d-flex flex-wrap align-items-center">
                      <button 
                        className={`flex-grow-1 py-24 border-0 d-flex flex-column align-items-center gap-2 transition-all ${returnType === 'RTV' ? 'bg-primary-600 text-primary-light' : 'bg-base text-secondary'}`}
                        onClick={() => setReturnType('RTV')}
                      >
                          <Icon icon="solar:round-transfer-vertical-bold" className="h3 mb-0" />
                          <h6 className={`mb-0 ${returnType === 'RTV' ? 'fw-medium text-primary-light mb-1' : ''}`}>Trả Nhà Cung Cấp (RTV)</h6>
                          <small className={returnType === 'RTV' ? 'text-primary-light text-opacity-75' : ''}>Return to Vendor</small>
                      </button>
                      <button 
                        className={`flex-grow-1 py-24 border-0 d-flex flex-column align-items-center gap-2 transition-all ${returnType === 'RMA' ? 'bg-success-main text-primary-light' : 'bg-base text-secondary'}`}
                        onClick={() => setReturnType('RMA')}
                      >
                          <Icon icon="solar:reorder-bold" className="h3 mb-0" />
                          <h6 className={`mb-0 ${returnType === 'RMA' ? 'fw-medium text-primary-light mb-1' : ''}`}>Khách Trả Hàng (RMA)</h6>
                          <small className={returnType === 'RMA' ? 'text-primary-light text-opacity-75' : ''}>Return Merchandise Authorization</small>
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Summary Metrics for Returns */}
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border-0 shadow-sm text-center">
              <h2 className="mb-8 fw-bold">12</h2>
              <p className="text-secondary mb-0">Phiếu đang chờ xử lý</p>
          </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border-0 shadow-sm text-center">
              <h2 className="mb-8 fw-bold text-danger-main">5</h2>
              <p className="text-secondary mb-0">Phiếu quá hạn 48h</p>
          </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border-0 shadow-sm text-center">
              <h2 className="mb-8 fw-bold text-primary-600">$45K</h2>
              <p className="text-secondary mb-0">Giá trị hàng trả tháng này</p>
          </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border-0 shadow-sm text-center">
              <h2 className="mb-8 fw-bold text-success-main">98%</h2>
              <p className="text-secondary mb-0">Tỉ lệ giải quyết thành công</p>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24'>
            <h5 className='card-title mb-0'>Danh Sách Phiếu {returnType} Cần Xử Lý</h5>
            <button className={`btn btn-sm d-flex align-items-center gap-2 ${returnType === 'RTV' ? 'btn-primary-600' : 'btn-success-600'}`}>
                <Icon icon="lucide:plus-circle" /> Tạo Phiếu Mới
            </button>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary">
                  <tr>
                    <th className="ps-24">Mã Phiếu</th>
                    <th>Chứng Từ Gốc</th>
                    <th>{returnType === 'RTV' ? 'Đối Tác / NCC' : 'Khách Hàng'}</th>
                    <th>Lô Hàng</th>
                    <th>Trạng Thái</th>
                    <th>Lý Do</th>
                    <th className="pe-24 text-end">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover-bg-primary-50">
                    <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <span className={`w-8-px h-8-px rounded-circle ${returnType === 'RTV' ? 'bg-primary-600' : 'bg-success-main'}`}></span>
                            <span className="fw-bold">{returnType === 'RTV' ? 'RTV-2026-001' : 'RMA-2026-001'}</span>
                        </div>
                    </td>
                    <td><span className="text-secondary fw-medium">{returnType === 'RTV' ? 'PO-2026-045' : 'SO-2026-781'}</span></td>
                    <td>
                        <div className="d-flex align-items-center gap-2">
                            <div className="w-32-px h-32-px bg-secondary-focus rounded-circle d-flex justify-content-center align-items-center text-xs">
                                {returnType === 'RTV' ? 'SUP' : 'CUS'}
                            </div>
                            <span className="fw-semibold">{returnType === 'RTV' ? 'Supplier A' : 'Customer B'}</span>
                        </div>
                    </td>
                    <td><code>LOT-20260412</code></td>
                    <td>
                        <span className="px-12 py-4 rounded-pill fw-medium text-xs bg-warning-focus text-warning-main">
                            <Icon icon="lucide:clock" className="me-1" /> Chờ Kiểm Định
                        </span>
                    </td>
                    <td><span className="text-danger-main fw-medium">Hàng lỗi kỹ thuật</span></td>
                    <td className="pe-24 text-end">
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-primary-600 btn-sm px-16">Chi Tiết</button>
                            <button className="w-32-px h-32-px bg-success-focus text-success-main rounded-8 d-inline-flex align-items-center justify-content-center border-0" title="Xác nhận">
                                <Icon icon="lucide:check" />
                            </button>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsLayer;
