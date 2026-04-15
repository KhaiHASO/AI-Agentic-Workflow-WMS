import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useReactApexChart from "../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";

const ReportsLayer = () => {
  let { 
    chartSeries, chartOptions,
    paymentStatusChartSeriesThree, paymentStatusChartOptionsThree,
    earningChartSeries, earningChartOptions
  } = useReactApexChart();

  return (
    <div className='row gy-4'>
      {/* Big Metrics - UnitCountTwo Style */}
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border shadow-none bg-base">
              <div className="d-flex align-items-center justify-content-between mb-16">
                  <span className="w-48-px h-48-px bg-primary-light text-primary-600 rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                      <Icon icon="solar:transmission-bold" />
                  </span>
                  <span className="badge bg-primary-light text-primary-600">+12.5%</span>
              </div>
              <h2 className="mb-0 fw-bold text-dark">4,250</h2>
              <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Giao dịch trong tháng</p>
          </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border shadow-none bg-base">
              <div className="d-flex align-items-center justify-content-between mb-16">
                  <span className="w-48-px h-48-px bg-success-focus text-success-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                      <Icon icon="solar:target-bold" />
                  </span>
                  <span className="badge bg-success-focus text-success-main">99.9%</span>
              </div>
              <h2 className="mb-0 fw-bold text-dark">98.5%</h2>
              <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Tỉ lệ Pick chính xác</p>
          </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border shadow-none bg-base">
              <div className="d-flex align-items-center justify-content-between mb-16">
                  <span className="w-48-px h-48-px bg-warning-focus text-warning-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                      <Icon icon="solar:clock-circle-bold" />
                  </span>
                  <span className="badge bg-warning-focus text-warning-main">-2.4m</span>
              </div>
              <h2 className="mb-0 fw-bold text-dark">18.5m</h2>
              <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Thời gian xử lý TB</p>
          </div>
      </div>
      <div className="col-xxl-3 col-sm-6">
          <div className="card p-24 border shadow-none bg-base">
              <div className="d-flex align-items-center justify-content-between mb-16">
                  <span className="w-48-px h-48-px bg-info-focus text-info-main rounded-circle d-flex justify-content-center align-items-center h4 mb-0">
                      <Icon icon="solar:box-bold" />
                  </span>
                  <span className="badge bg-info-focus text-info-main">Active</span>
              </div>
              <h2 className="mb-0 fw-bold text-dark">1,200</h2>
              <p className="fw-medium text-primary-600 mb-1 text-nowrap text-xs">Pallet đang lưu kho</p>
          </div>
      </div>

      {/* Main Trends Chart */}
      <div className='col-xxl-8 col-md-12'>
        <div className='card h-100 border-0 shadow-sm'>
          <div className='card-header bg-base border-bottom-0 p-24 d-flex justify-content-between align-items-center'>
            <h5 className='card-title mb-0'>Biểu Đồ Xu Hướng Nhập / Xuất (SKU flow)</h5>
            <div className="dropdown">
                <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">30 ngày gần nhất</button>
            </div>
          </div>
          <div className='card-body p-24'>
             <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
          </div>
        </div>
      </div>

      <div className='col-xxl-4 col-md-12'>
        <div className='card h-100 border-0 shadow-sm'>
          <div className='card-header bg-base border-bottom-0 p-24'>
            <h5 className='card-title mb-0'>Hiệu Suất Theo Ca Trực</h5>
          </div>
          <div className='card-body p-24'>
              <ReactApexChart options={paymentStatusChartOptionsThree} series={paymentStatusChartSeriesThree} type="bar" height={350} />
          </div>
        </div>
      </div>

      {/* Bottom Row - Aging & Throughput Details */}
      <div className='col-xxl-6 col-md-12'>
        <div className='card h-100 border-0 shadow-sm'>
          <div className='card-header bg-base border-bottom-0 p-24'>
            <h5 className='card-title mb-0'>Phân Tích Tồn Kho Theo Tuổi (Inventory Aging)</h5>
          </div>
          <div className='card-body p-24'>
              <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                      <thead>
                          <tr className="text-secondary">
                              <th>Khoảng Thời Gian</th>
                              <th>SL Sản Phẩm</th>
                              <th>Giá Trị Ước Tính</th>
                              <th className="text-end">Trạng Thái</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="border-bottom">
                              <td className="py-16"><span className="fw-bold text-success-main">0 - 30 ngày</span></td>
                              <td>850 SKU</td>
                              <td>$1.2M</td>
                              <td className="text-end"><Icon icon="solar:double-alt-arrow-up-bold" className="text-success-main" /></td>
                          </tr>
                          <tr className="border-bottom">
                              <td className="py-16"><span className="fw-bold text-primary-600">31 - 90 ngày</span></td>
                              <td>320 SKU</td>
                              <td>$450K</td>
                              <td className="text-end"><Icon icon="solar:arrow-right-bold" className="text-primary-600" /></td>
                          </tr>
                          <tr className="border-bottom">
                              <td className="py-16"><span className="fw-bold text-warning-main">91 - 180 ngày</span></td>
                              <td>45 SKU</td>
                              <td>$80K</td>
                              <td className="text-end"><Icon icon="solar:double-alt-arrow-down-bold" className="text-warning-main" /></td>
                          </tr>
                           <tr>
                              <td className="py-16"><span className="fw-bold text-danger-main">{">"} 180 ngày</span></td>
                              <td>12 SKU</td>
                              <td>$15K</td>
                              <td className="text-end"><Icon icon="solar:shield-warning-bold" className="text-danger-main" /></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
      </div>

      <div className='col-xxl-6 col-md-12'>
        <div className='card h-100 border-0 shadow-sm'>
          <div className='card-header bg-base border-bottom-0 p-24'>
            <h5 className='card-title mb-0'>Chi Tiết Năng Suất (Throughput)</h5>
          </div>
          <div className='card-body p-24'>
             <div className="mb-32">
                <div className="d-flex align-items-center justify-content-between mb-12">
                    <h6 className="mb-0 text-sm fw-semibold">Hiệu suất Nhận hàng (Inbound)</h6>
                    <span className="text-primary-600 fw-bold">75%</span>
                </div>
                <div className="progress" style={{height: '12px'}}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary-600" style={{width: '75%'}}></div>
                </div>
             </div>
             <div className="mb-32">
                <div className="d-flex align-items-center justify-content-between mb-12">
                    <h6 className="mb-0 text-sm fw-semibold">Hiệu suất Xuất hàng (Outbound)</h6>
                    <span className="text-success-main fw-bold">92%</span>
                </div>
                <div className="progress" style={{height: '12px'}}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success-main" style={{width: '92%'}}></div>
                </div>
             </div>
             <div className="mb-0">
                <div className="d-flex align-items-center justify-content-between mb-12">
                    <h6 className="mb-0 text-sm fw-semibold">Hiệu suất Kiểm kê (Counting)</h6>
                    <span className="text-info-main fw-bold">60%</span>
                </div>
                <div className="progress" style={{height: '12px'}}>
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-info-main" style={{width: '60%'}}></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsLayer;
