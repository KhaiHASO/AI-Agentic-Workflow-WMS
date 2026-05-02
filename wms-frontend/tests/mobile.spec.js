import { test, expect } from '@playwright/test';

test('mobile navigation and interaction test', async ({ page }) => {
  // 1. Navigate to the mobile home page
  await page.goto('/mobile');
  
  // Check if we are on the mobile home page
  await expect(page.getByText('Trang chủ Scanner')).toBeVisible();
  
  // 2. Click on "Nhập hàng (Inbound)"
  await page.getByText('Nhập hàng (Inbound)').click();
  
  // Check if we are on the Inbound Draft page
  await expect(page.getByText('Quét hàng - Draft MR-001')).toBeVisible();
  
  // 3. Test Scan Input
  const scanInput = page.getByPlaceholder('Chờ quét...');
  await expect(scanInput).toBeVisible();
  await scanInput.fill('893001');
  await page.keyboard.press('Enter');
  
  // Check if success feedback appears
  await expect(page.getByText('Vừa quét:')).toBeVisible();
  await expect(page.getByText('Màng PE 5kg')).toBeVisible();
  
  // 4. Test Navigation to Detail
  await page.getByText('RM-001').first().click();
  await expect(page.getByText('XỬ LÝ NGOẠI LỆ (EXCEPTION)')).toBeVisible();
  
  // 5. Test Split Line Modal
  await page.getByText('Tách dòng (Split Line)').click();
  await expect(page.getByText('Tách dòng nghiệp vụ')).toBeVisible();
  await page.getByRole('button', { name: 'XÁC NHẬN' }).click();
  
  // Modal should close
  await expect(page.getByText('Tách dòng nghiệp vụ')).not.toBeVisible();
});
