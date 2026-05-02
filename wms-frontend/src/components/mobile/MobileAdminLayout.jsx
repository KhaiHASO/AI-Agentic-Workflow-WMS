import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, Layers, 
  Database, Activity, Bell, User, Menu, X, Scan, PieChart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Offcanvas } from 'react-bootstrap';

const MobileAdminLayout = ({ children }) => {
  const location = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Giám sát', path: '/' },
    { icon: <PieChart size={20} />, label: 'Báo cáo', path: '/reports' },
    { icon: <Scan size={20} />, label: 'Scanner', path: '/mobile' },
    { icon: <Layers size={20} />, label: 'Tồn kho', path: '/inventory' },
    { icon: <Database size={20} />, label: 'Danh mục', path: '/master' },
  ];

  return (
    <div className="mobile-admin-wrapper d-flex flex-column bg-light h-100 vh-100 overflow-hidden w-100" style={{ height: '100dvh' }}>
      
      {/* COMPACT Mobile Header */}
      <header className="bg-white border-bottom px-3 py-2 d-flex justify-content-between align-items-center shadow-sm z-3" style={{ height: '56px' }}>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light p-2 border-0 rounded-3" onClick={() => setShowDrawer(true)}>
            <Menu size={20} />
          </button>
          <div className="fw-bold fs-6 text-main">Navexa WMS</div>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <Link to="/mobile" className="btn btn-dark btn-sm rounded-pill px-2 py-1 shadow-sm fs-9 fw-bold d-flex align-items-center gap-1 border-0">
             <Scan size={14} /> SCAN
          </Link>
          <div className="position-relative p-2">
            <Bell size={20} className="text-muted" />
            <span className="position-absolute top-0 end-0 mt-2 me-2 p-1 bg-danger border border-white rounded-circle"></span>
          </div>
          <div className="bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>A</div>
        </div>
      </header>

      {/* USE REACT-BOOTSTRAP OFFCANVAS FOR GUARANTEED OVERLAY BEHAVIOR */}
      <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="start" style={{ width: '300px', border: 'none' }}>
        <Offcanvas.Header className="bg-light border-bottom py-3">
          <Offcanvas.Title className="fw-bold uppercase-bold fs-9 text-muted mb-0">BẢNG ĐIỀU HÀNH</Offcanvas.Title>
          <button className="btn btn-white border-0 shadow-sm p-1 rounded-circle" onClick={() => setShowDrawer(false)}>
            <X size={18} />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 overflow-hidden d-flex flex-column">
           <div className="flex-grow-1 overflow-auto">
              <Sidebar isCollapsed={false} isMobileMode={true} />
           </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content Area */}
      <main className="flex-grow-1 overflow-auto bg-light p-0 w-100">
        <div className="fade-in h-100 w-100">
           {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-white border-top d-flex justify-content-around py-2 shadow-lg z-3 pb-safe w-100">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`d-flex flex-column align-items-center text-decoration-none transition-all ${location.pathname === item.path ? 'text-primary' : 'text-muted'}`}
          >
            <div className={`p-1 rounded-3 ${location.pathname === item.path ? 'text-primary' : ''}`}>
              {React.cloneElement(item.icon, { size: 20 })}
            </div>
            <span className="fs-9 mt-0 fw-bold uppercase" style={{ fontSize: '0.6rem' }}>{item.label}</span>
          </Link>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .pb-safe { padding-bottom: calc(0.5rem + env(safe-area-inset-bottom)); }
        .mobile-admin-wrapper { font-family: 'Inter', sans-serif; width: 100% !important; height: 100dvh !important; }
        .uppercase { text-transform: uppercase; }
        .transition-all { transition: all 0.2s ease-in-out; }
        
        /* Force Sidebar to overlay properly inside Offcanvas Body */
        .offcanvas-body .sidebar-wrapper-outer {
          width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          position: static !important;
        }
        .offcanvas-body .sidebar-main-container {
          width: 100% !important;
          min-width: 100% !important;
          border: none !important;
          height: 100% !important;
        }
      `}} />
    </div>
  );
};

export default MobileAdminLayout;
