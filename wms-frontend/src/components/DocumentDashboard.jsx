import React, { useState, useEffect } from 'react';
import { 
  FileText, Search, Filter, RefreshCcw, 
  ArrowDownCircle, ArrowUpCircle, CheckCircle2, 
  ChevronRight, Package, Truck, 
  AlertCircle, ExternalLink, ArrowLeft
} from 'lucide-react';
import { erpPurchaseOrders, erpSalesOrders } from '../data/mockData';

const DocumentDashboard = () => {
  const [docType, setDocTab] = useState('PO'); // 'PO', 'SO'
  const [selectedId, setSelectedId] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const orders = docType === 'PO' ? erpPurchaseOrders : erpSalesOrders;
  const activeOrder = orders.find(o => o.id === selectedId);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  const getStatusBadge = (status) => {
    const isPrimary = status === 'Mở' || status === 'Đã duyệt';
    return (
      <span className={`badge rounded-pill px-3 ${isPrimary ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-light text-dark border'}`}>
        {status}
      </span>
    );
  };

  // Mobile View Logic: Show list OR detail
  if (isMobile && selectedId) {
    return (
      <div className="mobile-detail-view fade-in p-3 bg-light h-100">
        <button className="btn btn-white border-0 shadow-sm rounded-pill px-3 mb-3 d-flex align-items-center gap-2 fs-8 fw-bold" onClick={() => setSelectedId(null)}>
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        
        {activeOrder && (
          <div className="fade-in pb-5">
            <div className="glass-card bg-white p-3 mb-3 border-0 shadow-sm">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h6 className="fw-bold mb-0 text-primary">{activeOrder.id}</h6>
                {getStatusBadge(activeOrder.status)}
              </div>
              <div className="text-muted fs-8 mb-2 uppercase-bold">Dữ liệu đơn hàng</div>
              <div className="d-flex flex-column gap-2 fs-8">
                <div className="d-flex justify-content-between border-bottom pb-2"><span>Đối tác:</span><span className="fw-bold">{activeOrder.vendor || activeOrder.customer}</span></div>
                <div className="d-flex justify-content-between border-bottom pb-2"><span>Ngày:</span><span className="fw-bold">{activeOrder.expectedDate || '02/05/2026'}</span></div>
                <div className="d-flex justify-content-between"><span>Ưu tiên:</span><span className="fw-bold text-danger">Cao</span></div>
              </div>
            </div>

            <div className="glass-card bg-white border-0 shadow-sm overflow-hidden mb-4">
              <div className="px-3 py-2 border-bottom bg-light bg-opacity-50 fs-9 uppercase-bold text-muted">DANH SÁCH MẶT HÀNG</div>
              {activeOrder.lines.map((line, idx) => (
                <div key={idx} className="p-3 border-bottom d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold fs-8">{line.itemId}</div>
                    <div className="text-muted fs-9">{line.itemName || 'Màng PE 5kg'}</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold fs-7">{line.expectedQty || line.qty} {line.unit}</div>
                    <div className="badge bg-warning-subtle text-warning border-0 fs-9">Chờ xử lý</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary w-100 py-3 rounded-3 fw-bold fs-7 shadow-lg">
               {docType === 'PO' ? 'CHỐT MASTER RECEIPT' : 'DUYỆT & TẠO LỆNH PICK'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column h-100 bg-light overflow-hidden">
      {/* Desktop Header */}
      {!isMobile && (
        <div className="bg-white px-4 py-3 border-bottom shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Quản lý Chứng từ ERP</h4>
            <div className="d-flex gap-2">
              <button className="btn btn-white border shadow-sm rounded-3 px-3 fs-8 fw-bold" onClick={handleSync} disabled={isSyncing}>
                <RefreshCcw size={16} className={isSyncing ? 'spin' : ''} /> Đồng bộ từ ERP
              </button>
            </div>
          </div>
          <div className="d-flex gap-4">
            <button className={`btn-tab pb-2 px-1 fs-7 fw-bold transition-all ${docType === 'PO' ? 'active' : 'text-muted'}`} onClick={() => { setDocTab('PO'); setSelectedId(null); }}>
              Mua hàng (PO)
            </button>
            <button className={`btn-tab pb-2 px-1 fs-7 fw-bold transition-all ${docType === 'SO' ? 'active' : 'text-muted'}`} onClick={() => { setDocTab('SO'); setSelectedId(null); }}>
              Bán hàng (SO)
            </button>
          </div>
        </div>
      )}

      {/* Mobile-only tab switcher */}
      {isMobile && !selectedId && (
        <div className="bg-white p-3 border-bottom shadow-sm">
           <div className="d-flex gap-2 bg-light p-1 rounded-pill">
              <button className={`btn rounded-pill flex-grow-1 fs-8 fw-bold py-2 border-0 ${docType === 'PO' ? 'bg-white shadow-sm text-primary' : 'bg-transparent text-muted'}`} onClick={() => setDocTab('PO')}>Nhập (PO)</button>
              <button className={`btn rounded-pill flex-grow-1 fs-8 fw-bold py-2 border-0 ${docType === 'SO' ? 'bg-white shadow-sm text-primary' : 'bg-transparent text-muted'}`} onClick={() => setDocTab('SO')}>Xuất (SO)</button>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        
        {/* List Panel */}
        <div className={`order-list-panel border-end bg-white transition-all ${selectedId && !isMobile ? 'w-40' : 'w-100'}`}>
          <div className="sidebar-scroll h-100 pb-5">
            {orders.map((order) => (
              <div key={order.id} className={`order-item-card p-3 border-bottom cursor-pointer transition-all ${selectedId === order.id ? 'bg-primary bg-opacity-5' : 'hover-bg-light'}`} onClick={() => setSelectedId(order.id)}>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="fw-bold fs-7 text-primary">{order.id}</div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="fw-semibold fs-8 text-dark mb-1">{order.vendor || order.customer}</div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted fs-9"><Truck size={12} className="me-1" /> {order.expectedDate || '02/05/2026'}</span>
                  <ChevronRight size={14} className="text-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Detail Panel */}
        {!isMobile && (
          <div className={`detail-panel bg-light flex-grow-1 overflow-auto transition-all ${selectedId ? 'd-block' : 'd-none'}`}>
            {activeOrder && (
              <div className="p-4 fade-in">
                <div className="glass-card bg-white p-4 mb-4 border-0 shadow-sm">
                   <h5 className="fw-bold mb-4">Chi tiết {docType}: {activeOrder.id}</h5>
                   <div className="row g-3">
                      <div className="col-md-4"><div className="p-3 bg-light rounded-3"><span className="text-muted fs-9 uppercase-bold d-block mb-1">Đối tác</span><span className="fw-bold">{activeOrder.vendor || activeOrder.customer}</span></div></div>
                      <div className="col-md-4"><div className="p-3 bg-light rounded-3"><span className="text-muted fs-9 uppercase-bold d-block mb-1">Ngày yêu cầu</span><span className="fw-bold">{activeOrder.expectedDate || '02/05/2026'}</span></div></div>
                      <div className="col-md-4"><div className="p-3 bg-light rounded-3"><span className="text-muted fs-9 uppercase-bold d-block mb-1">Độ ưu tiên</span><span className="fw-bold text-danger">Cao</span></div></div>
                   </div>
                </div>
                
                <div className="glass-card bg-white border-0 shadow-sm overflow-hidden">
                   <div className="px-4 py-3 border-bottom fs-8 fw-bold uppercase-bold text-muted">DANH SÁCH MẶT HÀNG</div>
                   <table className="table table-hover align-middle mb-0 fs-8">
                      <thead className="bg-light text-muted uppercase-bold fs-9">
                        <tr><th className="px-4 py-3">Mã hàng</th><th>Tên vật tư</th><th className="text-center">Số lượng</th><th>Đơn vị</th><th className="text-end px-4">Trạng thái</th></tr>
                      </thead>
                      <tbody>
                        {activeOrder.lines.map((line, idx) => (
                          <tr key={idx}><td className="px-4 fw-bold">{line.itemId}</td><td className="fw-semibold">{line.itemName || 'Màng PE 5kg'}</td><td className="text-center fw-bold">{line.expectedQty || line.qty}</td><td>{line.unit}</td><td className="text-end px-4"><span className="badge bg-warning-subtle text-warning border-0 rounded-pill px-2">Chờ xử lý</span></td></tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .w-40 { width: 350px !important; }
        .order-list-panel { flex-shrink: 0; display: flex; flex-direction: column; }
        .btn-tab { border: none; background: transparent; border-bottom: 2px solid transparent; }
        .btn-tab.active { color: var(--accent-blue) !important; border-bottom-color: var(--accent-blue); }
        .order-item-card:hover { background-color: #f8fafc; }
        .uppercase-bold { text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

export default DocumentDashboard;
