import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const ShipmentLayer = () => {
  const { shipments, loading, refreshData } = useWMS();
  const [loadingId, setLoadingId] = useState(null);

  const handleConfirm = (shipmentCode) => {
    setLoadingId(shipmentCode);
    toast.info(`Đang chốt bàn giao và đẩy dữ liệu Goods Issue sang ERP cho phiếu ${shipmentCode}...`);
    
    setTimeout(() => {
      setLoadingId(null);
      toast.success(`Phiếu giao hàng ${shipmentCode} đã hoàn tất! Chuyến xe đã có thể rời kho.`);
      refreshData();
    }, 1500);
  };

  return (
    <div className='row gy-4'>
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                          <h6 className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Chờ Dispatch</h6>
                          <Icon icon="solar:delivery-bold" className="h3 mb-0 text-primary-600" />
                      </div>
                      <h2 className="mb-0 fw-bold text-dark">{shipments.filter(s => s.status === 'Pending').length}</h2>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                          <h6 className="fw-medium text-success-600 mb-1 text-nowrap text-xs">Đã xuất kho</h6>
                          <Icon icon="solar:check-circle-bold" className="h3 mb-0 text-success-600" />
                      </div>
                      <h2 className="mb-0 fw-bold text-dark">{shipments.filter(s => s.status === 'Shipped').length}</h2>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                          <h6 className="fw-medium text-warning-600 mb-1 text-nowrap text-xs">Xe tại cửa Dock</h6>
                          <Icon icon="solar:map-point-hospital-bold" className="h3 mb-0 text-warning-600" />
                      </div>
                      <h2 className="mb-0 fw-bold text-dark">2</h2>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100 d-flex flex-column justify-content-center">
                      <button className="btn btn-primary" onClick={refreshData}>
                          <Icon icon="solar:refresh-bold" className="me-2" /> Làm mới dữ liệu
                      </button>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-12 overflow-hidden'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom'>
            <h5 className='card-title mb-0 fw-bold'>Xác Nhận Giao Hàng (Shipment Dispatch)</h5>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary-light">
                  <tr>
                    <th className="ps-24">MÃ GIAO HÀNG</th>
                    <th>ĐƠN VỊ VẬN CHUYỂN</th>
                    <th>BIỂN SỐ XE</th>
                    <th>CỬA XUẤT (DOCK)</th>
                    <th>TRẠNG THÁI</th>
                    <th className="pe-24 text-end">HÀNH ĐỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6" className="text-center py-24">Đang tải danh sách shipment...</td></tr>
                  ) : shipments.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-24 text-secondary">Không có chuyến xe nào đang chờ.</td></tr>
                  ) : (
                    shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover-bg-primary-50">
                        <td className="ps-24">
                          <div className="d-flex align-items-center gap-2">
                              <Icon icon="solar:delivery-bold" className="text-primary-600" />
                              <span className="fw-bold text-dark">{shipment.shipmentCode}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-info-focus text-info-main px-12 py-4">{shipment.carrier || "N/A"}</span>
                        </td>
                        <td><span className="fw-bold">{shipment.vehicleNo || "N/A"}</span></td>
                        <td><span className="badge bg-secondary-focus text-secondary-light px-12 py-4 fw-bold">{shipment.dock || "N/A"}</span></td>
                        <td>
                          <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${shipment.status === 'Pending' ? 'bg-warning-focus text-warning-600' : 'bg-success-focus text-success-main'}`}>
                              <Icon icon={shipment.status === 'Pending' ? 'lucide:clock' : 'lucide:check-circle'} className="me-1" />
                              {shipment.status === 'Pending' ? 'Chờ Dispatch' : 'Đã Xuất Kho'}
                          </span>
                        </td>
                        <td className="pe-24 text-end">
                          {shipment.status === 'Pending' ? (
                              <button
                                  className='btn btn-primary-600 btn-sm px-24 radius-8 d-inline-flex align-items-center gap-2'
                                  onClick={() => handleConfirm(shipment.shipmentCode)}
                                  disabled={loadingId === shipment.shipmentCode}
                              >
                                  {loadingId === shipment.shipmentCode ? (
                                      <span className="spinner-border spinner-border-sm" role="status"></span>
                                  ) : (
                                      <><Icon icon='solar:truck-bold' /> CHỐT GIAO HÀNG</>
                                  )}
                              </button>
                          ) : (
                              <button className="btn btn-outline-success-600 btn-sm radius-8">
                                  <Icon icon="lucide:printer" className="me-1" /> IN PHIẾU XUẤT
                              </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentLayer;
