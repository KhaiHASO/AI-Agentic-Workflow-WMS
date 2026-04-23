import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({
    ...iPhone,
    baseURL: 'http://localhost:3000'
  });

  const pages = [
    '/en/dashboard',
    '/en/inbound/purchase-orders',
    '/en/inbound/master-receipts',
    '/en/inbound/drafts/mr-1',
    '/en/inbound/putaway-tasks',
    '/en/inbound/putaway-tasks/pt-1'
  ];

  console.log("🚀 Bắt đầu Audit giao diện Mobile (iPhone 13)...");

  for (const path of pages) {
    const page = await context.newPage();
    try {
      await page.goto(path, { waitUntil: 'networkidle' });
      
      // Kiểm tra lỗi tràn viền (Horizontal Scroll)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`- Page: ${path} | Scroll Width: ${await page.evaluate(() => document.documentElement.scrollWidth)}px | Window Width: ${await page.evaluate(() => window.innerWidth)}px`);
      
      if (hasHorizontalScroll) {
        console.warn(`  ⚠️ PHÁT HIỆN LỖI: Trang ${path} bị tràn viền ngang trên iPhone!`);
      } else {
        console.log(`  ✅ Trang ${path} hiển thị vừa vặn.`);
      }

    } catch (e) {
      console.error(`  ❌ Lỗi khi truy cập ${path}:`, e.message);
    }
    await page.close();
  }

  await browser.close();
  console.log("🏁 Hoàn tất Audit.");
})();
