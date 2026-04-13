import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useWMS } from "../context/WMSContext";
import { toast } from 'react-toastify';

const MasterDataLayer = () => {
  const { 
      items, addItem, updateItem, 
      uomConversions, addUomConversion, deleteUomConversion,
      suppliers, addSupplier, updateSupplier, deleteSupplier,
      getConvertedQty, syncMasterData
  } = useWMS();
  const [activeTab, setActiveTab] = useState("items");
  
  // Calculator State
  const [calcData, setCalcData] = useState({ itemCode: "", qty: 1, fromUom: "", toUom: "" });
  const [calcResult, setCalcResult] = useState(null);

  const handleCalculate = () => {
      if (!calcData.itemCode || !calcData.fromUom || !calcData.toUom) return toast.error("Vui lòng nhập đủ thông số tính toán!");
      const result = getConvertedQty(calcData.itemCode, calcData.qty, calcData.fromUom, calcData.toUom);
      setCalcResult(result);
  };

  // Product Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({
      erpItemCode: "",
      itemName: "",
      baseUom: "UNIT",
      isLotControlled: false,
      pickStrategy: "FIFO"
  });

  // UOM Modal State
  const [showUomModal, setShowUomModal] = useState(false);
  const [uomFormData, setUomFormData] = useState({
      itemCode: "",
      fromUom: "",
      toUom: "",
      factor: 1,
      description: ""
  });

  // Supplier Modal State
  const [showSupModal, setShowSupModal] = useState(false);
  const [supModalMode, setSupModalMode] = useState('add');
  const [supFormData, setSupFormData] = useState({
      code: "",
      name: "",
      contact: "",
      phone: "",
      address: "",
      status: "Active"
  });

  const handleOpenModal = (mode, item = null) => {
      setModalMode(mode);
      if (mode === 'edit' && item) {
          setFormData(item);
      } else {
          setFormData({
              erpItemCode: `ITEM-${Math.floor(Math.random()*9000)+1000}`,
              itemName: "",
              baseUom: "UNIT",
              isLotControlled: false,
              pickStrategy: "FIFO"
          });
      }
      setShowModal(true);
  };

  const handleOpenSupModal = (mode, sup = null) => {
      setSupModalMode(mode);
      if (mode === 'edit' && sup) {
          setSupFormData(sup);
      } else {
          setSupFormData({
              code: `SUP-${Math.floor(Math.random()*9000)+1000}`,
              name: "",
              contact: "",
              phone: "",
              address: "",
              status: "Active"
          });
      }
      setShowSupModal(true);
  };

  const handleSave = (e) => {
      e.preventDefault();
      if (!formData.itemName) return toast.error("Vui lòng nhập tên sản phẩm!");

      if (modalMode === 'add') {
          addItem(formData);
          toast.success("Đã thêm sản phẩm mới thành công!");
      } else {
          updateItem(formData.erpItemCode, formData);
          toast.success("Đã cập nhật thông tin sản phẩm!");
      }
      setShowModal(false);
  };

  const handleSaveUom = (e) => {
      e.preventDefault();
      if (!uomFormData.itemCode || !uomFormData.fromUom || !uomFormData.toUom) {
          return toast.error("Vui lòng nhập đầy đủ thông tin quy đổi!");
      }
      addUomConversion({
          ...uomFormData,
          description: `1 ${uomFormData.fromUom} = ${uomFormData.factor} ${uomFormData.toUom}`
      });
      toast.success("Đã thêm quy đổi ĐVT mới!");
      setShowUomModal(false);
  };

  const handleSaveSup = (e) => {
      e.preventDefault();
      if (!supFormData.name || !supFormData.code) return toast.error("Vui lòng nhập đầy đủ tên và mã NCC!");

      if (supModalMode === 'add') {
          addSupplier(supFormData);
          toast.success("Đã thêm nhà cung cấp mới!");
      } else {
          updateSupplier(supFormData.id, supFormData);
          toast.success("Đã cập nhật thông tin nhà cung cấp!");
      }
      setShowSupModal(false);
  };

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      {/* Product Modal */}
      {showModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content radius-24 border-0 shadow-lg">
                      <div className="modal-header py-20 px-32 border-bottom bg-primary-600 text-white">
                          <h5 className="modal-title mb-0 fw-bold">{modalMode === 'add' ? 'Thêm Sản Phẩm Mới' : 'Cập Nhật Sản Phẩm'}</h5>
                          <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                      </div>
                      <form onSubmit={handleSave}>
                          <div className="modal-body p-32">
                              <div className="row gy-4">
                                  <div className="col-md-6">
                                      <label className="form-label fw-bold text-secondary text-xs uppercase">Mã hàng (ERP Code)</label>
                                      <input type="text" className="form-control form-control-lg radius-12" value={formData.erpItemCode} disabled={modalMode === 'edit'} onChange={(e) => setFormData({...formData, erpItemCode: e.target.value.toUpperCase()})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label fw-bold text-secondary text-xs uppercase">Tên sản phẩm</label>
                                      <input type="text" className="form-control form-control-lg radius-12" placeholder="Nhập tên..." value={formData.itemName} onChange={(e) => setFormData({...formData, itemName: e.target.value})} />
                                  </div>
                                  <div className="col-md-4">
                                      <label className="form-label fw-bold text-secondary text-xs uppercase">ĐVT Cơ bản</label>
                                      <input type="text" className="form-control form-control-lg radius-12" value={formData.baseUom} onChange={(e) => setFormData({...formData, baseUom: e.target.value.toUpperCase()})} />
                                  </div>
                                  <div className="col-md-4">
                                      <label className="form-label fw-bold text-secondary text-xs uppercase">Chiến lược Pick</label>
                                      <select className="form-select form-select-lg radius-12" value={formData.pickStrategy} onChange={(e) => setFormData({...formData, pickStrategy: e.target.value})}>
                                          <option value="FIFO">FIFO (Nhập trước xuất trước)</option>
                                          <option value="FEFO">FEFO (Hết hạn trước xuất trước)</option>
                                          <option value="LIFO">LIFO</option>
                                      </select>
                                  </div>
                                  <div className="col-md-4 d-flex align-items-end">
                                      <div className="form-check form-switch mb-10">
                                          <input className="form-check-input" type="checkbox" checked={formData.isLotControlled} onChange={(e) => setFormData({...formData, isLotControlled: e.target.checked})} />
                                          <label className="form-check-label fw-bold">Quản lý theo Lô</label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="modal-footer border-top p-24">
                              <button type="button" className="btn btn-outline-secondary px-32 radius-12" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                              <button type="submit" className="btn btn-primary-600 px-40 radius-12 fw-bold">Lưu thông tin</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}

      {/* UOM Modal */}
      {showUomModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content radius-24 border-0 shadow-lg">
                      <div className="modal-header py-20 px-32 border-bottom bg-primary-600 text-white">
                          <h6 className="modal-title mb-0 fw-bold text-uppercase">Thêm Quy Đổi ĐVT</h6>
                          <button type="button" className="btn-close btn-close-white" onClick={() => setShowUomModal(false)}></button>
                      </div>
                      <form onSubmit={handleSaveUom}>
                          <div className="modal-body p-32">
                              <div className="row gy-3">
                                  <div className="col-12">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Sản phẩm áp dụng</label>
                                      <select className="form-select form-select-lg radius-12" value={uomFormData.itemCode} onChange={(e) => setUomFormData({...uomFormData, itemCode: e.target.value})}>
                                          <option value="">-- Chọn sản phẩm --</option>
                                          {items.map(i => <option key={i.erpItemCode} value={i.erpItemCode}>{i.itemName} ({i.erpItemCode})</option>)}
                                      </select>
                                  </div>
                                  <div className="col-md-5">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Đơn vị lớn</label>
                                      <input type="text" className="form-control form-control-lg radius-12 fw-bold" placeholder="Ví dụ: BOX" value={uomFormData.fromUom} onChange={(e) => setUomFormData({...uomFormData, fromUom: e.target.value.toUpperCase()})} />
                                  </div>
                                  <div className="col-md-2 text-center align-self-end pb-10">
                                      <Icon icon="solar:equal-bold" className="h4 text-secondary mb-0" />
                                  </div>
                                  <div className="col-md-5">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Hệ số x</label>
                                      <input type="number" className="form-control form-control-lg radius-12 fw-black text-primary-600" value={uomFormData.factor} onChange={(e) => setUomFormData({...uomFormData, factor: e.target.value})} />
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Đơn vị cơ bản (Gốc)</label>
                                      <input type="text" className="form-control form-control-lg radius-12 fw-bold" placeholder="Ví dụ: ROLL" value={uomFormData.toUom} onChange={(e) => setUomFormData({...uomFormData, toUom: e.target.value.toUpperCase()})} />
                                  </div>
                              </div>
                          </div>
                          <div className="modal-footer border-0 p-24 pt-0">
                              <button type="submit" className="btn btn-primary-600 w-100 py-16 radius-16 fw-bold shadow-primary">LƯU QUY ĐỔI</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}

      {/* Supplier Modal */}
      {showSupModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content radius-24 border-0 shadow-lg">
                      <div className="modal-header py-20 px-32 border-bottom bg-primary-600 text-white">
                          <h6 className="modal-title mb-0 fw-bold uppercase">{supModalMode === 'add' ? 'Thêm Nhà Cung Cấp' : 'Chỉnh Sửa Nhà Cung Cấp'}</h6>
                          <button type="button" className="btn-close btn-close-white" onClick={() => setShowSupModal(false)}></button>
                      </div>
                      <form onSubmit={handleSaveSup}>
                          <div className="modal-body p-32">
                              <div className="row gy-4">
                                  <div className="col-md-4">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Mã NCC</label>
                                      <input type="text" className="form-control radius-12" value={supFormData.code} disabled={supModalMode === 'edit'} onChange={(e) => setSupFormData({...supFormData, code: e.target.value.toUpperCase()})} />
                                  </div>
                                  <div className="col-md-8">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Tên Công Ty / Nhà Cung Cấp</label>
                                      <input type="text" className="form-control radius-12" placeholder="Tên đầy đủ..." value={supFormData.name} onChange={(e) => setSupFormData({...supFormData, name: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Người liên hệ</label>
                                      <input type="text" className="form-control radius-12" value={supFormData.contact} onChange={(e) => setSupFormData({...supFormData, contact: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Số điện thoại</label>
                                      <input type="text" className="form-control radius-12" value={supFormData.phone} onChange={(e) => setSupFormData({...supFormData, phone: e.target.value})} />
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Địa chỉ văn phòng / kho</label>
                                      <textarea className="form-control radius-12" rows="2" value={supFormData.address} onChange={(e) => setSupFormData({...supFormData, address: e.target.value})}></textarea>
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label text-xs fw-bold text-secondary uppercase">Trạng thái hợp tác</label>
                                      <select className="form-select radius-12" value={supFormData.status} onChange={(e) => setSupFormData({...supFormData, status: e.target.value})}>
                                          <option value="Active">Đang hoạt động</option>
                                          <option value="Inactive">Tạm ngưng</option>
                                          <option value="Blocked">Bị chặn</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div className="modal-footer border-top p-24">
                              <button type="button" className="btn btn-outline-secondary px-32 radius-12" onClick={() => setShowSupModal(false)}>Hủy</button>
                              <button type="submit" className="btn btn-primary-600 px-40 radius-12 fw-bold shadow-primary">Lưu Nhà Cung Cấp</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}

      <div className="col-12">
          <div className="card border-0 shadow-sm overflow-hidden radius-16 bg-base">
              <div className="card-header border-bottom-0 p-0">
                  <ul className="nav nav-tabs border-0" id="masterDataTabs" role="tablist">
                      <li className="nav-item flex-grow-1 text-center">
                          <button className={`nav-link w-100 py-24 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${activeTab === 'items' ? 'active bg-primary-600 text-white shadow-primary' : 'text-secondary'}`} onClick={() => setActiveTab('items')}>
                              <Icon icon="solar:box-minimalistic-bold" className="h5 mb-0" /> Sản Phẩm
                          </button>
                      </li>
                      <li className="nav-item flex-grow-1 text-center">
                          <button className={`nav-link w-100 py-24 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${activeTab === 'uom' ? 'active bg-primary-600 text-white shadow-primary' : 'text-secondary'}`} onClick={() => setActiveTab('uom')}>
                              <Icon icon="solar:layers-bold" className="h5 mb-0" /> Quy Đổi ĐVT
                          </button>
                      </li>
                      <li className="nav-item flex-grow-1 text-center">
                          <button className={`nav-link w-100 py-24 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${activeTab === 'suppliers' ? 'active bg-primary-600 text-white shadow-primary' : 'text-secondary'}`} onClick={() => setActiveTab('suppliers')}>
                              <Icon icon="solar:users-group-rounded-bold" className="h5 mb-0" /> Nhà Cung Cấp
                          </button>
                      </li>
                  </ul>
              </div>
          </div>
      </div>

      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16 overflow-hidden'>
          {activeTab === 'items' && (
              <>
                <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base py-24 px-32 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Danh Mục Sản Phẩm (Master Data)</h5>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary px-24 radius-12 d-flex align-items-center gap-2 fw-bold" onClick={() => syncMasterData('items')}>
                            <Icon icon="solar:refresh-bold" className="h5 mb-0" /> ĐỒNG BỘ ERP
                        </button>
                        <button className="btn btn-primary-600 px-24 radius-12 d-flex align-items-center gap-2 fw-bold shadow-primary" onClick={() => handleOpenModal('add')}>
                            <Icon icon="solar:add-circle-bold" className="h5 mb-0" /> THÊM MỚI
                        </button>
                    </div>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                    <table className='table mb-0 align-middle'>
                        <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                        <tr>
                            <th className="ps-32">Thông Tin Sản Phẩm</th>
                            <th>ĐVT Gốc</th>
                            <th className="text-center">Quản Lý Lô</th>
                            <th>Chiến Lược Pick</th>
                            <th>Trạng Thái</th>
                            <th className="pe-32 text-end">Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="hover-bg-primary-50">
                            <td className="ps-32 py-20">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-40-px h-40-px bg-primary-light text-primary-600 rounded-8 d-flex justify-content-center align-items-center fw-bold">{item.erpItemCode.substring(0,2)}</div>
                                    <div><span className="fw-bold text-dark">{item.itemName}</span><br/><small className="text-secondary text-xs">Mã ERP: <span className="text-primary-600 fw-bold">{item.erpItemCode}</span></small></div>
                                </div>
                            </td>
                            <td><span className="fw-bold text-dark">{item.baseUom}</span></td>
                            <td className="text-center">{item.isLotControlled ? <Icon icon="solar:check-circle-bold" className="text-success-main h4 mb-0" /> : "-"}</td>
                            <td><span className="badge bg-info-light text-info-main px-12 py-6 radius-8 fw-bold">{item.pickStrategy}</span></td>
                            <td><span className="badge bg-success-focus text-success-main px-12 py-4">Hoạt động</span></td>
                            <td className="pe-32 text-end">
                                <button className="btn btn-outline-primary btn-xs radius-8 p-8 hvr-push" onClick={() => handleOpenModal('edit', item)}>
                                    <Icon icon="solar:pen-new-square-bold" />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
              </>
          )}

          {activeTab === 'uom' && (
              <div className="p-32 animate__animated animate__fadeIn">
                <div className="row gy-4">
                    {/* Calculator Section */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-lg bg-primary-600 text-white radius-24 p-24 h-100 shadow-primary">
                            <div className="d-flex align-items-center gap-3 mb-24">
                                <div className="w-48-px h-48-px bg-white bg-opacity-10 rounded-circle d-flex justify-content-center align-items-center shadow-sm"><Icon icon="solar:calculator-minimalistic-bold" className="h3 mb-0" /></div>
                                <h5 className="mb-0 fw-bold">Máy Tính Quy Đổi ĐVT</h5>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <div>
                                    <label className="form-label text-xxs fw-bold text-uppercase opacity-75">Sản phẩm áp dụng</label>
                                    <select className="form-select bg-white bg-opacity-10 border-white border-opacity-10 text-white radius-12" value={calcData.itemCode} onChange={(e) => setCalcData({...calcData, itemCode: e.target.value})}>
                                        <option value="" className="text-dark">-- Chọn SKU --</option>
                                        {items.map(i => <option key={i.erpItemCode} value={i.erpItemCode} className="text-dark">{i.itemName}</option>)}
                                    </select>
                                </div>
                                <div className="row g-2">
                                    <div className="col-8">
                                        <label className="form-label text-xxs fw-bold text-uppercase opacity-75">Số lượng</label>
                                        <input type="number" className="form-control bg-white bg-opacity-10 border-white border-opacity-10 text-white fw-black h4 mb-0 radius-12" value={calcData.qty} onChange={(e) => setCalcData({...calcData, qty: e.target.value})} />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label text-xxs fw-bold text-uppercase opacity-75">Từ ĐVT</label>
                                        <input type="text" className="form-control bg-white bg-opacity-10 border-white border-opacity-10 text-white fw-bold radius-12" placeholder="BOX" value={calcData.fromUom} onChange={(e) => setCalcData({...calcData, fromUom: e.target.value.toUpperCase()})} />
                                    </div>
                                </div>
                                <div className="text-center py-8"><Icon icon="solar:round-alt-arrow-down-bold" className="h3 mb-0 opacity-50 animate__animated animate__bounce animate__infinite" /></div>
                                <div>
                                    <label className="form-label text-xxs fw-bold text-uppercase opacity-75">Sang ĐVT Đích</label>
                                    <input type="text" className="form-control bg-white bg-opacity-10 border-white border-opacity-10 text-white fw-bold radius-12" placeholder="ROLL" value={calcData.toUom} onChange={(e) => setCalcData({...calcData, toUom: e.target.value.toUpperCase()})} />
                                </div>
                                <button className="btn btn-light text-primary-600 fw-black py-16 radius-16 mt-12 shadow-sm hvr-grow" onClick={handleCalculate}>TÍNH TOÁN NGAY</button>
                                
                                {calcResult !== null && (
                                    <div className="mt-24 p-20 bg-white bg-opacity-10 radius-16 border border-white border-opacity-10 animate__animated animate__pulse">
                                        <div className="text-xxs fw-bold opacity-75 text-uppercase mb-4 letter-spacing-1">Kết quả quy đổi thực tế</div>
                                        <h2 className="mb-0 fw-black text-white">{calcResult.toLocaleString()} <small className="text-sm opacity-50 fw-normal ms-2">{calcData.toUom}</small></h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm radius-24 h-100 bg-base">
                            <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base py-24 px-32 border-bottom-0'>
                                <h5 className='card-title mb-0 fw-bold'>Bảng Quy Đổi ĐVT Đã Thiết Lập</h5>
                                <button className="btn btn-primary-600 px-24 radius-12 d-flex align-items-center gap-2 fw-bold shadow-primary" onClick={() => setShowUomModal(true)}>
                                    <Icon icon="solar:add-circle-bold" className="h5 mb-0" /> THÊM QUY ĐỔI
                                </button>
                            </div>
                            <div className='card-body p-0'>
                                <div className='table-responsive'>
                                <table className='table mb-0 align-middle'>
                                    <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                                    <tr>
                                        <th className="ps-32 py-16">Sản phẩm</th>
                                        <th>Quy đổi</th>
                                        <th>Diễn giải</th>
                                        <th className="pe-32 text-end">Thao tác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {uomConversions.map((u, idx) => (
                                        <tr key={u.id || idx} className="hover-bg-primary-50">
                                            <td className="ps-32 py-20">
                                                <span className="fw-bold text-dark d-block">{u.itemCode}</span>
                                                <small className="text-secondary fw-medium">ID: #{u.id || idx}</small>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="badge bg-warning-focus text-warning-main px-12 py-8 radius-8 fw-black">{u.fromUom}</span>
                                                    <Icon icon="solar:double-alt-arrow-right-bold" className="text-primary-600 opacity-50 h4 mb-0" />
                                                    <span className="badge bg-success-focus text-success-main px-12 py-8 radius-8 fw-black">{u.factor} {u.toUom}</span>
                                                </div>
                                            </td>
                                            <td><span className="text-secondary fw-bold text-sm bg-light px-12 py-6 radius-8">{u.description}</span></td>
                                            <td className="pe-32 text-end">
                                                <button className="btn btn-outline-danger btn-xs radius-8 p-8 hvr-push" onClick={() => {
                                                    if(window.confirm('Xóa quy đổi này?')) deleteUomConversion(u.id);
                                                }}>
                                                    <Icon icon="solar:trash-bin-trash-bold" />
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
              </div>
          )}

          {activeTab === 'suppliers' && (
              <>
                <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base py-24 px-32 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Danh Mục Nhà Cung Cấp (Suppliers)</h5>
                    <button className="btn btn-primary-600 px-24 radius-12 d-flex align-items-center gap-2 fw-bold shadow-primary" onClick={() => handleOpenSupModal('add')}>
                        <Icon icon="solar:add-circle-bold" className="h5 mb-0" /> THÊM NCC
                    </button>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                    <table className='table mb-0 align-middle'>
                        <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                        <tr>
                            <th className="ps-32 py-16">Nhà Cung Cấp</th>
                            <th>Liên hệ</th>
                            <th>Số điện thoại</th>
                            <th style={{width: '25%'}}>Địa chỉ</th>
                            <th>Trạng thái</th>
                            <th className="pe-32 text-end">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {suppliers.map((s, idx) => (
                            <tr key={s.id || idx} className="hover-bg-primary-50">
                            <td className="ps-32 py-20">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-40-px h-40-px bg-info-focus text-info-main rounded-circle d-flex justify-content-center align-items-center fw-bold">{s.code.substring(0,2)}</div>
                                    <div><span className="fw-bold text-dark">{s.name}</span><br/><small className="text-secondary text-xs">Mã: <span className="text-info-main fw-bold">{s.code}</span></small></div>
                                </div>
                            </td>
                            <td><span className="fw-bold text-dark">{s.contact}</span></td>
                            <td><span className="text-secondary fw-medium">{s.phone}</span></td>
                            <td><span className="text-xs text-secondary line-clamp-2">{s.address}</span></td>
                            <td>
                                <span className={`badge ${s.status === 'Active' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'} px-12 py-6 radius-8 fw-bold`}>
                                    {s.status === 'Active' ? 'HOẠT ĐỘNG' : 'TẠM DỪNG'}
                                </span>
                            </td>
                            <td className="pe-32 text-end">
                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-outline-primary btn-xs radius-8 p-8 hvr-push" onClick={() => handleOpenSupModal('edit', s)}>
                                        <Icon icon="solar:pen-new-square-bold" />
                                    </button>
                                    <button className="btn btn-outline-danger btn-xs radius-8 p-8 hvr-push" onClick={() => {
                                        if(window.confirm('Xóa nhà cung cấp này?')) deleteSupplier(s.id);
                                    }}>
                                        <Icon icon="solar:trash-bin-trash-bold" />
                                    </button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterDataLayer;
