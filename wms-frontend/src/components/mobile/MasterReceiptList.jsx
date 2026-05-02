import React, { useState } from 'react';
import MobileLayout from './MobileLayout';
import { useNavigate } from 'react-router-dom';
import { Truck, ChevronRight, Plus, Search, Calendar, FileText } from 'lucide-react';
import { masterReceipts } from '../../data/mockData';

const MasterReceiptList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReceipts = masterReceipts.filter(mr => 
    mr.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mr.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mr.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MobileLayout title="Gom chuyến (Master Receipt)" showBack={true}>
      <div className="mb-3">
        <p className="text-muted-custom fs-8 allow-wrap">Chọn chuyến xe đang đợi tại Dock hoặc tạo chuyến mới để bắt đầu gom nhiều PO.</p>
      </div>

      {/* Search & Action */}
      <div className="d-flex gap-2 mb-4">
        <div className="position-relative flex-grow-1">
          <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
          <input 
            type="text" 
            className="form-control rounded-pill ps-5 border-0 shadow-sm fs-8" 
            placeholder="Tìm biển số, NCC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary rounded-circle p-2 shadow-sm">
          <Plus size={24} />
        </button>
      </div>

      {/* Active Receipts List */}
      <div className="d-flex flex-column gap-3">
        <h6 className="fw-bold fs-7 px-1 uppercase text-muted">CHUYẾN ĐANG THỰC HIỆN ({filteredReceipts.length})</h6>
        
        {filteredReceipts.map((mr) => (
          <div 
            key={mr.id} 
            className="bg-white rounded-4 p-3 shadow-sm border-0 position-relative overflow-hidden"
            onClick={() => navigate('/mobile/inbound')}
            style={{ cursor: 'pointer' }}
          >
            {/* Status Ribbon */}
            <div className="position-absolute top-0 end-0 bg-warning text-dark px-3 py-1 fs-10 fw-bold rounded-bottom-start shadow-sm">
              ĐANG QUÉT
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                <Truck size={28} />
              </div>
              <div>
                <div className="fw-bold fs-5 text-main">{mr.vehicle}</div>
                <div className="text-muted-custom fs-8">{mr.supplier}</div>
              </div>
            </div>

            <div className="bg-light rounded-3 p-2 mb-3">
               <div className="d-flex align-items-center gap-2 mb-1">
                  <FileText size={14} className="text-muted" />
                  <span className="fs-9 text-muted fw-bold">GOM TỪ {mr.poRefs.length} ĐƠN HÀNG (PO)</span>
               </div>
               <div className="d-flex gap-1 flex-wrap">
                  {mr.poRefs.map(po => (
                    <span key={po} className="badge bg-white text-primary border border-primary border-opacity-25 rounded-pill fs-10">{po}</span>
                  ))}
               </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-1 text-muted">
                <Calendar size={14} />
                <span className="fs-9">Khởi tạo: 08:30 Hôm nay</span>
              </div>
              <div className="fw-bold text-primary fs-8 d-flex align-items-center">
                VÀO QUÉT <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .rounded-bottom-start { border-bottom-left-radius: 12px; }
        .fs-10 { font-size: 0.65rem; }
      `}} />
    </MobileLayout>
  );
};

export default MasterReceiptList;
