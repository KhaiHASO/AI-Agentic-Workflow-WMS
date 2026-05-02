import React, { useState } from 'react';
import { 
  Search, Bell, User, LayoutDashboard, 
  FileText, ClipboardList, Database, 
  Settings, ChevronDown, Monitor, Package,
  Truck, Layers, History, Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const [activeMenu, setActiveTab] = useState(null);

  const NavItem = ({ to, label, icon: Icon, active }) => (
    <li className="nav-item">
      <Link className={`nav-link d-flex align-items-center gap-2 ${active ? 'active' : ''}`} to={to}>
        <Icon size={16} />
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="d-flex flex-column bg-white border-bottom shadow-sm z-3">
      {/* Top Bar: Brand & Profile */}
      <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom border-light">
        <Link to="/" className="d-flex align-items-center text-decoration-none text-dark">
          <div style={{ display: 'flex', gap: '3px', marginRight: '10px' }}>
            <div style={{ width: '10px', height: '18px', backgroundColor: 'var(--accent-blue)', borderRadius: '2px', transform: 'skew(-15deg)' }}></div>
            <div style={{ width: '10px', height: '18px', backgroundColor: 'var(--accent-blue)', borderRadius: '2px', transform: 'skew(-15deg)', opacity: 0.7 }}></div>
          </div>
          <div>
            <div className="fw-bold fs-6" style={{ lineHeight: '1' }}>Navexa WMS</div>
            <div className="text-muted-custom fs-9 uppercase-bold mt-1">Hệ thống điều hành kho EPE</div>
          </div>
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <div className="search-bar-header d-none d-lg-flex align-items-center bg-light rounded-pill px-3 py-1">
            <Search size={14} className="text-muted me-2" />
            <input type="text" className="form-control form-control-sm border-0 bg-transparent fs-8" placeholder="Tìm nhanh (Ctrl + K)..." style={{ width: '200px', boxShadow: 'none' }} />
          </div>
          
          <div className="vr mx-2" style={{ height: '20px' }}></div>
          
          <button className="icon-btn border-0 sm-btn"><Bell size={18} /></button>
          <div className="d-flex align-items-center gap-2 ps-2 cursor-pointer">
            <div className="bg-primary bg-opacity-10 text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>A</div>
            <div className="d-none d-md-block">
               <div className="fw-bold fs-8 lh-1">Admin</div>
               <div className="text-muted fs-9">Supervisor</div>
            </div>
            <ChevronDown size={14} className="text-muted" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-3">
        <ul className="nav nav-pills nav-pills-custom py-1 gap-1">
          <NavItem to="/" label="Giám sát Kho" icon={Monitor} active={location.pathname === '/'} />
          
          <div className="vr mx-2 my-2 opacity-50"></div>
          
          <NavItem to="/docs" label="Vận hành (PO/SO)" icon={FileText} active={location.pathname === '/docs'} />
          
          <li className="nav-item dropdown-custom position-relative">
            <button className={`nav-link d-flex align-items-center gap-2 ${location.pathname.startsWith('/inventory') || location.pathname === '/ledger' ? 'active' : ''}`}>
              <Layers size={16} />
              <span>Kho hàng</span>
              <ChevronDown size={12} />
            </button>
            <div className="dropdown-menu-custom shadow-lg rounded-3 border-light p-2">
               <Link className="dropdown-item d-flex align-items-center gap-3 rounded-2" to="/inventory">
                  <div className="bg-success bg-opacity-10 p-2 rounded text-success"><Package size={16} /></div>
                  <div><div className="fw-bold fs-8">Tồn kho thực tế</div><div className="fs-9 text-muted">Xem vị trí & lô hàng</div></div>
               </Link>
               <Link className="dropdown-item d-flex align-items-center gap-3 rounded-2" to="/ledger">
                  <div className="bg-primary bg-opacity-10 p-2 rounded text-primary"><History size={16} /></div>
                  <div><div className="fw-bold fs-8">Sổ kho (Ledger)</div><div className="fs-9 text-muted">Lịch sử biến động</div></div>
               </Link>
            </div>
          </li>

          <NavItem to="/master" label="Danh mục" icon={Database} active={location.pathname === '/master'} />
          
          <NavItem to="/audit" label="Hệ thống" icon={Activity} active={location.pathname === '/audit'} />

          <div className="ms-auto d-flex align-items-center pe-2">
            <Link to="/mobile" className="btn btn-dark btn-sm rounded-pill px-3 shadow-sm fs-9 fw-bold d-flex align-items-center gap-2 transition-all">
               <LayoutDashboard size={14} /> SCANNER MODE
            </Link>
          </div>
        </ul>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sm-btn { width: 32px; height: 32px; border-radius: 10px; }
        .dropdown-custom:hover .dropdown-menu-custom { 
          display: block; 
          opacity: 1; 
          transform: translateY(0); 
          pointer-events: auto;
        }
        .dropdown-menu-custom {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          width: 260px;
          background: white;
          z-index: 1000;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.2s ease;
          pointer-events: none;
          margin-top: 2px;
        }
        .dropdown-item {
          padding: 10px 12px;
          color: var(--text-main);
          text-decoration: none;
          transition: background 0.2s;
        }
        .dropdown-item:hover { background: var(--bg-page); }
        .cursor-pointer { cursor: pointer; }
      `}} />
    </div>
  );
};

export default TopNav;
