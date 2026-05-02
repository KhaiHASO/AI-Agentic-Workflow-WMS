import React, { useState } from 'react';
import MobileLayout from './MobileLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, AlertCircle, Split, 
  RefreshCcw, ShieldAlert, ChevronRight, 
  MoreHorizontal, Camera
} from 'lucide-react';

const DraftLineDetail = () => {
  const { lineId } = useParams();
  const navigate = useNavigate();
  
  // Mocking the selected line data
  const [line, setLine] = useState({
    id: lineId || 'DL1',
    itemId: 'RM-001',
    itemName: 'Màng PE 5kg',
    expectedQty: 100,
    scannedQty: 55,
    unit: 'Cuộn',
    status: 'Partial',
    lot: 'LOT2026-A1'
  });

  const [showAction, setShowAction] = useState(null); // 'split', 'substitute', 'hold'
  const [pin, setPin] = useState('');

  const handleAction = (type) => {
    setShowAction(type);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done': return <span className="status-badge-mobile status-done">Hoàn thành</span>;
      case 'Partial': return <span className="status-badge-mobile status-partial">Một phần</span>;
      case 'Error': return <span className="status-badge-mobile status-error">Lỗi</span>;
      default: return <span className="status-badge-mobile status-pending">Chờ quét</span>;
    }
  };

  return (
    <MobileLayout title={`Chi tiết: ${line.itemId}`}>
      <div className="bg-white rounded-3 p-3 shadow-sm mb-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold mb-0">{line.itemName}</h5>
            <span className="text-muted-custom fs-7">Mã: {line.itemId} | Lô: {line.lot}</span>
          </div>
          {getStatusBadge(line.status)}
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between fs-8 mb-1">
            <span className="fw-bold">Tiến độ thực nhận</span>
            <span>{line.scannedQty} / {line.expectedQty} {line.unit}</span>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-success" 
              style={{ width: `${(line.scannedQty / line.expectedQty) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="row g-2 text-center">
          <div className="col-4">
            <div className="p-2 bg-light rounded-3">
              <div className="text-muted-custom fs-9 uppercase fw-bold mb-1">DỰ KIẾN</div>
              <div className="fw-bold text-main">{line.expectedQty}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 bg-light rounded-3 border border-primary">
              <div className="text-primary fs-9 uppercase fw-bold mb-1">ĐÃ QUÉT</div>
              <div className="fw-bold text-primary">{line.scannedQty}</div>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 bg-light rounded-3">
              <div className="text-muted-custom fs-9 uppercase fw-bold mb-1">THIẾU</div>
              <div className="fw-bold text-danger">{line.expectedQty - line.scannedQty}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <h6 className="fw-bold fs-7 mb-2 px-1">XỬ LÝ NGOẠI LỆ (EXCEPTION)</h6>
      <div className="d-flex flex-column gap-2 mb-4">
        <button 
          className="btn bg-white shadow-sm border-0 text-start p-3 rounded-3 d-flex align-items-center gap-3"
          onClick={() => handleAction('discrepancy')}
        >
          <div className="p-2 bg-info bg-opacity-10 rounded-circle text-info">
            <AlertCircle size={20} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold fs-7">Xử lý chênh lệch (Adjustment)</div>
            <div className="text-muted-custom fs-8">Điều chỉnh nhận thừa hoặc điều chỉnh tay</div>
          </div>
          <ChevronRight size={18} className="text-muted" />
        </button>

        <button 
          className="btn bg-white shadow-sm border-0 text-start p-3 rounded-3 d-flex align-items-center gap-3"
          onClick={() => handleAction('split')}
        >
          <div className="p-2 bg-warning bg-opacity-10 rounded-circle text-warning">
            <Split size={20} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold fs-7">Tách dòng (Split Line)</div>
            <div className="text-muted-custom fs-8">Tách phần lỗi hoặc trả hàng riêng</div>
          </div>
          <ChevronRight size={18} className="text-muted" />
        </button>

        <button 
          className="btn bg-white shadow-sm border-0 text-start p-3 rounded-3 d-flex align-items-center gap-3"
          onClick={() => handleAction('substitute')}
        >
          <div className="p-2 bg-primary bg-opacity-10 rounded-circle text-primary">
            <RefreshCcw size={20} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold fs-7">Mã thay thế (Substitute)</div>
            <div className="text-muted-custom fs-8">Nhận mã tương đương có sự đồng ý</div>
          </div>
          <ChevronRight size={18} className="text-muted" />
        </button>

        <button 
          className="btn bg-white shadow-sm border-0 text-start p-3 rounded-3 d-flex align-items-center gap-3"
          onClick={() => handleAction('hold')}
        >
          <div className="p-2 bg-danger bg-opacity-10 rounded-circle text-danger">
            <ShieldAlert size={20} />
          </div>
          <div className="flex-grow-1">
            <div className="fw-bold fs-7">Giữ hàng (QA Hold)</div>
            <div className="text-muted-custom fs-8">Cách ly lô hàng chờ kiểm định</div>
          </div>
          <ChevronRight size={18} className="text-muted" />
        </button>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-light bg-white shadow-sm border-0 flex-grow-1 p-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2">
          <Camera size={18} /> Chụp ảnh
        </button>
        <button className="btn btn-light bg-white shadow-sm border-0 flex-grow-1 p-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2">
          <MoreHorizontal size={18} /> Ghi chú
        </button>
      </div>

      {/* Action Modals / Overlays */}
      {showAction && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 z-3 d-flex align-items-end" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="bg-white w-100 rounded-top-4 p-4 animate__animated animate__slideInUp">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 fw-bold">
                {showAction === 'split' && 'Tách dòng nghiệp vụ'}
                {showAction === 'substitute' && 'Nhận mã thay thế'}
                {showAction === 'hold' && 'Cách ly hàng (QA Hold)'}
                {showAction === 'discrepancy' && 'Điều chỉnh chênh lệch'}
              </h5>
              <button className="btn-close" onClick={() => setShowAction(null)}></button>
            </div>

            {showAction === 'discrepancy' && (
              <div className="mb-4">
                <div className="alert alert-info fs-8 p-2 d-flex align-items-start gap-2 mb-3">
                  <AlertCircle size={16} className="mt-1" />
                  <span>Dùng khi số lượng quét thực tế cao hơn PO hoặc cần sửa lỗi nhập liệu.</span>
                </div>
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">SỐ LƯỢNG THỰC NHẬN MỚI</label>
                  <div className="input-group">
                    <input type="number" className="form-control border-light bg-light fs-5 fw-bold" defaultValue={line.scannedQty} />
                    <span className="input-group-text bg-light border-light text-muted">{line.unit}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">LÝ DO ĐIỀU CHỈNH</label>
                  <select className="form-select border-light bg-light">
                    <option>Nhà cung cấp giao dư (Over-receipt)</option>
                    <option>Quét nhầm mã / Số lượng</option>
                    <option>Cập nhật thủ công theo biên bản</option>
                  </select>
                </div>
              </div>
            )}

            {showAction === 'substitute' && (
              <div className="mb-4">
                <div className="alert alert-warning fs-8 p-2 d-flex align-items-start gap-2 mb-3">
                  <AlertCircle size={16} className="mt-1" />
                  <span>Cần sự phê duyệt của Supervisor để nhận mã thay thế khác với PO gốc.</span>
                </div>
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">CHỌN MÃ THAY THẾ</label>
                  <select className="form-select border-light bg-light">
                    <option>RM-001A - Màng PE dày 0.5mm</option>
                    <option>RM-001B - Màng PE nhập khẩu</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">MÃ PIN PHÊ DUYỆT</label>
                  <input 
                    type="password" 
                    className="form-control border-light bg-light text-center fs-4 letter-spacing-lg" 
                    placeholder="****"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
              </div>
            )}

            {showAction === 'split' && (
              <div className="mb-4">
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">SỐ LƯỢNG TÁCH (LỖI/HỎNG)</label>
                  <div className="input-group">
                    <input type="number" className="form-control border-light bg-light fs-5 fw-bold" placeholder="0" />
                    <span className="input-group-text bg-light border-light text-muted">{line.unit}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">LÝ DO (REASON CODE)</label>
                  <select className="form-select border-light bg-light">
                    <option>Hàng rách bao bì</option>
                    <option>Sai quy cách</option>
                    <option>Cận hạn sử dụng</option>
                    <option>Khác...</option>
                  </select>
                </div>
              </div>
            )}

            {showAction === 'hold' && (
              <div className="mb-4">
                <div className="alert alert-danger fs-8 p-2 d-flex align-items-start gap-2 mb-3">
                  <ShieldAlert size={16} className="mt-1" />
                  <span>Hàng sẽ bị khóa và không thể xuất kho cho đến khi được Release.</span>
                </div>
                <div className="mb-3">
                  <label className="fs-8 fw-bold text-muted-custom mb-2">SỐ LƯỢNG CÁCH LY</label>
                  <div className="input-group">
                    <input type="number" className="form-control border-light bg-light fs-5 fw-bold" defaultValue={line.scannedQty} />
                    <span className="input-group-text bg-light border-light text-muted">{line.unit}</span>
                  </div>
                </div>
              </div>
            )}

            <button 
              className="btn btn-dark w-100 py-3 rounded-3 fw-bold mb-2"
              onClick={() => {
                alert('Đã cập nhật nghiệp vụ thành công!');
                setShowAction(null);
              }}
            >
              XÁC NHẬN
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .letter-spacing-lg { letter-spacing: 0.5rem; }
        .uppercase { text-transform: uppercase; }
        .fs-9 { font-size: 0.65rem; }
      `}} />
    </MobileLayout>
  );
};

export default DraftLineDetail;
