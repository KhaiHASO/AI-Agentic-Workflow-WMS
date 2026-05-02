import { test, expect } from '@playwright/test';

test('mobile map interaction test', async ({ page }) => {
  // 1. Navigate to the dashboard home
  await page.goto('/');
  
  // 2. Click on a rack (A1-01) on the map
  const rack = page.locator('.map-rack-group').first();
  await expect(rack).toBeVisible();
  
  // Force click because the map component might have complex overlay logic
  await rack.click({ force: true });
  
  // 3. Check if the popover appears (Bottom Sheet on mobile)
  const popover = page.locator('.rack-popover');
  await expect(popover).toBeVisible();
  
  // 4. Test Closing via button
  await page.locator('.btn-close').click();
  await expect(popover).not.toBeVisible();
});
