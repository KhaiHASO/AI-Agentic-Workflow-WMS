import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';

const DevicesLayer = () => {
  const [devices, setDevices] = useState([
      { id: "SCN-001", model: "Honeywell EDA51", user: "Phan Khải", status: "ONLINE", battery: 85, lastAccess: "13/04/2026 14:30", img: "https://wowdash.wowtheme7.com/assets/images/user-grid/user-grid-img13.png" },
      { id: "SCN-002", model: "Zebra TC21", user: null, status: "OFFLINE", battery: 12, lastAccess: "12/04/2026 17:05", img: null }
  ]);

  const [newDevice, setNewDevice] = useState({
      id: `SCN-00${Math.floor(Math.random() * 9) + 3}`,
      model: "Zebra TC52",
      user: "Nhân viên Kho mới",
      type: "ANDROID_HANDHELD"
  });

  const handleRegister = () => {
      toast.info("Đang đăng ký mã định danh thiết bị vào hệ thống...");
      setTimeout(() => {
          const createdDevice = {
              id: newDevice.id,
              model: newDevice.model,
              user: newDevice.user,
              status: "ONLINE",
              battery: 100,
              lastAccess: "Vừa xong",
              img: "https://wowdash.wowtheme7.com/assets/images/user-grid/user-grid-img14.png"
          };
          setDevices([createdDevice, ...devices]);
          toast.success(`Thiết bị ${newDevice.id} đã được kích hoạt thành công!`);
      }, 1200);
  };

  const handleLock = (id) => {
      toast.warning(`Đã gửi lệnh khóa từ xa tới thiết bị ${id}.`);
  };

  return (
    <div className='row gy-4'>
      {/* Device Status Overview */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-1 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1">Thiết Bị Trực Tuyến</p>
                              <h4 className="mb-0 fw-bold text-dark">{devices.filter(d => d.status === 'ONLINE').length}</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                              <Icon icon="solar:globus-bold" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-2 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1">Ngoại Tuyến (Offline)</p>
                              <h4 className="mb-0 fw-bold text-dark">{devices.filter(d => d.status === 'OFFLINE').length}</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                              <Icon icon="solar:monitor-broken-bold" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-3 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1">Thiết Bị Bị Khóa</p>
                              <h4 className="mb-0 fw-bold text-dark">0</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                              <Icon icon="solar:lock-password-bold" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-5 h-100">
                      <div className="d-flex align-items-center justify-content-between">
                          <div>
                              <p className="fw-medium text-primary-600 mb-1">Phiên Bản App</p>
                              <h4 className="mb-0 fw-bold text-dark">v2.1.0</h4>
                          </div>
                          <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                              <Icon icon="solar:reorder-bold" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Device Management Grid */}
      <div className="col-12">
          <div className="card border-0 shadow-sm">
              <div className="card-header bg-base border-bottom-0 p-24 d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Danh Sách Thiết Bị Cầm Tay (Scanners)</h5>
                  <button className="btn btn-primary-600 btn-sm d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#registerDeviceModal">
                      <Icon icon="lucide:plus" /> Đăng Ký Mới
                  </button>
              </div>
              <div className="card-body p-0">
                  <div className="table-responsive">
                      <table className="table mb-0 align-middle">
                          <thead className="bg-base text-secondary-light">
                              <tr>
                                  <th className="ps-24">Thiết Bị</th>
                                  <th>Người Sử Dụng</th>
                                  <th>Kết Nối</th>
                                  <th>Pin / Sóng</th>
                                  <th>Thời Gian Truy Cập</th>
                                  <th className="pe-24 text-end">Hành Động</th>
                              </tr>
                          </thead>
                          <tbody>
                              {devices.map((device) => (
                                <tr key={device.id} className="hover-bg-primary-50">
                                    <td className="ps-24">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="w-48-px h-48-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center">
                                                <Icon icon="solar:scanner-bold" className="text-2xl" />
                                            </div>
                                            <div>
                                                <span className="fw-bold text-dark">{device.id}</span><br/>
                                                <small className="text-secondary-light text-xs">{device.model}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {device.user ? (
                                            <div className="d-flex align-items-center gap-2">
                                                <img src={device.img || "https://wowdash.wowtheme7.com/assets/images/user-grid/user-grid-img13.png"} alt="User" className="w-32-px h-32-px rounded-circle" />
                                                <span className="text-secondary-light fw-medium">{device.user}</span>
                                            </div>
                                        ) : (
                                            <span className="text-secondary-light italic text-xs">Chưa bàn giao</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`badge-dot style-circle ${device.status === 'ONLINE' ? 'bg-success-main' : 'bg-secondary-light'} me-1`}></span>
                                        <span className={`${device.status === 'ONLINE' ? 'text-success-main' : 'text-secondary-light'} fw-bold text-xs`}>{device.status}</span>
                                    </td>
                                    <td style={{minWidth: '120px'}}>
                                        <div className="d-flex align-items-center gap-2">
                                            <Icon icon={device.battery > 20 ? "solar:battery-charge-bold" : "solar:battery-low-bold"} className={device.battery > 20 ? "text-success-main" : "text-danger-main"} />
                                            <div className="progress w-100" style={{height: '4px'}}>
                                                <div className={`progress-bar ${device.battery > 20 ? 'bg-success-main' : 'bg-danger-main'}`} style={{width: `${device.battery}%`}}></div>
                                            </div>
                                            <small className="text-xs fw-bold">{device.battery}%</small>
                                        </div>
                                    </td>
                                    <td><span className="text-sm text-secondary-light">{device.lastAccess}</span></td>
                                    <td className="pe-24 text-end">
                                        <div className="d-flex justify-content-end gap-2">
                                            <button className="w-32-px h-32-px bg-base text-primary-600 rounded-8 d-inline-flex align-items-center justify-content-center border" title="Cấu hình" onClick={() => toast.info("Đang tải cấu hình thiết bị...")}>
                                                <Icon icon="lucide:settings" />
                                            </button>
                                            <button className="w-32-px h-32-px bg-base text-danger-main rounded-8 d-inline-flex align-items-center justify-content-center border" title="Khóa" onClick={() => handleLock(device.id)}>
                                                <Icon icon="lucide:lock" />
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

      {/* Modal Register Device */}
      <div className="modal fade" id="registerDeviceModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content radius-16 border-0 shadow-lg">
                  <div className="modal-header py-16 px-24 border-bottom bg-primary-600">
                      <h5 className="modal-title fw-medium text-primary-light mb-1 d-flex align-items-center gap-2">
                          <Icon icon="solar:scanner-bold" /> Đăng Ký Thiết Bị Scanner
                      </h5>
                      <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body p-24">
                      <div className="row gy-3">
                          <div className="col-12">
                              <label className="form-label fw-bold">Mã ID Thiết Bị</label>
                              <input type="text" className="form-control" value={newDevice.id} onChange={(e) => setNewDevice({...newDevice, id: e.target.value})} />
                          </div>
                          <div className="col-12">
                              <label className="form-label fw-bold">Model Thiết Bị</label>
                              <input type="text" className="form-control" value={newDevice.model} onChange={(e) => setNewDevice({...newDevice, model: e.target.value})} />
                          </div>
                          <div className="col-12">
                              <label className="form-label fw-bold">Nhân Viên Bàn Giao</label>
                              <input type="text" className="form-control" value={newDevice.user} onChange={(e) => setNewDevice({...newDevice, user: e.target.value})} />
                          </div>
                          <div className="col-12">
                              <label className="form-label fw-bold">Loại Thiết Bị</label>
                              <select className="form-select" value={newDevice.type} onChange={(e) => setNewDevice({...newDevice, type: e.target.value})}>
                                  <option value="ANDROID_HANDHELD">Android Handheld (Scanner chuyên dụng)</option>
                                  <option value="TABLET">Tablet / IPad</option>
                                  <option value="MOBILE">Smartphone</option>
                              </select>
                          </div>
                      </div>
                  </div>
                  <div className="modal-footer bg-base border-top p-24">
                      <button type="button" className="btn btn-outline-secondary px-24" data-bs-dismiss="modal">Hủy</button>
                      <button type="button" className="btn btn-primary-600 px-32" data-bs-dismiss="modal" onClick={handleRegister}>Kích Hoạt Thiết Bị</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default DevicesLayer;
