import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { useWMS } from '../context/WMSContext';
import { toast } from 'react-toastify';

const OnHandLayer = () => {
    const { onHand, loading, refreshData } = useWMS();
    const [searchTerm, setSearchTerm] = useState("");

    const handleExport = () => {
        toast.info("Đang chuẩn bị dữ liệu Excel... (Tính năng demo)");
    };

    const handleDetail = (inv) => {
        toast.success(`Xem chi tiết cho SKU: ${inv.item?.itemCode}`);
    };

    const filteredData = onHand.filter(inv => 
        inv.location?.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.item?.itemCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.lotNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <form className="navbar-search" onSubmit={e => e.preventDefault()}>
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            placeholder="Vị trí, SKU, Lô..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                    <button className="btn btn-sm btn-outline-primary" onClick={refreshData}>
                         <Icon icon="solar:refresh-bold" /> Làm mới
                    </button>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button onClick={handleExport} className="btn btn-success text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2">
                        <Icon icon="lucide:file-spreadsheet" className="icon text-xl" />
                        EXPORT EXCEL
                    </button>
                </div>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">VỊ TRÍ (LOCATION)</th>
                                <th scope="col">SẢN PHẨM (SKU)</th>
                                <th scope="col">LÔ (LOT NO)</th>
                                <th scope="col">KHẢ DỤNG</th>
                                <th scope="col">DỰ GIỮ</th>
                                <th scope="col">TRẠNG THÁI</th>
                                <th scope="col" className="text-center">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" className="text-center py-20">Đang tải tồn kho...</td></tr>
                            ) : filteredData.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-20 text-secondary">Kho trống (Không có tồn kho khớp điều kiện).</td></tr>
                            ) : (
                                filteredData.map((inv) => (
                                    <tr key={inv.id}>
                                        <td><span className="badge bg-info-focus text-info-600 border border-info-main">{inv.location?.code}</span></td>
                                        <td>
                                            <div className="d-flex flex-column">
                                                <span className="fw-medium">{inv.item?.itemCode}</span>
                                                <span className="text-xs text-secondary">{inv.item?.name}</span>
                                            </div>
                                        </td>
                                        <td>{inv.lotNo || 'N/A'}</td>
                                        <td className="fw-bold text-success-600">{inv.availableQty}</td>
                                        <td className="text-warning-600">{inv.reservedQty}</td>
                                        <td>
                                            <span className={`badge ${inv.inventoryStatus?.statusCode === 'Available' ? 'bg-success-focus text-success-600' : 'bg-danger-focus text-danger-600'} px-12 py-4`}>
                                                {inv.inventoryStatus?.statusCode}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <button onClick={() => handleDetail(inv)} className="btn btn-sm btn-outline-primary radius-8">
                                                CHI TIẾT
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OnHandLayer;
