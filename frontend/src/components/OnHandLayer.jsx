import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import ReactApexChart from "react-apexcharts";
import { useWMS } from "../context/WMSContext";

const OnHandLayer = () => {
  const { onHand, toggleHold } = useWMS();
  const [isLoading, setIsLoading] = useState(true);

  const filledBins = new Set(onHand.map(oh => oh.locationCode)).size;
  const totalBins = 150;
  
  const availableCount = onHand.filter(s => s.status === 'Available').length;
  const qcCount = onHand.filter(s => s.status === 'QC').length;
  const holdCount = onHand.filter(s => s.status === 'Hold' || s.status === 'Blocked').length;
  const totalSkuCount = onHand.length;

  const donutChartSeries = [
    totalSkuCount > 0 ? Math.round((availableCount / totalSkuCount) * 100) : 0, 
    totalSkuCount > 0 ? Math.round((qcCount / totalSkuCount) * 100) : 0, 
    totalSkuCount > 0 ? Math.round((holdCount / totalSkuCount) * 100) : 0
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const donutChartOptions = {
    colors: ['#487FFF', '#FF9F43', '#EF4444'],
    labels: ['Sẵn Sàng', 'Chờ QC', 'Khóa/Chặn'],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
        pie: {
            donut: {
                size: '70%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'Tổng Tồn',
                        formatter: () => onHand.reduce((acc, s) => acc + s.qty, 0).toLocaleString()
                    }
                }
            }
        }
    }
  };

  if (isLoading) return (
      <div className="row gy-4">
          <div className="col-12 text-center p-40 card border-0 shadow-sm bg-base">
              <div className="spinner-border text-primary-600 mb-16" role="status"></div>
              <h6 className="text-secondary fw-bold uppercase text-xs">Đang đồng bộ tồn kho thực tế...</h6>
          </div>
      </div>
  );

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      <div className="col-xxl-3 col-md-6">
          <div className="card h-100 p-24 border-0 shadow-sm radius-16 bg-base">
              <h6 className="mb-24 text-sm fw-black text-uppercase letter-spacing-1">Phẩm Chất Tồn Kho</h6>
              <div className="d-flex justify-content-center">
                <ReactApexChart options={donutChartOptions} series={donutChartSeries} type="donut" height={220} />
              </div>
              <div className="mt-24 d-flex flex-column gap-12">
                  <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                          <span className="text-xs fw-bold text-secondary uppercase">Sẵn Sàng (Available)</span>
                      </div>
                      <span className="text-sm fw-black text-primary-600">{donutChartSeries[0]}%</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-warning-main"></span>
                          <span className="text-xs fw-bold text-secondary uppercase">Chờ QC / Kiểm Định</span>
                      </div>
                      <span className="text-sm fw-black text-warning-main">{donutChartSeries[1]}%</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-danger-main"></span>
                          <span className="text-xs fw-bold text-secondary uppercase">Đang Bị Khóa (Hold)</span>
                      </div>
                      <span className="text-sm fw-black text-danger-main">{donutChartSeries[2]}%</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="col-xxl-9 col-md-6">
          <div className="row gy-4 h-100">
              <div className="col-md-4">
                <div className="card shadow-none border bg-primary-light h-100 radius-16 overflow-hidden">
                    <div className="card-body p-24">
                        <p className="fw-black text-primary-600 mb-4 text-xs uppercase letter-spacing-1">SKU CÓ TỒN</p>
                        <h2 className="mb-0 fw-black text-dark">{onHand.length}</h2>
                        <Icon icon="solar:box-minimalistic-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '90px'}} />
                    </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-none border bg-success-focus h-100 radius-16 overflow-hidden">
                    <div className="card-body p-24">
                        <p className="fw-black text-success-main mb-4 text-xs uppercase letter-spacing-1">VỊ TRÍ SỬ DỤNG</p>
                        <h2 className="mb-0 fw-black text-dark">{filledBins} <small className="h6 text-secondary fw-bold">/ {totalBins}</small></h2>
                         <Icon icon="solar:map-point-bold-duotone" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-success-main opacity-25" style={{fontSize: '90px'}} />
                    </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-none border bg-danger-focus h-100 radius-16 overflow-hidden">
                    <div className="card-body p-24">
                        <p className="fw-black text-danger-main mb-4 text-xs uppercase letter-spacing-1">HÀNG SẮP HẾT HẠN</p>
                        <h2 className="mb-0 fw-black text-dark">15</h2>
                         <Icon icon="solar:clock-circle-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-danger-main opacity-25" style={{fontSize: '90px'}} />
                    </div>
                </div>
              </div>
              <div className="col-12">
                  <div className="card border-0 shadow-sm p-24 radius-16 d-flex flex-row align-items-center justify-content-between bg-dark text-white">
                        <div className="d-flex align-items-center gap-4">
                            <div className="w-56-px h-56-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center h3 mb-0 shadow-primary">
                                <Icon icon="solar:info-circle-bold" />
                            </div>
                            <div>
                                <h5 className="mb-0 fw-bold">QUẢN TRỊ KHO DỰ PHÒNG (RESERVE STOCK)</h5>
                                <p className="text-sm opacity-50 mb-0">Hệ thống gợi ý bổ sung <strong>500kg RM-001</strong> để đáp ứng kế hoạch sản xuất tuần tới.</p>
                            </div>
                        </div>
                        <button className="btn btn-primary-600 px-32 py-12 radius-12 fw-bold shadow-primary" onClick={() => toast.success("Đã khởi tạo lệnh nhập bổ sung!")}>TẠO LỆNH NHẬP</button>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16 overflow-hidden'>
          <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base p-24 border-bottom-0'>
            <h5 className='card-title mb-0 fw-black text-dark uppercase'>BẢNG TỒN KHO CHI TIẾT (ON-HAND LEDGER)</h5>
            <div className="d-flex align-items-center gap-2">
                 <div className="input-group input-group-sm border rounded-12 overflow-hidden bg-light" style={{width: '300px'}}>
                    <span className="input-group-text bg-transparent border-0 ps-16"><Icon icon="solar:magnifer-bold" className="text-secondary" /></span>
                    <input type="text" className="form-control border-0 shadow-none py-10" placeholder="Vị trí, SKU, Lô..." />
                 </div>
                 <button className="btn btn-outline-secondary btn-sm radius-12 px-16" onClick={() => toast.info("Bộ lọc nâng cao...")}><Icon icon="lucide:filter" /></button>
                 <button className="btn btn-success-600 btn-sm radius-12 px-24 fw-bold" onClick={() => toast.success("Đang tải file Excel...")}><Icon icon="solar:file-download-bold" className="me-1" /> EXPORT</button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                  <tr>
                    <th className="ps-24">Vị Trí (Location)</th>
                    <th>Sản Phẩm (Item)</th>
                    <th>Lô (Lot No)</th>
                    <th>Hạn Sử Dụng</th>
                    <th className="text-center">Số Lượng</th>
                    <th>ĐVT</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24 text-end">KHÓA / GIỮ HÀNG</th>
                  </tr>
                </thead>
                <tbody>
                  {onHand.map((stock, idx) => (
                    <tr key={idx} className={`hover-bg-primary-50 ${stock.status === 'Hold' || stock.status === 'Blocked' ? 'bg-danger-focus' : ''}`}>
                      <td className="ps-24 py-20">
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-primary-600 text-white px-12 py-6 radius-8 fw-black text-xs">{stock.locationCode}</span>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{stock.itemCode}</div>
                        <small className="text-secondary text-xxs fw-bold uppercase">Phân loại: Raw Material</small>
                      </td>
                      <td><code className="text-primary-600 bg-primary-50 px-12 py-4 rounded-8 fw-bold">{stock.lotNo || "N/A"}</code></td>
                      <td>
                        <span className={`text-xs fw-bold ${stock.expiryDate ? "text-dark" : "text-secondary italic"}`}>
                            {stock.expiryDate || "Không thời hạn"}
                        </span>
                      </td>
                      <td className="text-center"><h5 className="mb-0 fw-black text-dark">{stock.qty.toLocaleString()}</h5></td>
                      <td><span className="badge bg-light text-secondary px-8 py-4 radius-4">{stock.uom}</span></td>
                      <td>
                        <span className={`px-12 py-6 rounded-pill fw-black text-xxs text-uppercase ${stock.status === 'Available' ? 'bg-success-focus text-success-main' : (stock.status === 'QC' ? 'bg-warning-focus text-warning-main' : 'bg-danger-focus text-danger-main')}`}>
                            {stock.status === 'Available' ? 'Sẵn Sàng' : (stock.status === 'QC' ? 'Chờ QC' : 'Đang Khóa')}
                        </span>
                      </td>
                      <td className="pe-24 text-end">
                        <div className="d-flex justify-content-end gap-2">
                            <button 
                                className={`btn btn-sm radius-8 px-16 fw-bold ${stock.status === 'Hold' ? 'btn-success-main' : 'btn-danger-main'}`}
                                onClick={() => {
                                    toggleHold(stock.locationCode, stock.itemCode, stock.lotNo);
                                    toast.warning(stock.status === 'Hold' ? `Đã MỞ KHÓA ${stock.itemCode}` : `Đã KHÓA CHẶN ${stock.itemCode}`);
                                }}
                            >
                                <Icon icon={stock.status === 'Hold' ? "solar:lock-unlocked-bold" : "solar:lock-password-bold"} className="me-1" />
                                {stock.status === 'Hold' ? 'UNHOLD' : 'HOLD/BLOCK'}
                            </button>
                            <button className="btn btn-outline-secondary btn-sm radius-8" title="Thẻ kho (Bin Card)" onClick={() => toast.info("Đang xem lịch sử vị trí...")}>
                                <Icon icon="solar:history-bold" />
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

export default OnHandLayer;
