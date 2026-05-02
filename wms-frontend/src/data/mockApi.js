import * as data from './mockData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Auth
  login: async (pin) => {
    await delay();
    const user = data.users.find(u => u.pin === pin);
    if (user) return { success: true, user };
    throw new Error('Mã PIN không chính xác');
  },

  // Sync
  syncPurchaseOrders: async () => {
    await delay(1000);
    return data.erpPurchaseOrders;
  },

  // Inbound
  getMasterReceipts: async () => {
    await delay();
    return data.masterReceipts;
  },

  getDraftLines: async (receiptId) => {
    await delay();
    return data.draftLines.filter(l => l.masterReceiptId === receiptId);
  },

  submitScan: async (draftId, barcode) => {
    await delay(200);
    // Simulate finding item and updating draft
    const item = data.items.find(i => i.barcodes.includes(barcode));
    if (!item) throw new Error('Mã vạch không tồn tại');
    return { success: true, item };
  },

  // Tasks
  getTasks: async (type) => {
    await delay();
    return data.tasks.filter(t => t.type === type);
  },

  // Inventory
  getInventory: async () => {
    await delay();
    return data.inventoryOnHand;
  },

  // Integration
  getIntegrationLogs: async () => {
    await delay();
    return data.integrationLogs;
  }
};
