import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWMS } from "../context/WMSContext";

const LedgerLayer = () => {
  const { ledger } = useWMS();

  // Calculate stats from ledger
  const totalEntries = ledger.length;
  const inboundCount = ledger.filter(t => t.transactionType === 'INBOUND_RECEIPT' || t.transactionType === 'QUALITY_RELEASE').length;
  const outboundCount = ledger.filter(t => t.transactionType === 'OUTBOUND_SHIP' || t.transactionType === 'PICKING').length;
  const internalCount = ledger.filter(t => t.transactionType === 'INTERNAL_TRANSFER' || t.transactionType === 'INTERNAL_RELOC' || t.transactionType === 'CYCLE_COUNT_ADJ').length;

  return (
    <div className='row gy-4'>
      {/* Transaction Insights */}
      <div className="col-lg-12">
          <div className="row gy-4">
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-primary-50 text-primary-600 rounded-circle d-flex justify-content-center align-items-center text-xl">
                              <Icon icon="solar:round-transfer-vertical-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-secondary">Tổng biến động</h6>
                              <h4 className="mb-0 fw-bold">{totalEntries}</h4>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-success-50 text-success-main rounded-circle d-flex justify-content-center align-items-center text-xl">
                              <Icon icon="solar:alt-arrow-down-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-secondary">Nhập kho (In)</h6>
                              <h4 className="mb-0 fw-bold">{inboundCount}</h4>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-danger-50 text-danger-main rounded-circle d-flex justify-content-center align-items-center text-xl">
                              <Icon icon="solar:alt-arrow-up-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-secondary">Xuất kho (Out)</h6>
                              <h4 className="mb-0 fw-bold">{outboundCount}</h4>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="col-xxl-3 col-sm-6">
                  <div className="card p-24 border-0 shadow-sm bg-base h-100">
                      <div className="d-flex align-items-center gap-3">
                          <div className="w-48-px h-48-px bg-info-50 text-info-main rounded-circle d-flex justify-content-center align-items-center text-xl">
                              <Icon icon="solar:transfer-vertical-bold" />
                          </div>
                          <div>
                              <h6 className="mb-0 text-secondary">Nội bộ (Internal)</h6>
                              <h4 className="mb-0 fw-bold">{internalCount}</h4>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0'>Sổ Cái Giao Dịch Kho (Inventory Ledger)</h5>
            <div className="d-flex gap-2">
                <div className="input-group input-group-sm">
                    <input type="text" className="form-control" placeholder="Tìm SKU, Mã TXN..." />
                    <button className="btn btn-primary-600 px-16"><Icon icon="lucide:search" /></button>
                </div>
                <button className="btn btn-outline-success-600 btn-sm text-nowrap"><Icon icon="lucide:download" /> Excel</button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-base text-secondary">
                  <tr>
                    <th className="ps-24">Thời Gian & Mã TXN</th>
                    <th>Loại Giao Dịch</th>
                    <th>Sản Phẩm</th>
                    <th className="text-center">Số Lượng</th>
                    <th>Vị Trí Biến Động</th>
                    <th>Chứng Từ Gốc</th>
                    <th className="pe-24">Người Thực Hiện</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((txn) => (
                    <tr key={txn.transactionId} className="hover-bg-primary-50">
                      <td className="ps-24">
                        <div className="d-flex flex-column">
                            <span className="fw-bold text-dark text-sm">{new Date(txn.timestamp).toLocaleString()}</span>
                            <small className="text-secondary text-xs">ID: {txn.transactionId}</small>
                        </div>
                      </td>
                      <td>
                        <span className={`px-12 py-4 rounded-pill fw-bold text-xs ${txn.transactionType === 'INBOUND_RECEIPT' ? 'bg-primary-focus text-primary-600' : (txn.transactionType === 'OUTBOUND_SHIP' ? 'bg-danger-focus text-danger-main' : 'bg-info-focus text-info-main')}`}>
                            {txn.transactionType}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                            <div className="w-32-px h-32-px bg-secondary-focus rounded-circle d-flex justify-content-center align-items-center text-xs">SKU</div>
                            <span className="fw-bold">{txn.itemCode}</span>
                        </div>
                      </td>
                      <td className="text-center"><h6 className={`mb-0 ${txn.qty > 0 ? 'text-success-main' : 'text-danger-main'}`}>{txn.qty > 0 ? `+${txn.qty}` : txn.qty}</h6></td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-secondary-focus text-secondary">{txn.fromLocation || "EXTERNAL"}</span>
                            <Icon icon="lucide:arrow-right" className="text-secondary" />
                            <span className="badge bg-primary-focus text-primary-600">{txn.toLocation || "EXTERNAL"}</span>
                        </div>
                      </td>
                      <td><code className="text-primary-600">{txn.referenceNo}</code></td>
                      <td className="pe-24">
                        <div className="d-flex align-items-center gap-2">
                            <img src="https://wowdash.wowtheme7.com/assets/images/user-grid/user-grid-img13.png" alt="user" className="w-24-px h-24-px rounded-circle" />
                            <span className="text-sm">{txn.user}</span>
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

export default LedgerLayer;
