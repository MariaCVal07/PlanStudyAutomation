import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // LOGIN
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/); //Validacion del login      
   
});

test ('Should complete purchase flow successfully', async ({ page }) => {

    // ADD TO CART
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    
    // 🟢 VALIDACIÓN EN CARRITO (ANTES DE CHECKOUT)
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    // CHECKOUT
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one.html/); // Validacion de la página de checkout

    await page.getByPlaceholder('First Name').fill('Test');
    await page.getByPlaceholder('Last Name').fill('User');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two.html/); // Validacion del checkout step 2

    await expect(page.getByText('Checkout: Overview')).toBeVisible(); //Validar resumen

    await page.getByRole('button', { name: 'Finish' }).click(); 
    
    // ASSERTION FINAL
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText('Thank you for your order')).toBeVisible();
    
});

test('should allow checkout flow even with empty cart', async ({ page }) => {
    // ir al carrito vacío
    await page.locator('.shopping_cart_link').click();

    // validar carrito vacío correctamente
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    // iniciar checkout
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // intentar continuar sin datos
    await page.getByRole('button', { name: 'Continue' }).click();

    // ✅ aquí está el verdadero negativo
    await expect(page.getByText('Error: First Name is required')).toBeVisible();

});