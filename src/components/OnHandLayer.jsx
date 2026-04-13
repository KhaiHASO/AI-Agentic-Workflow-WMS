import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';
import ReactApexChart from "react-apexcharts";
import { useWMS } from "../context/WMSContext";

const OnHandLayer = () => {
  const { onHand } = useWMS();
  const [isLoading, setIsLoading] = useState(true);

  const filledBins = new Set(onHand.map(oh => oh.locationCode)).size;
  const totalBins = 150;
  
  const availableCount = onHand.filter(s => s.status === 'Available').length;
  const qcCount = onHand.filter(s => s.status === 'QC' || s.status === 'Hold').length;
  const totalSkuCount = onHand.length;

  const donutChartSeries = [
    totalSkuCount > 0 ? Math.round((availableCount / totalSkuCount) * 100) : 0, 
    totalSkuCount > 0 ? Math.round((qcCount / totalSkuCount) * 100) : 0, 
    0
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  const donutChartOptions = {
    colors: ['#487FFF', '#FF9F43', '#EF4444'],
    labels: ['Sẵn Sàng', 'Chờ QC', 'Hỏng/Khóa'],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
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
          <div className="col-12">
              <div className="card border-0 shadow-sm p-40 text-center">
                  <div className="spinner-grow text-primary mb-16" role="status"></div>
                  <h6 className="text-secondary">Đang đồng bộ tồn kho thời gian thực...</h6>
              </div>
          </div>
      </div>
  );

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      {/* Visual Analytics Row */}
      <div className="col-xxl-3 col-md-6">
          <div className="card h-100 p-24 border-0 shadow-sm">
              <h6 className="mb-24 text-md fw-bold">Trạng Thái Phẩm Chất</h6>
              <div className="d-flex justify-content-center">
                <ReactApexChart options={donutChartOptions} series={donutChartSeries} type="donut" height={200} />
              </div>
              <div className="mt-24 d-flex flex-column gap-12">
                  <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                          <span className="text-sm text-secondary text-xs">Sẵn Sàng (Available)</span>
                      </div>
                      <span className="text-sm fw-bold">75%</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-circle bg-warning-main"></span>
                          <span className="text-sm text-secondary text-xs">Chờ QC (Hold)</span>
                      </div>
                      <span className="text-sm fw-bold">20%</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="col-xxl-9 col-md-6">
          <div className="row gy-4 h-100">
              <div className="col-md-4">
                <div className="card shadow-none border bg-gradient-start-1 h-100 scale-on-hover overflow-hidden">
                    <div className="card-body p-20">
                        <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">SKU CÓ TỒN</p>
                        <h4 className="mb-0 fw-bold text-dark">{onHand.length}</h4>
                        <Icon icon="solar:box-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                    </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-none border bg-gradient-start-3 h-100 scale-on-hover overflow-hidden">
                    <div className="card-body p-20">
                        <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">VỊ TRÍ ĐÃ LẤP</p>
                        <h4 className="mb-0 fw-bold text-dark">{filledBins} / {totalBins}</h4>
                         <Icon icon="solar:map-point-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                    </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-none border bg-gradient-start-5 h-100 scale-on-hover overflow-hidden">
                    <div className="card-body p-20">
                        <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">GIÁ TRỊ TỔN</p>
                        <h4 className="mb-0 fw-bold text-dark">$1.2M</h4>
                         <Icon icon="solar:wallet-money-bold" className="position-absolute end-0 bottom-0 mb-n3 me-n3 text-primary-600 opacity-25" style={{fontSize: '80px'}} />
                    </div>
                </div>
              </div>
              <div className="col-12">
                  <div className="card border-0 shadow-sm p-24 h-100 d-flex flex-row align-items-center justify-content-between bg-base">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-48-px h-48-px bg-danger-focus text-danger-main rounded-circle d-flex justify-content-center align-items-center animate__animated animate__swing animate__infinite">
                                <Icon icon="solar:bell-bing-bold" className="text-2xl" />
                            </div>
                            <div>
                                <h6 className="mb-0 fw-bold">15 Sản phẩm sắp hết hạn</h6>
                                <p className="text-sm text-secondary mb-0">Cần ưu tiên xuất kho hoặc xử lý rủi ro ngay.</p>
                            </div>
                        </div>
                        <button className="btn btn-danger-600 btn-sm radius-8 px-24" onClick={() => toast.error("Đang trích xuất danh sách hàng hết hạn...")}>Xử Lý Ngay</button>
                  </div>
              </div>
          </div>
      </div>

      {/* Inventory Table Section */}
      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base p-24 border-bottom-0'>
            <h5 className='card-title mb-0 fw-bold text-dark'>Chi Tiết Tồn Kho Thời Gian Thực</h5>
            <div className="d-flex align-items-center gap-2">
                 <div className="input-group input-group-sm border rounded-8 overflow-hidden">
                    <span className="input-group-text bg-base border-0"><Icon icon="lucide:search" /></span>
                    <input type="text" className="form-control border-0 shadow-none" placeholder="Tìm vị trí, SKU, Lô..." />
                 </div>
                 <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 text-nowrap radius-8" onClick={() => toast.info("Đang mở bộ lọc nâng cao...")}>
                    <Icon icon="lucide:filter" /> Bộ lọc
                 </button>
                 <button className="btn btn-success-600 btn-sm d-flex align-items-center gap-2 text-nowrap radius-8" onClick={() => toast.success("Đã xuất file báo cáo tồn kho!")}>
                    <Icon icon="lucide:download" /> Xuất Excel
                 </button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary text-xs fw-bold text-uppercase">
                  <tr>
                    <th className="ps-24">Vị Trí (Location)</th>
                    <th>Sản Phẩm (Item)</th>
                    <th>Lô (Lot No)</th>
                    <th>Hạn Sử Dụng</th>
                    <th className="text-center">Số Lượng</th>
                    <th>ĐVT</th>
                    <th>Trạng Thái</th>
                    <th className="pe-24 text-end">Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {onHand.map((stock, idx) => (
                    <tr key={idx} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex align-items-center gap-2">
                            <div className="w-32-px h-32-px bg-primary-light text-primary-600 rounded d-flex justify-content-center align-items-center fw-bold text-xs">
                                {stock.locationCode.split('-').pop()}
                            </div>
                            <span className="fw-bold text-primary-600">{stock.locationCode}</span>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{stock.itemCode}</div>
                        <small className="text-secondary">Nguyên vật liệu</small>
                      </td>
                      <td><code className="text-dark bg-light px-8 py-2 rounded-4">{stock.lotNo || "N/A"}</code></td>
                      <td>
                        <span className={stock.expiryDate ? "text-dark" : "text-secondary italic text-xs"}>
                            {stock.expiryDate || "Không có hạn"}
                        </span>
                      </td>
                      <td className="text-center"><h6 className="mb-0 fw-bold">{stock.qty}</h6></td>
                      <td><span className="text-secondary fw-bold text-xs">{stock.uom}</span></td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-medium text-xs ${stock.status === 'Available' ? 'bg-success-focus text-success-main' : 'bg-warning-focus text-warning-main'}`}>
                            <Icon icon={stock.status === 'Available' ? 'lucide:check-circle' : 'lucide:clock'} className="me-1" />
                            {stock.status === 'Available' ? 'Sẵn Sàng' : 'Chờ QC'}
                        </span>
                      </td>
                      <td className="pe-24 text-end">
                         <button className='w-32-px h-32-px bg-base text-secondary rounded-circle d-inline-flex align-items-center justify-content-center border hvr-push' title="Lịch sử thẻ kho" onClick={() => toast.info(`Đang truy xuất thẻ kho cho ${stock.itemCode}...`)}>
                          <Icon icon='lucide:history' />
                        </button>
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
