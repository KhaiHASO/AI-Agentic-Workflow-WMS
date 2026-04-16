import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { useWMS } from '../context/WMSContext';
import { wmsApi } from '../services/wmsApi';
import { toast } from 'react-toastify';

const MasterDataLayer = () => {
    const { items, loading, refreshData } = useWMS();
    const [showAddForm, setShowAddForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [formData, setFormData] = useState({
        itemCode: "",
        name: "",
        baseUomId: 1, // Default to PCS (Assuming ID 1 is PCS)
        pickStrategy: "FIFO",
        status: "Active"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await wmsApi.createItem(formData);
            toast.success("Thêm sản phẩm thành công!");
            setShowAddForm(false);
            setFormData({ itemCode: "", name: "", baseUomId: 1, pickStrategy: "FIFO", status: "Active" });
            refreshData(); 
        } catch (error) {
            toast.error("Lỗi: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // FIX: Add safety checks for null/undefined and update property names to match new Model (itemCode)
    const filteredItems = items.filter(i => {
        const code = (i.itemCode || "").toLowerCase();
        const name = (i.name || "").toLowerCase();
        const search = searchTerm.toLowerCase();
        return code.includes(search) || name.includes(search);
    });

    return (
        <div className="row gy-4">
            {/* Header Actions */}
            <div className="col-12">
                <div className="card border-0 shadow-sm radius-12 p-16">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-48-px h-48-px bg-primary-600 text-white rounded-circle d-flex justify-content-center align-items-center">
                                <Icon icon="solar:box-bold" className="h4 mb-0" />
                            </div>
                            <div>
                                <h5 className="mb-0 fw-bold">Quản Lý Danh Mục Sản Phẩm (Master Data)</h5>
                                <p className="text-sm text-secondary mb-0">Quản lý SKU, quy cách đóng gói và chiến lược vận hành.</p>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary px-20 radius-8" onClick={() => refreshData()}>
                                <Icon icon="solar:refresh-bold" className="me-2" /> Làm mới
                            </button>
                            <button className="btn btn-primary-600 px-20 radius-8" onClick={() => setShowAddForm(!showAddForm)}>
                                <Icon icon="ic:baseline-plus" className="me-2" /> {showAddForm ? "Hủy bỏ" : "Thêm SKU mới"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Form */}
            {showAddForm && (
                <div className="col-12 animate__animated animate__fadeInDown">
                    <div className="card border-0 shadow-sm radius-12 overflow-hidden">
                        <div className="card-header bg-primary-600 p-16">
                            <h6 className="text-white mb-0">ĐĂNG KÝ SẢN PHẨM MỚI</h6>
                        </div>
                        <div className="card-body p-24">
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-3">
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Mã SKU (ERP Code)</label>
                                        <input type="text" className="form-control" placeholder="VD: SKU-001" required value={formData.itemCode} onChange={e => setFormData({...formData, itemCode: e.target.value.toUpperCase()})} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Tên Sản Phẩm</label>
                                        <input type="text" className="form-control" placeholder="Tên đầy đủ của sản phẩm..." required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label fw-bold">Chiến lược xuất kho</label>
                                        <select className="form-select" value={formData.pickStrategy} onChange={e => setFormData({...formData, pickStrategy: e.target.value})}>
                                            <option value="FIFO">FIFO (Nhập trước xuất trước)</option>
                                            <option value="FEFO">FEFO (Hết hạn trước xuất trước)</option>
                                        </select>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary-600 px-40 py-10 fw-bold radius-8" disabled={isSubmitting}>
                                            {isSubmitting ? "ĐANG LƯU..." : "XÁC NHẬN LƯU HỆ THỐNG"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* List Table */}
            <div className="col-12">
                <div className="card border-0 shadow-sm radius-12">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <div className="d-flex align-items-center justify-content-between">
                            <h6 className="mb-0 text-md fw-bold">Danh Sách SKU ({filteredItems.length})</h6>
                            <div className="input-group w-auto border rounded-8 bg-light overflow-hidden">
                                <span className="input-group-text bg-transparent border-0"><Icon icon="ion:search-outline" /></span>
                                <input type="text" className="form-control border-0 bg-transparent" placeholder="Tìm SKU hoặc tên..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive" style={{maxHeight: '600px'}}>
                            <table className="table bordered-table sm-table mb-0">
                                <thead className="bg-light sticky-top">
                                    <tr>
                                        <th className="ps-24">MÃ SẢN PHẨM</th>
                                        <th>TÊN SẢN PHẨM</th>
                                        <th>ĐVT CƠ BẢN</th>
                                        <th>CHIẾN LƯỢC</th>
                                        <th>TRẠNG THÁI</th>
                                        <th className="text-center">HÀNH ĐỘNG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="6" className="text-center py-40">Đang tải dữ liệu master data...</td></tr>
                                    ) : filteredItems.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center py-40 text-secondary">Không tìm thấy sản phẩm nào.</td></tr>
                                    ) : (
                                        filteredItems.map((item) => (
                                            <tr key={item.id} className="hover-bg-primary-50">
                                                <td className="ps-24">
                                                    <span className="badge bg-primary-focus text-primary-600 px-12 py-6 fw-bold border border-primary-100">
                                                        {item.itemCode}
                                                    </span>
                                                </td>
                                                <td className="fw-medium">{item.name}</td>
                                                <td><span className="text-secondary">{item.baseUom?.code || "PCS"}</span></td>
                                                <td><span className="text-xs fw-bold text-dark">{item.pickStrategy}</span></td>
                                                <td>
                                                    <span className={`badge ${item.status === 'Active' ? 'bg-success-focus text-success-600' : 'bg-danger-focus text-danger-600'} px-12 py-4`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex align-items-center gap-2 justify-content-center">
                                                        <button className="btn btn-sm btn-outline-success p-4 radius-4" title="Sửa"><Icon icon="lucide:edit" /></button>
                                                        <button className="btn btn-sm btn-outline-info p-4 radius-4" title="In Label"><Icon icon="solar:printer-bold" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
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

export default MasterDataLayer;
