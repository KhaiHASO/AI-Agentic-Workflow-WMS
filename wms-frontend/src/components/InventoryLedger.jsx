import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, ArrowRight, ChevronRight, ArrowLeft } from 'lucide-react';
import { inventoryLedger } from '../data/mockData';

const InventoryLedgerView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Sổ kho (Ledger)</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Nhật ký bất biến ghi lại mọi biến động tồn kho</p>}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-white border shadow-sm rounded-pill p-2 d-md-none"><Filter size={18} /></button>
          <button className="btn btn-white shadow-sm border-0 rounded-3 px-3 d-none d-md-flex align-items-center gap-2 fs-8 fw-bold">
            <Download size={16} /> Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
        {!isMobile && (
          <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
            <div className="d-flex gap-4">
               <span className="fw-bold fs-8 text-primary border-bottom border-primary border-2 pb-1">Tất cả giao dịch</span>
               <span className="fs-8 text-muted pb-1 cursor-pointer">Inbound</span>
               <span className="fs-8 text-muted pb-1 cursor-pointer">Outbound</span>
            </div>
            <div className="input-group" style={{ width: '300px' }}>
              <span className="input-group-text bg-transparent border-end-0 text-muted"><Search size={16} /></span>
              <input type="text" className="form-control border-start-0 fs-8" placeholder="Tìm kiếm..." />
            </div>
          </div>
        )}

        <div className="table-responsive">
          {isMobile ? (
            <div className="mobile-list">
               {inventoryLedger.map((item) => (
                 <div key={item.id} className="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <div>
                       <div className="d-flex align-items-center gap-2 mb-1">
                          <span className={`badge ${item.type === 'Inbound' ? 'bg-success' : 'bg-danger'} text-white fs-9`}>{item.type === 'Inbound' ? '+' : '-'}{item.qty}</span>
                          <span className="fw-bold fs-8">{item.itemId}</span>
                       </div>
                       <div className="text-muted fs-9">{new Date(item.time).toLocaleDateString('vi-VN')} • Ref: {item.ref}</div>
                    </div>
                    <div className="text-end">
                       <div className="badge bg-light text-dark border fs-9 rounded-pill">{item.loc}</div>
                       <ChevronRight size={14} className="text-muted ms-2" />
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 fs-8">
              <thead className="bg-light text-muted uppercase-bold fs-9">
                <tr><th className="px-4 py-3">THỜI GIAN</th><th>LOẠI</th><th>MÃ HÀNG</th><th>VỊ TRÍ</th><th className="text-center">SỐ LƯỢNG</th><th>CHỨNG TỪ</th><th className="text-end px-4">NGƯỜI LÀM</th></tr>
              </thead>
              <tbody>
                {inventoryLedger.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 text-muted">{new Date(item.time).toLocaleString('vi-VN')}</td>
                    <td><span className={`fw-bold ${item.type === 'Inbound' ? 'text-success' : 'text-danger'}`}>{item.type}</span></td>
                    <td className="fw-bold">{item.itemId}</td>
                    <td><span className="badge bg-light text-dark border rounded-pill px-2">{item.loc}</span></td>
                    <td className="text-center fw-bold fs-7">{item.type === 'Inbound' ? `+${item.qty}` : `-${item.qty}`}</td>
                    <td className="text-primary fw-semibold">{item.ref}</td>
                    <td className="text-end px-4">admin</td>
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

export default InventoryLedgerView;
