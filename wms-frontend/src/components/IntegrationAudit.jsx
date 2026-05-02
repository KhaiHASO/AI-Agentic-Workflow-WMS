import React, { useState, useEffect } from 'react';
import { 
  History, Send, AlertCircle, CheckCircle2, 
  RefreshCcw, Search, Filter, ArrowUpRight, ArrowDownLeft, ChevronRight 
} from 'lucide-react';
import { integrationLogs } from '../data/mockData';

const IntegrationAudit = () => {
  const [logs, setLogs] = useState(integrationLogs);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success': return <span className="badge bg-success-subtle text-success border-0 rounded-pill px-2">Xong</span>;
      case 'Failed': return <span className="badge bg-danger-subtle text-danger border-0 rounded-pill px-2">Lỗi</span>;
      default: return <span className="badge bg-secondary-subtle text-secondary border-0 rounded-pill px-2">Chờ</span>;
    }
  };

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Hệ thống</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Giám sát bản tin đồng bộ ERP FAST</p>}
        </div>
        <button className="btn btn-primary shadow-sm rounded-pill px-3 fs-8 fw-bold d-flex align-items-center gap-2">
           <RefreshCcw size={16} /> <span className="d-none d-md-inline">Làm mới</span>
        </button>
      </div>

      {!isMobile && (
        <div className="row g-3 mb-4">
          <div className="col-md-4"><div className="glass-card bg-white p-3 border-0 shadow-sm">
            <div className="text-muted fs-9 uppercase-bold mb-1">Tỉ lệ thành công</div>
            <div className="fs-4 fw-bold">99.8%</div>
          </div></div>
          <div className="col-md-4"><div className="glass-card bg-white p-3 border-0 shadow-sm">
            <div className="text-muted fs-9 uppercase-bold mb-1">Lỗi tồn đọng</div>
            <div className="fs-4 fw-bold text-danger">3</div>
          </div></div>
          <div className="col-md-4"><div className="glass-card bg-white p-3 border-0 shadow-sm">
            <div className="text-muted fs-9 uppercase-bold mb-1">Bản tin (24h)</div>
            <div className="fs-4 fw-bold">1,284</div>
          </div></div>
        </div>
      )}

      <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
        {!isMobile && <div className="px-4 py-3 border-bottom fs-8 fw-bold uppercase-bold text-muted">NHẬT KÝ GIAO DỊCH</div>}
        
        <div className="table-responsive">
          {isMobile ? (
            <div className="mobile-list">
               {logs.map((log) => (
                 <div key={log.id} className="p-3 border-bottom d-flex justify-content-between align-items-center active-bg-light">
                    <div>
                       <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="fw-bold fs-8 text-primary">{log.api}</span>
                          {getStatusBadge(log.status)}
                       </div>
                       <div className="text-muted fs-9">{log.direction === 'Out' ? 'WMS ➔ ERP' : 'ERP ➔ WMS'} • {new Date(log.time).toLocaleTimeString('vi-VN')}</div>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                 </div>
               ))}
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0 fs-8">
               <thead className="bg-light text-muted uppercase-bold fs-9">
                 <tr><th className="px-4 py-3">THỜI GIAN</th><th>CHIỀU</th><th>ENDPOINT</th><th>TRẠNG THÁI</th><th className="text-end px-4">THAO TÁC</th></tr>
               </thead>
               <tbody>
                 {logs.map((log) => (
                   <tr key={log.id}>
                     <td className="px-4 text-muted">{new Date(log.time).toLocaleString('vi-VN')}</td>
                     <td>{log.direction}</td>
                     <td className="fw-semibold">{log.api}</td>
                     <td>{getStatusBadge(log.status)}</td>
                     <td className="text-end px-4"><button className="btn btn-sm btn-light border rounded-pill px-2">Chi tiết</button></td>
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

export default IntegrationAudit;
