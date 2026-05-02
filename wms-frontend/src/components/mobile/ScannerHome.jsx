import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from './MobileLayout';
import { PackageSearch, PackagePlus, ArrowUpCircle, ClipboardCheck, LayoutDashboard } from 'lucide-react';

const ScannerHome = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <PackagePlus className="text-primary" />, label: 'Nhập hàng (Inbound)', path: '/mobile/inbound', desc: 'Nhận hàng từ PO/Chuyến xe' },
    { icon: <ArrowUpCircle className="text-success" />, label: 'Cất hàng (Putaway)', path: '/mobile/putaway', desc: 'Di chuyển hàng vào vị trí lưu trữ' },
    { icon: <PackageSearch className="text-warning" />, label: 'Lấy hàng (Picking)', path: '/mobile/picking', desc: 'Lấy hàng theo lệnh xuất' },
    { icon: <ClipboardCheck className="text-info" />, label: 'Kiểm kê (Cycle Count)', path: '/mobile/cycle-count', desc: 'Kiểm tra tồn kho định kỳ' },
    { icon: <LayoutDashboard className="text-secondary" />, label: 'Dashboard nhanh', path: '/mobile/dashboard', desc: 'Xem nhanh chỉ số vận hành' },
  ];

  return (
    <MobileLayout title="Trang chủ Scanner" showBack={false}>
      <div className="mb-4">
        <h5 className="fw-bold mb-1">Xin chào, Nguyễn Văn A</h5>
        <p className="text-muted-custom fs-7">Bạn đang làm việc tại Kho 1</p>
      </div>

      <div className="d-flex flex-column gap-3">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            className="task-card shadow-sm border-0" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(item.path)}
          >
            <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-center">
              {item.icon}
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold fs-6">{item.label}</div>
              <div className="text-muted-custom fs-8">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default ScannerHome;
