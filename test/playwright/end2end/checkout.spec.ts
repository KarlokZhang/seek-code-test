import { expect, test } from '@playwright/test';

const checkoutPagePath = '/';

test.describe('Checkout page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(checkoutPagePath);
    });

    test('should have a checkout page', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('Shopping Cart Checkout');
    });

    test('should have a customer selector', async ({ page }) => {
        await expect(page.getByText('Select Customer')).toBeVisible();

        // Now check for all options
        await expect(page.getByRole('option', { name: 'Default' })).toBeAttached();
        await expect(page.getByRole('option', { name: 'Axil Coffee Roasters' })).toBeAttached();
        await expect(page.getByRole('option', { name: 'Second Bite' })).toBeAttached();
        await expect(page.getByRole('option', { name: 'Myer' })).toBeAttached();
    });

    test('should be able to select a customer', async ({ page }) => {
        const customerSelector = page.locator('#customer-select');
        await customerSelector.selectOption('Axil Coffee Roasters');
        await expect(customerSelector).toHaveValue('axilCoffeeRoasters');
    });

    test('should have a product section', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 2, name: 'Products' })).toBeVisible();
    });

    test('should have a product section with products', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 3, name: 'Classic Ad' })).toBeVisible();
        await expect(page.getByRole('heading', { level: 3, name: 'Standout Ad' })).toBeVisible();
        await expect(page.getByRole('heading', { level: 3, name: 'Premium Ad' })).toBeVisible();
    });

    test('should have a price summary', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 2, name: 'Summary' })).toBeVisible();
    });

    test('should display the discount message when discount is available', async ({ page }) => {
        const customerSelector = page.locator('#customer-select');
        await customerSelector.selectOption('Myer');
        await expect(customerSelector).toHaveValue('myer');

        await expect(page.getByText('Discount: Buy 5, pay for 4')).toBeVisible();
        await expect(page.getByText('Discount: Special price $389.99')).toBeVisible();
    });

    test('should display the total price after buy 5, pay for 4 discount', async ({ page }) => {
        const customerSelector = page.locator('#customer-select');
        await customerSelector.selectOption('Myer');
        await expect(customerSelector).toHaveValue('myer');

        const addToCartButton = page.getByRole('button', { name: 'Add one Standout Ad' });

        // Add 5 Standout Ads to the cart
        await addToCartButton.click();
        await addToCartButton.click();
        await addToCartButton.click();
        await addToCartButton.click();
        await addToCartButton.click();

        // Check the price summary
        await expect(page.getByText('Original Price: $1614.95')).toBeVisible();
        await expect(page.getByText('You saved: $322.99')).toBeVisible();
        await expect(page.getByText('Total Price: $1291.96')).toBeVisible();
    });

    test('should display the total price after special price discount', async ({ page }) => {
        const customerSelector = page.locator('#customer-select');
        await customerSelector.selectOption('Axil Coffee Roasters');
        await expect(customerSelector).toHaveValue('axilCoffeeRoasters');

        const addToCartButton = page.getByRole('button', { name: 'Add one Standout Ad' });

        // Add 2 Classic Ad to the cart
        await addToCartButton.click();
        await addToCartButton.click();

        // Check the price summary
        await expect(page.getByText('Original Price: $645.98')).toBeVisible();
        await expect(page.getByText('You saved: $46.00')).toBeVisible();
        await expect(page.getByText('Total Price: $599.98')).toBeVisible();
    });
});
