import React, { useState, useEffect } from "react";
import itemsData from "../mockData/master/items.json";
import { Icon } from "@iconify/react";
import { toast } from 'react-toastify';

const MasterDataLayer = () => {
  const [items, setItems] = useState(itemsData);
  const [activeTab, setActiveTab] = useState("items");

  const uomConversions = [
      { item: "RM-001", fromUom: "BOX", toUom: "ROLL", factor: 12, description: "1 Thùng = 12 Cuộn" },
      { item: "RM-003", fromUom: "BAG", toUom: "KG", factor: 25, description: "1 Bao = 25 Kg" },
      { item: "PKG-001", fromUom: "BUNDLE", toUom: "PCS", factor: 50, description: "1 Bó = 50 Cái" }
  ];

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      {/* Visual Tabs */}
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
                    <button className="btn btn-primary-600 btn-sm radius-8 px-20">Thêm Mới</button>
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
                            <td className="pe-24 text-end"><button className="btn btn-outline-primary btn-sm radius-8 p-4"><Icon icon="solar:pen-new-square-bold" /></button></td>
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
                <div className='card-header bg-base py-20 px-24 border-bottom-0'>
                    <h5 className='card-title mb-0 fw-bold'>Bảng Quy Đổi Đơn Vị Tính (UoM Conversion)</h5>
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
                            <th className="pe-24">Diễn giải</th>
                        </tr>
                        </thead>
                        <tbody>
                        {uomConversions.map((u, idx) => (
                            <tr key={idx} className="hover-bg-primary-50">
                            <td className="ps-24 py-20"><span className="fw-bold text-dark">{u.item}</span></td>
                            <td><span className="badge bg-warning-focus text-warning-main px-12 py-6">{u.fromUom}</span></td>
                            <td className="text-center"><Icon icon="lucide:move-right" className="me-2 text-secondary" /> <span className="fw-black h6 mb-0 text-primary-600">{u.factor}</span></td>
                            <td><span className="badge bg-success-focus text-success-main px-12 py-6">{u.toUom}</span></td>
                            <td className="pe-24"><span className="text-secondary fw-medium">{u.description}</span></td>
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
