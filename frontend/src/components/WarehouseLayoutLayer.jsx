import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const WarehouseLayoutLayer = () => {
  const { locations, onHand } = useWMS();
  const [selectedBin, setSelectedBin] = useState(null);
  const [activeAisle, setActiveAisle] = useState("A1");

  // Filter locations for the active aisle and organize into a matrix (Levels x Bays)
  // Format: WH-A-STG-[Aisle]-[Bay]-[Level]
  const aisles = ["A1", "A2", "B1", "B2"];
  const levels = ["L4", "L3", "L2", "L1"]; // Top to bottom
  const bays = ["01", "02", "03", "04", "05", "06", "07", "08"];

  const getBinData = (aisle, bay, level) => {
      // Mock lookup logic based on coordinates
      const locCode = `WH-A-STG-${aisle}-${bay}-${level}`;
      const location = locations.find(l => l.locationCode.includes(`${aisle}-${bay}`) && l.locationCode.endsWith(level)) 
                       || { locationCode: locCode, type: 'STORAGE', capacity: 2 };
      
      const content = onHand.filter(oh => oh.locationCode === location.locationCode);
      const totalQty = content.reduce((acc, s) => acc + s.qty, 0);
      
      let status = 'empty';
      const seed = (aisle.charCodeAt(0) + parseInt(bay) + level.charCodeAt(1));
      if (seed % 15 === 0) status = 'locked'; // Use seed instead of undefined i
      else if (totalQty > 0) status = totalQty > 80 ? 'full' : 'occupied';

      return { location, content, status, totalQty };
  };

  // Helper for status colors
  const getStatusColor = (status) => {
      switch(status) {
          case 'locked': return 'bg-danger-main';
          case 'full': return 'bg-warning-main';
          case 'occupied': return 'bg-primary-600';
          default: return 'bg-success-main';
      }
  };

  const handleBinClick = (aisle, bay, level) => {
      const data = getBinData(aisle, bay, level);
      setSelectedBin(data);
  };

  return (
    <div className='row gy-4'>
      {/* Control Header */}
      <div className="col-12">
          <div className="card border-0 shadow-sm p-24 bg-base">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                      <h5 className="mb-8 fw-bold">Sơ Đồ Kho Ma Trận (Matrix Warehouse Map)</h5>
                      <p className="text-sm text-secondary mb-0">Hiển thị lát cắt ngang của dãy kệ (Aisle View)</p>
                  </div>
                  <div className="d-flex gap-2">
                      <div className="btn-group p-1 bg-light rounded-12">
                          {aisles.map(a => (
                              <button 
                              key={a} 
                              className={`btn btn-sm px-24 radius-8 border-0 ${activeAisle === a ? 'bg-primary-600 text-primary-light shadow-sm' : 'text-secondary'}`}
                              onClick={() => setActiveAisle(a)}
                              >
                              Dãy {a}
                              </button>                          ))}
                      </div>
                      <button className="btn btn-outline-primary btn-sm radius-8" onClick={() => toast.info("Đang chuyển sang chế độ xem 3D...")}>
                          <Icon icon="solar:globus-bold" className="me-1" /> Chế độ 3D
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* Legend & Stats */}
      <div className="col-lg-3">
          <div className="card border-0 shadow-sm h-100 p-24">
              <h6 className="mb-24 text-md fw-bold">Trạng Thái Vị Trí</h6>
              <div className="d-flex flex-column gap-16">
                  <div className="d-flex align-items-center justify-content-between p-12 rounded-12 bg-success-focus">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-success-main"></span>
                          <span className="text-sm fw-bold text-success-main">Trống (Empty)</span>
                      </div>
                      <span className="badge bg-white text-success-main shadow-sm">45</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-12 rounded-12 bg-primary-light">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                          <span className="text-sm fw-bold text-primary-600">Đang chứa hàng</span>
                      </div>
                      <span className="badge bg-white text-primary-600 shadow-sm">82</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-12 rounded-12 bg-warning-focus">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-warning-main"></span>
                          <span className="text-sm fw-bold text-warning-main">Đã lấp đầy</span>
                      </div>
                      <span className="badge bg-white text-warning-main shadow-sm">18</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-12 rounded-12 bg-danger-focus text-danger-main">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-danger-main"></span>
                          <span className="text-sm fw-bold">Bị khóa / Lỗi</span>
                      </div>
                      <span className="badge bg-white text-danger-main shadow-sm">5</span>
                  </div>
              </div>

              <div className="mt-auto pt-40 text-center">
                  <div className="p-20 rounded-16 bg-primary-50 border border-primary-100 mb-16">
                      <h2 className="mb-4 fw-bold text-primary-600">85%</h2>
                      <p className="text-xs text-secondary mb-0 fw-bold uppercase">Hiệu suất lấp đầy dãy {activeAisle}</p>
                  </div>
                  <button className="btn btn-primary-600 w-100 radius-12 py-12" onClick={() => toast.success("Đã xuất báo cáo tối ưu không gian!")}>
                      Tối ưu hóa vị trí
                  </button>
              </div>
          </div>
      </div>

      {/* Matrix Grid */}
      <div className="col-lg-9">
          <div className="card border-0 shadow-sm h-100 overflow-hidden">
              <div className="card-header bg-base border-bottom-0 p-24">
                  <h6 className="mb-0">Mặt cắt Dãy kệ {activeAisle} (Rack Matrix)</h6>
              </div>
              <div className="card-body p-24 bg-light-gradient">
                  <div className="matrix-wrapper overflow-auto">
                      <table className="table table-borderless mb-0 w-100" style={{minWidth: '800px', borderCollapse: 'separate', borderSpacing: '10px'}}>
                          <thead>
                              <tr>
                                  <th style={{width: '60px'}}></th>
                                  {bays.map(bay => (
                                      <th key={bay} className="text-center pb-12 text-secondary text-xs fw-bold">Kệ {bay}</th>
                                  ))}
                              </tr>
                          </thead>
                          <tbody>
                              {levels.map(level => (
                                  <tr key={level}>
                                      <td className="align-middle text-end pe-12 text-secondary text-xs fw-bold">Tầng {level}</td>
                                      {bays.map(bay => {
                                          // Fake some logic for different status
                                          const seed = (activeAisle.charCodeAt(0) + parseInt(bay) + level.charCodeAt(1));
                                          const status = seed % 7 === 0 ? 'locked' : (seed % 3 === 0 ? 'empty' : (seed % 5 === 0 ? 'full' : 'occupied'));
                                          const color = getStatusColor(status);
                                          const opacity = status === 'empty' ? '0.2' : '1';
                                          
                                          return (
                                              <td key={bay} className="p-0">
                                                  <div 
                                                    className={`${color} rounded-12 d-flex flex-column align-items-center justify-content-center text-primary-light fw-bold shadow-sm hvr-grow`} 
                                                    style={{height: '90px', opacity: opacity, cursor: 'pointer', transition: 'all 0.3s', border: '2px solid rgba(255,255,255,0.1)'}}
                                                    data-bs-toggle="modal" data-bs-target="#binDetailModal"
                                                    onClick={() => handleBinClick(activeAisle, bay, level)}
                                                  >
                                                      <small style={{fontSize: '9px'}} className="mb-4 opacity-75">{activeAisle}-{bay}</small>
                                                      <Icon icon={status === 'locked' ? 'lucide:lock' : (status === 'empty' ? 'lucide:plus' : 'lucide:package')} className="h4 mb-0" />
                                                      {status !== 'empty' && status !== 'locked' && (
                                                          <div className="mt-8 text-xs fw-bold text-dark">{status === 'full' ? '100%' : '60%'}</div>
                                                      )}
                                                  </div>
                                              </td>
                                          );
                                      })}
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
                  
                  {/* Ground Level Graphic */}
                  <div className="mt-24 p-12 bg-secondary-light rounded-8 text-center text-dark fw-bold text-xs uppercase letter-spacing-2">
                      <Icon icon="solar:point-on-map-bold" className="me-2" /> Mặt sàn kho (Ground Floor)
                  </div>
              </div>
          </div>
      </div>

      {/* Modal Bin Detail (Same as before but with richer content) */}
      <div className="modal fade" id="binDetailModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content radius-16 border-0 shadow-lg">
                  {selectedBin && (
                      <>
                        <div className={`modal-header py-16 px-24 border-bottom ${selectedBin.status === 'locked' ? 'bg-danger-600' : 'bg-primary-600'}`}>
                            <h5 className="modal-title text-white d-flex align-items-center gap-2">
                                <Icon icon="solar:map-point-bold" /> Vị trí: {selectedBin.location.locationCode}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-24">
                            <div className="row gy-4">
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-between mb-16 p-16 rounded-12 bg-light">
                                        <div>
                                            <small className="text-secondary text-xs fw-bold">TRẠNG THÁI</small>
                                            <h6 className="mb-0 uppercase">{selectedBin.status === 'empty' ? 'Còn trống' : (selectedBin.status === 'locked' ? 'Đang khóa' : 'Đang chứa hàng')}</h6>
                                        </div>
                                        <div className={`w-40-px h-40-px rounded-circle ${getStatusColor(selectedBin.status)} d-flex justify-content-center align-items-center text-white`}>
                                            <Icon icon="lucide:activity" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <small className="text-secondary d-block text-xs fw-bold">DÃY - KỆ - TẦNG</small>
                                    <span className="fw-bold text-dark">{activeAisle} - {selectedBin.location.locationCode.split('-').slice(-2).join(' - ')}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-secondary d-block text-xs fw-bold">SỨC CHỨA TỐI ĐA</small>
                                    <span className="fw-bold text-dark">2 Pallets (Tiêu chuẩn)</span>
                                </div>
                                <div className="col-12 border-top pt-24">
                                    <h6 className="text-md mb-16 d-flex align-items-center gap-2">
                                        <Icon icon="solar:box-bold" className="text-primary-600" /> Hàng hóa hiện hữu
                                    </h6>
                                    {selectedBin.content && selectedBin.content.length > 0 ? (
                                        <div className="d-flex flex-column gap-12">
                                            {selectedBin.content.map((item, idx) => (
                                                <div key={idx} className="p-16 rounded-16 bg-primary-50 border border-primary-100 d-flex align-items-center justify-content-between hvr-push w-100">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="w-44-px h-44-px bg-white rounded-12 d-flex justify-content-center align-items-center text-primary-600 shadow-sm border">
                                                            <Icon icon="solar:box-minimalistic-bold" className="h4 mb-0" />
                                                        </div>
                                                        <div>
                                                            <span className="fw-bold text-dark">{item.itemCode}</span><br/>
                                                            <small className="text-secondary fw-medium">Lô: <code>{item.lotNo}</code></small>
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <span className="h5 mb-0 text-primary-600 fw-bold">{item.qty}</span><br/>
                                                        <small className="text-secondary fw-bold">{item.uom}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-32 bg-light rounded-16 border border-dashed">
                                            <Icon icon="solar:box-minimalistic-bold" className="display-4 text-secondary opacity-25 mb-12" />
                                            <p className="text-secondary mb-0 italic fw-medium">Vị trí này hiện đang trống</p>
                                            <button className="btn btn-primary-light btn-sm mt-16 radius-8" data-bs-dismiss="modal" onClick={() => toast.info("Đang chuyển sang luồng Nhận hàng...")}>Đặt hàng vào đây</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-base border-top p-24">
                            <button className="btn btn-outline-secondary px-24 radius-8" data-bs-dismiss="modal">Đóng</button>
                            <button className="btn btn-primary-600 px-32 radius-8 d-flex align-items-center gap-2" onClick={() => toast.success("Đã gửi yêu cầu in nhãn mã vạch cho Bin!")}>
                                <Icon icon="lucide:printer" /> In nhãn vị trí
                            </button>
                        </div>
                      </>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default WarehouseLayoutLayer;
