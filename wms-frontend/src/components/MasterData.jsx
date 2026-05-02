import React, { useState, useEffect } from 'react';
import { Search, Filter, Box, MapPin, Tag, RefreshCcw, Download, ChevronRight, ArrowLeft } from 'lucide-react';
import { items, locations } from '../data/mockData';

const MasterDataView = () => {
  const [activeTab, setActiveTab] = useState('items'); // 'items', 'locations'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile && selectedItem) {
     return (
        <div className="mobile-detail-view fade-in p-3 bg-light h-100">
           <button className="btn btn-white border-0 shadow-sm rounded-pill px-3 mb-3 d-flex align-items-center gap-2 fs-8 fw-bold" onClick={() => setSelectedItem(null)}>
             <ArrowLeft size={16} /> Quay lại
           </button>
           <div className="glass-card bg-white p-4 border-0 shadow-sm">
              <h5 className="fw-bold mb-1">{selectedItem.id}</h5>
              <p className="text-muted fs-8 mb-4">{selectedItem.name}</p>
              <div className="d-flex flex-column gap-3 fs-8">
                 <div className="d-flex justify-content-between border-bottom pb-2"><span>Đơn vị:</span><span className="fw-bold">{selectedItem.unit}</span></div>
                 <div className="d-flex justify-content-between border-bottom pb-2"><span>Mã vạch:</span><span className="fw-bold text-primary">{selectedItem.barcodes?.join(', ')}</span></div>
                 <div className="d-flex justify-content-between"><span>Quản lý lô:</span><span className="fw-bold">{selectedItem.isLot ? 'Có' : 'Không'}</span></div>
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Danh mục</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Quản lý Vật tư và Vị trí từ ERP FAST</p>}
        </div>
        <button className="btn btn-white border shadow-sm rounded-pill p-2 d-md-none"><RefreshCcw size={18} /></button>
        <button className="btn btn-primary shadow-sm border-0 rounded-3 px-3 d-none d-md-flex align-items-center gap-2 fs-8 fw-bold">
          <RefreshCcw size={16} /> Đồng bộ lại
        </button>
      </div>

      <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
        <div className="px-3 px-md-4 py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
          <div className="bg-light p-1 rounded-3 d-flex gap-1" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
            <button className={`btn flex-grow-1 fs-8 fw-bold py-2 rounded-2 border-0 ${activeTab === 'items' ? 'bg-white shadow-sm text-primary' : 'bg-transparent text-muted'}`} onClick={() => setActiveTab('items')}>Vật tư</button>
            <button className={`btn flex-grow-1 fs-8 fw-bold py-2 rounded-2 border-0 ${activeTab === 'locations' ? 'bg-white shadow-sm text-primary' : 'bg-transparent text-muted'}`} onClick={() => setActiveTab('locations')}>Vị trí</button>
          </div>
          <div className="input-group" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
            <span className="input-group-text bg-transparent border-end-0 text-muted"><Search size={16} /></span>
            <input type="text" className="form-control border-start-0 fs-8" placeholder="Tìm kiếm..." />
          </div>
        </div>

        <div className="table-responsive">
          {isMobile ? (
            <div className="mobile-list">
               {(activeTab === 'items' ? items : locations).map((item, idx) => (
                 <div key={idx} className="p-3 border-bottom d-flex justify-content-between align-items-center active-bg-light" onClick={() => setSelectedItem(item)}>
                    <div>
                       <div className="fw-bold fs-8">{item.id}</div>
                       <div className="text-muted fs-9">{item.name}</div>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                 </div>
               ))}
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 fs-8">
              <thead className="bg-light text-muted uppercase-bold fs-9">
                <tr><th className="px-4 py-3">MÃ</th><th>TÊN</th><th>ĐƠN VỊ / PHÂN LOẠI</th><th>THÔNG TIN CHI TIẾT</th><th className="text-end px-4">THAO TÁC</th></tr>
              </thead>
              <tbody>
                {(activeTab === 'items' ? items : locations).map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 fw-bold">{item.id}</td>
                    <td className="fw-semibold">{item.name}</td>
                    <td>{item.unit || item.type}</td>
                    <td>{item.barcodes?.join(', ') || item.warehouse}</td>
                    <td className="text-end px-4"><button className="btn btn-sm btn-outline-secondary rounded-pill px-3">Sửa</button></td>
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

export default MasterDataView;
