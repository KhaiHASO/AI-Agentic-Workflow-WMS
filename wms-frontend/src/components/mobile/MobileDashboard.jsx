import React from 'react';
import MobileLayout from './MobileLayout';
import { analytics } from '../../data/mockData';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { SlidersHorizontal, ArrowUpRight, Target, PackageCheck } from 'lucide-react';

const MobileDashboard = () => {
  const chartData = analytics.dailyPickedOrders.data.map((val, i) => ({ name: `D${i}`, value: val }));

  return (
    <MobileLayout title="Dashboard Vận hành">
      <div className="mobile-swipe-container d-flex gap-3 pb-4">
        
        {/* Workload Card */}
        <div className="swipe-card bg-white rounded-4 p-3 shadow-sm border-0 flex-shrink-0">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <div className="text-muted-custom fs-9 uppercase-bold mb-1">Khối lượng công việc</div>
              <div className="d-flex align-items-baseline gap-2">
                <span className="fs-3 fw-bold">{analytics.warehouseWorkload.value}</span>
                <span className="text-muted fs-8">/ tải lên</span>
              </div>
            </div>
            <div className="bg-success bg-opacity-10 text-success p-2 rounded-3">
              <Target size={20} />
            </div>
          </div>
          
          <div className="d-flex align-items-end justify-content-between mb-3" style={{ height: '40px' }}>
            {analytics.warehouseWorkload.data.map((val, idx) => (
              <div key={idx} className="bg-success rounded-top" style={{ width: '6%', height: `${val}%`, opacity: idx % 2 === 0 ? 1 : 0.3 }}></div>
            ))}
          </div>

          <div className="pt-2 border-top">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted fs-8 fw-bold">TỈ LỆ HOÀN THÀNH</span>
              <span className="fw-bold text-success fs-8">{analytics.warehouseWorkload.percentage}%</span>
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div className="progress-bar bg-success" style={{ width: `${analytics.warehouseWorkload.percentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Picked Orders Card */}
        <div className="swipe-card bg-white rounded-4 p-3 shadow-sm border-0 flex-shrink-0">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <div className="text-muted-custom fs-9 uppercase-bold mb-1">Đơn hàng đã lấy hàng</div>
              <div className="d-flex align-items-baseline gap-2">
                <span className="fs-3 fw-bold">{analytics.dailyPickedOrders.value}</span>
                <span className="text-muted fs-8">/ đơn hàng</span>
              </div>
            </div>
            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
              <PackageCheck size={20} />
            </div>
          </div>

          <div style={{ height: '60px', width: '100%' }} className="mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-top">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted fs-8 fw-bold">XỬ LÝ TRONG NGÀY</span>
              <span className="fw-bold text-primary fs-8">{analytics.daily_picked_orders_percentage || analytics.dailyPickedOrders.percentage}%</span>
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div className="progress-bar bg-primary" style={{ width: `${analytics.dailyPickedOrders.percentage}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-swipe-container {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Hide scrollbar Firefox */
          padding-right: 1rem;
        }
        .mobile-swipe-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar Chrome/Safari */
        }
        .swipe-card {
          width: 85%; /* Shows a peek of the next card */
          scroll-snap-align: center;
        }
        @media (min-width: 768px) {
          .swipe-card {
            width: 45%; /* On iPad, show nearly two cards */
          }
        }
      `}} />
    </MobileLayout>
  );
};

export default MobileDashboard;
