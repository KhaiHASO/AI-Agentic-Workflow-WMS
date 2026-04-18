import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const baseUrl = 'http://localhost:3000';
  
  console.log('🚀 KHỞI ĐỘNG KIỂM THỬ TOÀN DIỆN WMS PROTOTYPE');
  
  const testResults = [];

  const runTest = async (name, fn) => {
    console.log(`\n🔍 Đang kiểm tra: ${name}...`);
    try {
      await fn();
      console.log(`✅ ${name}: THÀNH CÔNG`);
      testResults.push({ name, status: 'PASS' });
    } catch (error) {
      console.error(`❌ ${name}: THẤT BẠI - ${error.message}`);
      testResults.push({ name, status: 'FAIL', error: error.message });
      // Chụp ảnh lỗi nếu cần
      await page.screenshot({ path: `error-${name.replace(/\s+/g, '-')}.png` });
    }
  };

  // 1. LOGIN
  await runTest('Luồng Đăng nhập', async () => {
    await page.goto(`${baseUrl}/auth/login`);
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseUrl}/dashboard`);
  });

  // 2. DASHBOARD
  await runTest('Giao diện Dashboard', async () => {
    await page.goto(`${baseUrl}/dashboard`);
    const title = await page.locator('h1:has-text("DASHBOARD")').innerText();
    if (!title.includes('DASHBOARD')) throw new Error('Không thấy tiêu đề Dashboard');
    
    // Kiểm tra các thẻ KPI
    await page.waitForSelector('.text-default-400');
    const kpiCount = await page.locator('.text-default-400').count();
    if (kpiCount < 4) throw new Error('Thiếu các thẻ KPI');
  });

  // 3. INBOUND FLOW
  await runTest('Luồng Inbound (PO -> Workbench)', async () => {
    await page.goto(`${baseUrl}/inbound/master-receipts`);
    await page.waitForSelector('button:has-text("Mở")');
    await page.locator('button:has-text("Mở")').first().click();
    await page.waitForURL('**/inbound/master-receipts/**');
    
    await page.waitForSelector('button:has-text("Bắt đầu scan")');
    await page.click('button:has-text("Bắt đầu scan")');
    await page.waitForURL('**/inbound/drafts/**');
    
    // Giả lập scan
    const scanInput = page.locator('input[placeholder*="QUÉT MÃ VẠCH"]');
    await scanInput.waitFor({ state: 'visible' });
    await scanInput.fill('MILK001');
    await scanInput.press('Enter');
    
    await page.waitForSelector('text=Đã nhận +1 Sữa tươi', { timeout: 5000 });
  });

  // 4. OUTBOUND FLOW
  await runTest('Luồng Outbound (Waves -> Picking)', async () => {
    await page.goto(`${baseUrl}/outbound/waves`);
    await page.waitForSelector('button:has-text("Chi tiết")');
    await page.locator('button:has-text("Chi tiết")').first().click();
    await page.waitForURL('**/outbound/waves/**');
    
    await page.waitForSelector('button:has-text("Mở Picking")');
    await page.click('button:has-text("Mở Picking")');
    await page.waitForURL('**/outbound/pick-tasks/**');
    
    // Kiểm tra các bước Picking
    await page.waitForSelector('text=BƯỚC 1: ĐẾN VỊ TRÍ');
  });

  // 5. INVENTORY CONSOLE
  await runTest('Inventory Control Console', async () => {
    await page.goto(`${baseUrl}/inventory/on-hand`);
    await page.locator('tr').nth(1).click(); // Click dòng đầu tiên
    const drawerTitle = await page.locator('text=Chi tiết tồn kho').isVisible();
    if (!drawerTitle) throw new Error('Không mở được side-drawer chi tiết tồn kho');
  });

  // 6. INTEGRATION CONSOLE
  await runTest('Integration Console', async () => {
    await page.goto(`${baseUrl}/integration/messages`);
    const statusBadge = await page.locator('text=CONNECTED').isVisible();
    if (!statusBadge) throw new Error('Không thấy trạng thái kết nối ERP');
  });

  // 7. COUNTING WORKBENCH
  await runTest('Cycle Count Workbench', async () => {
    await page.goto(`${baseUrl}/counting/sessions/cc-1`);
    await page.locator('tr').nth(1).click();
    const countInput = await page.locator('input[type="number"]').isVisible();
    if (!countInput) throw new Error('Không thấy ô nhập số đếm kiểm kê');
  });

  console.log('\n📊 TỔNG HỢP KẾT QUẢ KIỂM THỬ:');
  console.table(testResults);

  const hasFailure = testResults.some(r => r.status === 'FAIL');
  
  await browser.close();
  
  if (hasFailure) {
    process.exit(1);
  } else {
    console.log('\n🌟 TẤT CẢ CÁC LUỒNG NGHIỆP VỤ HOẠT ĐỘNG HOÀN HẢO!');
    process.exit(0);
  }
})();
