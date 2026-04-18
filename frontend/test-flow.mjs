import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('--- TESTING INBOUND FLOW ---');
  
  console.log('1. Logging in...');
  await page.goto('http://localhost:3000/en/auth/login');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/en/dashboard');

  console.log('2. Navigating to Master Receipts list...');
  await page.goto('http://localhost:3000/en/inbound/master-receipts');
  
  console.log('3. Clicking "Mở" button on the first row...');
  // Find the "Mở" button in the table
  const openButton = page.locator('button:has-text("Mở")').first();
  await openButton.click();
  
  await page.waitForTimeout(1000);
  const currentUrl = page.url();
  console.log(`   Current URL after "Mở": ${currentUrl}`);
  
  if (!currentUrl.includes('/inbound/master-receipts/')) {
    console.error('   FAILED: Did not navigate to Master Receipt Detail page');
    process.exit(1);
  }

  console.log('4. Clicking "Bắt đầu scan" button...');
  const scanButton = page.locator('button:has-text("Bắt đầu scan")');
  await scanButton.click();
  
  await page.waitForTimeout(1000);
  const workbenchUrl = page.url();
  console.log(`   Current URL after "Bắt đầu scan": ${workbenchUrl}`);
  
  if (!workbenchUrl.includes('/inbound/drafts/')) {
    console.error('   FAILED: Did not navigate to Receiving Workbench');
    process.exit(1);
  }

  console.log('5. Testing Barcode Scan in Workbench...');
  const scanInput = page.locator('input[placeholder="QUÉT MÃ VẠCH SẢN PHẨM..."]');
  await scanInput.fill('MILK001');
  await scanInput.press('Enter');
  
  await page.waitForTimeout(500);
  const successMessage = await page.locator('text=Đã nhận +1 Sữa tươi Vinamilk 1L').isVisible();
  if (successMessage) {
    console.log('   SUCCESS: Barcode scan processed correctly!');
  } else {
    console.error('   FAILED: Scan result not found');
    process.exit(1);
  }

  console.log('--- FLOW TEST PASSED SUCCESSFULLY ---');
  await browser.close();
  process.exit(0);
})();
