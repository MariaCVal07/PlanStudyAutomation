import { Page } from "@playwright/test";

export class InventoryPage {
    constructor(public page: Page) {}

    async addBackpackToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async goToCart() { 
        await this.page.locator('.shopping_cart_link').click();

    }
}