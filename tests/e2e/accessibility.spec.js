import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have any automatically detectable accessibility issues on projects page', async ({ page }) => {
    await page.goto('/projets.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have any automatically detectable accessibility issues on experience page', async ({ page }) => {
    await page.goto('/experience.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have any automatically detectable accessibility issues on contact page', async ({ page }) => {
    await page.goto('/contact.html');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check that there is exactly one h1
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check that headings are properly nested (h2 after h1, h3 after h2, etc.)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    let currentLevel = 0;
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      
      if (currentLevel === 0) {
        // First heading should be h1
        expect(level).toBe(1);
      } else {
        // Subsequent headings should not skip levels
        expect(level).toBeLessThanOrEqual(currentLevel + 1);
      }
      
      currentLevel = level;
    }
  });

  test('should have skip links for keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check that skip link exists
    const skipLink = page.locator('a[href="#main"]');
    await expect(skipLink).toHaveCount.greaterThanOrEqual(1);
    
    // Skip link should contain appropriate text
    await expect(skipLink).toContainText(/contenu principal|main content/i);
  });

  test('should have proper form labels and associations', async ({ page }) => {
    await page.goto('/contact.html');
    
    // Check that all form inputs have associated labels
    const formInputs = page.locator('input, select, textarea');
    const inputCount = await formInputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = formInputs.nth(i);
      const inputId = await input.getAttribute('id');
      const inputName = await input.getAttribute('name');
      
      // Skip honeypot and hidden fields
      const inputType = await input.getAttribute('type');
      if (inputType === 'hidden' || inputName === '_honeypot') {
        continue;
      }
      
      if (inputId) {
        // Check for associated label
        const label = page.locator(`label[for="${inputId}"]`);
        await expect(label).toHaveCount(1);
      }
    }
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing through a few elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const currentFocus = page.locator(':focus');
      await expect(currentFocus).toBeVisible();
    }
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation has proper role
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check that buttons have proper labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      
      // Button should have either text content or aria-label
      const hasTextContent = await button.evaluate(el => el.textContent.trim().length > 0);
      const hasAriaLabel = await button.getAttribute('aria-label');
      
      expect(hasTextContent || hasAriaLabel).toBeTruthy();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Axe will check color contrast automatically
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();
    
    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(colorContrastViolations).toEqual([]);
  });

  test('should work with screen reader simulation', async ({ page }) => {
    await page.goto('/');
    
    // Check that main landmark exists
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check that page has a proper title
    await expect(page).toHaveTitle(/Jérôme Le Champion/);
    
    // Check that headings provide proper structure
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText(/Lead Développeur|Full-Stack/);
  });
});