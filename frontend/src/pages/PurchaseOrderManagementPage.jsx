import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MasterLayout from '../masterLayout/MasterLayout';
import { MOCK_ERP_PURCHASE_ORDERS, MOCK_ERP_MASTER_DATA } from '../mockData/erp/erpOrders';
import Breadcrumb from '../components/Breadcrumb';

const PurchaseOrderManagementPage = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState(MOCK_ERP_PURCHASE_ORDERS);
  const [selectedPo, setSelectedPo] = useState(null);
  const [showMasterBuilder, setShowMasterBuilder] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [checkedPos, setCheckedPos] = useState([]);

  const handleCreateMasterReceipt = () => {
    // Trong thực tế, đây là nơi gọi API để tạo Master Receipt trong DB
    // Sau đó lấy Receipt ID và chuyển trang
    const masterReceiptId = "RCT-" + Math.floor(Math.random() * 100000);
    
    // Điều hướng sang màn hình Scanner
    navigate('/inbound-draft', { 
      state: { 
        receiptId: masterReceiptId,
        poNumbers: checkedPos,
        vendor: selectedVendor
      } 
    });
  };

  // Filter handlers
  const openPos = pos.filter(po => po.status === 'Released');

  const handleTogglePoSelection = (poNumber) => {
    setCheckedPos(prev => 
      prev.includes(poNumber) ? prev.filter(n => n !== poNumber) : [...prev, poNumber]
    );
  };

  const getProgress = (items) => {
    const total = items.reduce((acc, item) => acc + item.qty, 0);
    const received = items.reduce((acc, item) => acc + (item.qty - item.open_qty), 0);
    return Math.round((received / total) * 100);
  };

  return (
    <MasterLayout>
      <Breadcrumb title="Quản lý Đơn mua hàng (ERP)" />
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Quản lý Đơn mua hàng (Expected Receipts)</h3>
          <button className="btn btn-primary" onClick={() => setShowMasterBuilder(true)}>
            <i className="ri-truck-line me-2"></i>Tạo Phiếu Nhận Hàng Tổng
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card border-start border-primary border-4 shadow-sm p-3">
              <div className="text-muted small">PO Chờ nhận</div>
              <div className="h4 mb-0">{openPos.length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-start border-warning border-4 shadow-sm p-3">
              <div className="text-muted small">Đang nhận dở dang</div>
              <div className="h4 mb-0">0</div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <div className="row g-3">
              <div className="col-md-3">
                <select className="form-select form-select-sm">
                  <option>Tất cả Nhà cung cấp</option>
                  {MOCK_ERP_MASTER_DATA.suppliers.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <input type="date" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Số PO</th>
                  <th>Nhà cung cấp</th>
                  <th>Ngày dự kiến</th>
                  <th>Tiến độ</th>
                  <th>Trạng thái</th>
                  <th className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {pos.map(po => (
                  <tr key={po.po_number}>
                    <td className="fw-bold text-primary">{po.po_number}</td>
                    <td>{po.supplier_name}</td>
                    <td>{po.expected_date}</td>
                    <td style={{ width: '200px' }}>
                      <div className="progress" style={{ height: '8px' }}>
                        <div className="progress-bar" style={{ width: `${getProgress(po.items)}%` }}></div>
                      </div>
                      <small className="text-muted">{getProgress(po.items)}% hoàn tất</small>
                    </td>
                    <td><span className="badge bg-info text-dark">{po.status}</span></td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setSelectedPo(po)}>Xem chi tiết</button>
                      <button className="btn btn-sm btn-success">Nhận hàng</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PO Detail Modal */}
        {selectedPo && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header bg-light">
                  <h5 className="modal-title">Chi tiết PO: {selectedPo.po_number}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedPo(null)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <label className="text-muted small">Nhà cung cấp</label>
                      <div className="fw-bold">{selectedPo.supplier_name} ({selectedPo.supplier_code})</div>
                    </div>
                    <div className="col-md-4">
                      <label className="text-muted small">Ngày dự kiến giao</label>
                      <div className="fw-bold">{selectedPo.expected_date}</div>
                    </div>
                    <div className="col-md-4">
                      <label className="text-muted small">Ghi chú từ ERP</label>
                      <div className="text-italic small">Hàng về ưu tiên kho lạnh</div>
                    </div>
                  </div>

                  <h6>Danh sách mặt hàng</h6>
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>SKU</th>
                        <th>Tên sản phẩm</th>
                        <th>ĐVT</th>
                        <th className="text-end">Số lượng đặt</th>
                        <th className="text-end">Đã nhận</th>
                        <th className="text-end">Còn lại</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPo.items.map(item => (
                        <tr key={item.line_no} className={item.open_qty === 0 ? 'table-success opacity-50' : ''}>
                          <td className="fw-bold">{item.item_code}</td>
                          <td>{item.name}</td>
                          <td>{item.uom}</td>
                          <td className="text-end">{item.qty}</td>
                          <td className="text-end text-success fw-bold">{item.qty - item.open_qty}</td>
                          <td className="text-end text-danger">{item.open_qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedPo(null)}>Đóng</button>
                  <button type="button" className="btn btn-primary">In phiếu dự kiến</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Master Builder Modal (Consolidation) */}
        {showMasterBuilder && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg border-primary">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Wizard: Gom Chuyến / Master Receipt Builder</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowMasterBuilder(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4 p-3 bg-light border-start border-primary border-4 rounded">
                    <strong>Bước 1:</strong> Chọn Nhà cung cấp để hiển thị các PO đang mở.
                    <select className="form-select mt-2" value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
                      <option value="">-- Chọn Nhà cung cấp --</option>
                      {MOCK_ERP_MASTER_DATA.suppliers.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                    </select>
                  </div>

                  {selectedVendor && (
                    <div>
                      <h6>Bước 2: Chọn các PO cùng về trên một chuyến xe</h6>
                      <div className="list-group">
                        {pos.filter(po => po.supplier_code === selectedVendor).map(po => (
                          <label key={po.po_number} className="list-group-item d-flex gap-3">
                            <input className="form-check-input flex-shrink-0" type="checkbox" 
                              checked={checkedPos.includes(po.po_number)}
                              onChange={() => handleTogglePoSelection(po.po_number)} 
                            />
                            <div className="d-flex justify-content-between w-100">
                              <strong>{po.po_number}</strong>
                              <span className="text-muted small">{po.items.length} mặt hàng - {po.expected_date}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowMasterBuilder(false)}>Hủy bỏ</button>
                  <button className="btn btn-primary" disabled={checkedPos.length === 0} onClick={handleCreateMasterReceipt}>
                     TẠO PHIẾU NHẬN HÀNG TỔNG ({checkedPos.length} PO)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MasterLayout>
  );
};

export default PurchaseOrderManagementPage;
