import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import putawayTasksData from "../mockData/wms/putawayTasks.json";

const PutawayTaskLayer = () => {
  const [tasks, setTasks] = useState([]);
  const [scanLocation, setScanLocation] = useState("");
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    setTasks(JSON.parse(JSON.stringify(putawayTasksData)));
  }, []);

  const handleScanLocation = (taskId, targetLocation) => {
    if (!scanLocation) {
        toast.warning("Vui lòng quét hoặc nhập mã vị trí đích!");
        return;
    }

    if (scanLocation.trim() !== targetLocation) {
        toast.error(`Sai vị trí! Bạn đang đứng tại ${scanLocation} nhưng hàng cần cất vào ${targetLocation}`);
        return;
    }

    setProcessingId(taskId);
    toast.info(`Đang xác nhận cất hàng cho nhiệm vụ ${taskId}...`);

    setTimeout(() => {
      setTasks(tasks.filter(t => t.taskId !== taskId));
      setProcessingId(null);
      setScanLocation("");
      toast.success(`Nhiệm vụ ${taskId} hoàn thành! Hàng đã được ghi nhận tại vị trí ${targetLocation}`);
    }, 1500);
  };

  return (
    <div className='row gy-4'>
      {/* Visual Header */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-1 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Nhiệm Vụ Đang Mở</p>
                          <h4 className="mb-0 fw-bold text-dark">{tasks.length}</h4>
                          <Icon icon="solar:transfer-vertical-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-2 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Hàng Đợi Staging</p>
                          <h4 className="mb-0 fw-bold text-dark">120</h4>
                          <Icon icon="solar:box-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-3 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Xe Nâng Hoạt Động</p>
                          <h4 className="mb-0 fw-bold text-dark">5</h4>
                          <Icon icon="solar:delivery-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-20 border-0 shadow-sm bg-gradient-start-5 h-100 scale-on-hover overflow-hidden">
                      <div className="card-body p-0">
                          <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs text-uppercase">Hoàn Thành (Hôm nay)</p>
                          <h4 className="mb-0 fw-bold text-dark">85</h4>
                          <Icon icon="solar:check-circle-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Danh Sách Nhiệm Vụ Cất Hàng (Putaway)</h5>
            <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2" onClick={() => toast.info("Đang chuẩn bị lệnh in cho toàn bộ danh sách...")}>
                    <Icon icon="lucide:printer" /> In Toàn Bộ Tem
                </button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary">
                  <tr>
                    <th className="ps-24">Mã Nhiệm Vụ</th>
                    <th>Thông Tin Sản Phẩm</th>
                    <th>Số Lượng</th>
                    <th>Vị Trí Nguồn (Source)</th>
                    <th>Vị Trí Gợi Ý (Dest)</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24 text-center">Quét Xác Nhận (Scan Location)</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center py-40">
                            <Icon icon="solar:check-circle-bold" className="text-success-main h1 mb-16" />
                            <h6 className="text-secondary">Tuyệt vời! Không còn nhiệm vụ cất hàng nào đang chờ.</h6>
                        </td>
                    </tr>
                  ) : tasks.map((task) => (
                    <tr key={task.taskId} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <Icon icon="solar:forward-bold" className="text-primary-600" />
                            <span className="fw-bold">{task.taskId}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column">
                            <span className="fw-bold text-dark">{task.itemCode}</span>
                            <small className="text-secondary">Pallet: <code>{task.handlingUnitBarcode}</code></small>
                        </div>
                      </td>
                      <td><span className="fw-bold h6 mb-0">{task.qty}</span></td>
                      <td><span className="badge bg-secondary-focus text-secondary px-12 py-4">{task.fromLocation}</span></td>
                      <td><span className="badge bg-success-focus text-success-main px-12 py-4 h6 mb-0">{task.toLocation}</span></td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${task.status === 'Open' ? 'bg-warning-focus text-warning-main' : 'bg-success-focus text-success-main'}`}>
                            {task.status === 'Open' ? 'Chờ Cất' : 'Hoàn Thành'}
                        </span>
                      </td>
                      <td className="pe-24 text-center">
                         <div className='d-flex align-items-center justify-content-center gap-2'>
                          <div className="input-group input-group-sm shadow-none border rounded-8 overflow-hidden bg-base" style={{width: '200px'}}>
                            <span className="input-group-text bg-transparent border-0 pe-0"><Icon icon="lucide:map-pin" className="text-secondary" /></span>
                            <input
                                type='text'
                                className='form-control border-0 shadow-none'
                                placeholder='Quét mã vị trí đích...'
                                value={processingId === task.taskId ? task.toLocation : scanLocation}
                                onChange={(e) => setScanLocation(e.target.value)}
                                disabled={processingId === task.taskId}
                            />
                          </div>
                          <button
                            className={`btn ${processingId === task.taskId ? 'btn-secondary' : 'btn-success-600'} btn-sm px-16 radius-8 d-flex align-items-center gap-2`}
                            onClick={() => handleScanLocation(task.taskId, task.toLocation)}
                            disabled={processingId !== null}
                          >
                            {processingId === task.taskId ? (
                                <span className="spinner-border spinner-border-sm" role="status"></span>
                            ) : (
                                <><Icon icon="lucide:check" /> Xác Nhận</>
                            )}
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

export default PutawayTaskLayer;
