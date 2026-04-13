import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useWMS } from "../context/WMSContext";
import { toast } from 'react-toastify';

const MasterDataLayer = () => {
  const { 
      items, addItem, updateItem, 
      uomConversions, addUomConversion, deleteUomConversion,
      suppliers, addSupplier, updateSupplier, deleteSupplier 
  } = useWMS();
  const [activeTab, setActiveTab] = useState("items");
  
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
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
              {/* ... (same product modal content) ... */}
          </div>
      )}

      {/* UOM Modal */}
      {showUomModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content radius-16 border-0 shadow-lg">
                      <div className="modal-header py-16 px-24 border-bottom bg-primary-600 text-white">
                          <h6 className="modal-title mb-0">Thêm Quy Đổi Đơn Vị Tính</h6>
                          <button type="button" className="btn-close btn-close-white" onClick={() => setShowUomModal(false)}></button>
                      </div>
                      <form onSubmit={handleSaveUom}>
                          <div className="modal-body p-24">
                              <div className="row gy-3">
                                  <div className="col-12">
                                      <label className="form-label text-sm fw-bold">Sản phẩm áp dụng</label>
                                      <select className="form-select" value={uomFormData.itemCode} onChange={(e) => setUomFormData({...uomFormData, itemCode: e.target.value})}>
                                          <option value="">-- Chọn sản phẩm --</option>
                                          {items.map(i => <option key={i.erpItemCode} value={i.erpItemCode}>{i.itemName} ({i.erpItemCode})</option>)}
                                      </select>
                                  </div>
                                  <div className="col-md-5">
                                      <label className="form-label text-sm fw-bold">Đơn vị lớn</label>
                                      <input type="text" className="form-control" placeholder="Ví dụ: BOX" value={uomFormData.fromUom} onChange={(e) => setUomFormData({...uomFormData, fromUom: e.target.value.toUpperCase()})} />
                                  </div>
                                  <div className="col-md-2 text-center align-self-end pb-10">
                                      <Icon icon="lucide:equal" />
                                  </div>
                                  <div className="col-md-5">
                                      <label className="form-label text-sm fw-bold">Hệ số x</label>
                                      <input type="number" className="form-control" value={uomFormData.factor} onChange={(e) => setUomFormData({...uomFormData, factor: e.target.value})} />
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label text-sm fw-bold">Đơn vị cơ bản (Gốc)</label>
                                      <input type="text" className="form-control" placeholder="Ví dụ: ROLL" value={uomFormData.toUom} onChange={(e) => setUomFormData({...uomFormData, toUom: e.target.value.toUpperCase()})} />
                                  </div>
                              </div>
                          </div>
                          <div className="modal-footer border-top p-16">
                              <button type="button" className="btn btn-outline-secondary btn-sm px-20" onClick={() => setShowUomModal(false)}>Hủy</button>
                              <button type="submit" className="btn btn-primary-600 btn-sm px-24">Lưu Quy Đổi</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}

      {/* Supplier Modal */}
      {showSupModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}} tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content radius-16 border-0 shadow-lg">
                      <div className="modal-header py-16 px-24 border-bottom bg-primary-600 text-white">
                          <h6 className="modal-title mb-0">{supModalMode === 'add' ? 'Thêm Nhà Cung Cấp' : 'Chỉnh Sửa Nhà Cung Cấp'}</h6>
                          <button type="button" className="btn-close btn-close-white" onClick={() => setShowSupModal(false)}></button>
                      </div>
                      <form onSubmit={handleSaveSup}>
                          <div className="modal-body p-24">
                              <div className="row gy-3">
                                  <div className="col-md-4">
                                      <label className="form-label text-sm fw-bold">Mã NCC</label>
                                      <input type="text" className="form-control" value={supFormData.code} disabled={supModalMode === 'edit'} onChange={(e) => setSupFormData({...supFormData, code: e.target.value.toUpperCase()})} />
                                  </div>
                                  <div className="col-md-8">
                                      <label className="form-label text-sm fw-bold">Tên Công Ty / Nhà Cung Cấp</label>
                                      <input type="text" className="form-control" placeholder="Tên đầy đủ..." value={supFormData.name} onChange={(e) => setSupFormData({...supFormData, name: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label text-sm fw-bold">Người liên hệ</label>
                                      <input type="text" className="form-control" value={supFormData.contact} onChange={(e) => setSupFormData({...supFormData, contact: e.target.value})} />
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label text-sm fw-bold">Số điện thoại</label>
                                      <input type="text" className="form-control" value={supFormData.phone} onChange={(e) => setSupFormData({...supFormData, phone: e.target.value})} />
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label text-sm fw-bold">Địa chỉ văn phòng / kho</label>
                                      <textarea className="form-control" rows="2" value={supFormData.address} onChange={(e) => setSupFormData({...supFormData, address: e.target.value})}></textarea>
                                  </div>
                                  <div className="col-md-6">
                                      <label className="form-label text-sm fw-bold">Trạng thái hợp tác</label>
                                      <select className="form-select" value={supFormData.status} onChange={(e) => setSupFormData({...supFormData, status: e.target.value})}>
                                          <option value="Active">Đang hoạt động</option>
                                          <option value="Inactive">Tạm ngưng</option>
                                          <option value="Blocked">Bị chặn</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div className="modal-footer border-top p-16">
                              <button type="button" className="btn btn-outline-secondary btn-sm px-20" onClick={() => setShowSupModal(false)}>Hủy</button>
                              <button type="submit" className="btn btn-primary-600 btn-sm px-24">Lưu Nhà Cung Cấp</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      )}
      <div className="col-12">
          <div className="card border-0 shadow-sm overflow-hidden radius-16">
              <div className="card-header bg-base border-bottom-0 p-0">
                  <ul className="nav nav-tabs border-0" id="masterDataTabs" role="tablist">
                      <li className="nav-item flex-grow-1 text-center">
                          <button className={`nav-link w-100 py-20 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${activeTab === 'items' ? 'active bg-primary-600 text-white' : 'text-secondary'}`} onClick={() => setActiveTab('items')}>
                              <Icon icon="solar:box-minimalistic-bold" className="h5 mb-0" /> Sản Phẩm
                          </button>
                      </li>
                      <li className="nav-item flex-grow-1 text-center">
                          <button className={`nav-link w-100 py-20 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${activeTab === 'uom' ? 'active bg-primary-600 text-white' : 'text-secondary'}`} onClick={() => setActiveTab('uom')}>
                              <Icon icon="solar:layers-bold" className="h5 mb-0" /> Quy Đổi ĐVT
                          </button>
                      </li>
                      <li className="nav-item flex-grow-1 text-center">
                          <button className={`nav-link w-100 py-20 border-0 fw-bold d-flex align-items-center justify-content-center gap-2 ${activeTab === 'suppliers' ? 'active bg-primary-600 text-white' : 'text-secondary'}`} onClick={() => setActiveTab('suppliers')}>
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
                <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base py-20 px-24 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Danh Mục Sản Phẩm (ERP Sync)</h5>
                    <button className="btn btn-primary-600 btn-sm radius-8 px-20 d-flex align-items-center gap-2" onClick={() => handleOpenModal('add')}>
                        <Icon icon="lucide:plus-circle" /> Thêm Mới
                    </button>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                    <table className='table mb-0 align-middle'>
                        <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                        <tr>
                            <th className="ps-24">Thông Tin</th>
                            <th>ĐVT Gốc</th>
                            <th>Quản Lý Lô</th>
                            <th>Chiến Lược</th>
                            <th>Trạng Thái</th>
                            <th className="pe-24 text-end">Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, idx) => (
                            <tr key={idx} className="hover-bg-primary-50">
                            <td className="ps-24 py-16">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-40-px h-40-px bg-primary-50 text-primary-600 rounded-8 d-flex justify-content-center align-items-center fw-bold">{item.erpItemCode.substring(0,2)}</div>
                                    <div><span className="fw-bold text-dark">{item.itemName}</span><br/><small className="text-secondary text-xs">Mã: {item.erpItemCode}</small></div>
                                </div>
                            </td>
                            <td><span className="fw-bold text-dark">{item.baseUom}</span></td>
                            <td>{item.isLotControlled ? <Icon icon="lucide:check-circle" className="text-success-main" /> : "-"}</td>
                            <td><span className="badge bg-info-focus text-info-main">{item.pickStrategy}</span></td>
                            <td><span className="badge bg-success-focus text-success-main">Hoạt động</span></td>
                            <td className="pe-24 text-end">
                                <button className="btn btn-outline-primary btn-sm radius-8 p-4 hvr-grow" onClick={() => handleOpenModal('edit', item)}>
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
              <>
                <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base py-20 px-24 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Bảng Quy Đổi Đơn Vị Tính (UoM Conversion)</h5>
                    <button className="btn btn-primary-600 btn-sm radius-8 px-20 d-flex align-items-center gap-2" onClick={() => setShowUomModal(true)}>
                        <Icon icon="lucide:plus-circle" /> Thêm Mới
                    </button>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                    <table className='table mb-0 align-middle'>
                        <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                        <tr>
                            <th className="ps-24 py-16">Sản phẩm</th>
                            <th>Đơn vị lớn</th>
                            <th className="text-center">Hệ số nhân</th>
                            <th>Đơn vị cơ bản</th>
                            <th>Diễn giải</th>
                            <th className="pe-24 text-end">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {uomConversions.map((u, idx) => (
                            <tr key={u.id || idx} className="hover-bg-primary-50">
                            <td className="ps-24 py-20"><span className="fw-bold text-dark">{u.itemCode}</span></td>
                            <td><span className="badge bg-warning-focus text-warning-main px-12 py-6">{u.fromUom}</span></td>
                            <td className="text-center"><Icon icon="lucide:move-right" className="me-2 text-secondary" /> <span className="fw-black h6 mb-0 text-primary-600">{u.factor}</span></td>
                            <td><span className="badge bg-success-focus text-success-main px-12 py-6">{u.toUom}</span></td>
                            <td><span className="text-secondary fw-medium">{u.description}</span></td>
                            <td className="pe-24 text-end">
                                <button className="btn btn-outline-danger btn-sm radius-8 p-4 hvr-grow" onClick={() => {
                                    if(window.confirm('Bạn có chắc muốn xóa quy đổi này?')) deleteUomConversion(u.id);
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
              </>
          )}

          {activeTab === 'suppliers' && (
              <>
                <div className='card-header d-flex flex-wrap align-items-center justify-content-between gap-3 bg-base py-20 px-24 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Danh Mục Nhà Cung Cấp (Suppliers)</h5>
                    <button className="btn btn-primary-600 btn-sm radius-8 px-20 d-flex align-items-center gap-2" onClick={() => handleOpenSupModal('add')}>
                        <Icon icon="lucide:plus-circle" /> Thêm Mới
                    </button>
                </div>
                <div className='card-body p-0'>
                    <div className='table-responsive'>
                    <table className='table mb-0 align-middle'>
                        <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                        <tr>
                            <th className="ps-24 py-16">Mã / Tên NCC</th>
                            <th>Liên hệ</th>
                            <th>Điện thoại</th>
                            <th style={{width: '25%'}}>Địa chỉ</th>
                            <th>Trạng thái</th>
                            <th className="pe-24 text-end">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {suppliers.map((s, idx) => (
                            <tr key={s.id || idx} className="hover-bg-primary-50">
                            <td className="ps-24 py-16">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="w-40-px h-40-px bg-info-focus text-info-main rounded-circle d-flex justify-content-center align-items-center fw-bold">{s.code.substring(0,2)}</div>
                                    <div><span className="fw-bold text-dark">{s.name}</span><br/><small className="text-secondary text-xs">Mã: {s.code}</small></div>
                                </div>
                            </td>
                            <td><span className="fw-medium">{s.contact}</span></td>
                            <td><span className="text-secondary">{s.phone}</span></td>
                            <td><span className="text-xs text-secondary line-clamp-2">{s.address}</span></td>
                            <td>
                                <span className={`badge ${s.status === 'Active' ? 'bg-success-focus text-success-main' : 'bg-danger-focus text-danger-main'} px-12 py-4`}>
                                    {s.status === 'Active' ? 'Hoạt động' : 'Tạm dừng'}
                                </span>
                            </td>
                            <td className="pe-24 text-end">
                                <div className="d-flex justify-content-end gap-2">
                                    <button className="btn btn-outline-primary btn-sm radius-8 p-4 hvr-grow" onClick={() => handleOpenSupModal('edit', s)}>
                                        <Icon icon="solar:pen-new-square-bold" />
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm radius-8 p-4 hvr-grow" onClick={() => {
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
