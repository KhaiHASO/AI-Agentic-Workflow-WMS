const fs = require('fs');
const file = 'src/masterLayout/MasterLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

const startTag = "<ul className='sidebar-menu' id='sidebar-menu'>";
const endTag = "</ul>\n        </div>\n      </aside>";

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newMenu = `<ul className='sidebar-menu' id='sidebar-menu'>
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:home-smile-angle-outline' className='menu-icon' />
                <span>Tổng quan & Dữ liệu</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Trang chủ WMS
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/master-data' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Danh mục hàng hóa
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/warehouse-layout' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' /> Sơ đồ vị trí (Layout)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/sync-logs' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' /> Lịch sử đồng bộ ERP
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Nhập hàng (Inbound)</li>
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:inbox-in-outline' className='menu-icon' />
                <span>Quy trình Nhận hàng</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/inbound-draft' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Nháp Nhận Hàng (Draft)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/quality-control' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Kiểm tra chất lượng (QC)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/putaway' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-success-main w-auto' /> Nhiệm vụ Cất hàng
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Xuất hàng (Outbound)</li>
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:inbox-out-outline' className='menu-icon' />
                <span>Quy trình Xuất hàng</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/sales-orders' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Đơn hàng xuất (SO)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/pick-task' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Nhiệm vụ Lấy hàng (Pick)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/shipment' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' /> Xác nhận Giao hàng
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/returns' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' /> Trả hàng (RMA/Returns)
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Vận hành Kho (Operations)</li>
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:box-outline' className='menu-icon' />
                <span>Quản lý Tồn kho</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/inventory' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Tồn kho khả dụng
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/pallet-hu' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Quản lý Pallet (HU)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/relocation' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' /> Điều chuyển vị trí
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/cycle-count' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-danger-main w-auto' /> Kiểm kê định kỳ
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/ledger' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-success-main w-auto' /> Sổ cái (Ledger)
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Quản trị & Báo cáo</li>
            <li>
              <NavLink to='/reports' className={(navData) => navData.isActive ? "active-page" : ""}>
                <Icon icon='solar:chart-outline' className='menu-icon' />
                <span>Báo cáo & KPIs</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/devices' className={(navData) => navData.isActive ? "active-page" : ""}>
                <Icon icon='solar:scanner-outline' className='menu-icon' />
                <span>Quản lý Thiết bị</span>
              </NavLink>
            </li>
          `;

  content = content.slice(0, startIndex) + newMenu + content.slice(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Sidebar full update successful.');
} else {
  console.log('Could not find start or end tags.');
}
