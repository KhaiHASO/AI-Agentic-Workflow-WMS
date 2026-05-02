import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';

const RobotCard = ({ robot }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Status mapping for CSS and text
  const getStatusClass = (status) => {
    if (status === 'Sẵn sàng' || status === 'Hoàn thành') return 'available';
    if (status === 'Đang làm việc' || status === 'Lỗi') return 'employed';
    return 'cancel';
  };

  const getBadgeClass = (status) => {
    if (status === 'Hoàn thành') return 'success';
    if (status === 'Lỗi') return 'danger';
    return 'secondary';
  };

  return (
    <div className="accordion-item glass-card mb-3 border-0">
      <h2 className="accordion-header m-0" onClick={() => setIsOpen(!isOpen)}>
        <button className={`accordion-button w-100 border-0 d-flex justify-content-between align-items-center bg-transparent px-3 py-3 ${!isOpen ? 'collapsed' : ''}`} type="button" style={{ boxShadow: 'none' }}>
          <div className="d-flex align-items-center gap-3">
            <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
            </div>
            <div className="text-start">
              <div className="fw-semibold text-main">{robot.name} - Nº{robot.id}</div>
              <div className="d-flex align-items-center mt-1">
                <span className={`status-dot ${getStatusClass(robot.status)}`}></span>
                <span className="text-muted-custom">{robot.status}</span>
              </div>
            </div>
          </div>
          <div className="text-muted">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
      </h2>

      {isOpen && (
        <div className="accordion-collapse collapse show border-top border-light">
          <div className="accordion-body px-3 pb-3 pt-2">
            
            {/* Battery Info */}
            <div className="d-flex justify-content-between align-items-end mb-2">
              <span className="text-muted-custom">Dung lượng pin</span>
              <span className="fs-7 fw-semibold">{robot.battery}%</span>
            </div>
            <div className="progress mb-4" style={{ height: '4px', backgroundColor: 'var(--line-gray)' }}>
              <div className="progress-bar bg-dark" role="progressbar" style={{ width: `${robot.battery}%` }} aria-valuenow={robot.battery} aria-valuemin="0" aria-valuemax="100"></div>
            </div>

            {/* Details Table */}
            {robot.details.length > 0 && (
              <table className="table table-borderless table-sm mb-0 fs-7">
                <thead>
                  <tr className="text-muted-custom border-bottom" style={{ borderColor: 'var(--line-gray)' }}>
                    <th className="fw-normal pb-2">Nền tảng</th>
                    <th className="fw-normal pb-2">Số hiệu</th>
                    <th className="fw-normal pb-2">Khối lượng</th>
                    <th className="fw-normal pb-2">Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {robot.details.map((detail, idx) => (
                    <tr key={idx} className="align-middle">
                      <td className="fw-semibold">
                        <span className={`status-dot ${getStatusClass(detail.status)}`}></span>
                        {detail.platform}
                      </td>
                      <td className="text-muted">{detail.number}</td>
                      <td className="text-muted">{detail.weight}</td>
                      <td>
                        <span className={`badge rounded-pill text-white bg-${getBadgeClass(detail.status)}`} style={{ fontWeight: '500', fontSize: '0.7rem' }}>
                          {detail.status}
                        </span>
                      </td>
                      <td className="text-end text-muted">
                        <MoreHorizontal size={14} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {robot.details.length === 0 && (
              <div className="text-center text-muted-custom py-2">Không có hoạt động nào.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotCard;
