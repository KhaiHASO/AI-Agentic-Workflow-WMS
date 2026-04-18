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
      groupLabel: "ĐIỀU HÀNH",
      id: "dashboard-group",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [
            {
              href: "/dashboard",
              label: "Tổng quan",
              active: pathname === "/dashboard",
              children: [],
            },
            {
              href: "/dashboard/alerts",
              label: "Cảnh báo (Alerts)",
              active: pathname === "/dashboard/alerts",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "VẬN HÀNH (OPERATIONS)",
      id: "operations-group",
      menus: [
        {
          id: "inbound",
          href: "/inbound/purchase-orders",
          label: "Inbound (Nhập kho)",
          active: pathname.includes("/inbound"),
          icon: "heroicons-outline:login",
          submenus: [
            {
              href: "/inbound/purchase-orders",
              label: "Purchase Orders (PO)",
              active: pathname === "/inbound/purchase-orders",
              children: [],
            },
            {
              href: "/inbound/master-receipts",
              label: "Master Receipts",
              active: pathname.includes("/inbound/master-receipts") || pathname.includes("/inbound/drafts") || pathname.includes("/inbound/receipts"),
              children: [],
            },
            {
              href: "/inbound/putaway-tasks",
              label: "Putaway Tasks",
              active: pathname.includes("/inbound/putaway-tasks"),
              children: [],
            },
          ],
        },
        {
          id: "outbound",
          href: "/outbound/sales-orders",
          label: "Outbound (Xuất kho)",
          active: pathname.includes("/outbound"),
          icon: "heroicons-outline:logout",
          submenus: [
            {
              href: "/outbound/sales-orders",
              label: "Sales Orders (SO)",
              active: pathname === "/outbound/sales-orders",
              children: [],
            },
            {
              href: "/outbound/waves",
              label: "Waves",
              active: pathname.includes("/outbound/waves"),
              children: [],
            },
            {
              href: "/outbound/pick-tasks",
              label: "Pick Tasks",
              active: pathname.includes("/outbound/pick-tasks"),
              children: [],
            },
            {
              href: "/outbound/shipments",
              label: "Shipments",
              active: pathname.includes("/outbound/shipments"),
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "TỒN KHO & CHẤT LƯỢNG",
      id: "inventory-group",
      menus: [
        {
          id: "inventory",
          href: "/inventory/on-hand",
          label: "Quản lý tồn kho",
          active: pathname.includes("/inventory"),
          icon: "heroicons-outline:cube",
          submenus: [
            {
              href: "/inventory/on-hand",
              label: "Tồn kho hiện tại",
              active: pathname === "/inventory/on-hand",
              children: [],
            },
            {
              href: "/inventory/ledger",
              label: "Sổ kho (Ledger)",
              active: pathname === "/inventory/ledger",
              children: [],
            },
            {
              href: "/inventory/handling-units",
              label: "Handling Units (HU)",
              active: pathname.includes("/inventory/handling-units"),
              children: [],
            },
          ],
        },
        {
          id: "counting",
          href: "/counting/sessions",
          label: "Kiểm kê (Counting)",
          active: pathname.includes("/counting"),
          icon: "heroicons-outline:clipboard-list",
          submenus: [
            {
              href: "/counting/sessions",
              label: "Phiên kiểm kê",
              active: pathname.includes("/counting/sessions"),
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "HỆ THỐNG",
      id: "system-group",
      menus: [
        {
          id: "integration",
          href: "/integration/messages",
          label: "Tích hợp (ERP)",
          active: pathname.includes("/integration"),
          icon: "heroicons-outline:link",
          submenus: [
            {
              href: "/integration/messages",
              label: "Hàng đợi thông điệp",
              active: pathname === "/integration/messages",
              children: [],
            },
          ],
        },
        {
          id: "master-data",
          href: "/master-data/items",
          label: "Dữ liệu nền",
          active: pathname.includes("/master-data"),
          icon: "heroicons-outline:database",
          submenus: [
            {
              href: "/master-data/items",
              label: "Hàng hóa (Items)",
              active: pathname.includes("/master-data/items"),
              children: [],
            },
          ],
        },
      ],
    },
  ];
}

export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return getMenuList(pathname, t);
}
