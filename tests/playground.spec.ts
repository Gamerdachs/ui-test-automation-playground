import { test, expect } from '@playwright/test';

test.describe('UI Test Automation Playground', () => {
  test('Overlapped Element', async ({ page }) => {
    await page.goto('/overlapped');

    const nameInput = page.locator('#name');
    await nameInput.scrollIntoViewIfNeeded();
    await nameInput.click();
    await nameInput.pressSequentially('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
  });

  test('AJAX Data', async ({ page }) => {
    await page.goto('/ajax');

    await page.click('#ajaxButton');
    const ajaxLabel = page.locator('.bg-success');
    await expect(ajaxLabel).toBeVisible({ timeout: 20000 });
    await expect(ajaxLabel).toHaveText('Data loaded with AJAX get request.');
  });

  test('Visibility', async ({ page }) => {
    await page.goto('/visibility');

    await page.click('#hideButton');

    await expect(page.locator('#removedButton')).not.toBeAttached();
    await expect(page.locator('#zeroWidthButton')).toBeHidden();
    await expect(page.locator('#overlappedButton')).toBeVisible();
    await expect(page.locator('#hidingLayer')).toBeVisible();
    await expect(page.locator('#transparentButton')).toHaveCSS('opacity', '0');
    await expect(page.locator('#invisibleButton')).toBeHidden();
    await expect(page.locator('#notdisplayedButton')).toBeHidden();
    await expect(page.locator('#offscreenButton')).toHaveClass(/offscreen/);
  });

  test('Dynamic Table', async ({ page }) => {
    await page.goto('/dynamictable');

    const columnHeaders = page.locator('span[role="columnheader"]');
    const columnCount = await columnHeaders.count();
    let cpuColumnIndex = -1;
    for (let i = 0; i < columnCount; i++) {
      if ((await columnHeaders.nth(i).innerText()) === 'CPU') {
        cpuColumnIndex = i;
        break;
      }
    }

    const rows = page.locator('div[role="row"]');
    const rowCount = await rows.count();
    let chromeCPU = '';
    for (let i = 1; i < rowCount; i++) {
      const row = rows.nth(i);
      const cells = row.locator('span[role="cell"]');
      if ((await cells.first().innerText()) === 'Chrome') {
        chromeCPU = await cells.nth(cpuColumnIndex).innerText();
        break;
      }
    }

    const yellowLabel = page.locator('.bg-warning');
    await expect(yellowLabel).toContainText(chromeCPU);
  });

  test('Sample App', async ({ page }) => {
    await page.goto('/sampleapp');

    const username = 'TestUser';
    await page.fill('input[name="UserName"]', username);
    await page.fill('input[name="Password"]', 'wrongpwd');
    await page.click('#login');

    await expect(page.locator('#loginstatus')).toHaveText(
      'Invalid username/password'
    );

    await page.fill('input[name="UserName"]', username);
    await page.fill('input[name="Password"]', 'pwd');
    await page.click('#login');

    await expect(page.locator('#loginstatus')).toHaveText(
      `Welcome, ${username}!`
    );

    // Logout
    await page.click('#login');
    await expect(page.locator('#loginstatus')).toHaveText('User logged out.');
  });

  test('Text Input', async ({ page }) => {
    await page.goto('/textinput');

    const newName = 'Playwright Button';
    await page.fill('#newButtonName', newName);
    await page.click('#updatingButton');

    await expect(page.locator('#updatingButton')).toHaveText(newName);
  });

  test('Progress Bar', async ({ page }) => {
    await page.goto('/progressbar');

    await page.click('#startButton');

    const progressBar = page.locator('#progressBar');
    await expect(async () => {
      const text = await progressBar.innerText();
      const percentage = parseInt(text.replace('%', ''));
      expect(percentage).toBeGreaterThanOrEqual(75);
    }).toPass({ timeout: 30000 });

    await page.click('#stopButton');

    const result = await page.locator('#result').innerText();
    console.log(`Final Progress Result: ${result}`);

    const percentageText = await progressBar.innerText();
    const percentage = parseInt(percentageText.replace('%', ''));
    expect(percentage).toBeGreaterThanOrEqual(75);
  });
});
