import { test, expect } from '@playwright/test';

test ('Login Funcioinal', async ({ page }) => {
  // 🟡 1. GIVEN
  await page.goto('https://www.saucedemo.com/');

  // 🔵 2. WHEN
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  
  await page.getByRole('button', { name: 'Login' }).click();

  // 🟢 3. THEN
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test ('Login Funcioinal - Negative', async ({ page }) => {
  // 🟡 1. GIVEN
  await page.goto('https://www.saucedemo.com/');

  // 🔵 2. WHEN
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('sauce');
  
  await page.getByRole('button', { name: 'Login' }).click();
  
  // 🟢 3. THEN
  await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test ('Login - campos vacios', async ({ page }) => {
  // 🟡 1. GIVEN
  await page.goto('https://www.saucedemo.com/');

  // 🔵 2. WHEN
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  
  await page.getByRole('button', { name: 'Login' }).click();

  // 🟢 3. THEN
  await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
});