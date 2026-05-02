import React from 'react';
import WarehouseMap from './WarehouseMap';
import AnalyticsCards from './AnalyticsCards';

const DashboardHome = ({ layoutState }) => (
  <div className="d-flex flex-column h-100 w-100 overflow-hidden">
    <div className="flex-grow-1 position-relative overflow-hidden">
      <WarehouseMap />
      
      {/* Quick Scanner Mode toggle only on Mobile viewport logic inside the component if needed, 
          but App.jsx handles layout switching. We can add a floating button here for mobile admin specifically if we want. */}
    </div>
    
    {/* Analytics cards are shown here on Home view */}
    <AnalyticsCards isMinimized={layoutState.isAllHidden} />
  </div>
);

export default DashboardHome;
