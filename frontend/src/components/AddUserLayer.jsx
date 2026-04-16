import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { wmsApi } from '../services/wmsApi';
import { toast } from 'react-toastify';

const AddUserLayer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        description: '',
        imageUrl: ''
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
                setFormData(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await wmsApi.createUser(formData);
            toast.success('User added successfully!');
            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                department: '',
                designation: '',
                description: '',
                imageUrl: ''
            });
            setImagePreviewUrl('');
        } catch (error) {
            toast.error('Failed to add user: ' + error.message);
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                                <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',
                                                }}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-20">
                                        <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Full Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="name"
                                            placeholder="Enter Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Email <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8"
                                            id="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="phone" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="phone"
                                            placeholder="Enter phone number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="department" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Department <span className="text-danger-600">*</span>
                                        </label>
                                        <select
                                            className="form-control radius-8 form-select"
                                            id="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select Department</option>
                                            <option value="IT">IT</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Sales">Sales</option>
                                        </select>
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="designation" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Designation <span className="text-danger-600">*</span>
                                        </label>
                                        <select
                                            className="form-control radius-8 form-select"
                                            id="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select Designation</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Worker">Worker</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="description" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Description
                                        </label>
                                        <textarea
                                            className="form-control radius-8"
                                            id="description"
                                            placeholder="Write description..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            type="button"
                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                            onClick={() => setFormData({ name: '', email: '', phone: '', department: '', designation: '', description: '', imageUrl: '' })}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserLayer;