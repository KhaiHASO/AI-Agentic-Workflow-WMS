import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';

const RelocationLayer = () => {
  const [source, setSource] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [dest, setDest] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRelocate = () => {
      if(!source || !item || !qty || !dest) {
          toast.warning("Vui lòng nhập đầy đủ thông tin điều chuyển!");
          return;
      }
      
      setIsProcessing(true);
      toast.info(`Đang thực hiện lệnh chuyển ${qty} hàng từ ${source} sang ${dest}...`);

      setTimeout(() => {
          setIsProcessing(false);
          toast.success(`Điều chuyển thành công! Hệ thống đã cập nhật tồn kho và ghi sổ ledger.`);
          setSource(""); setItem(""); setQty(""); setDest("");
      }, 2000);
  }

  const handleAutoSuggest = () => {
      toast.info("Hệ thống đang tìm kiếm các vị trí cần tối ưu...");
      setTimeout(() => {
          setSource("WH-A-STG-01-01");
          setItem("RM-001");
          setQty("50");
          setDest("WH-A-PCK-01-01");
          toast.success("Đã đề xuất điều chuyển hàng từ kho lưu trữ sang khu vực picking!");
      }, 800);
  };

  return (
    <div className='row gy-4'>
      <div className='col-lg-7'>
        <div className='card border-0 shadow-sm h-100'>
          <div className='card-header bg-base border-bottom-0 p-24 d-flex justify-content-between align-items-center'>
            <div>
                <h5 className='card-title mb-0'>Thực Hiện Điều Chuyển Vị Trí (Relocation)</h5>
                <p className="text-sm text-secondary mb-0">Di chuyển hàng hóa tự do giữa các bin/vị trí lưu trữ.</p>
            </div>
            <button className="btn btn-info-focus text-info-main btn-sm d-flex align-items-center gap-2 radius-8" onClick={handleAutoSuggest}>
                <Icon icon="solar:magic-stick-3-bold" /> Đề xuất tự động
            </button>
          </div>
          <div className='card-body p-24'>
            <div className="row gy-4">
                <div className="col-md-6">
                    <div className="bg-primary-50 p-16 rounded-16 border border-primary-100 h-100">
                        <h6 className="text-md mb-12 d-flex align-items-center gap-2"><Icon icon="solar:map-point-wave-bold" className="text-primary-600" /> Nguồn (Source)</h6>
                        <div className="mb-16">
                            <label className="form-label text-xs fw-bold text-secondary">QUÉT VỊ TRÍ NGUỒN</label>
                            <div className="input-group border rounded-8 overflow-hidden bg-base">
                                <span className="input-group-text border-0 bg-transparent pe-0"><Icon icon="lucide:map-pin" className="text-secondary" /></span>
                                <input type="text" className="form-control border-0 shadow-none" placeholder="Ví dụ: WH-A-STG-01-01" value={source} onChange={(e) => setSource(e.target.value)} disabled={isProcessing} />
                            </div>
                        </div>
                        <div>
                            <label className="form-label text-xs fw-bold text-secondary">QUÉT MÃ HÀNG / PALLET</label>
                            <div className="input-group border rounded-8 overflow-hidden bg-base">
                                <span className="input-group-text border-0 bg-transparent pe-0"><Icon icon="lucide:barcode" className="text-secondary" /></span>
                                <input type="text" className="form-control border-0 shadow-none" placeholder="Ví dụ: RM-001 hoặc LP-001" value={item} onChange={(e) => setItem(e.target.value)} disabled={isProcessing} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="bg-success-50 p-16 rounded-16 border border-success-100 h-100">
                        <h6 className="text-md mb-12 d-flex align-items-center gap-2"><Icon icon="solar:map-point-hospital-bold" className="text-success-main" /> Đích (Destination)</h6>
                        <div className="mb-16">
                            <label className="form-label text-xs fw-bold text-secondary">QUÉT VỊ TRÍ ĐÍCH</label>
                            <div className="input-group border rounded-8 overflow-hidden bg-base">
                                <span className="input-group-text border-0 bg-transparent pe-0"><Icon icon="lucide:chevron-right-square" className="text-secondary" /></span>
                                <input type="text" className="form-control border-0 shadow-none" placeholder="Ví dụ: WH-A-PCK-01-01" value={dest} onChange={(e) => setDest(e.target.value)} disabled={isProcessing} />
                            </div>
                        </div>
                        <div>
                            <label className="form-label text-xs fw-bold text-secondary">SỐ LƯỢNG DI CHUYỂN</label>
                            <div className="input-group border rounded-8 overflow-hidden bg-base">
                                <span className="input-group-text border-0 bg-transparent pe-0"><Icon icon="lucide:layers" className="text-secondary" /></span>
                                <input type="number" className="form-control border-0 shadow-none" placeholder="Nhập số lượng..." value={qty} onChange={(e) => setQty(e.target.value)} disabled={isProcessing} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <button className="btn btn-primary-600 w-100 py-12 radius-12 d-flex align-items-center justify-content-center gap-2 h5 mb-0" onClick={handleRelocate} disabled={isProcessing}>
                        {isProcessing ? (
                            <><span className="spinner-border spinner-border-sm" role="status"></span> ĐANG XỬ LÝ...</>
                        ) : (
                            <><Icon icon="solar:reorder-bold" /> XÁC NHẬN ĐIỀU CHUYỂN</>
                        )}
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-lg-5'>
          <div className="card border-0 shadow-sm h-100">
             <div className="card-header bg-base border-bottom-0 p-24">
                <h5 className="card-title mb-0">Hướng Dẫn Vận Hành</h5>
             </div>
             <div className="card-body p-24">
                <div className="d-flex flex-column gap-16">
                    <div className="d-flex align-items-start gap-3 p-12 rounded-12 border bg-base hvr-push w-100">
                        <div className="w-32-px h-32-px bg-primary-100 text-primary-600 rounded-circle d-flex justify-content-center align-items-center fw-bold flex-shrink-0">1</div>
                        <p className="text-sm mb-0 fw-medium">Quét mã vị trí nguồn để xác định vị trí lấy hàng.</p>
                    </div>
                    <div className="d-flex align-items-start gap-3 p-12 rounded-12 border bg-base hvr-push w-100">
                        <div className="w-32-px h-32-px bg-primary-100 text-primary-600 rounded-circle d-flex justify-content-center align-items-center fw-bold flex-shrink-0">2</div>
                        <p className="text-sm mb-0 fw-medium">Quét mã sản phẩm hoặc mã Pallet cần di chuyển.</p>
                    </div>
                    <div className="d-flex align-items-start gap-3 p-12 rounded-12 border bg-base hvr-push w-100">
                        <div className="w-32-px h-32-px bg-primary-100 text-primary-600 rounded-circle d-flex justify-content-center align-items-center fw-bold flex-shrink-0">3</div>
                        <p className="text-sm mb-0 fw-medium">Quét mã vị trí đích để xác định nơi đặt hàng mới.</p>
                    </div>
                </div>

                <div className="alert alert-warning border-warning-100 bg-warning-50 mt-32 p-16 rounded-12 d-flex align-items-start gap-2 animate__animated animate__pulse animate__infinite">
                    <Icon icon="lucide:alert-triangle" className="text-warning-main mt-1" />
                    <div className="text-sm text-warning-main fw-medium">
                        Lưu ý: Hệ thống sẽ tự động kiểm tra quy tắc trộn hàng (Mixed Rules) và sức chứa của vị trí đích.
                    </div>
                </div>

                <div className="mt-auto pt-32 text-center">
                    <img src="https://wowdash.wowtheme7.com/assets/images/crypto/crypto-img.png" alt="Relocation Graphic" className="img-fluid" style={{maxHeight: '150px'}} />
                </div>
             </div>
          </div>
      </div>

      <div className="col-12">
          <div className="card border-0 shadow-sm">
              <div className="card-header bg-base p-24">
                  <h6 className="mb-0">Lịch Sử Điều Chuyển Gần Đây</h6>
              </div>
              <div className="card-body p-0">
                  <div className="table-responsive">
                      <table className="table mb-0 align-middle">
                          <thead className="bg-base text-secondary">
                              <tr>
                                  <th className="ps-24">Thời Gian</th>
                                  <th>Sản Phẩm</th>
                                  <th>Số Lượng</th>
                                  <th>Từ Vị Trí</th>
                                  <th>Đến Vị Trí</th>
                                  <th>Người Thực Hiện</th>
                                  <th className="pe-24">Trạng Thái</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td className="ps-24 text-sm">13/04/2026 15:20</td>
                                  <td><span className="fw-bold">RM-001</span></td>
                                  <td><span className="fw-bold">10 ROLL</span></td>
                                  <td><span className="badge bg-primary-focus text-primary-600 px-12 py-4">WH-A-STG-01-01</span></td>
                                  <td><span className="badge bg-success-focus text-success-main px-12 py-4">WH-A-PCK-01-01</span></td>
                                  <td>user.wh01</td>
                                  <td className="pe-24"><span className="text-success-main fw-bold"><Icon icon="lucide:check-circle" /> Hoàn Thành</span></td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default RelocationLayer;
