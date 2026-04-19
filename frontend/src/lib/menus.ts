export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon?: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: "LUỒNG 0 & 5: GIÁM SÁT & TÍCH HỢP",
      id: "control-tower-group",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard",
          label: "Control Tower",
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:chart-bar",
          submenus: [
            { href: "/dashboard", label: "Dashboard Quản trị", active: pathname === "/dashboard", children: [] },
            { href: "/dashboard/alerts", label: "Cảnh báo Vận hành", active: pathname === "/dashboard/alerts", children: [] },
          ],
        },
        {
          id: "integration",
          href: "/integration/messages",
          label: "ERP Integration",
          active: pathname.includes("/integration"),
          icon: "heroicons-outline:arrows-right-left",
          submenus: [
            { href: "/integration/messages", label: "Nhật ký Đồng bộ", active: pathname === "/integration/messages", children: [] },
            { href: "/integration/erp-sync", label: "Đồng bộ Master Data", active: pathname === "/integration/erp-sync", children: [] },
          ],
        },
      ],
    },
    {
      groupLabel: "LUỒNG 1 & 2: NHẬP KHO (INBOUND)",
      id: "inbound-group",
      menus: [
        {
          id: "inbound",
          href: "/inbound/purchase-orders",
          label: "Nhận hàng & Cất hàng",
          active: pathname.includes("/inbound"),
          icon: "heroicons-outline:login",
          submenus: [
            { href: "/inbound/purchase-orders", label: "Đơn mua hàng (PO)", active: pathname === "/inbound/purchase-orders", children: [] },
            { href: "/inbound/master-receipts", label: "Master Receipt (Gom PO)", active: pathname.includes("/inbound/master-receipts"), children: [] },
            { href: "/inbound/drafts/mr-1", label: "Receiving Workbench (Draft)", active: pathname.includes("/inbound/drafts"), children: [] },
            { href: "/inbound/putaway-tasks", label: "Putaway Tasks (Cất hàng)", active: pathname.includes("/inbound/putaway-tasks"), children: [] },
          ],
        },
      ],
    },
    {
      groupLabel: "LUỒNG 3: XUẤT KHO (OUTBOUND)",
      id: "outbound-group",
      menus: [
        {
          id: "outbound",
          href: "/outbound/waves",
          label: "Xuất kho Thực thi",
          active: pathname.includes("/outbound"),
          icon: "heroicons-outline:logout",
          submenus: [
            { href: "/outbound/sales-orders", label: "Đơn bán hàng (SO)", active: pathname === "/outbound/sales-orders", children: [] },
            { href: "/outbound/waves", label: "Wave Planning (Đợt xuất)", active: pathname.includes("/outbound/waves"), children: [] },
            { href: "/outbound/pick-tasks", label: "Picking Workbench", active: pathname.includes("/outbound/pick-tasks"), children: [] },
            { href: "/outbound/shipments", label: "Shipment Packing", active: pathname.includes("/outbound/shipments"), children: [] },
          ],
        },
      ],
    },
    {
      groupLabel: "LUỒNG 4: TỒN KHO & CHẤT LƯỢNG",
      id: "inventory-group",
      menus: [
        {
          id: "inventory",
          href: "/inventory/on-hand",
          label: "Inventory & QC",
          active: pathname.includes("/inventory") || pathname.includes("/quality") || pathname.includes("/counting"),
          icon: "heroicons-outline:cube",
          submenus: [
            { href: "/inventory/on-hand", label: "Inventory Console (Tồn kho)", active: pathname === "/inventory/on-hand", children: [] },
            { href: "/quality/orders", label: "QC & Quarantine", active: pathname.includes("/quality"), children: [] },
            { href: "/counting/sessions", label: "Cycle Count (Kiểm kê)", active: pathname.includes("/counting"), children: [] },
            { href: "/inventory/ledger", label: "Thẻ kho (Ledger)", active: pathname === "/inventory/ledger", children: [] },
          ],
        },
      ],
    },
    {
      groupLabel: "LUỒNG 6: QUẢN TRỊ HỆ THỐNG",
      id: "system-group",
      menus: [
        {
          id: "admin",
          href: "/admin/users",
          label: "System Admin",
          active: pathname.includes("/admin") || pathname.includes("/master-data"),
          icon: "heroicons-outline:cog",
          submenus: [
            { href: "/admin/users", label: "User & Role Management", active: pathname.includes("/admin/users"), children: [] },
            { href: "/admin/devices", label: "Device Management", active: pathname.includes("/admin/devices"), children: [] },
            { href: "/admin/erp-config", label: "ERP Connectivity Config", active: pathname.includes("/admin/erp-config"), children: [] },
            { href: "/master-data/items", label: "Dữ liệu nền (Master Data)", active: pathname.includes("/master-data"), children: [] },
          ],
        },
      ],
    },
    {
      groupLabel: "LUỒNG 7: CÔNG CỤ GIẢ LẬP",
      id: "dev-tools-group",
      menus: [
        {
          id: "dev-tools",
          href: "/dev-tools/erp-mock",
          label: "Developer Tools",
          active: pathname.includes("/dev-tools"),
          icon: "heroicons-outline:beaker",
          submenus: [
            { href: "/dev-tools/erp-mock", label: "ERP Mock Panel", active: pathname === "/dev-tools/erp-mock", children: [] },
            { href: "/dev-tools/scanner-widget", label: "Virtual Scanner Settings", active: pathname === "/dev-tools/scanner-widget", children: [] },
          ],
        },
      ],
    },
  ];
}


export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return getMenuList(pathname, t);
}
