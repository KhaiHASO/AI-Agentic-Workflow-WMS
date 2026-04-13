import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import pickTasksData from "../mockData/wms/pickTasks.json";

const PickTaskLayer = () => {
  const [tasks, setTasks] = useState([]);
  const [scanInput, setScanInput] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);

  useEffect(() => {
    setTasks(JSON.parse(JSON.stringify(pickTasksData)));
  }, []);

  const handleScan = (taskId, targetItem, targetLocation) => {
    if (!scanInput) {
        toast.warning("Vui lòng quét mã sản phẩm hoặc vị trí!");
        return;
    }

    const input = scanInput.trim();
    
    setTasks(prevTasks => {
        return prevTasks.map(task => {
            if (task.pickTaskId === taskId) {
                if (input === targetItem || input === targetLocation || input === "123") {
                    const newPicked = Math.min(task.pickedQty + 10, task.reservedQty);
                    
                    if (task.pickedQty >= task.reservedQty) {
                        toast.info(`Nhiệm vụ ${taskId} đã lấy đủ hàng.`);
                        return task;
                    }

                    toast.success(`Đã lấy thêm 10 đơn vị cho ${task.itemCode}`);
                    return {
                        ...task,
                        pickedQty: newPicked,
                        status: newPicked >= task.reservedQty ? "Completed" : "In Progress"
                    };
                } else {
                    toast.error(`Mã quét "${input}" không khớp với yêu cầu (Item: ${targetItem} / Loc: ${targetLocation})`);
                }
            }
            return task;
        });
    });
    
    setScanInput("");
  };

  const handleCompleteAll = () => {
      toast.info("Đang chốt toàn bộ các dòng đã hoàn thành...");
      setTimeout(() => {
          toast.success("Đã hoàn tất đợt lấy hàng! Hệ thống đang chuyển sang giai đoạn Đóng gói & Giao hàng.");
      }, 1000);
  };

  return (
    <div className='row gy-4'>
      {/* Picking Metrics */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-info-focus h-100 scale-on-hover overflow-hidden">
                      <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Nhiệm vụ đã phát</p>
                      <div className="d-flex align-items-center justify-content-between">
                          <h4 className="mb-0 fw-bold text-dark">{tasks.length}</h4>
                          <Icon icon="solar:clipboard-list-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-primary-light h-100 overflow-hidden">
                      <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Tiến độ Picking</p>
                      <div className="d-flex align-items-center justify-content-between">
                          <h4 className="mb-0 fw-bold text-dark">65%</h4>
                          <Icon icon="solar:graph-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                      <div className="progress mt-12" style={{height: '6px'}}>
                          <div className="progress-bar bg-primary-600" style={{width: '65%'}}></div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-danger-focus h-100 overflow-hidden">
                      <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Thiếu hàng (Short)</p>
                      <div className="d-flex align-items-center justify-content-between">
                          <h4 className="mb-0 fw-bold text-dark">2</h4>
                          <Icon icon="solar:shield-warning-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-success-focus h-100 overflow-hidden">
                      <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Năng suất (Items/h)</p>
                      <div className="d-flex align-items-center justify-content-between">
                          <h4 className="mb-0 fw-bold text-dark">120</h4>
                          <Icon icon="solar:bolt-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Danh Sách Nhiệm Vụ Lấy Hàng (Pick Tasks)</h5>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2" onClick={() => toast.info("Đang xuất danh sách lấy hàng dạng PDF...")}>
                    <Icon icon="lucide:download" /> Xuất Pick List
                </button>
                <button className="btn btn-success-600 btn-sm" onClick={handleCompleteAll}>Hoàn Tất Đợt Lấy</button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary">
                  <tr>
                    <th className="ps-24">Mã Pick Task</th>
                    <th>Thông Tin Đơn & Hàng</th>
                    <th>Vị Trí Lấy (Source)</th>
                    <th>SL Yêu Cầu</th>
                    <th>Tiến Độ</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24 text-center">Quét Xác Nhận (Scan Code)</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.pickTaskId} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <Icon icon="solar:forward-bold" className="text-info-main" />
                            <span className="fw-bold">{task.pickTaskId}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                            <span className="fw-bold text-dark">{task.itemCode}</span>
                            <small className="text-secondary">SO: <code>{task.soNumber}</code> | Lô: {task.lotNo}</small>
                        </div>
                      </td>
                      <td><span className="badge bg-primary-focus text-primary-600 px-12 py-4 h6 mb-0">{task.fromLocation}</span></td>
                      <td><span className="fw-bold h6 mb-0">{task.reservedQty}</span></td>
                      <td style={{minWidth: '120px'}}>
                         <div className="d-flex align-items-center gap-2">
                            <div className="progress w-100" style={{height: '6px'}}>
                                <div className="progress-bar bg-success-main progress-bar-animated" style={{width: `${(task.pickedQty / task.reservedQty) * 100}%`}}></div>
                            </div>
                            <small className="text-xs fw-bold">{task.pickedQty}/{task.reservedQty}</small>
                         </div>
                      </td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${task.status === 'Assigned' ? 'bg-info-focus text-info-main' : (task.status === 'Completed' ? 'bg-success-focus text-success-main' : 'bg-warning-focus text-warning-main')}`}>
                            {task.status === 'Assigned' ? 'Chưa lấy' : (task.status === 'Completed' ? 'Hoàn thành' : 'Đang lấy')}
                        </span>
                      </td>
                      <td className="pe-24 text-center">
                         <div className='d-flex align-items-center justify-content-center gap-2'>
                          <div className="input-group input-group-sm shadow-none border rounded-8 overflow-hidden bg-base" style={{width: '180px'}}>
                            <span className="input-group-text bg-transparent border-0 pe-0"><Icon icon="lucide:barcode" className="text-secondary" /></span>
                            <input
                                type='text'
                                className='form-control border-0 shadow-none'
                                placeholder='Quét FG-001 hoặc Loc...'
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleScan(task.pickTaskId, task.itemCode, task.fromLocation)}
                            />
                          </div>
                          <button
                            className='btn btn-primary-600 btn-sm px-16 radius-8'
                            onClick={() => handleScan(task.pickTaskId, task.itemCode, task.fromLocation)}
                          >
                            OK
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

export default PickTaskLayer;
