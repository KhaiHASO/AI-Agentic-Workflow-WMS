import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wmsApi } from '../services/wmsApi';

const UsersListLayer = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await wmsApi.fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await wmsApi.deleteUser(id);
                loadUsers(); // Refresh
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const filteredUsers = users.filter(user => 
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadge = (role) => {
        switch (role) {
            case 'Admin': return 'bg-danger-focus text-danger-600';
            case 'Manager': return 'bg-warning-focus text-warning-600';
            case 'Supervisor': return 'bg-info-focus text-info-600';
            default: return 'bg-success-focus text-success-600';
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <form className="navbar-search">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            name="search"
                            placeholder="Search user..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                </div>
                <Link
                    to="/sign-up"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                >
                    <Icon
                        icon="ic:baseline-plus"
                        className="icon text-xl line-height-1"
                    />
                    Add New User
                </Link>
            </div>
            <div className="card-body p-24">
                <div className="table-responsive scroll-sm">
                    <table className="table bordered-table sm-table mb-0">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Roles</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-20">Loading...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-20">No users found.</td></tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={user.imageUrl || "assets/images/user-list/user-list1.png"}
                                                    alt={user.fullName}
                                                    className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                                                />
                                                <div className="flex-grow-1">
                                                    <span className="text-md mb-0 fw-medium text-secondary-light d-block">
                                                        {user.fullName}
                                                    </span>
                                                    <span className="text-xs text-secondary-light">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.department || "N/A"}</td>
                                        <td>{user.designation || "N/A"}</td>
                                        <td>
                                            <div className="d-flex flex-wrap gap-1">
                                                {user.roles && user.roles.map(role => (
                                                    <span key={role} className={`px-8 py-4 radius-4 fw-medium text-xs ${getRoleBadge(role)}`}>
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex align-items-center gap-10 justify-content-center">
                                                <button type="button" className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-32-px h-32-px d-flex justify-content-center align-items-center rounded-circle">
                                                    <Icon icon="lucide:edit" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    type="button" 
                                                    className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-32-px h-32-px d-flex justify-content-center align-items-center rounded-circle"
                                                >
                                                    <Icon icon="fluent:delete-24-regular" />
                                                </button>
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
    );
};

export default UsersListLayer;
