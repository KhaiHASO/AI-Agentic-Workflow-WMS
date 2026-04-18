export interface SO {
  id: string;
  soNo: string;
  customer: string;
  orderDate: string;
  status: 'Open' | 'Waved' | 'Picking' | 'Shipped' | 'Cancelled';
  lines: SOLine[];
}

export interface SOLine {
  id: string;
  itemCode: string;
  itemName: string;
  qty: number;
}

export const mockSOs: SO[] = [
  { id: 'so-1', soNo: 'SO-24001', customer: 'Bách Hóa Xanh', orderDate: '2024-05-10', status: 'Open', lines: [{ id: 'l1', itemCode: 'ITM-01', itemName: 'Sữa tươi', qty: 20 }] },
  { id: 'so-2', soNo: 'SO-24002', customer: 'WinMart', orderDate: '2024-05-11', status: 'Open', lines: [{ id: 'l2', itemCode: 'ITM-02', itemName: 'Sữa chua', qty: 30 }] },
  { id: 'so-3', soNo: 'SO-24003', customer: 'Coop Mart', orderDate: '2024-05-12', status: 'Waved', lines: [] },
  { id: 'so-4', soNo: 'SO-24004', customer: 'Lotte Mart', orderDate: '2024-05-13', status: 'Picking', lines: [] },
  { id: 'so-5', soNo: 'SO-24005', customer: 'Aeon Mall', orderDate: '2024-05-14', status: 'Open', lines: [] },
  { id: 'so-6', soNo: 'SO-24006', customer: 'Emart', orderDate: '2024-05-15', status: 'Open', lines: [] },
];

export const mockWaves = [
  { id: 'wv-1', waveNo: 'WV-24001', status: 'Open', orderCount: 5, taskCount: 0, createdAt: '2024-05-15 08:00' },
  { id: 'wv-2', waveNo: 'WV-24002', status: 'Released', orderCount: 3, taskCount: 12, createdAt: '2024-05-15 09:30' },
  { id: 'wv-3', waveNo: 'WV-24003', status: 'In Progress', orderCount: 4, taskCount: 8, createdAt: '2024-05-16 10:00' },
  { id: 'wv-4', waveNo: 'WV-24004', status: 'Completed', orderCount: 2, taskCount: 4, createdAt: '2024-05-16 11:00' },
];

export const mockPickTasks = [
  { id: 'ptk-1', taskNo: 'PK-24001', waveId: 'wv-2', status: 'Open', zone: 'Zone A', assignee: null },
  { id: 'ptk-2', taskNo: 'PK-24002', waveId: 'wv-2', status: 'In Progress', zone: 'Zone B', assignee: 'usr-1' },
  { id: 'ptk-3', taskNo: 'PK-24003', waveId: 'wv-2', status: 'Completed', zone: 'Zone C', assignee: 'usr-2' },
  { id: 'ptk-4', taskNo: 'PK-24004', waveId: 'wv-3', status: 'Open', zone: 'Zone A', assignee: null },
  { id: 'ptk-5', taskNo: 'PK-24005', waveId: 'wv-3', status: 'Open', zone: 'Zone B', assignee: null },
  { id: 'ptk-6', taskNo: 'PK-24006', waveId: 'wv-3', status: 'Open', zone: 'Zone C', assignee: null },
  { id: 'ptk-7', taskNo: 'PK-24007', waveId: 'wv-3', status: 'Open', zone: 'Zone A', assignee: null },
  { id: 'ptk-8', taskNo: 'PK-24008', waveId: 'wv-3', status: 'Open', zone: 'Zone B', assignee: null },
  { id: 'ptk-9', taskNo: 'PK-24009', waveId: 'wv-3', status: 'Open', zone: 'Zone C', assignee: null },
  { id: 'ptk-10', taskNo: 'PK-24010', waveId: 'wv-3', status: 'Open', zone: 'Zone A', assignee: null },
];

export const mockShipments = [
  { id: 'sh-1', shipmentNo: 'SH-24001', status: 'Draft', customer: 'Bách Hóa Xanh', carrier: 'GHTK' },
  { id: 'sh-2', shipmentNo: 'SH-24002', status: 'Confirmed', customer: 'WinMart', carrier: 'Viettel Post' },
  { id: 'sh-3', shipmentNo: 'SH-24003', status: 'Shipped', customer: 'Coop Mart', carrier: 'Ninja Van' },
  { id: 'sh-4', shipmentNo: 'SH-24004', status: 'Cancelled', customer: 'Lotte Mart', carrier: 'GrabExpress' },
];

export const mockBackorders = [
  { id: 'bo-1', boNo: 'BO-24001', soNo: 'SO-24002', itemCode: 'ITM-02', itemName: 'Sữa chua', qty: 10, status: 'Open' },
];
