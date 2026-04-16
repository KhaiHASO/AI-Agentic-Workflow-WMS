import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWMS } from "../context/WMSContext";

const HandlingUnitLayer = () => {
  const { onHand, locations } = useWMS();
  const [hus, setHus] = useState([]);

  useEffect(() => {
    // Map Inventory (onHand) to a virtual Handling Unit view
    const mappedHus = onHand.map((inv, index) => {
      const location = locations.find(l => l.code === inv.locationCode);
      return {
        huCode: `LP-${1000 + (inv.id || index)}`,
        type: "Pallet",
        status: "In Storage",
        location: inv.locationCode,
        zone: location?.zone || "Unknown",
        items: [
          { itemCode: inv.itemCode, qty: inv.quantity || inv.qty, lotNo: inv.lotNo || "N/A" }
        ],
        weight: (inv.quantity || inv.qty) * 0.5, // Dummy weight calculation
      };
    });
    setHus(mappedHus);
  }, [onHand, locations]);

  return (
    <div className='row gy-4'>
      {/* Visual Pallet Stats */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-1 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Tổng số Pallet (LP)</p>
                          <h4 className="mb-0 fw-bold text-dark">{hus.length}</h4>
                          <Icon icon="solar:box-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-2 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Pallet Trống</p>
                          <h4 className="mb-0 fw-bold text-dark">0</h4>
                          <Icon icon="solar:box-minimalistic-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-3 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Đang di chuyển</p>
                          <h4 className="mb-0 fw-bold text-dark">0</h4>
                          <Icon icon="solar:delivery-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-5 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Pallet Hỏng</p>
                          <h4 className="mb-0 fw-bold text-dark">0</h4>
                          <Icon icon="solar:shield-warning-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Quản Lý Pallet / Kiện Hàng (Handling Units)</h5>
            <div className="d-flex gap-2">
                <button className='btn btn-outline-primary btn-sm'><Icon icon="lucide:printer" /> In Tem Pallet</button>
                <button className='btn btn-primary-600 btn-sm d-flex align-items-center gap-2'>
                    <Icon icon='lucide:plus' /> Khởi Tạo Pallet
                </button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary">
                  <tr>
                    <th className="ps-24">Mã Pallet (License Plate)</th>
                    <th>Vị Trí Hiện Tại</th>
                    <th>Trạng Thái</th>
                    <th>Nội Dung SKU</th>
                    <th>Tổng SL</th>
                    <th>Khối Lượng</th>
                    <th className="pe-24 text-end">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {hus.map((hu, idx) => (
                    <tr key={idx} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-40-px h-40-px bg-primary-light text-primary-600 rounded d-flex justify-content-center align-items-center">
                                <Icon icon="solar:box-bold" className="text-xl" />
                            </div>
                            <div>
                                <span className="fw-bold text-dark">{hu.huCode}</span><br/>
                                <small className="text-secondary text-xs">Loại: {hu.type}</small>
                            </div>
                        </div>
                      </td>
                      <td><span className="badge bg-info-focus text-info-main px-12 py-4">{hu.location}</span></td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${hu.status === 'In Storage' ? 'bg-success-focus text-success-main' : 'bg-info-focus text-info-main'}`}>
                            {hu.status}
                        </span>
                      </td>
                      <td>
                        {hu.items.map((item, i) => (
                            <div key={i} className="d-flex align-items-center gap-1">
                                <span className="fw-bold text-sm text-dark">{item.itemCode}</span>
                                <span className="text-secondary text-xs">(Lô: {item.lotNo})</span>
                            </div>
                        ))}
                      </td>
                      <td><span className="fw-bold h6 mb-0">{hu.items.reduce((acc, item) => acc + item.qty, 0)}</span></td>
                      <td><span className="text-secondary">{hu.weight} kg</span></td>
                      <td className="pe-24 text-end">
                        <div className="d-flex justify-content-end gap-2">
                            <button className='w-32-px h-32-px bg-base text-primary-600 rounded-8 d-inline-flex align-items-center justify-content-center border' title="Chi tiết">
                                <Icon icon='iconamoon:eye-light' />
                            </button>
                            <button className='w-32-px h-32-px bg-base text-warning-main rounded-8 d-inline-flex align-items-center justify-content-center border' title="Di chuyển">
                                <Icon icon='solar:transfer-vertical-bold' />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandlingUnitLayer;
