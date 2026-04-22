import {test, expect} from '@playwright/test';
import { InventoryPage } from '../Pages/inventory.page'; 
import { LoginPage } from '../Pages/login.page';



/*test.beforeEach(async ({ page }) => { //Este beforeech es para usar antes de integrar un POM
    // LOGIN
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/); //Validacion del login      
});*/


test('Should add a product to the cart successfully', async ({ page }) => {
    // ADD TO CART
    const loginPage = new LoginPage(page); 
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); // Validacion del carrito
});

test('Should remove a product from the cart successfully', async ({ page }) => {
    // ADD TO CART
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); // Validacion del carrito

    // REMOVE FROM CART
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible(); // Validacion del carrito vacío
});

test('Should add multiple products to the cart successfully', async ({ page }) => {
    // ADD TO CART
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click(); 
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3'); // Validacion del carrito
    
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); // Validacion del carrito

});