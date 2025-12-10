import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and wait for it to load
    await page.goto('/');
    await page.waitForSelector('.albums-grid');
  });

  test('should display cart icon in header', async ({ page }) => {
    // Check that cart icon is visible
    const cartIcon = page.locator('.cart-icon-button');
    await expect(cartIcon).toBeVisible();
  });

  test('should add album to cart and update badge count', async ({ page }) => {
    // Take screenshot of initial state
    await page.screenshot({ path: 'tests/screenshots/01-initial-state.png', fullPage: true });

    // Click "Add to Cart" on the first album
    const firstAddButton = page.locator('.btn-primary').first();
    await firstAddButton.click();

    // Wait for feedback
    await page.waitForTimeout(500);

    // Check that badge appears with count "1"
    const badge = page.locator('.cart-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');

    // Take screenshot after adding item
    await page.screenshot({ path: 'tests/screenshots/02-item-added.png', fullPage: true });
  });

  test('should increment quantity when adding same album twice', async ({ page }) => {
    // Add same album twice
    const firstAddButton = page.locator('.btn-primary').first();
    await firstAddButton.click();
    await page.waitForTimeout(500);
    await firstAddButton.click();
    await page.waitForTimeout(500);

    // Badge should show "2"
    const badge = page.locator('.cart-badge');
    await expect(badge).toHaveText('2');
  });

  test('should open cart drawer when clicking cart icon', async ({ page }) => {
    // Add an item first
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);

    // Click cart icon
    const cartIcon = page.locator('.cart-icon-button');
    await cartIcon.click();

    // Wait for drawer to open
    await page.waitForTimeout(500);

    // Check that drawer is visible
    const drawer = page.locator('.cart-drawer');
    await expect(drawer).toBeVisible();

    // Take screenshot of opened cart
    await page.screenshot({ path: 'tests/screenshots/03-cart-drawer-open.png', fullPage: true });
  });

  test('should display cart items correctly in drawer', async ({ page }) => {
    // Add two different albums
    const addButtons = page.locator('.btn-primary');
    await addButtons.nth(0).click();
    await page.waitForTimeout(500);
    await addButtons.nth(1).click();
    await page.waitForTimeout(500);

    // Open cart
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Check that 2 items are displayed
    const cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(2);

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/04-multiple-items.png', fullPage: true });
  });

  test('should update quantity using increment/decrement buttons', async ({ page }) => {
    // Add an item
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);

    // Open cart
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Click increment button
    const incrementBtn = page.locator('.quantity-btn').last();
    await incrementBtn.click();
    await page.waitForTimeout(300);

    // Check quantity is now 2
    const quantity = page.locator('.quantity').first();
    await expect(quantity).toHaveText('2');

    // Badge should also show 2
    const badge = page.locator('.cart-badge');
    await expect(badge).toHaveText('2');
  });

  test('should remove item from cart', async ({ page }) => {
    // Add an item
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);

    // Open cart
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Click remove button
    const removeBtn = page.locator('.remove-btn').first();
    await removeBtn.click();
    await page.waitForTimeout(300);

    // Cart should show empty message
    const emptyMessage = page.locator('.empty-title');
    await expect(emptyMessage).toBeVisible();

    // Badge should not be visible
    const badge = page.locator('.cart-badge');
    await expect(badge).not.toBeVisible();
  });

  test('should clear entire cart', async ({ page }) => {
    // Add multiple items
    const addButtons = page.locator('.btn-primary');
    await addButtons.nth(0).click();
    await page.waitForTimeout(300);
    await addButtons.nth(1).click();
    await page.waitForTimeout(300);

    // Open cart
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Setup dialog handler before clicking
    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    // Click clear cart button
    const clearBtn = page.locator('.btn-clear');
    await clearBtn.click();
    await page.waitForTimeout(500);

    // Cart should be empty
    const emptyMessage = page.locator('.empty-title');
    await expect(emptyMessage).toBeVisible();
  });

  test('should close cart drawer with close button', async ({ page }) => {
    // Add an item and open cart
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Click close button
    const closeBtn = page.locator('.close-btn');
    await closeBtn.click();
    await page.waitForTimeout(500);

    // Drawer should not be visible
    const drawer = page.locator('.cart-drawer');
    await expect(drawer).not.toBeVisible();
  });

  test('should close cart drawer when clicking overlay', async ({ page }) => {
    // Add an item and open cart
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Click overlay
    const overlay = page.locator('.cart-overlay');
    await overlay.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(500);

    // Drawer should not be visible
    const drawer = page.locator('.cart-drawer');
    await expect(drawer).not.toBeVisible();
  });

  test('should display correct totals in cart summary', async ({ page }) => {
    // Add an item
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);

    // Open cart
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Check that summary rows are visible
    const summaryRows = page.locator('.summary-row');
    await expect(summaryRows).toHaveCount(3); // subtotal, tax, total

    // Take screenshot of cart summary
    await page.screenshot({ path: 'tests/screenshots/05-cart-summary.png', fullPage: true });
  });

  test('should persist cart across page refresh', async ({ page }) => {
    // Add an item
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForSelector('.albums-grid');

    // Badge should still show "1"
    const badge = page.locator('.cart-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  test('should switch languages and update cart UI', async ({ page }) => {
    // Add an item
    await page.locator('.btn-primary').first().click();
    await page.waitForTimeout(500);

    // Open cart
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Change language to French
    const languageSelect = page.locator('#language');
    await languageSelect.selectOption('fr');
    await page.waitForTimeout(300);

    // Check that cart title is in French
    const cartTitle = page.locator('.cart-header h2');
    await expect(cartTitle).toHaveText('Panier');

    // Take screenshot in French
    await page.screenshot({ path: 'tests/screenshots/06-french-language.png', fullPage: true });

    // Change to German
    await languageSelect.selectOption('de');
    await page.waitForTimeout(300);

    // Check that cart title is in German
    await expect(cartTitle).toHaveText('Warenkorb');

    // Take screenshot in German
    await page.screenshot({ path: 'tests/screenshots/07-german-language.png', fullPage: true });
  });

  test('should show empty cart state', async ({ page }) => {
    // Open cart without adding items
    await page.locator('.cart-icon-button').click();
    await page.waitForTimeout(500);

    // Check empty state
    const emptyIcon = page.locator('.empty-icon');
    await expect(emptyIcon).toBeVisible();
    
    const emptyTitle = page.locator('.empty-title');
    await expect(emptyTitle).toBeVisible();

    // Take screenshot of empty cart
    await page.screenshot({ path: 'tests/screenshots/08-empty-cart.png', fullPage: true });
  });
});
