/**
 * WMS API Service Layer
 */

const API_BASE_URL = 'http://localhost:5167/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/sign-in';
        throw new Error('Session expired. Please login again.');
    }
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown Error' }));
        throw new Error(error.message || 'API Request Failed');
    }
    return response.json();
};

export const wmsApi = {
    // 1. Auth & Management
    fetchUsers: () => fetch(`${API_BASE_URL}/Management/users`, { headers: getHeaders() }).then(handleResponse),
    fetchRoles: () => fetch(`${API_BASE_URL}/Management/roles`, { headers: getHeaders() }).then(handleResponse),
    deleteUser: (id) => fetch(`${API_BASE_URL}/Management/user/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
    assignRole: (userId, roleName) => fetch(`${API_BASE_URL}/Management/assign-role?userId=${userId}&roleName=${roleName}`, { 
        method: 'POST', 
        headers: getHeaders() 
    }).then(handleResponse),

    // 2. Core / Master Data
    fetchItems: () => fetch(`${API_BASE_URL}/Items`, { headers: getHeaders() }).then(handleResponse),
    fetchLocations: () => fetch(`${API_BASE_URL}/Locations`, { headers: getHeaders() }).then(handleResponse),
    fetchSuppliers: () => fetch(`${API_BASE_URL}/Suppliers`, { headers: getHeaders() }).then(handleResponse),
    toggleLocationStatus: (id) => fetch(`${API_BASE_URL}/Locations/toggle-status/${id}`, { method: 'POST', headers: getHeaders() }).then(handleResponse),
    printLocationLabel: (id) => fetch(`${API_BASE_URL}/Locations/print-label/${id}`, { headers: getHeaders() }).then(handleResponse),

    // 3. Inbound / Inventory
    fetchInventory: () => fetch(`${API_BASE_URL}/Inventory`, { headers: getHeaders() }).then(handleResponse),
    fetchPutawayTasks: () => fetch(`${API_BASE_URL}/PutawayTasks`, { headers: getHeaders() }).then(handleResponse),
    fetchQualityOrders: () => fetch(`${API_BASE_URL}/QualityOrders`, { headers: getHeaders() }).then(handleResponse),
    fetchInboundReceipts: () => fetch(`${API_BASE_URL}/InboundReceipts`, { headers: getHeaders() }).then(handleResponse),
    createInboundReceipt: (data) => fetch(`${API_BASE_URL}/InboundReceipts`, { 
        method: 'POST', 
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(handleResponse),
    updateInboundReceipt: (id, data) => fetch(`${API_BASE_URL}/InboundReceipts/${id}`, { 
        method: 'PUT', 
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(handleResponse),
    fetchPurchaseOrders: () => fetch(`${API_BASE_URL}/PurchaseOrders`, { headers: getHeaders() }).then(handleResponse),

    // 4. Outbound / Shipping
    fetchShipments: () => fetch(`${API_BASE_URL}/Shipments`, { headers: getHeaders() }).then(handleResponse),
    fetchPickTasks: () => fetch(`${API_BASE_URL}/PickTask`, { headers: getHeaders() }).then(handleResponse),
    fetchSalesOrders: () => fetch(`${API_BASE_URL}/SalesOrders`, { headers: getHeaders() }).then(handleResponse),

    // 5. Warehouse Operations
    fetchLedger: () => fetch(`${API_BASE_URL}/Ledger`, { headers: getHeaders() }).then(handleResponse),
    fetchCycleCounts: () => fetch(`${API_BASE_URL}/CycleCounts`, { headers: getHeaders() }).then(handleResponse),
    fetchRelocations: () => fetch(`${API_BASE_URL}/Relocation`, { headers: getHeaders() }).then(handleResponse),
    createRelocation: (data) => fetch(`${API_BASE_URL}/Relocation`, { 
        method: 'POST', 
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(handleResponse),
    fetchReturns: () => fetch(`${API_BASE_URL}/Returns`, { headers: getHeaders() }).then(handleResponse),
    fetchDevices: () => fetch(`${API_BASE_URL}/Devices`, { headers: getHeaders() }).then(handleResponse),
    fetchDashboardSummary: () => fetch(`${API_BASE_URL}/Dashboard/summary`, { headers: getHeaders() }).then(handleResponse),
    
    // 6. Integration & Logs
    fetchSyncOutbox: () => fetch(`${API_BASE_URL}/SyncLogs/outbox`, { headers: getHeaders() }).then(handleResponse),
    retrySync: (id) => fetch(`${API_BASE_URL}/SyncLogs/retry/${id}`, { method: 'POST', headers: getHeaders() }).then(handleResponse),
};
