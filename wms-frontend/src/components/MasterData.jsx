import React, { useState, useEffect } from 'react';
import { Search, Filter, Box, MapPin, Tag, RefreshCcw, Download, ChevronRight, ArrowLeft, Plus, Edit, Trash2, X, Check, Printer } from 'lucide-react';
import { items as initialItems, locations as initialLocations } from '../data/mockData';
import { db } from '../data/centralizedDataStore';
import LabelPrinter from './LabelPrinter';

const MasterDataView = () => {
  const [activeTab, setActiveTab] = useState('items'); // 'items', 'locations'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // LIVE STATE from Centralized Store
  const [items, setItems] = useState(db.state.items);
  const [locations, setLocations] = useState(db.state.locations);
  const [searchTerm, setSearchTerm] = useState('');
  
  // MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [showPrintLabel, setShowPrintLabel] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    const unsub = db.subscribe(state => {
      setItems([...state.items]);
      setLocations([...state.locations]);
    });
    return () => {
      window.removeEventListener('resize', handleResize);
      unsub();
    };
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredData = (activeTab === 'items' ? items : locations).filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingEntry(null);
    setFormData(activeTab === 'items' ? { id: '', name: '', unit: '', barcodes: [], isLot: false } : { id: '', name: '', type: 'Storage', warehouse: 'Kho 1' });
    setShowModal(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setFormData({ ...entry });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục này?')) return;
    if (activeTab === 'items') db.updateItems(items.filter(i => i.id !== id));
    else db.updateLocations(locations.filter(l => l.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (activeTab === 'items') {
      if (editingEntry) db.updateItems(items.map(i => i.id === editingEntry.id ? formData : i));
      else db.updateItems([...items, formData]);
    } else {
      if (editingEntry) db.updateLocations(locations.map(l => l.id === editingEntry.id ? formData : l));
      else db.updateLocations([...locations, formData]);
    }
    setShowModal(false);
  };

  const Modal = () => (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 z-3 d-flex align-items-center justify-content-center p-3" style={{ backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSave}>
          <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">{editingEntry ? 'Cập nhật' : 'Thêm mới'} {activeTab === 'items' ? 'Vật tư' : 'Vị trí'}</h5>
            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="p-4">
            <div className="mb-3">
              <label className="fs-9 fw-bold text-muted uppercase mb-1">MÃ (ID)</label>
              <input type="text" className="form-control border-light bg-light fw-bold" required value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} disabled={editingEntry} />
            </div>
            <div className="mb-3">
              <label className="fs-9 fw-bold text-muted uppercase mb-1">TÊN HIỂN THỊ</label>
              <input type="text" className="form-control border-light bg-light" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            {activeTab === 'items' ? (
              <div className="row g-3">
                <div className="col-6">
                   <label className="fs-9 fw-bold text-muted uppercase mb-1">ĐƠN VỊ</label>
                   <input type="text" className="form-control border-light bg-light" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} />
                </div>
                <div className="col-6 d-flex align-items-center pt-4">
                   <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={formData.isLot} onChange={e => setFormData({...formData, isLot: e.target.checked})} />
                      <label className="form-check-label fs-8 fw-bold">Quản lý lô</label>
                   </div>
                </div>
              </div>
            ) : (
              <div className="mb-3">
                <label className="fs-9 fw-bold text-muted uppercase mb-1">LOẠI VỊ TRÍ</label>
                <select className="form-select border-light bg-light" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                   <option>Inbound</option>
                   <option>Storage</option>
                   <option>Quarantine</option>
                   <option>Packing</option>
                </select>
              </div>
            )}
          </div>
          <div className="p-4 bg-light rounded-bottom-4 d-flex gap-2">
            <button type="button" className="btn btn-white border-0 flex-grow-1 fw-bold py-2" onClick={() => setShowModal(false)}>HỦY</button>
            <button type="submit" className="btn btn-primary flex-grow-1 fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2">
               <Check size={18} /> LƯU DỮ LIỆU
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (isMobile && selectedItem && !showPrintLabel) {
     return (
        <div className="mobile-detail-view fade-in p-3 bg-light h-100 d-flex flex-column">
           <button className="btn btn-white border-0 shadow-sm rounded-pill px-3 mb-3 d-flex align-items-center gap-2 fs-8 fw-bold" onClick={() => setSelectedItem(null)}>
             <ArrowLeft size={16} /> Quay lại
           </button>
           <div className="glass-card bg-white p-4 border-0 shadow-sm flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-1">
                 <h5 className="fw-bold mb-0">{selectedItem.id}</h5>
                 <div className="d-flex gap-2">
                    <button className="btn btn-light p-2 rounded-circle" onClick={() => setShowPrintLabel(true)}><Printer size={16} /></button>
                    <button className="btn btn-light p-2 rounded-circle" onClick={() => { setEditingEntry(selectedItem); setFormData(selectedItem); setShowModal(true); }}><Edit size={16} /></button>
                    <button className="btn btn-light text-danger p-2 rounded-circle" onClick={() => { handleDelete(selectedItem.id); setSelectedItem(null); }}><Trash2 size={16} /></button>
                 </div>
              </div>
              <p className="text-muted fs-8 mb-4">{selectedItem.name}</p>
              <div className="d-flex flex-column gap-3 fs-8">
                 <div className="d-flex justify-content-between border-bottom pb-2"><span>Đơn vị / Loại:</span><span className="fw-bold">{selectedItem.unit || selectedItem.type}</span></div>
                 <div className="d-flex justify-content-between border-bottom pb-2"><span>Thông tin:</span><span className="fw-bold text-primary">{selectedItem.barcodes?.join(', ') || selectedItem.warehouse}</span></div>
                 <div className="d-flex justify-content-between"><span>Quản lý lô:</span><span className="fw-bold">{selectedItem.isLot ? 'Có' : 'Không'}</span></div>
              </div>
           </div>
           {showModal && <Modal />}
        </div>
     );
  }

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      {showModal && <Modal />}
      {showPrintLabel && <LabelPrinter data={selectedItem} onClose={() => setShowPrintLabel(false)} />}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Danh mục</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Quản lý Vật tư và Vị trí thời gian thực</p>}
        </div>
        <div className="d-flex gap-2">
           <button className="btn btn-white border shadow-sm rounded-pill p-2 d-md-none" onClick={openAddModal}><Plus size={18} /></button>
           <button className="btn btn-primary shadow-sm border-0 rounded-3 px-3 d-none d-md-flex align-items-center gap-2 fs-8 fw-bold" onClick={openAddModal}>
             <Plus size={16} /> Thêm mới
           </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
        <div className="px-3 px-md-4 py-3 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
          <div className="bg-light p-1 rounded-3 d-flex gap-1" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
            <button className={`btn flex-grow-1 fs-8 fw-bold py-2 rounded-2 border-0 ${activeTab === 'items' ? 'bg-white shadow-sm text-primary' : 'bg-transparent text-muted'}`} onClick={() => setActiveTab('items')}>Vật tư</button>
            <button className={`btn flex-grow-1 fs-8 fw-bold py-2 rounded-2 border-0 ${activeTab === 'locations' ? 'bg-white shadow-sm text-primary' : 'bg-transparent text-muted'}`} onClick={() => setActiveTab('locations')}>Vị trí</button>
          </div>
          <div className="input-group" style={{ maxWidth: isMobile ? '100%' : '300px' }}>
            <span className="input-group-text bg-transparent border-end-0 text-muted"><Search size={16} /></span>
            <input type="text" className="form-control border-start-0 fs-8" placeholder="Tìm kiếm..." value={searchTerm} onChange={handleSearch} />
          </div>
        </div>

        <div className="table-responsive">
          {isMobile ? (
            <div className="mobile-list">
               {filteredData.map((item, idx) => (
                 <div key={idx} className="p-3 border-bottom d-flex justify-content-between align-items-center active-bg-light" onClick={() => setSelectedItem(item)}>
                    <div>
                       <div className="fw-bold fs-8">{item.id}</div>
                       <div className="text-muted fs-9">{item.name}</div>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                 </div>
               ))}
               {filteredData.length === 0 && <div className="p-5 text-center text-muted fs-8">Không tìm thấy dữ liệu</div>}
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 fs-8">
              <thead className="bg-light text-muted uppercase-bold fs-9">
                <tr><th className="px-4 py-3">MÃ</th><th>TÊN</th><th>ĐƠN VỊ / PHÂN LOẠI</th><th>THÔNG TIN CHI TIẾT</th><th className="text-end px-4">THAO TÁC</th></tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 fw-bold">{item.id}</td>
                    <td className="fw-semibold">{item.name}</td>
                    <td>{item.unit || item.type}</td>
                    <td>{item.barcodes?.join(', ') || item.warehouse}</td>
                    <td className="text-end px-4">
                       <div className="d-flex justify-content-end gap-1">
                          <button className="btn btn-sm btn-light rounded-pill px-2" onClick={() => { setSelectedItem(item); setShowPrintLabel(true); }}><Printer size={14} /></button>
                          <button className="btn btn-sm btn-light rounded-pill px-2" onClick={() => openEditModal(item)}><Edit size={14} /></button>
                          <button className="btn btn-sm btn-light text-danger rounded-pill px-2" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && <tr><td colSpan="5" className="p-5 text-center text-muted fs-8">Không tìm thấy dữ liệu</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterDataView;
