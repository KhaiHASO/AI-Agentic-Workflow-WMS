import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { mockApi } from '../data/mockApi';

const SyncPanel = ({ isMobileMode = false }) => {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('10m trước');

  const handleSync = async () => {
    setSyncing(true);
    await mockApi.syncPurchaseOrders();
    setSyncing(false);
    setLastSync('Vừa xong');
  };

  return (
    <div className={`glass-card p-2 p-md-3 mb-1 border-0 shadow-sm ${isMobileMode ? 'bg-light bg-opacity-20' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className={`mb-0 fw-bold ${isMobileMode ? 'fs-9' : 'fs-8'}`}>Đồng bộ ERP FAST</h6>
        <button 
          className={`btn btn-sm ${syncing ? 'btn-secondary' : 'btn-primary'} rounded-pill px-2 py-1 d-flex align-items-center gap-1 fs-10 fw-bold`}
          onClick={handleSync}
          disabled={syncing}
        >
          <RefreshCw size={isMobileMode ? 10 : 12} className={syncing ? 'spin' : ''} />
          {syncing ? '...' : (isMobileMode ? 'SYNC' : 'Đồng bộ')}
        </button>
      </div>

      <div className="d-flex flex-column gap-1 fs-10">
        <div className="d-flex justify-content-between align-items-center text-muted-custom">
          <div className="d-flex align-items-center gap-1">
            <CheckCircle2 size={10} className="text-success" />
            <span>Master Data</span>
          </div>
          <span>{lastSync}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center text-muted-custom">
          <div className="d-flex align-items-center gap-1">
            <CheckCircle2 size={10} className="text-success" />
            <span>Đơn mua hàng</span>
          </div>
          <span>{lastSync}</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .fs-10 { font-size: 0.65rem; }
      `}} />
    </div>
  );
};

export default SyncPanel;
