import {test, expect} from '@playwright/test';
import { InventoryPage } from '../Pages/inventory.page'; 
import { LoginPage } from '../Pages/login.page';


test.beforeEach(async ({ page }) => { //Este beforeech es para usar antes de integrar un POM
    // LOGIN
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
});   


test('Should add a product to the cart successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // ADD TO CART
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(1); // Validacion del carrito
});

test('Should remove a product from the cart successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // ADD TO CART
    await inventoryPage.addBackpackToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1'); // Validacion del carrito

    // REMOVE FROM CART
    await inventoryPage.goToCart();
    await inventoryPage.removeBackpackFromCart();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0); // Validacion del carrito vacío
});

test('Should add multiple products to the cart successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // ADD TO CART
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.addBoltTShirtToCart(); 

    await expect(page.locator('.shopping_cart_badge')).toHaveText('3'); // Validacion del carrito
    
    // REMOVE ONE PRODUCT FROM CART
    await inventoryPage.goToCart();
    await inventoryPage.removeBikeLightFromCart();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('2'); // Validacion del carrito

});