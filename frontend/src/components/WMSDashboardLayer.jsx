import React from "react";
import { Icon } from "@iconify/react";
import useReactApexChart from "../hook/useReactApexChart";
import ReactApexChart from "react-apexcharts";
import { useWMS } from "../context/WMSContext";

const WMSDashboardLayer = () => {
  let { paymentStatusChartSeriesThree, paymentStatusChartOptionsThree } = useReactApexChart();
  const { inboundDrafts, putawayTasks, onHand, shipments, ledger } = useWMS();

  const totalAvailableQty = onHand.reduce((acc, curr) => acc + curr.qty, 0);
  const filledBins = new Set(onHand.map(oh => oh.locationCode)).size;
  const totalBins = 150;
  const fillRate = Math.round((filledBins / totalBins) * 100);
  const completedOrders = ledger.filter(t => t.transactionType === 'OUTBOUND_SHIP').length;

  return (
    <>
      <div className='row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4'>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-1 h-100 scale-on-hover'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-600 mb-1 text-nowrap text-xs'>PO CHỜ NHẬN</p>
                  <h4 className='mb-0 fw-bold'>{inboundDrafts.length}</h4>
                </div>
                <div className='w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='solar:inbox-in-outline' className='text-primary-600 text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-xs text-primary-600 mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='d-inline-flex align-items-center gap-1 text-success-main'>
                  <Icon icon='bxs:up-arrow' className='text-xs' /> +2
                </span>
                Phiếu mới
              </p>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-2 h-100 scale-on-hover'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-600 mb-1 text-nowrap text-xs'>CHỜ CẤT HÀNG</p>
                  <h4 className='mb-0 fw-bold'>{putawayTasks.length}</h4>
                </div>
                <div className='w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='solar:transfer-vertical-bold' className='text-primary-600 text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-xs text-primary-600 mt-12 mb-0 d-flex align-items-center gap-2'>
                <Icon icon='solar:info-circle-bold' className='text-xs text-warning-main' /> 
                Cần cất vào bin
              </p>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-3 h-100 scale-on-hover'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-600 mb-1 text-nowrap text-xs'>TỔNG SKU TỒN</p>
                  <h4 className='mb-0 fw-bold'>{onHand.length}</h4>
                </div>
                <div className='w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='solar:box-outline' className='text-primary-600 text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-xs text-primary-600 mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='text-success-main fw-bold'>Trạng thái tốt</span>
              </p>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-4 h-100 scale-on-hover'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-600 mb-1 text-nowrap text-xs'>ĐƠN CHỜ XUẤT</p>
                  <h4 className='mb-0 fw-bold'>{shipments.filter(s => s.status === 'Ready for Dispatch').length}</h4>
                </div>
                <div className='w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='solar:inbox-out-outline' className='text-primary-600 text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-xs text-primary-600 mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='text-warning-main fw-bold'>80% Đang lấy</span>
              </p>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card shadow-none border bg-gradient-start-5 h-100 scale-on-hover'>
            <div className='card-body p-20'>
              <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                <div>
                  <p className='fw-medium text-primary-600 mb-1 text-nowrap text-xs'>HIỆU SUẤT</p>
                  <h4 className='mb-0 fw-bold'>94%</h4>
                </div>
                <div className='w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center'>
                  <Icon icon='solar:chart-outline' className='text-primary-600 text-2xl mb-0' />
                </div>
              </div>
              <p className='fw-medium text-xs text-primary-600 mt-12 mb-0 d-flex align-items-center gap-2'>
                <span className='text-success-main fw-bold'>Rất tốt</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='row gy-4 mt-1'>
        <div className='col-xxl-9'>
          <div className='card border-0 shadow-sm'>
            <div className='row'>
              <div className='col-xxl-6 pe-xxl-0'>
                <div className='card-body p-24'>
                  <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
                    <h6 className='mb-2 fw-bold text-lg text-dark'>Lưu Lượng Kho (SKU Flow)</h6>
                    <select className='form-select form-select-sm w-auto bg-base border'>
                      <option>Hàng tháng</option>
                    </select>
                  </div>
                  <div className='mt-40'>
                    <ReactApexChart
                      options={paymentStatusChartOptionsThree}
                      series={paymentStatusChartSeriesThree}
                      type='bar'
                      height={250}
                    />
                  </div>
                </div>
              </div>
              <div className='col-xxl-6'>
                <div className='row h-100 g-0'>
                  <div className='col-6 p-0 m-0 border border-top-0 border-start-0'>
                    <div className='card-body p-24 h-100 d-flex flex-column justify-content-center bg-primary-50 bg-opacity-10'>
                      <span className='mb-12 w-44-px h-44-px text-primary-600 bg-primary-light border border-primary-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6'>
                        <Icon icon='solar:box-minimalistic-bold' />
                      </span>
                      <span className='mb-1 fw-medium text-secondary text-sm'>Tồn khả dụng</span>
                      <h5 className='fw-bold text-dark mb-1'>{totalAvailableQty.toLocaleString()}</h5>
                      <p className='text-xs mb-0'>
                        <span className='text-success-main fw-bold'>+15%</span> so với dự trữ
                      </p>
                    </div>
                  </div>
                  <div className='col-6 p-0 m-0 border border-top-0 border-start-0 border-end-0'>
                    <div className='card-body p-24 h-100 d-flex flex-column justify-content-center'>
                      <span className='mb-12 w-44-px h-44-px text-yellow bg-yellow-light border border-yellow-light-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6'>
                        <Icon icon='solar:users-group-rounded-bold' />
                      </span>
                      <span className='mb-1 fw-medium text-secondary text-sm'>NCC Hoạt động</span>
                      <h5 className='fw-bold text-dark mb-1'>45</h5>
                      <p className='text-xs mb-0'>
                        Đang giao: <span className='text-warning-main fw-bold'>12</span>
                      </p>
                    </div>
                  </div>
                  <div className='col-6 p-0 m-0 border border-top-0 border-start-0 border-bottom-0'>
                    <div className='card-body p-24 h-100 d-flex flex-column justify-content-center'>
                      <span className='mb-12 w-44-px h-44-px text-success-main bg-success-focus border border-success-focus-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6'>
                        <Icon icon='solar:checklist-bold' />
                      </span>
                      <span className='mb-1 fw-medium text-secondary text-sm'>Lệnh Hoàn Tất</span>
                      <h5 className='fw-bold text-dark mb-1'>{completedOrders}</h5>
                      <p className='text-xs mb-0 text-success-main fw-bold'>99.9% Chính xác</p>
                    </div>
                  </div>
                   <div className='col-6 p-0 m-0 border border-top-0 border-start-0 border-end-0 border-bottom-0'>
                    <div className='card-body p-24 h-100 d-flex flex-column justify-content-center bg-info-50 bg-opacity-10'>
                      <span className='mb-12 w-44-px h-44-px text-info-main bg-info-focus border border-info-focus-white flex-shrink-0 d-flex justify-content-center align-items-center radius-8 h6'>
                        <Icon icon='solar:map-point-bold' />
                      </span>
                      <span className='mb-1 fw-medium text-secondary text-sm'>Lấp Đầy Bin</span>
                      <h5 className='fw-bold text-dark mb-1'>{filledBins} / {totalBins}</h5>
                      <div className="progress mt-2" style={{height: '6px'}}>
                        <div className="progress-bar bg-info-main" style={{width: `${fillRate}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xxl-3'>
          <div className='card h-100 border-0 shadow-sm'>
            <div className='card-header border-bottom-0 p-24'>
              <h6 className='mb-0 fw-bold text-dark'>Giao Dịch Mới Nhất</h6>
            </div>
            <div className='card-body p-24 pt-0'>
              <div className='d-flex flex-column gap-24'>
                {ledger.slice(0, 4).map((txn, i) => (
                    <div className='d-flex align-items-center gap-3' key={i}>
                        <div className={`w-40-px h-40-px ${txn.transactionType === 'INBOUND_RECEIPT' ? 'bg-primary-50 text-primary-600' : 'bg-success-50 text-success-main'} rounded-circle d-flex justify-content-center align-items-center`}>
                            <Icon icon={txn.transactionType === 'INBOUND_RECEIPT' ? 'solar:inbox-in-outline' : 'solar:inbox-out-outline'} />
                        </div>
                        <div className='flex-grow-1'>
                            <h6 className='text-xs fw-bold mb-0'>{txn.itemCode} - {txn.transactionType === 'INBOUND_RECEIPT' ? 'NHẬP' : 'XUẤT'}</h6>
                            <p className='text-xs text-secondary mb-0'>{new Date(txn.timestamp).toLocaleTimeString()} - {txn.user}</p>
                        </div>
                        <span className={`fw-bold text-xs ${txn.qty > 0 ? 'text-success-main' : 'text-danger-main'}`}>{txn.qty > 0 ? `+${txn.qty}` : txn.qty}</span>
                    </div>
                ))}
              </div>
              <button className="btn btn-outline-primary w-100 btn-sm mt-32 radius-8">Xem tất cả sổ cái</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WMSDashboardLayer;
