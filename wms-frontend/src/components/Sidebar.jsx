import React, { useState } from 'react';
import { 
  Search, Users, Package, 
  ClipboardList, Map as MapIcon, ChevronRight, Activity
} from 'lucide-react';
import { users, locations, tasks } from '../data/mockData';
import SyncPanel from './SyncPanel';

const Sidebar = ({ isCollapsed, isMobileMode = false }) => {
  const [activeTab, setActiveTab] = React.useState('tasks');

  const getTaskIcon = (type) => {
    switch (type) {
      case 'Putaway': return <Package size={isMobileMode ? 14 : 16} className="text-primary" />;
      case 'Pick': return <ClipboardList size={isMobileMode ? 14 : 16} className="text-warning" />;
      default: return <Activity size={isMobileMode ? 14 : 16} className="text-info" />;
    }
  };

  return (
    <div className={`sidebar-wrapper-outer d-flex transition-all ${isCollapsed ? 'collapsed' : ''} ${isMobileMode ? 'mobile-mode' : ''}`}>
      
      {/* Actual Sidebar Content */}
      <div className="sidebar-main-container d-flex flex-column bg-white border-end h-100 shadow-sm">
        
        {/* Sidebar Header */}
        <div className={isMobileMode ? 'p-3 border-bottom' : 'p-4 border-bottom'}>
          <SyncPanel isMobileMode={isMobileMode} />
          
          <div className={`d-flex justify-content-between align-items-center ${isMobileMode ? 'mt-3 mb-2' : 'mt-4 mb-3'} no-wrap-container`}>
            <h6 className={`fw-bold mb-0 text-main no-wrap ${isMobileMode ? 'fs-7' : 'fs-5'}`}>Bảng điều hành</h6>
            {!isMobileMode && <button className="icon-btn border-0 shadow-sm"><Search size={16} /></button>}
          </div>

          {/* Tab Control */}
          <div className="bg-light p-1 rounded-3 d-flex gap-1 no-wrap-container">
            {[
              { id: 'tasks', label: 'Nhiệm vụ', icon: <ClipboardList size={14} /> },
              { id: 'workers', label: 'Nhân sự', icon: <Users size={14} /> },
              { id: 'locations', label: 'Vị trí', icon: <MapIcon size={14} /> }
            ].map(tab => (
              <button 
                key={tab.id}
                className={`btn flex-grow-1 d-flex align-items-center justify-content-center gap-2 fs-9 fw-bold py-2 rounded-2 transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-primary border-0' : 'text-muted border-0 bg-transparent'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className={isMobileMode ? 'd-none d-sm-inline' : 'tab-label'}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-grow-1 sidebar-scroll p-2 p-md-3 bg-light bg-opacity-50">
          {activeTab === 'tasks' && (
            <div className="fade-in">
              <span className="uppercase-bold fs-9 text-muted px-2 mb-2 d-block">NHIỆM VỤ ({tasks.length})</span>
              {tasks.map(task => (
                <div key={task.id} className="glass-card bg-white p-2 p-md-3 mb-2 border-0 shadow-sm hover-up">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="d-flex align-items-center gap-1">
                      <div className="bg-light p-1 rounded-circle">{getTaskIcon(task.type)}</div>
                      <span className="fw-bold fs-9">{task.type}</span>
                    </div>
                    <span className="text-muted fs-9 fw-bold">#{task.id}</span>
                  </div>
                  <div className="fw-bold fs-8 mb-2 text-dark truncate-text">{task.itemId}</div>
                  <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded-2 fs-9">
                    <div className="d-flex flex-column overflow-hidden" style={{ flex: 1 }}>
                      <span className="text-muted fs-10 uppercase-bold">Từ</span>
                      <span className="fw-bold truncate-text">{task.from}</span>
                    </div>
                    <ChevronRight size={12} className="text-muted mx-1 flex-shrink-0" />
                    <div className="d-flex flex-column text-end overflow-hidden" style={{ flex: 1 }}>
                      <span className="text-muted fs-10 uppercase-bold">Đến</span>
                      <span className="fw-bold truncate-text">{task.to}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'workers' && (
            <div className="fade-in">
              <span className="uppercase-bold fs-9 text-muted px-2 mb-2 d-block">NHÂN VIÊN</span>
              {users.map(user => (
                <div key={user.id} className="bg-white p-2 rounded-3 shadow-sm mb-2 d-flex align-items-center gap-2 border-0">
                  <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
                    <Users size={16} />
                  </div>
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-bold fs-8 truncate-text">{user.name}</div>
                    <div className="text-muted-custom fs-9 truncate-text">{user.role}</div>
                  </div>
                  <div className="status-dot available flex-shrink-0"></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="fade-in">
              <span className="uppercase-bold fs-9 text-muted px-2 mb-2 d-block">VỊ TRÍ</span>
              <div className="row g-2">
                {locations.map(loc => (
                  <div key={loc.id} className="col-6">
                    <div className="bg-white p-2 rounded-3 shadow-sm border-0 h-100">
                      <div className="fw-bold fs-8 text-primary truncate-text">{loc.id}</div>
                      <div className="text-muted fs-10 fw-semibold truncate-text">{loc.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-wrapper-outer { width: 400px; height: 100%; position: relative; z-index: 50; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebar-wrapper-outer.collapsed { width: 0; }
        .sidebar-main-container { width: 400px; min-width: 400px; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebar-wrapper-outer.collapsed .sidebar-main-container { transform: translateX(-100%); }
        .truncate-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fs-10 { font-size: 0.6rem; }
        .no-wrap { white-space: nowrap; }
        .no-wrap-container { overflow: hidden; }
        
        /* Mobile Mode Specifics */
        .sidebar-wrapper-outer.mobile-mode { width: 100% !important; }
        .sidebar-wrapper-outer.mobile-mode .sidebar-main-container { width: 100% !important; min-width: 100% !important; }
      `}} />
    </div>
  );
};

export default Sidebar;
