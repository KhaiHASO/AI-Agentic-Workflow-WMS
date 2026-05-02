import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, ArrowRight, ChevronRight, ArrowLeft, History, Box, User, Calendar } from 'lucide-react';
import { db } from '../data/centralizedDataStore';

const InventoryLedgerView = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [logs, setLogs] = useState(db.state.auditLogs);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    const unsub = db.subscribe(state => setLogs([...state.auditLogs]));
    return () => {
      window.removeEventListener('resize', handleResize);
      unsub();
    };
  }, []);

  const getLogIcon = (action) => {
    if (action.includes('Nhập')) return <Box size={16} className="text-success" />;
    if (action.includes('Điều chuyển')) return <ArrowRight size={16} className="text-primary" />;
    return <History size={16} className="text-muted" />;
  };

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Sổ kho thời gian thực</h4>
          {!isMobile && <p className="text-muted-custom fs-8">Nhật ký bất biến ghi lại mọi biến động tồn kho từ Admin & Scanner</p>}
        </div>
        <button className="btn btn-white shadow-sm border-0 rounded-3 px-3 d-none d-md-flex align-items-center gap-2 fs-8 fw-bold">
           <Download size={16} /> Xuất báo cáo
        </button>
      </div>

      <div className="timeline-container">
        {logs.map((log, idx) => (
          <div key={log.id} className="bg-white rounded-4 p-3 shadow-sm mb-3 border-0 d-flex gap-3 position-relative fade-in">
            <div className="d-flex flex-column align-items-center" style={{ width: '32px' }}>
               <div className="p-2 bg-light rounded-circle">
                  {getLogIcon(log.action)}
               </div>
               {idx !== logs.length - 1 && <div style={{ width: '2px', flexGrow: 1, backgroundColor: '#f1f5f9', marginTop: '8px' }}></div>}
            </div>
            
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <h6 className="fw-bold mb-0 fs-7 text-main">{log.action}</h6>
                <span className="text-muted fs-9 d-flex align-items-center gap-1"><Calendar size={10} /> {new Date(log.time).toLocaleTimeString()}</span>
              </div>
              <p className="text-muted-custom fs-8 mb-2 allow-wrap">{log.details}</p>
              <div className="d-flex align-items-center gap-3">
                 <div className="d-flex align-items-center gap-1">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '18px', height: '18px', fontSize: '0.6rem' }}>
                       {log.user.charAt(0)}
                    </div>
                    <span className="fs-9 fw-bold text-muted">{log.user}</span>
                 </div>
                 <span className="fs-9 text-muted">• {log.action.includes('Nhập') ? 'Thiết bị Scanner' : 'Web Admin'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryLedgerView;
