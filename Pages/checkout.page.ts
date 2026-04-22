import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async startCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async fillCheckoutForm(firstName: string, lastName: string, zip: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
  }

  async continueCheckout() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
}

  async finishCheckout() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
    }
}