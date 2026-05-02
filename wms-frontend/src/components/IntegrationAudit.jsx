import React, { useState, useEffect } from 'react';
import { 
  History, Send, AlertCircle, CheckCircle2, 
  RefreshCcw, Search, Filter, ArrowUpRight, ArrowDownLeft, ChevronRight,
  Database, Activity, Cpu
} from 'lucide-react';
import { integrationLogs as initialLogs } from '../data/mockData';
import { db } from '../data/centralizedDataStore';

const IntegrationAudit = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const runSync = () => {
    setIsSyncing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          const newLog = {
            id: 'SN' + Date.now(),
            api: '/v1/purchase-orders/sync',
            direction: 'In',
            status: 'Success',
            time: new Date().toISOString()
          };
          setLogs([newLog, ...logs]);
          db.logAction('Đồng bộ ERP', 'Đã cập nhật dữ liệu PO/SO mới nhất từ ERP FAST');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success': return <span className="badge bg-success-subtle text-success border-0 rounded-pill px-3 py-1">Hoàn thành</span>;
      case 'Failed': return <span className="badge bg-danger-subtle text-danger border-0 rounded-pill px-3 py-1">Lỗi kết nối</span>;
      default: return <span className="badge bg-secondary-subtle text-secondary border-0 rounded-pill px-3 py-1">Chờ</span>;
    }
  };

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Kiểm toán tích hợp</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Giám sát bản tin đồng bộ dữ liệu thời gian thực với ERP FAST</p>}
        </div>
        <button 
          className={`btn ${isSyncing ? 'btn-light disabled' : 'btn-primary'} shadow-sm rounded-pill px-4 fs-8 fw-bold d-flex align-items-center gap-2`}
          onClick={runSync}
        >
          <RefreshCcw size={16} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? `Đang đồng bộ ${progress}%` : 'Đồng bộ ngay'}
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-8">
           <div className="glass-card overflow-hidden bg-white border-0 shadow-sm">
             {!isMobile && <div className="px-4 py-3 border-bottom fs-8 fw-bold uppercase-bold text-muted d-flex justify-content-between">
                <span>NHẬT KÝ GIAO DỊCH GẦN ĐÂY</span>
                <span className="text-primary cursor-pointer">Xem tất cả</span>
             </div>}
             
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
                      <tr><th className="px-4 py-3">THỜI GIAN</th><th>CHIỀU</th><th>ENDPOINT / API</th><th>TRẠNG THÁI</th><th className="text-end px-4">HÀNH ĐỘNG</th></tr>
                    </thead>
                    <tbody>
                      {logs.map((log) => (
                        <tr key={log.id}>
                          <td className="px-4 text-muted">{new Date(log.time).toLocaleString('vi-VN')}</td>
                          <td>
                             <span className={`badge ${log.direction === 'In' ? 'bg-info-subtle text-info' : 'bg-warning-subtle text-warning'} border-0 px-2`}>
                                {log.direction === 'In' ? 'ERP ➔ WMS' : 'WMS ➔ ERP'}
                             </span>
                          </td>
                          <td className="fw-bold">{log.api}</td>
                          <td>{getStatusBadge(log.status)}</td>
                          <td className="text-end px-4"><button className="btn btn-sm btn-light border rounded-pill px-3">Log chi tiết</button></td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               )}
             </div>
           </div>
        </div>

        <div className="col-md-4">
           <div className="glass-card bg-white p-4 border-0 shadow-sm mb-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                 <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4"><Database size={24} /></div>
                 <div>
                    <h6 className="fw-bold mb-0 text-main">ERP FAST Core</h6>
                    <span className="text-success fs-9 fw-bold d-flex align-items-center gap-1"><div className="status-dot available"></div> ĐÃ KẾT NỐI</span>
                 </div>
              </div>
              <div className="d-flex flex-column gap-3 fs-8 border-top pt-4">
                 <div className="d-flex justify-content-between"><span>Địa chỉ API:</span><span className="text-muted">api.fast.com.vn/v1</span></div>
                 <div className="d-flex justify-content-between"><span>Độ trễ trung bình:</span><span className="text-success fw-bold">42ms</span></div>
                 <div className="d-flex justify-content-between"><span>Lần cuối Sync:</span><span className="fw-bold">Vừa xong</span></div>
              </div>
           </div>

           <div className="bg-dark p-4 rounded-4 shadow-sm text-white position-relative overflow-hidden">
              <div className="position-relative z-1">
                 <div className="d-flex align-items-center gap-2 mb-2">
                    <Activity size={18} className="text-info" />
                    <h6 className="fw-bold mb-0">Tự động hóa</h6>
                 </div>
                 <p className="fs-9 mb-4 opacity-75 allow-wrap">Hệ thống đang tự động kiểm tra thay đổi trên ERP mỗi 5 phút một lần để đảm bảo dữ liệu kho luôn mới nhất.</p>
                 <button className="btn btn-info btn-sm fw-bold rounded-pill px-3 text-white w-100">Cấu hình lịch chạy</button>
              </div>
              <RefreshCcw size={120} className="position-absolute end-0 bottom-0 opacity-10 translate-middle-y me-n4" />
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default IntegrationAudit;
