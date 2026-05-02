// centralizedDataStore.js - A unified store to simulate a real database across the app
import { items, locations, tasks, users, analytics, masterReceipts, inventoryOnHand, inventoryLedger } from './mockData';

class CentralizedDataStore {
  constructor() {
    this.listeners = [];
    
    // Load from localStorage or use defaults
    const savedData = localStorage.getItem('wms_demo_db');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Integrity check: ensure all main keys exist
        const keys = ['items', 'locations', 'tasks', 'users', 'analytics', 'masterReceipts', 'inventory', 'auditLogs'];
        const isValid = keys.every(k => parsed[k] !== undefined);
        
        if (isValid) {
          this.state = parsed;
        } else {
          this.resetToDefaults();
        }
      } catch (e) {
        this.resetToDefaults();
      }
    } else {
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    this.state = {
      items,
      locations,
      tasks,
      users,
      analytics,
      masterReceipts,
      inventory: inventoryOnHand.map(i => ({ ...i, locId: i.loc })),
      auditLogs: inventoryLedger.map(l => ({
        id: l.id,
        time: l.time,
        user: 'System',
        action: l.type === 'Inbound' ? 'Nhập kho' : 'Xuất kho',
        details: `Mã ${l.itemId} tại ${l.loc} (Ref: ${l.ref})`
      }))
    };
    this.save();
  }

  save() {
    localStorage.setItem('wms_demo_db', JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  // --- CRUD METHODS ---

  // Master Data
  updateItems(newItems) { this.state.items = newItems; this.save(); }
  updateLocations(newLocs) { this.state.locations = newLocs; this.save(); }

  // Inventory Logic
  addInventory(itemId, locId, qty, lot, status = 'Available') {
    const existing = this.state.inventory.find(i => i.itemId === itemId && i.locId === locId && i.lot === lot);
    if (existing) {
      existing.qty += Number(qty);
    } else {
      const item = this.state.items.find(it => it.id === itemId);
      this.state.inventory.push({ itemId, locId, qty: Number(qty), unit: item?.unit || 'Units', lot, status });
    }
    this.logAction('Nhập kho', `Mã ${itemId} tại ${locId} (+${qty})`);
    this.save();
  }

  moveInventory(itemId, fromLoc, toLoc, qty, lot) {
    const source = this.state.inventory.find(i => i.itemId === itemId && i.locId === fromLoc && i.lot === lot);
    if (source && source.qty >= qty) {
      source.qty -= qty;
      if (source.qty === 0) this.state.inventory = this.state.inventory.filter(i => i !== source);
      this.addInventory(itemId, toLoc, qty, lot);
      this.logAction('Điều chuyển', `${itemId} từ ${fromLoc} -> ${toLoc}`);
    }
  }

  // Audit Logs
  logAction(action, details) {
    this.state.auditLogs.unshift({
      id: 'L' + Date.now(),
      time: new Date().toISOString(),
      user: 'Nguyễn Văn A', // Default demo user
      action,
      details
    });
  }

  // Transaction Processing
  submitReceipt(receiptId, lines) {
    lines.forEach(line => {
      if (line.scannedQty > 0) {
        this.addInventory(line.itemId, 'STAGING-INB', line.scannedQty, line.lot || 'NEW-LOT');
      }
    });
    this.logAction('Hoàn tất nhận hàng', `Phiếu ${receiptId}`);
    this.save();
  }
}

export const db = new CentralizedDataStore();
