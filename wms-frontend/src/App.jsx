import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import HeaderStats from './components/HeaderStats';
import Sidebar from './components/Sidebar';
import WarehouseMap from './components/WarehouseMap';
import AnalyticsCards from './components/AnalyticsCards';
import IntegrationAudit from './components/IntegrationAudit';
import InventoryLedger from './components/InventoryLedger';
import InventoryStock from './components/InventoryStock';
import MasterData from './components/MasterData';
import DocumentDashboard from './components/DocumentDashboard';
import ReportCenter from './components/ReportCenter';
import MobileAdminLayout from './components/mobile/MobileAdminLayout';
import { Maximize2, Minimize2 } from 'lucide-react';

// Mobile Components
import ScannerHome from './components/mobile/ScannerHome';
import InboundDraft from './components/mobile/InboundDraft';
import DraftLineDetail from './components/mobile/DraftLineDetail';
import PutawayTask from './components/mobile/PutawayTask';
import PickingTask from './components/mobile/PickingTask';
import CycleCount from './components/mobile/CycleCount';
import MobileDashboard from './components/mobile/MobileDashboard';
import MasterReceiptList from './components/mobile/MasterReceiptList';

// Import CSS
import './styles/app.css';
import './styles/mobile.css';

const WebAdminLayout = ({ children, layoutState, showStats = true, showSidebar = false }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <MobileAdminLayout>{children}</MobileAdminLayout>;
  }

  return (
    <div className="dashboard-container w-100 vh-100 d-flex flex-column overflow-hidden">
      <TopNav />
      {showStats && <HeaderStats />}

      <div className="main-content-wrapper d-flex flex-grow-1 overflow-hidden position-relative">
        {/* Sidebar only shows if explicitly requested (usually only on Home/Map) */}
        {showSidebar && layoutState && (
          <Sidebar isCollapsed={layoutState.isAllHidden} />
        )}
        
        <div className="main-view-area flex-grow-1 d-flex flex-column overflow-hidden position-relative bg-light w-100">
          {children}

          {/* Unified Toggle Button - Only show on Home view where sidebar is present */}
          {showSidebar && layoutState && (
            <button 
              className={`unified-toggle-btn shadow-lg transition-all d-flex ${layoutState.isAllHidden ? 'state-hidden' : 'state-visible'}`}
              onClick={() => layoutState.setIsAllHidden(!layoutState.isAllHidden)}
            >
              {layoutState.isAllHidden ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
            </button>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .unified-toggle-btn {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: white;
          color: var(--text-main);
          border: 1.5px solid var(--line-gray);
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .unified-toggle-btn.state-visible { left: 12px; bottom: 192px; }
        .unified-toggle-btn.state-hidden { left: 12px; bottom: 12px; background: var(--accent-blue); color: white; border-color: var(--accent-blue); }
      `}} />
    </div>
  );
};

const DashboardHome = ({ layoutState }) => (
  <div className="d-flex flex-column h-100 w-100 overflow-hidden">
    <div className="flex-grow-1 position-relative overflow-hidden">
      <WarehouseMap />
    </div>
    <AnalyticsCards isMinimized={layoutState.isAllHidden} />
  </div>
);

function App() {
  const [isAllHidden, setIsAllHidden] = useState(false);
  const layoutState = { isAllHidden, setIsAllHidden };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebAdminLayout layoutState={layoutState} showStats={true} showSidebar={true}><DashboardHome layoutState={layoutState} /></WebAdminLayout>} />
        
        <Route path="/docs" element={<WebAdminLayout showStats={false} showSidebar={false}><DocumentDashboard /></WebAdminLayout>} />
        <Route path="/inventory" element={<WebAdminLayout showStats={false} showSidebar={false}><InventoryStock /></WebAdminLayout>} />
        <Route path="/ledger" element={<WebAdminLayout showStats={false} showSidebar={false}><InventoryLedger /></WebAdminLayout>} />
        <Route path="/master" element={<WebAdminLayout showStats={false} showSidebar={false}><MasterData /></WebAdminLayout>} />
        <Route path="/audit" element={<WebAdminLayout showStats={false} showSidebar={false}><IntegrationAudit /></WebAdminLayout>} />
        <Route path="/reports" element={<WebAdminLayout showStats={false} showSidebar={false}><ReportCenter /></WebAdminLayout>} />
        
        {/* Scanner Mode */}
        <Route path="/mobile" element={<ScannerHome />} />
        <Route path="/mobile/receipts" element={<MasterReceiptList />} />
        <Route path="/mobile/inbound" element={<InboundDraft />} />
        <Route path="/mobile/draft/:lineId" element={<DraftLineDetail />} />
        <Route path="/mobile/putaway" element={<PutawayTask />} />
        <Route path="/mobile/picking" element={<PickingTask />} />
        <Route path="/mobile/cycle-count" element={<CycleCount />} />
        <Route path="/mobile/dashboard" element={<MobileDashboard />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
