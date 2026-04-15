import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const ShipmentLayer = () => {
  const { shipments, confirmShipment } = useWMS();
  const [loadingId, setLoadingId] = useState(null);

  const handleConfirm = (shipmentId) => {
    setLoadingId(shipmentId);
    toast.info(`Đang chốt bàn giao và đẩy dữ liệu Goods Issue sang ERP cho phiếu ${shipmentId}...`);
    
    setTimeout(() => {
      confirmShipment(shipmentId);
      setLoadingId(null);
      toast.success(`Phiếu giao hàng ${shipmentId} đã hoàn tất! Chuyến xe đã có thể rời kho.`);
    }, 2000);
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
                      <h2 className="mb-0 fw-bold text-dark">{shipments.filter(s => s.status === 'Ready for Dispatch').length}</h2>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                          <h6 className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Đã xuất kho</h6>
                          <Icon icon="solar:check-circle-bold" className="h3 mb-0 text-primary-600" />
                      </div>
                      <h2 className="mb-0 fw-bold text-dark">{shipments.filter(s => s.status === 'Shipped').length}</h2>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                          <h6 className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Đang đóng gói</h6>
                          <Icon icon="solar:box-bold" className="h3 mb-0 text-primary-600" />
                      </div>
                      <h2 className="mb-0 fw-bold text-dark">5</h2>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border shadow-none bg-base h-100">
                      <div className="d-flex align-items-center justify-content-between mb-16">
                          <h6 className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Xe tại cửa Dock</h6>
                          <Icon icon="solar:map-point-hospital-bold" className="h3 mb-0 text-primary-600" />
                      </div>
                      <h2 className="mb-0 fw-bold text-dark">3</h2>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Xác Nhận Giao Hàng (Shipments)</h5>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary-light">
                  <tr>
                    <th className="ps-24">Mã Giao Hàng</th>
                    <th>Chứng Từ Gốc (SO)</th>
                    <th>Đơn Vị Vận Chuyển</th>
                    <th>Biển Số Xe</th>
                    <th>Cửa Xuất (Dock)</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24 text-end">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment) => (
                    <tr key={shipment.shipmentId} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <Icon icon="solar:delivery-bold" className="text-primary-600" />
                            <span className="fw-bold text-dark">{shipment.shipmentId}</span>
                        </div>
                      </td>
                      <td><span className="fw-medium text-dark">{shipment.soNumber}</span></td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-info-focus text-info-main px-12 py-4">{shipment.carrierCode}</span>
                        </div>
                      </td>
                      <td><span className="fw-bold">{shipment.vehicleNo}</span></td>
                      <td><span className="badge bg-secondary-focus text-secondary-light px-12 py-4 fw-bold">{shipment.dockDoor}</span></td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${shipment.status === 'Ready for Dispatch' ? 'bg-primary-focus text-primary-600' : 'bg-success-focus text-success-main'}`}>
                            <Icon icon={shipment.status === 'Ready for Dispatch' ? 'lucide:clock' : 'lucide:check-circle'} className="me-1" />
                            {shipment.status === 'Ready for Dispatch' ? 'Sẵn Sàng Giao' : 'Đã Xuất Kho'}
                        </span>
                      </td>
                      <td className="pe-24 text-end">
                        {shipment.status === 'Ready for Dispatch' ? (
                            <button
                                className='btn btn-primary-600 btn-sm px-24 radius-8 d-inline-flex align-items-center gap-2'
                                onClick={() => handleConfirm(shipment.shipmentId)}
                                disabled={loadingId === shipment.shipmentId}
                            >
                                {loadingId === shipment.shipmentId ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                    <><Icon icon='solar:truck-bold' /> CHỐT GIAO HÀNG</>
                                )}
                            </button>
                        ) : (
                            <button className="btn btn-outline-success-600 btn-sm radius-8" disabled>
                                <Icon icon="lucide:printer" className="me-1" /> IN PHIẾU XUẤT
                            </button>
                        )}
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

export default ShipmentLayer;
