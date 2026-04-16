import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useWMS } from "../context/WMSContext";
import { toast } from 'react-toastify';

const ReturnsLayer = () => {
  const { returns = [] } = useWMS();
  const [returnType, setReturnType] = useState("RTV"); // RTV or RMA

  return (
    <div className='row gy-4 animate__animated animate__fadeIn'>
      <div className='col-lg-12'>
        <div className='card border-0 shadow-sm radius-16'>
          <div className='card-header d-flex justify-content-between align-items-center bg-base py-20 px-24 border-bottom-0'>
            <h5 className='card-title mb-0 fw-bold'>QUẢN LÝ TRẢ HÀNG (RETURNS / RTV / RMA)</h5>
            <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm radius-8">Tạo Phiếu Mới</button>
            </div>
          </div>
          <div className='card-body p-0'>
            <div className='table-responsive'>
              <table className='table mb-0 align-middle'>
                <thead className="bg-light text-secondary text-xxs fw-black text-uppercase">
                  <tr>
                    <th className="ps-24">Mã Phiếu</th>
                    <th>Chứng Từ Gốc</th>
                    <th>Đối Tác / NCC</th>
                    <th>Lô Hàng</th>
                    <th>Trạng Thái</th>
                    <th>Lý Do</th>
                    <th className="pe-24 text-end">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((item, idx) => (
                    <tr key={idx} className="hover-bg-primary-50">
                      <td className="ps-24"><span className="fw-bold">{item.returnNo}</span></td>
                      <td>{item.sourceNo}</td>
                      <td><span className="badge bg-dark text-white">{item.partner}</span></td>
                      <td>{item.lotNo || 'N/A'}</td>
                      <td>
                        <span className="px-12 py-6 rounded-pill fw-bold text-xxs bg-warning-focus text-warning-main">
                            {item.status}
                        </span>
                      </td>
                      <td><small className="text-secondary">{item.reason}</small></td>
                      <td className="pe-24 text-end">
                        <button className="btn btn-outline-primary btn-sm radius-8">CHI TIẾT</button>
                      </td>
                    </tr>
                  ))}
                  {returns.length === 0 && (
                      <tr><td colSpan="7" className="text-center py-24 text-secondary">Chưa có dữ liệu trả hàng.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsLayer;
