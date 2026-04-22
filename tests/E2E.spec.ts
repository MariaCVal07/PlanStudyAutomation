import {test, expect} from '@playwright/test';
import { InventoryPage } from '../Pages/inventory.page';
import { LoginPage } from '../Pages/login.page';
import { CheckoutPage } from '../Pages/checkout.page';


test('Should complete purchase flow successfully', async ({ page }) => {

  // Se deben crear los objetos de las páginas necesarias para el flujo
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  // LOGIN
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');


  // ADD TO CART
  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();

  
  // CHECKOUT
  await checkoutPage.startCheckout();
  await expect(page).toHaveURL(/checkout-step-one.html/); // Validacion del checkout step 1 

  await checkoutPage.fillCheckoutForm('Test', 'User', '12345');

  await checkoutPage.continueCheckout();
  await expect(page).toHaveURL(/checkout-step-two.html/); // Validacion del checkout step 2
  await expect(page.getByText('Checkout: Overview')).toBeVisible(); //Validar resumen

  await checkoutPage.finishCheckout();
  // ASSERTION FINAL
  await expect(page).toHaveURL(/checkout-complete.html/);
  await expect(page.getByText('Thank you for your order')).toBeVisible();
});