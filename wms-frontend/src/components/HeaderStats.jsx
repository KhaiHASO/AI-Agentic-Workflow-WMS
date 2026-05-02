import React, { useState } from 'react';
import { 
  Users, Package, TrendingUp, CheckCircle, 
  ArrowUpRight, ArrowDownRight, Clock,
  MoreVertical, ChevronRight, Activity
} from 'lucide-react';
import { kpis, tasks } from '../data/mockData';
import StatSparkline from './StatSparkline';

const HeaderStats = () => {
  const statCards = [
    { label: 'Nhân sự', value: kpis.activeWorkers, sub: 'Online', color: 'primary' },
    { label: 'PO Chờ', value: kpis.pendingInbound, sub: 'Lệnh nhập', color: 'success' },
    { label: 'SO Chờ', value: kpis.pendingOutbound, sub: 'Lệnh xuất', color: 'blue' },
    { label: 'Chính xác', value: `${kpis.inventoryAccuracy}%`, sub: 'Tồn kho', color: 'success' }
  ];

  return (
    <div className="bg-white border-bottom px-4 py-2">
      <div className="row g-3">
        {statCards.map((stat, idx) => (
          <div key={idx} className="col-md-3 border-end last-no-border">
            <div className="d-flex align-items-center justify-content-between pe-3">
              <div>
                <div className="text-muted-custom fs-9 uppercase-bold mb-0">{stat.label}</div>
                <div className="d-flex align-items-baseline gap-2">
                  <span className="fw-bold fs-6">{stat.value}</span>
                  <span className="fs-9 text-muted">{stat.sub}</span>
                </div>
              </div>
              <StatSparkline color={`var(--accent-${stat.color === 'blue' ? 'blue' : stat.color})`} data={[10, 15, 8, 12, 14]} />
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .last-no-border:last-child { border-right: none !important; }
      `}} />
    </div>
  );
};

export default HeaderStats;
