import React, { useState, useEffect } from 'react';
import { Search, Filter, Layers, Database, ArrowRightLeft, ShieldAlert, ArrowLeft, ChevronRight, Edit, Plus, Check, Printer } from 'lucide-react';
import { db } from '../data/centralizedDataStore';
import LabelPrinter from './LabelPrinter';

const StockInventoryView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [inventory, setInventory] = useState(db.state.inventory);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(null); // 'adjust', 'move', 'print'
  const [formData, setFormData] = useState({ qty: 0, targetLoc: '' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    const unsub = db.subscribe(state => setInventory([...state.inventory]));
    return () => {
      window.removeEventListener('resize', handleResize);
      unsub();
    };
  }, []);

  const filtered = inventory.filter(i => 
    i.itemId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (i.locId || i.loc)?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (e) => {
    e.preventDefault();
    const locId = selectedStock.locId || selectedStock.loc;
    if (showModal === 'adjust') {
       db.addInventory(selectedStock.itemId, locId, formData.qty - selectedStock.qty, selectedStock.lot);
    } else if (showModal === 'move') {
       db.moveInventory(selectedStock.itemId, locId, formData.targetLoc, Number(formData.qty), selectedStock.lot);
    }
    setShowModal(null);
    setSelectedStock(null);
  };

  const Modal = () => (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 z-3 d-flex align-items-center justify-content-center p-3" style={{ backdropFilter: 'blur(4px)' }}>
       <div className="bg-white rounded-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
          <form onSubmit={handleAction}>
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
               <h5 className="fw-bold mb-0">{showModal === 'adjust' ? 'Điều chỉnh tồn' : 'Điều chuyển vị trí'}</h5>
               <button type="button" className="btn-close" onClick={() => setShowModal(null)}></button>
            </div>
            <div className="p-4">
               <div className="mb-3 p-3 bg-light rounded-3">
                  <div className="fs-9 fw-bold text-muted uppercase mb-1">ĐANG CHỌN</div>
                  <div className="fw-bold fs-6">{selectedStock.itemId} - {selectedStock.lot}</div>
                  <div className="text-muted fs-8">Hiện tại: {selectedStock.qty} {selectedStock.unit} tại {selectedStock.locId || selectedStock.loc}</div>
               </div>
               
               <div className="mb-3">
                  <label className="fs-9 fw-bold text-muted mb-1">{showModal === 'adjust' ? 'SỐ LƯỢNG MỚI' : 'SỐ LƯỢNG CHUYỂN'}</label>
                  <input type="number" className="form-control fw-bold" required value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} />
               </div>

               {showModal === 'move' && (
                  <div className="mb-3">
                    <label className="fs-9 fw-bold text-muted mb-1">VỊ TRÍ ĐÍCH</label>
                    <select className="form-select" required value={formData.targetLoc} onChange={e => setFormData({...formData, targetLoc: e.target.value})}>
                       <option value="">-- Chọn vị trí --</option>
                       {db.state.locations.map(l => <option key={l.id} value={l.id}>{l.id} ({l.name})</option>)}
                    </select>
                  </div>
               )}
            </div>
            <div className="p-4 pt-0 d-flex gap-2">
               <button type="button" className="btn btn-light flex-grow-1 fw-bold" onClick={() => setShowModal(null)}>HỦY</button>
               <button type="submit" className="btn btn-primary flex-grow-1 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2">
                 <Check size={18} /> XÁC NHẬN
               </button>
            </div>
          </form>
       </div>
    </div>
  );

  if (isMobile && selectedStock && !showModal) {
    return (
      <div className="mobile-detail-view fade-in p-3 bg-light h-100">
        <button className="btn btn-white border-0 shadow-sm rounded-pill px-3 mb-3 d-flex align-items-center gap-2 fs-8 fw-bold" onClick={() => setSelectedStock(null)}>
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="glass-card bg-white p-4 border-0 shadow-sm">
           <div className="badge bg-primary text-white rounded-pill px-3 py-1 fs-9 uppercase-bold mb-3">{selectedStock.locId || selectedStock.loc}</div>
           <h5 className="fw-bold mb-1">{selectedStock.itemId}</h5>
           <p className="text-muted fs-8 mb-4">Lô hàng: <b>{selectedStock.lot}</b></p>
           
           <div className="d-flex flex-column gap-3 fs-8">
              <div className="d-flex justify-content-between border-bottom pb-2"><span>Số lượng tồn:</span><span className="fw-bold fs-6 text-primary">{selectedStock.qty.toLocaleString()} {selectedStock.unit}</span></div>
              <div className="d-flex justify-content-between border-bottom pb-2"><span>Trạng thái:</span><span className="text-success fw-bold">Sẵn dụng</span></div>
              <div className="d-flex justify-content-between"><span>Vị trí kho:</span><span className="fw-bold text-primary">{selectedStock.locId || selectedStock.loc}</span></div>
           </div>
           
           <div className="d-flex flex-wrap gap-2 mt-4">
              <button className="btn btn-light flex-grow-1 py-3 rounded-3 fw-bold fs-7 d-flex align-items-center justify-content-center gap-2" onClick={() => setShowModal('print')}>
                 <Printer size={18} /> IN TEM
              </button>
              <button className="btn btn-outline-secondary flex-grow-1 py-3 rounded-3 fw-bold fs-7 d-flex align-items-center justify-content-center gap-2" onClick={() => setShowModal('adjust')}>
                 <Edit size={18} /> SỬA
              </button>
              <button className="btn btn-primary w-100 py-3 rounded-3 fw-bold fs-7 shadow-lg d-flex align-items-center justify-content-center gap-2" onClick={() => setShowModal('move')}>
                 <ArrowRightLeft size={18} /> ĐIỀU CHUYỂN
              </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      {showModal === 'adjust' && <Modal />}
      {showModal === 'move' && <Modal />}
      {showModal === 'print' && <LabelPrinter data={selectedStock} onClose={() => setShowModal(null)} />}
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h4 className="fw-bold mb-1">Tồn kho thực tế</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Theo dõi số lượng tồn kho theo Vị trí, Lô hàng và Trạng thái</p>}
        </div>
        <div className="d-flex gap-2 w-100 w-md-auto">
          <div className="bg-white p-2 p-md-3 rounded-3 shadow-sm d-flex align-items-center gap-2 flex-grow-1">
            <div className="bg-success bg-opacity-10 p-2 rounded-circle text-success d-none d-md-block"><Layers size={18} /></div>
            <div>
              <div className="text-muted fs-9 uppercase-bold">Tổng SKU</div>
              <div className="fw-bold fs-7 fs-md-6">{Array.from(new Set(inventory.map(i => i.itemId))).length}</div>
            </div>
          </div>
          <div className="bg-white p-2 p-md-3 rounded-3 shadow-sm d-flex align-items-center gap-2 flex-grow-1">
            <div className="bg-danger bg-opacity-10 p-2 rounded-circle text-danger d-none d-md-block"><ShieldAlert size={18} /></div>
            <div>
              <div className="text-muted fs-9 uppercase-bold">Hàng lỗi</div>
              <div className="fw-bold fs-7 fs-md-6 text-danger">0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
        <div className="px-3 px-md-4 py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-white border shadow-sm rounded-pill px-3 fs-8 fw-bold">Tất cả</button>
            <button className="btn btn-sm btn-white border-0 text-muted rounded-pill px-3 fs-8">Sẵn dụng</button>
          </div>
          <div className="input-group" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
            <span className="input-group-text bg-transparent border-end-0 text-muted"><Search size={16} /></span>
            <input type="text" className="form-control border-start-0 fs-8" placeholder="Tìm theo SKU, Vị trí..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="table-responsive">
          {isMobile ? (
            <div className="mobile-list">
               {filtered.map((stock, idx) => (
                 <div key={idx} className="p-3 border-bottom d-flex justify-content-between align-items-center cursor-pointer active-bg-light" onClick={() => setSelectedStock(stock)}>
                    <div>
                       <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="badge bg-light text-primary border fs-9 fw-bold">{stock.locId || stock.loc}</span>
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
               {filtered.length === 0 && <div className="p-5 text-center text-muted fs-8">Không có dữ liệu tồn kho</div>}
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 fs-8">
              <thead className="bg-light text-muted-custom uppercase-bold fs-9">
                <tr><th className="px-4 py-3">VỊ TRÍ</th><th>MÃ VẬT TƯ</th><th>SỐ LÔ (LOT)</th><th className="text-center">SỐ LƯỢNG TỒN</th><th>ĐƠN VỊ</th><th>TRẠNG THÁI</th><th className="text-end px-4">THAO TÁC</th></tr>
              </thead>
              <tbody>
                {filtered.map((stock, idx) => (
                  <tr key={idx}>
                    <td className="px-4"><span className="badge bg-light text-primary border border-primary-subtle rounded-pill px-3 fw-bold">{stock.locId || stock.loc}</span></td>
                    <td className="fw-bold">{stock.itemId}</td>
                    <td className="text-muted fw-semibold">{stock.lot}</td>
                    <td className="text-center fw-bold fs-7">{stock.qty.toLocaleString()}</td>
                    <td>{stock.unit}</td>
                    <td><span className={`badge rounded-pill px-3 bg-success-subtle text-success`}>{stock.status || 'Available'}</span></td>
                    <td className="text-end px-4">
                       <div className="d-flex justify-content-end gap-1">
                          <button className="btn btn-sm btn-light rounded-pill px-2" onClick={() => { setSelectedStock(stock); setShowModal('print'); }} title="In tem nhãn"><Printer size={14} /></button>
                          <button className="btn btn-sm btn-light rounded-pill px-2" onClick={() => { setSelectedStock(stock); setFormData({qty: stock.qty, targetLoc: ''}); setShowModal('adjust'); }} title="Điều chỉnh"><Edit size={14} /></button>
                          <button className="btn btn-sm btn-light text-primary rounded-pill px-2" onClick={() => { setSelectedStock(stock); setFormData({qty: stock.qty, targetLoc: ''}); setShowModal('move'); }} title="Điều chuyển"><ArrowRightLeft size={14} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="7" className="p-5 text-center text-muted fs-8">Không có dữ liệu tồn kho</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockInventoryView;
