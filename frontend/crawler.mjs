import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('favicon.ico')) {
      errors.push(`Console Error on ${page.url()}: ${msg.text()}`);
    }
  });

  console.log('Visiting login page...');
  const res = await page.goto('http://localhost:3001/en/auth/login');
  if (!res || !res.ok()) {
    console.error(`Login page failed: ${res ? res.status() : 'Unknown'}`);
    await browser.close();
    process.exit(1);
  }

  console.log('Logging in...');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/en/dashboard');
  console.log('Logged in successfully!');

  // Wait a bit for sidebar to render
  await page.waitForTimeout(2000);

  const paths = [
    '/counting/sessions',
    '/dashboard',
    '/dashboard/alerts',
    '/dashboard/integration-health',
    '/inbound/master-receipts',
    '/inbound/purchase-orders',
    '/inbound/putaway-tasks',
    '/inventory/handling-units',
    '/inventory/ledger',
    '/inventory/on-hand',
    '/master-data/items',
    '/outbound/pick-tasks',
    '/outbound/sales-orders',
    '/outbound/shipments',
    '/outbound/waves'
  ];

  const uniqueHrefs = paths.map(p => 'http://localhost:3001/en' + p);
  console.log(`Found ${uniqueHrefs.length} links to test:`, uniqueHrefs);

  let hasErrors = false;

  for (const href of uniqueHrefs) {
    console.log(`Testing ${href}...`);
    try {
      const response = await page.goto(href, { waitUntil: 'load', timeout: 10000 });
      
      if (response && !response.ok()) {
        console.error(`=> ERROR: ${href} returned ${response.status()} (${response.statusText()})`);
        hasErrors = true;
      }
      
      // Wait for React to render
      await page.waitForTimeout(1000);

      // Check for Next.js generic error texts
      const pageText = await page.content();
      if (pageText.includes('Unhandled Runtime Error') || 
          pageText.includes('Application error: a client-side exception has occurred') ||
          pageText.includes('An error occurred on the server') ||
          pageText.includes('404')) { // Simple check, but could have false positives if a page renders '404' string. Let's check title or exact patterns.
        
        // Wait, '404' string might appear. Let's check if the page title contains 404
        const title = await page.title();
        if (title.includes('404')) {
           console.error(`=> ERROR: 404 Not Found on ${href}`);
           hasErrors = true;
        }
      }
    } catch (e) {
      console.error(`=> ERROR: Failed to navigate to ${href}: ${e.message}`);
      hasErrors = true;
    }
  }

  console.log('--- TEST RESULTS ---');
  if (errors.length > 0) {
    console.log(`Found ${errors.length} console errors:`);
    errors.forEach(e => console.log(e));
    hasErrors = true;
  } else {
    console.log('No console errors found!');
  }

  await browser.close();
  
  if (hasErrors) {
    process.exit(1);
  } else {
    console.log('All links are working fine!');
    process.exit(0);
  }
})();
