import React, { useState, useEffect } from 'react';
import { Search, Filter, Layers, Database, ArrowRightLeft, ShieldAlert, ArrowLeft, ChevronRight } from 'lucide-react';
import { inventoryOnHand } from '../data/mockData';

const StockInventoryView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile Detail View
  if (isMobile && selectedStock) {
    return (
      <div className="mobile-detail-view fade-in p-3 bg-light h-100">
        <button className="btn btn-white border-0 shadow-sm rounded-pill px-3 mb-3 d-flex align-items-center gap-2 fs-8 fw-bold" onClick={() => setSelectedStock(null)}>
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="glass-card bg-white p-4 border-0 shadow-sm">
           <div className="badge bg-primary text-white rounded-pill px-3 py-1 fs-9 uppercase-bold mb-3">{selectedStock.loc}</div>
           <h5 className="fw-bold mb-1">{selectedStock.itemId}</h5>
           <p className="text-muted fs-8 mb-4">Lô hàng: <b>{selectedStock.lot}</b></p>
           
           <div className="d-flex flex-column gap-3 fs-8">
              <div className="d-flex justify-content-between border-bottom pb-2"><span>Số lượng tồn:</span><span className="fw-bold fs-6">{selectedStock.qty.toLocaleString()} {selectedStock.unit}</span></div>
              <div className="d-flex justify-content-between border-bottom pb-2"><span>Trạng thái:</span><span className="text-success fw-bold">Sẵn dụng</span></div>
              <div className="d-flex justify-content-between"><span>Vị trí kho:</span><span className="fw-bold text-primary">{selectedStock.loc}</span></div>
           </div>
           
           <button className="btn btn-primary w-100 mt-4 py-3 rounded-3 fw-bold fs-7 shadow-lg d-flex align-items-center justify-content-center gap-2">
              <ArrowRightLeft size={18} /> ĐIỀU CHUYỂN VỊ TRÍ
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold mb-1">Tồn kho thực tế</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Theo dõi số lượng tồn kho theo Vị trí, Lô hàng và Trạng thái</p>}
        </div>
        <div className="d-flex gap-2 w-100 w-md-auto">
          <div className="bg-white p-2 p-md-3 rounded-3 shadow-sm d-flex align-items-center gap-2 flex-grow-1">
            <div className="bg-success bg-opacity-10 p-2 rounded-circle text-success d-none d-md-block"><Layers size={18} /></div>
            <div>
              <div className="text-muted fs-9 uppercase-bold">SKU</div>
              <div className="fw-bold fs-7 fs-md-6">148</div>
            </div>
          </div>
          <div className="bg-white p-2 p-md-3 rounded-3 shadow-sm d-flex align-items-center gap-2 flex-grow-1">
            <div className="bg-danger bg-opacity-10 p-2 rounded-circle text-danger d-none d-md-block"><ShieldAlert size={18} /></div>
            <div>
              <div className="text-muted fs-9 uppercase-bold">QA</div>
              <div className="fw-bold fs-7 fs-md-6 text-danger">10</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
        <div className="px-3 px-md-4 py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-white border shadow-sm rounded-pill px-3 fs-8 fw-bold">Tất cả</button>
            <button className="btn btn-sm btn-white border-0 text-muted rounded-pill px-3 fs-8">Available</button>
          </div>
          <div className="input-group" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
            <span className="input-group-text bg-transparent border-end-0 text-muted"><Search size={16} /></span>
            <input type="text" className="form-control border-start-0 fs-8" placeholder="Tìm theo SKU, Vị trí..." />
          </div>
        </div>

        <div className="table-responsive">
          {isMobile ? (
            <div className="mobile-list">
               {inventoryOnHand.map((stock, idx) => (
                 <div key={idx} className="p-3 border-bottom d-flex justify-content-between align-items-center cursor-pointer active-bg-light" onClick={() => setSelectedStock(stock)}>
                    <div>
                       <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="badge bg-light text-primary border fs-9 fw-bold">{stock.loc}</span>
                          <span className="fw-bold fs-8">{stock.itemId}</span>
                       </div>
                       <div className="text-muted fs-9">Lô: {stock.lot}</div>
                    </div>
                    <div className="text-end d-flex align-items-center gap-3">
                       <div>
                          <div className="fw-bold fs-7 text-dark">{stock.qty.toLocaleString()}</div>
                          <div className="fs-9 text-muted uppercase-bold">{stock.unit}</div>
                       </div>
                       <ChevronRight size={16} className="text-muted" />
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 fs-8">
              <thead className="bg-light text-muted-custom uppercase-bold fs-9">
                <tr><th className="px-4 py-3">VỊ TRÍ</th><th>MÃ VẬT TƯ</th><th>SỐ LÔ (LOT)</th><th className="text-center">SỐ LƯỢNG TỒN</th><th>ĐƠN VỊ</th><th>TRẠNG THÁI</th><th className="text-end px-4">THAO TÁC</th></tr>
              </thead>
              <tbody>
                {inventoryOnHand.map((stock, idx) => (
                  <tr key={idx}>
                    <td className="px-4"><span className="badge bg-light text-primary border border-primary-subtle rounded-pill px-3 fw-bold">{stock.loc}</span></td>
                    <td className="fw-bold">{stock.itemId}</td>
                    <td className="text-muted fw-semibold">{stock.lot}</td>
                    <td className="text-center fw-bold fs-7">{stock.qty.toLocaleString()}</td>
                    <td>{stock.unit}</td>
                    <td><span className={`badge rounded-pill px-3 ${stock.status === 'Available' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>{stock.status}</span></td>
                    <td className="text-end px-4"><button className="btn btn-sm btn-outline-primary rounded-pill px-3"><ArrowRightLeft size={14} /> Chuyển</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockInventoryView;
