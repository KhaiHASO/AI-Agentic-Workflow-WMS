import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Box, History, 
  TrendingUp, AlertCircle, Printer, 
  Edit, ArrowRightLeft, CheckCircle2 
} from 'lucide-react';
import { db } from '../data/centralizedDataStore';
import WebAdminLayout from '../App'; // We'll handle layout in App.jsx routing
import LabelPrinter from './LabelPrinter';

const LocationDetail = () => {
  const { locId } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [showPrint, setShowPrint] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    
    const loadData = () => {
      const items = db.state.inventory.filter(i => i.locId === locId || i.loc === locId);
      const info = db.state.locations.find(l => l.id === locId) || { id: locId, name: 'Khu vực chức năng', type: 'Unknown' };
      setInventory(items);
      setLocationInfo(info);
    };

    loadData();
    const unsub = db.subscribe(loadData);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      unsub();
    };
  }, [locId]);

  if (!locationInfo) return <div className="p-5 text-center">Đang tải dữ liệu vị trí...</div>;

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      {showPrint && <LabelPrinter data={{ itemId: locId, itemName: `VỊ TRÍ: ${locId}`, unit: 'Location' }} onClose={() => setShowPrint(false)} />}
      
      {/* Header Navigation */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-white shadow-sm rounded-circle p-2 border-0" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h4 className="fw-bold mb-0">Chi tiết vị trí: {locId}</h4>
          <p className="text-muted-custom fs-8 mb-0">{locationInfo.name} • {locationInfo.warehouse || 'Kho chính'}</p>
        </div>
        <div className="ms-auto d-flex gap-2">
           <button className="btn btn-white shadow-sm border-0 rounded-3 px-3 d-none d-md-flex align-items-center gap-2 fs-8 fw-bold" onClick={() => setShowPrint(true)}>
              <Printer size={16} /> IN MÃ VỊ TRÍ
           </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Statistics Cards */}
        <div className="col-md-8">
           <div className="row g-3">
              <div className="col-6 col-md-4">
                <div className="glass-card bg-white p-3 border-0 shadow-sm h-100">
                   <div className="text-muted fs-10 uppercase-bold mb-1">LOẠI VỊ TRÍ</div>
                   <div className="fw-bold fs-6 text-primary">{locationInfo.type}</div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="glass-card bg-white p-3 border-0 shadow-sm h-100">
                   <div className="text-muted fs-10 uppercase-bold mb-1">TỈ LỆ LẤP ĐẦY</div>
                   <div className="d-flex align-items-center gap-2">
                      <div className="fw-bold fs-6">{inventory.length > 0 ? '85%' : '0%'}</div>
                      <div className="progress flex-grow-1" style={{ height: '4px' }}>
                        <div className="progress-bar bg-success" style={{ width: inventory.length > 0 ? '85%' : '0%' }}></div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="glass-card bg-white p-3 border-0 shadow-sm h-100">
                   <div className="text-muted fs-10 uppercase-bold mb-1">TỔNG SKU ĐANG LƯU</div>
                   <div className="fw-bold fs-6">{inventory.length} mã hàng</div>
                </div>
              </div>
           </div>

           {/* Inventory List Table */}
           <div className="glass-card bg-white border-0 shadow-sm overflow-hidden mt-4">
              <div className="p-3 border-bottom bg-light bg-opacity-50">
                 <h6 className="fw-bold mb-0 fs-8 uppercase">DANH SÁCH VẬT TƯ THỰC TẾ</h6>
              </div>
              <div className="table-responsive">
                 <table className="table table-hover align-middle mb-0 fs-8">
                    <thead className="bg-light text-muted uppercase fs-9">
                       <tr><th className="px-3">MÃ VẬT TƯ</th><th>SỐ LÔ</th><th className="text-center">SỐ LƯỢNG</th><th>TRẠNG THÁI</th><th className="text-end px-3">HÀNH ĐỘNG</th></tr>
                    </thead>
                    <tbody>
                       {inventory.map((item, idx) => (
                         <tr key={idx}>
                            <td className="px-3">
                               <div className="fw-bold">{item.itemId}</div>
                               <div className="text-muted fs-10">{db.state.items.find(it => it.id === item.itemId)?.name}</div>
                            </td>
                            <td><span className="badge bg-light text-dark border fw-normal">{item.lot}</span></td>
                            <td className="text-center fw-bold text-primary">{item.qty.toLocaleString()} {item.unit}</td>
                            <td><span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2">Khả dụng</span></td>
                            <td className="text-end px-3">
                               <button className="btn btn-sm btn-light rounded-pill p-1 px-2" title="Chuyển đi"><ArrowRightLeft size={14} /></button>
                            </td>
                         </tr>
                       ))}
                       {inventory.length === 0 && (
                         <tr><td colSpan="5" className="p-5 text-center text-muted fs-8">Vị trí này hiện đang trống</td></tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Audit Log / History for this Location */}
        <div className="col-md-4">
           <div className="glass-card bg-white p-0 border-0 shadow-sm h-100 overflow-hidden d-flex flex-column">
              <div className="p-3 border-bottom bg-light bg-opacity-50">
                 <h6 className="fw-bold mb-0 fs-8 uppercase">LỊCH SỬ BIẾN ĐỘNG TẠI ĐÂY</h6>
              </div>
              <div className="p-3 flex-grow-1 overflow-auto sidebar-scroll" style={{ maxHeight: '500px' }}>
                 {db.state.auditLogs.filter(log => log.details.includes(locId)).length > 0 ? (
                    db.state.auditLogs.filter(log => log.details.includes(locId)).map((log, idx) => (
                       <div key={log.id} className="d-flex gap-2 mb-4 position-relative">
                          <div className="d-flex flex-column align-items-center" style={{ width: '20px' }}>
                             <div className={`rounded-circle ${log.action.includes('Nhập') ? 'bg-success' : 'bg-primary'}`} style={{ width: '8px', height: '8px', marginTop: '6px' }}></div>
                             {idx !== 2 && <div style={{ width: '1px', flexGrow: 1, background: '#e2e8f0', margin: '4px 0' }}></div>}
                          </div>
                          <div>
                             <div className="fw-bold fs-9">{log.action}</div>
                             <div className="text-muted fs-10">{new Date(log.time).toLocaleTimeString()} • {log.user}</div>
                             <p className="fs-10 mt-1 mb-0 opacity-75">{log.details}</p>
                          </div>
                       </div>
                    ))
                 ) : (
                    <div className="text-center py-5 opacity-25">
                       <History size={48} className="mb-2" />
                       <p className="fs-9">Chưa có lịch sử giao dịch</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
