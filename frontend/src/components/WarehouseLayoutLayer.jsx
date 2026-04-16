import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";
import { wmsApi } from "../services/wmsApi";

const WarehouseLayoutLayer = () => {
  const { locations, onHand, loading, refreshData } = useWMS();
  const [selectedBin, setSelectedBin] = useState(null);
  const [activeAisle, setActiveAisle] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const aisles = [...new Set(locations.map(l => l.aisle))].filter(Boolean).sort();
  const levels = ["L5", "L4", "L3", "L2", "L1"]; 
  const racks = ["01", "02", "03", "04", "05"]; 

  useEffect(() => {
    if (aisles.length > 0 && !activeAisle) {
        setActiveAisle(aisles[0]);
    }
  }, [aisles, activeAisle]);

  const getBinData = (aisle, rack, level) => {
      const location = locations.find(l => l.aisle === aisle && l.rack === rack && l.level === level);
      if (!location) return null;

      const content = onHand.filter(oh => oh.locationId === location.id);
      const totalQty = content.reduce((acc, s) => acc + (s.availableQty || 0), 0);
      
      let status = 'empty';
      if (location.status !== 'Active') status = 'locked';
      else if (totalQty > 0) status = totalQty > 150 ? 'full' : 'occupied';

      return { location, content, status, totalQty };
  };

  const handleToggleStatus = async (id) => {
      setIsProcessing(true);
      try {
          const res = await wmsApi.toggleLocationStatus(id);
          setTimeout(() => toast.success(`Vị trí ${res.code} đã chuyển sang: ${res.status.toUpperCase()}`), 0);
          await refreshData();
          
          // Cập nhật lại dữ liệu đang hiển thị trong modal
          const updatedLoc = locations.find(l => l.id === id);
          if (updatedLoc) {
             const data = getBinData(updatedLoc.aisle, updatedLoc.rack, updatedLoc.level);
             setSelectedBin(data);
          }
      } catch (error) {
          setTimeout(() => toast.error("Lỗi khi thay đổi trạng thái vị trí"), 0);
      } finally {
          setIsProcessing(false);
      }
  };

  const handlePrintLabel = async (id) => {
      setIsProcessing(true);
      try {
          const res = await wmsApi.printLocationLabel(id);
          setTimeout(() => toast.success(`Đã gửi lệnh in ${res.printJobId} tới máy in mã vạch! Mã vạch: ${res.barcode}`), 0);
      } catch (error) {
          setTimeout(() => toast.error("Lỗi khi kết nối máy in nhãn"), 0);
      } finally {
          setIsProcessing(false);
      }
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'locked': return 'bg-danger-main';
          case 'full': return 'bg-warning-main';
          case 'occupied': return 'bg-primary-600';
          default: return 'bg-success-main';
      }
  };

  // Only show full-page loading if we have no data yet. 
  // Background refreshes (like after locking a bin) should not unmount the component.
  if (loading && locations.length === 0) return <div className="text-center py-40"><div className="spinner-border text-primary"></div><p>Đang quét sơ đồ thực tế...</p></div>;

  return (
    <div className='row gy-4'>
      <div className="col-12">
          <div className="card border-0 shadow-sm p-24 bg-base radius-12">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                      <h5 className="mb-8 fw-bold">Sơ Đồ Kho Ma Trận (Live Layout)</h5>
                      <p className="text-sm text-secondary mb-0">Tương tác trực tiếp với 100 vị trí: Khóa/Mở vị trí và In nhãn mã vạch.</p>
                  </div>
                  <div className="d-flex gap-2">
                      <div className="btn-group p-1 bg-light rounded-12">
                          {aisles.map(a => (
                              <button key={a} className={`btn btn-sm px-24 radius-8 border-0 ${activeAisle === a ? 'bg-primary-600 text-white shadow-sm' : 'text-secondary'}`} onClick={() => setActiveAisle(a)}>Dãy {a}</button>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="col-lg-3">
          <div className="card border-0 shadow-sm h-100 p-24 radius-12">
              <h6 className="mb-24 text-md fw-bold">Trạng thái Dãy {activeAisle}</h6>
              <div className="d-flex flex-column gap-16">
                  <div className="p-16 rounded-12 bg-success-focus d-flex justify-content-between align-items-center border border-success-100">
                      <span className="text-sm fw-bold text-success-main">Vị trí Trống</span>
                      <span className="h5 mb-0 text-success-main">{locations.filter(l => l.aisle === activeAisle && !onHand.some(oh => oh.locationId === l.id)).length}</span>
                  </div>
                  <div className="p-16 rounded-12 bg-primary-light d-flex justify-content-between align-items-center border border-primary-100">
                      <span className="text-sm fw-bold text-primary-600">Vị trí Có hàng</span>
                      <span className="h5 mb-0 text-primary-600">{locations.filter(l => l.aisle === activeAisle && onHand.some(oh => oh.locationId === l.id)).length}</span>
                  </div>
                  <div className="p-16 rounded-12 bg-danger-focus d-flex justify-content-between align-items-center border border-danger-100">
                      <span className="text-sm fw-bold text-danger-main">Đang Khóa (Hold)</span>
                      <span className="h5 mb-0 text-danger-main">{locations.filter(l => l.aisle === activeAisle && l.status !== 'Active').length}</span>
                  </div>
              </div>
              <div className="mt-auto pt-40">
                  <button className="btn btn-primary-600 w-100 radius-12 py-12 fw-bold" onClick={refreshData}>
                      <Icon icon="solar:refresh-bold" className="me-2" /> LÀM MỚI DỮ LIỆU
                  </button>
              </div>
          </div>
      </div>

      <div className="col-lg-9">
          <div className="card border-0 shadow-sm h-100 overflow-hidden radius-12">
              <div className="card-body p-24 bg-light-gradient">
                  <div className="matrix-wrapper overflow-auto">
                      <table className="table table-borderless mb-0" style={{minWidth: '700px', borderCollapse: 'separate', borderSpacing: '10px'}}>
                          <thead>
                              <tr>
                                  <th style={{width: '70px'}}></th>
                                  {racks.map(r => (<th key={r} className="text-center text-secondary text-xs fw-bold">Rack {r}</th>))}
                              </tr>
                          </thead>
                          <tbody>
                              {levels.map(level => (
                                  <tr key={level}>
                                      <td className="align-middle text-end pe-12 text-secondary text-xs fw-bold">Tầng {level}</td>
                                      {racks.map(rack => {
                                          const data = getBinData(activeAisle, rack, level);
                                          if (!data) return <td key={rack}></td>;
                                          const color = getStatusColor(data.status);
                                          return (
                                              <td key={rack} className="p-0">
                                                  <div 
                                                    className={`${color} rounded-12 d-flex flex-column align-items-center justify-content-center text-white shadow-sm hvr-grow`} 
                                                    style={{height: '80px', opacity: data.status === 'empty' ? 0.2 : 1, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.1)'}}
                                                    data-bs-toggle="modal" data-bs-target="#binDetailModal"
                                                    onClick={() => setSelectedBin(data)}
                                                  >
                                                      <small style={{fontSize: '8px'}} className="opacity-75">{rack}-{level}</small>
                                                      <Icon icon={data.status === 'locked' ? 'lucide:lock' : (data.status === 'empty' ? 'lucide:plus' : 'lucide:package')} className="h5 mb-0" />
                                                      {data.totalQty > 0 && <div className="mt-4 text-xs fw-bold">{data.totalQty}</div>}
                                                  </div>
                                              </td>
                                          );
                                      })}
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>

      {/* Modal Detail */}
      <div className="modal fade" id="binDetailModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content radius-16 border-0 shadow-lg">
                  {selectedBin && (
                      <>
                        <div className={`modal-header py-16 px-24 border-bottom text-white ${getStatusColor(selectedBin.status)}`}>
                            <h5 className="modal-title d-flex align-items-center gap-2">
                                <Icon icon="solar:map-point-bold" /> Vị trí: {selectedBin.location.code}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-24">
                            <div className="d-flex justify-content-between align-items-center mb-24 p-16 rounded-12 bg-light border">
                                <div>
                                    <small className="text-secondary text-xs fw-bold">TRẠNG THÁI VẬN HÀNH</small>
                                    <h6 className={`mb-0 fw-bold ${selectedBin.location.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                                        {selectedBin.location.status === 'Active' ? 'SẴN SÀNG (ACTIVE)' : 'ĐANG KHÓA (LOCKED)'}
                                    </h6>
                                </div>
                                <button 
                                    className={`btn btn-sm ${selectedBin.location.status === 'Active' ? 'btn-danger' : 'btn-success'} px-20 radius-8 fw-bold`}
                                    onClick={() => handleToggleStatus(selectedBin.location.id)}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <span className="spinner-border spinner-border-sm"></span> : (selectedBin.location.status === 'Active' ? 'KHÓA VỊ TRÍ' : 'MỞ KHÓA')}
                                </button>
                            </div>

                            <h6 className="text-md mb-16 d-flex align-items-center gap-2">
                                <Icon icon="solar:box-minimalistic-bold" className="text-primary-600" /> Hàng hóa đang lưu trữ
                            </h6>
                            
                            {selectedBin.content.length > 0 ? (
                                <div className="d-flex flex-column gap-12">
                                    {selectedBin.content.map((item, idx) => (
                                        <div key={idx} className="p-16 rounded-16 bg-primary-50 border border-primary-100 d-flex align-items-center justify-content-between">
                                            <div>
                                                <span className="fw-bold text-dark">{item.item?.itemCode}</span>
                                                <p className="text-xs text-secondary mb-0">Lô: {item.lotNo} | Trạng thái: {item.inventoryStatus?.statusCode}</p>
                                            </div>
                                            <div className="text-end">
                                                <span className="h5 mb-0 text-primary-600 fw-bold">{item.availableQty}</span>
                                                <small className="text-secondary ms-4 fw-bold text-xs">PCS</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 bg-light rounded-16 border border-dashed">
                                    <p className="text-secondary mb-0 italic">Vị trí này hiện đang trống</p>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer bg-base border-top p-24">
                            <button className="btn btn-outline-secondary px-24 radius-8" data-bs-dismiss="modal">Đóng</button>
                            <button 
                                className="btn btn-primary-600 px-32 radius-8 d-flex align-items-center gap-2 fw-bold" 
                                onClick={() => handlePrintLabel(selectedBin.location.id)}
                                disabled={isProcessing}
                            >
                                <Icon icon="lucide:printer" /> IN NHÃN VỊ TRÍ
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
