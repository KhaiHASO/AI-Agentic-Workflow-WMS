import React from 'react';
import { SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { analytics } from '../data/mockData';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const AnalyticsCards = ({ isMinimized }) => {
  const chartData = analytics.dailyPickedOrders.data.map((val, i) => ({ name: `D${i}`, value: val }));

  return (
    <div className={`analytics-flex-footer bg-white border-top transition-all ${isMinimized ? 'minimized' : ''}`}>
      <div className="container-fluid h-100 p-4 pt-3 overflow-hidden">
        <div className={`row g-4 h-100 transition-opacity ${isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Warehouse Workload Card */}
          <div className="col-md-6 h-100">
            <div className="glass-card h-100 p-3 d-flex flex-column justify-content-between border-0 shadow-sm bg-light bg-opacity-50">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-main fw-bold fs-8">Khối lượng công việc kho</span>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm text-muted p-0"><SlidersHorizontal size={12} /></button>
                  <button className="btn btn-sm text-muted p-0"><ArrowUpRight size={12} /></button>
                </div>
              </div>

              <div className="d-flex align-items-end gap-2 mb-2">
                <div className="d-flex align-items-center gap-1 bg-success text-white px-2 py-0 rounded" style={{ fontSize: '0.6rem' }}>
                  <ArrowUpRight size={8} />
                </div>
                <span className="fs-5 fw-bold lh-1">{analytics.warehouseWorkload.value}</span>
                <span className="text-muted-custom fs-9 pb-1">/ tải lên</span>
              </div>

              {/* Custom Bar Chart */}
              <div className="d-flex align-items-end justify-content-between mb-2" style={{ height: '30px' }}>
                {analytics.warehouseWorkload.data.map((val, idx) => (
                  <div key={idx} className="bg-success rounded-top" style={{ width: '12%', height: `${val}%`, opacity: idx % 2 === 0 ? 1 : 0.3 }}></div>
                ))}
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted-custom fs-9 uppercase fw-bold">Tỉ lệ hoàn thành</span>
                  <span className="fw-bold fs-9">{analytics.warehouseWorkload.percentage}%</span>
                </div>
                <div className="progress" style={{ height: '3px' }}>
                  <div className="progress-bar bg-success" style={{ width: `${analytics.warehouseWorkload.percentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Picked Orders Card */}
          <div className="col-md-6 h-100">
            <div className="glass-card h-100 p-3 d-flex flex-column justify-content-between border-0 shadow-sm bg-light bg-opacity-50">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-main fw-bold fs-8">Đơn hàng đã lấy hàng</span>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm text-muted p-0"><SlidersHorizontal size={12} /></button>
                  <button className="btn btn-sm text-muted p-0"><ArrowUpRight size={12} /></button>
                </div>
              </div>

              <div className="d-flex align-items-end gap-2 mb-2">
                <div className="d-flex align-items-center gap-1 bg-primary text-white px-2 py-0 rounded" style={{ fontSize: '0.6rem' }}>
                  <ArrowUpRight size={8} />
                </div>
                <span className="fs-5 fw-bold lh-1">{analytics.dailyPickedOrders.value}</span>
                <span className="text-muted-custom fs-9 pb-1">/ đơn hàng</span>
              </div>

              <div style={{ height: '30px', width: '100%' }} className="mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={1.5} dot={false} isAnimationActive={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-muted-custom fs-9 uppercase fw-bold">Xử lý trong ngày</span>
                  <span className="fw-bold fs-9">{analytics.dailyPickedOrders.percentage}%</span>
                </div>
                <div className="progress" style={{ height: '3px' }}>
                  <div className="progress-bar bg-primary" style={{ width: `${analytics.dailyPickedOrders.percentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .analytics-flex-footer {
          height: 180px;
          width: 100%;
          position: relative;
          z-index: 40;
        }
        .analytics-flex-footer.minimized {
          height: 0;
          border-top: none;
        }
        .pointer-events-none { pointer-events: none; }
        .transition-opacity { transition: opacity 0.3s; }
        .uppercase { text-transform: uppercase; }
      `}} />
    </div>
  );
};

export default AnalyticsCards;
