import { Page, expect } from "@playwright/test";

export class InventoryPage {
    constructor(public page: Page) {}

    // 🔵 LOCATORS CENTRALIZADOS (mejor práctica)
    backpackButton = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    bikeLightButton = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    boltTShirtButton = this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    cartLink = this.page.locator('.shopping_cart_link');

    removeBackpackButton = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    removeBikeLightButton = this.page.locator('[data-test="remove-sauce-labs-bike-light"]');

    cartBadge = this.page.locator('.shopping_cart_badge');


    // 🟢 VALIDACIÓN CLAVE (evita errores en CI)
    async validateInventoryLoaded() {
        await expect(this.page).toHaveURL(/inventory.html/);
        await expect(this.backpackButton).toBeVisible();
    }


    // 🟢 ACCIONES

    async addBackpackToCart() {
        await expect(this.backpackButton).toBeVisible();
        await this.backpackButton.click();
    }

    async addBikeLightToCart() {
        await expect(this.bikeLightButton).toBeVisible();
        await this.bikeLightButton.click();
    }

    async addBoltTShirtToCart() {
        await expect(this.boltTShirtButton).toBeVisible();
        await this.boltTShirtButton.click();
    }

    async goToCart() {
        await expect(this.cartLink).toBeVisible();
        await this.cartLink.click();
    }

    async removeBackpackFromCart() {
        await expect(this.removeBackpackButton).toBeVisible();
        await this.removeBackpackButton.click();
    }

    async removeBikeLightFromCart() {
        await expect(this.removeBikeLightButton).toBeVisible();
        await this.removeBikeLightButton.click();
    }


    // 🟢 VALIDACIONES

    async validateCartCount(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }

    async validateCartEmpty() {
        await expect(this.cartBadge).toHaveCount(0);
    }
}