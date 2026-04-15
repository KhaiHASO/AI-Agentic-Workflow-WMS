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
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Dữ liệu gốc (Master)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/sync-logs' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' /> Lịch sử đồng bộ ERP
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='sidebar-menu-group-title'>Nghiệp vụ Kho (WMS)</li>

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:inbox-in-outline' className='menu-icon' />
                <span>Quản lý Nhận hàng</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/inbound-draft' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Nháp Nhận Hàng
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/putaway' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Nhiệm vụ Cất hàng
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:inbox-out-outline' className='menu-icon' />
                <span>Quản lý Xuất hàng</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/sales-orders' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Đơn Hàng Xuất (SO)
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
              </ul>
            </li>

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='solar:box-outline' className='menu-icon' />
                <span>Tồn kho & Chất lượng</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/inventory' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-primary-600 w-auto' /> Tồn kho khả dụng
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/ledger' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-warning-main w-auto' /> Sổ cái (Ledger)
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/cycle-count' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <i className='ri-circle-fill circle-icon text-info-main w-auto' /> Kiểm kê định kỳ
                  </NavLink>
                </li>
              </ul>
            </li>
          `;

  content = content.slice(0, startIndex) + newMenu + content.slice(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Sidebar updated successfully.');
} else {
  console.log('Could not find start or end tags.');
}
