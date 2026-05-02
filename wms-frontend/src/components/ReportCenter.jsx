import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Package, 
  AlertCircle, Filter, Download, Calendar, 
  ArrowUpRight, Map, Activity, Users 
} from 'lucide-react';
import { db } from '../data/centralizedDataStore';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const ReportCenter = () => {
  const [inventory, setInventory] = useState(db.state.inventory);
  
  useEffect(() => {
    const unsub = db.subscribe(state => setInventory([...state.inventory]));
    return unsub;
  }, []);

  // Data Processing for Charts
  const stockByItem = db.state.items.map(item => ({
    name: item.id,
    qty: inventory.filter(i => i.itemId === item.id).reduce((sum, curr) => sum + curr.qty, 0)
  })).sort((a, b) => b.qty - a.qty).slice(0, 5);

  const stockByCategory = [
    { name: 'Nguyên liệu', value: 400 },
    { name: 'Thành phẩm', value: 300 },
    { name: 'Bán thành phẩm', value: 200 },
    { name: 'Bao bì', value: 100 },
  ];

  const movementTrend = [
    { date: '01/05', inbound: 45, outbound: 32 },
    { date: '02/05', inbound: 52, outbound: 41 },
    { date: '03/05', inbound: 48, outbound: 55 },
    { date: '04/05', inbound: 70, outbound: 45 },
    { date: '05/05', inbound: 65, outbound: 60 },
  ];

  return (
    <div className="p-3 p-md-4 h-100 overflow-auto bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-main">Trung tâm Báo cáo</h4>
          <p className="text-muted-custom fs-8">Phân tích chuyên sâu hiệu quả vận hành và tồn kho</p>
        </div>
        <div className="d-flex gap-2">
           <button className="btn btn-white shadow-sm border-0 rounded-3 px-3 d-flex align-items-center gap-2 fs-8 fw-bold">
              <Calendar size={16} /> 7 ngày qua
           </button>
           <button className="btn btn-primary shadow-sm border-0 rounded-3 px-3 d-flex align-items-center gap-2 fs-8 fw-bold">
              <Download size={16} /> XUẤT EXCEL
           </button>
        </div>
      </div>

      {/* Top Level KPIs */}
      <div className="row g-4 mb-4">
        {[
          { label: 'Tỉ lệ quay vòng', value: '4.2x', trend: '+12%', icon: <Activity />, color: 'primary' },
          { label: 'Độ chính xác tồn', value: '99.9%', trend: '+0.1%', icon: <CheckCircle2 />, color: 'success' },
          { label: 'Năng suất Picking', value: '85 đơn/h', trend: '-2%', icon: <TrendingDown />, color: 'warning' },
          { label: 'Vật tư chậm luân chuyển', value: '12 SKU', trend: '+5', icon: <AlertCircle />, color: 'danger' }
        ].map((kpi, idx) => (
          <div key={idx} className="col-md-3">
             <div className="glass-card bg-white p-3 border-0 shadow-sm">
                <div className="d-flex justify-content-between align-items-start mb-2">
                   <div className={`p-2 bg-${kpi.color} bg-opacity-10 text-${kpi.color} rounded-3`}>{kpi.icon}</div>
                   <span className={`fs-9 fw-bold ${kpi.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>{kpi.trend}</span>
                </div>
                <div className="text-muted fs-9 uppercase-bold mb-1">{kpi.label}</div>
                <div className="fs-4 fw-bold text-main">{kpi.value}</div>
             </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        {/* Movement Trend */}
        <div className="col-md-8">
           <div className="glass-card bg-white p-4 border-0 shadow-sm h-100">
              <h6 className="fw-bold mb-4 uppercase fs-8 text-muted">XU HƯỚNG NHẬP / XUẤT KHO</h6>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={movementTrend}>
                    <defs>
                      <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Legend iconType="circle" />
                    <Area type="monotone" dataKey="inbound" name="Nhập kho" stroke="#10b981" fillOpacity={1} fill="url(#colorIn)" strokeWidth={3} />
                    <Area type="monotone" dataKey="outbound" name="Xuất kho" stroke="#2563eb" fillOpacity={1} fill="url(#colorOut)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Categories Pie */}
        <div className="col-md-4">
           <div className="glass-card bg-white p-4 border-0 shadow-sm h-100">
              <h6 className="fw-bold mb-4 uppercase fs-8 text-muted">CƠ CẤU TỒN KHO THEO LOẠI</h6>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stockByCategory}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stockByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Top Items Bar Chart */}
        <div className="col-md-6">
           <div className="glass-card bg-white p-4 border-0 shadow-sm">
              <h6 className="fw-bold mb-4 uppercase fs-8 text-muted">TOP 5 VẬT TƯ TỒN NHIỀU NHẤT</h6>
              <div style={{ height: '250px' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockByItem} layout="vertical">
                       <XAxis type="number" hide />
                       <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} width={80} />
                       <Tooltip cursor={{fill: '#f8fafb'}} />
                       <Bar dataKey="qty" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Rack Utilization */}
        <div className="col-md-6">
           <div className="glass-card bg-white p-4 border-0 shadow-sm">
              <h6 className="fw-bold mb-4 uppercase fs-8 text-muted">TỈ LỆ LẤP ĐẦY THEO DÃY KỆ</h6>
              <div className="d-flex flex-column gap-4">
                 {[
                   { label: 'Dãy A (Nguyên liệu)', value: 85 },
                   { label: 'Dãy B (Bao bì)', value: 42 },
                   { label: 'Khu vực Staging', value: 95 },
                   { label: 'Khu vực QA', value: 12 }
                 ].map((rack, i) => (
                   <div key={i}>
                      <div className="d-flex justify-content-between mb-1">
                         <span className="fs-8 fw-bold">{rack.label}</span>
                         <span className="fs-8 fw-bold">{rack.value}%</span>
                      </div>
                      <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                         <div className={`progress-bar bg-${rack.value > 80 ? 'danger' : rack.value > 50 ? 'primary' : 'success'}`} style={{ width: `${rack.value}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCenter;

const CheckCircle2 = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
