import { Page } from "@playwright/test";

export class InventoryPage {
    constructor(public page: Page) {}

    async addBackpackToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }
    async addBikeLightToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    }
    async addBoltTShirtToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    }
    async goToCart() { 
        await this.page.locator('.shopping_cart_link').click();

    }
    async removeBikeLightFromCart() {
        await this.page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    }
    async removeBackpackFromCart() {
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    }   
}