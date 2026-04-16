import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import { useWMS } from "../context/WMSContext";

const SalesOrdersLayer = () => {
  const { salesOrders, createWave } = useWMS();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isCreatingWave, setIsCreatingWave] = useState(false);

  const toggleSelect = (id) => {
      if (selectedOrders.includes(id)) {
          setSelectedOrders(selectedOrders.filter(item => item !== id));
      } else {
          setSelectedOrders([...selectedOrders, id]);
      }
  };

  const handleCreateWave = () => {
      if (selectedOrders.length === 0) {
          toast.warning("Vui lòng chọn ít nhất một đơn hàng để tạo Wave!");
          return;
      }
      setIsCreatingWave(true);
      toast.info(`Đang phân tích tồn kho và lập lộ trình lấy hàng cho ${selectedOrders.length} đơn hàng...`);
      
      setTimeout(() => {
          createWave(selectedOrders);
          setIsCreatingWave(false);
          toast.success(`Đã tạo Đợt lấy hàng (Wave) WV-${Math.floor(Math.random()*9000)+1000} thành công!`);
          setSelectedOrders([]);
      }, 2000);
  };

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      {/* Visual Summary */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-1 h-100 scale-on-hover">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1 text-xs text-uppercase">SO Chờ Xử Lý</p>
                              <h4 className="mb-0 fw-bold text-dark">{salesOrders.length}</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-white bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center text-primary-600 h4 mb-0">
                              <Icon icon="solar:cart-large-minimalistic-bold" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-2 h-100 scale-on-hover">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1 text-xs text-uppercase">Đang Lấy Hàng</p>
                              <h4 className="mb-0 fw-bold text-dark">12</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-white bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center text-primary-600 h4 mb-0">
                              <Icon icon="solar:box-minimalistic-bold" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-3 h-100 scale-on-hover">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1 text-xs text-uppercase">Giao Thành Công</p>
                              <h4 className="mb-0 fw-bold text-dark">28</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-white bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center text-primary-600 h4 mb-0">
                              <Icon icon="solar:check-circle-bold" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-5 h-100 scale-on-hover">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1 text-xs text-uppercase">Ưu tiên cao</p>
                              <h4 className="mb-0 fw-bold text-dark">05</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-white bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center text-primary-600 h4 mb-0">
                              <Icon icon="solar:shield-warning-bold" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16 overflow-hidden'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <div>
                <h5 className='card-title mb-0 fw-bold'>Lập Kế Hoạch Xuất Hàng (Wave Planning)</h5>
                <p className="text-sm text-secondary mb-0">Chọn các đơn hàng để gom vào một đợt lấy hàng (Wave).</p>
            </div>
            <div className="d-flex gap-2">
                <button className={`btn ${selectedOrders.length > 0 ? 'btn-primary-600' : 'btn-outline-primary'} radius-12 px-24 fw-bold d-flex align-items-center gap-2`} onClick={handleCreateWave} disabled={isCreatingWave}>
                    {isCreatingWave ? (
                        <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                        <><Icon icon='solar:bolt-circle-bold' /> GOM WAVE ({selectedOrders.length})</>
                    )}
                </button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                  <tr>
                    <th className="ps-24 py-16" style={{width: '50px'}}>
                        <div className="form-check style-check">
                            <input className="form-check-input" type="checkbox" onChange={(e) => e.target.checked ? setSelectedOrders(salesOrders.map(o => o.id)) : setSelectedOrders([])} />
                        </div>
                    </th>
                    <th>Mã Đơn (SO)</th>
                    <th>Khách Hàng</th>
                    <th className="text-center">Số Lượng</th>
                    <th>Ngày Giao</th>
                    <th>Độ Ưu Tiên</th>
                    <th className="pe-24 text-end">Trạng Thái ERP</th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrders.map((order) => (
                    <tr key={order.id} className={`hover-bg-primary-50 transition-all ${selectedOrders.includes(order.id) ? 'bg-primary-50 bg-opacity-50' : ''}`} onClick={() => toggleSelect(order.id)} style={{cursor: 'pointer'}}>
                      <td className="ps-24 py-20">
                        <div className="form-check style-check">
                            <input className="form-check-input" type="checkbox" checked={selectedOrders.includes(order.id)} readOnly />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                            <Icon icon="solar:bill-list-bold" className="text-primary-600" />
                            <span className="fw-bold text-dark">{order.id}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                            <div className="w-32-px h-32-px bg-info-focus text-info-main rounded-circle d-flex justify-content-center align-items-center text-xxs fw-bold">CUS</div>
                            <span className="text-secondary fw-medium">{order.customer}</span>
                        </div>
                      </td>
                      <td className="text-center"><span className="fw-black text-dark h6 mb-0">{order.qty}</span></td>
                      <td><span className="text-dark fw-medium text-sm">{order.date}</span></td>
                      <td>
                        <span className={`badge ${order.priority === 'Urgent' ? 'bg-danger-focus text-danger-main' : (order.priority === 'High' ? 'bg-warning-focus text-warning-main' : 'bg-info-focus text-info-main')} px-12 py-4 radius-8 text-xxs fw-bold`}>
                            {order.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="pe-24 text-end">
                        <span className="px-12 py-4 rounded-pill fw-bold text-xxs bg-success-focus text-success-main">
                            <Icon icon="lucide:shield-check" className="me-1" /> {order.status}
                        </span>
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

export default SalesOrdersLayer;
