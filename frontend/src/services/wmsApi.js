/**
 * WMS API Service Layer
 * This service provides an adapter between the UI/Context and the real ERP/WMS Backend.
 * It includes a Mock Fallback mechanism to ensure the demo remains functional 
 * until real endpoints are provided.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || '';
const USE_MOCK = !process.env.REACT_APP_API_URL;

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown Error' }));
        throw new Error(error.message || 'API Request Failed');
    }
    return response.json();
};

export const wmsApi = {
    // 1. Master Data
    fetchItems: async () => {
        if (USE_MOCK) return null; // Context will use local JSON
        return fetch(`${API_BASE_URL}/items`).then(handleResponse);
    },

    syncFromErp: async (entityType) => {
        console.log(`[API] Syncing ${entityType} from ERP...`);
        if (USE_MOCK) {
            return new Promise(resolve => setTimeout(() => resolve({ success: true, count: 5 }), 1500));
        }
        return fetch(`${API_BASE_URL}/integration/sync/${entityType}`, { method: 'POST' }).then(handleResponse);
    },

    // 2. Inbound
    submitReceipt: async (receiptData) => {
        console.log('[API] Submitting Receipt to ERP:', receiptData);
        if (USE_MOCK) return { success: true, grnNumber: `GRN-${Date.now().toString().slice(-6)}` };
        return fetch(`${API_BASE_URL}/inbound/receipt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(receiptData)
        }).then(handleResponse);
    },

    // 3. Outbound
    releaseWave: async (orderIds) => {
        console.log('[API] Releasing Wave for orders:', orderIds);
        if (USE_MOCK) return { success: true, waveId: `WAVE-${Date.now().toString().slice(-4)}` };
        return fetch(`${API_BASE_URL}/outbound/wave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderIds })
        }).then(handleResponse);
    },

    // 4. Inventory
    postAdjustment: async (adjData) => {
        console.log('[API] Posting Inventory Adjustment:', adjData);
        if (USE_MOCK) return { success: true, txId: `ADJ-${Math.random().toString(36).substring(7)}` };
        return fetch(`${API_BASE_URL}/inventory/adjust`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adjData)
        }).then(handleResponse);
    },

    // 5. Quality
    updateQualityStatus: async (qoId, result) => {
        console.log(`[API] Updating Quality Order ${qoId} to ${result.status}`);
        if (USE_MOCK) return { success: true };
        return fetch(`${API_BASE_URL}/quality/update/${qoId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        }).then(handleResponse);
    }
};
