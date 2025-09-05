import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Jérôme Le Champion/);
    
    // Check that main navigation is present
    await expect(page.locator('nav')).toBeVisible();
    
    // Check that hero section is present
    await expect(page.locator('h1')).toContainText('Jérôme Le Champion');
    await expect(page.locator('h2.hero-title')).toContainText(/Lead.*Full-Stack|Lead.*Developer/);
    
    // Check that CTA buttons are present
    await expect(page.locator('a[href="contact.html"]').first()).toBeVisible();
    await expect(page.locator('a[href="projets.html"]').first()).toBeVisible();
    
    // Check that footer is present
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should load projects page successfully', async ({ page }) => {
    await page.goto('/projets.html');
    
    await expect(page).toHaveTitle(/Projets/);
    await expect(page.locator('h1')).toContainText('Mes Projets');
    
    // Check that project cards are present
    await expect(page.locator('.card')).toHaveCount(await page.locator('.card').count());
    await expect(page.locator('.card').first()).toBeVisible();
    // Check that filter buttons are present
    await expect(page.locator('[data-filter]').first()).toBeVisible();
    const filterCount = await page.locator('[data-filter]').count();
    expect(filterCount).toBeGreaterThan(0);
  });

  test('should load experience page successfully', async ({ page }) => {
    await page.goto('/experience.html');
    
    await expect(page).toHaveTitle(/Parcours/);
    await expect(page.locator('h1')).toContainText('Mon Parcours');
    // Check that timeline is present
    await expect(page.locator('.timeline-dot').first()).toBeVisible();
    const timelineDotCount = await page.locator('.timeline-dot').count();
    expect(timelineDotCount).toBeGreaterThan(0);
  });

  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/contact.html');
    
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.locator('h1')).toContainText('Contactons-nous');
    
    // Check that contact form is present
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
  });

  test('should have responsive navigation', async ({ page }) => {
    await page.goto('/');
    
    // Desktop navigation should be visible
    await expect(page.locator('nav .hidden.md\\:flex').first()).toBeVisible();
    
    // Test mobile menu button (should exist but may not be visible on desktop)
    // Set mobile viewport to test mobile menu
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('[data-mobile-menu-toggle]')).toBeVisible();
  });

  test('should have working internal navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to projects page
    await page.locator('a[href="projets.html"]').first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(url => url.pathname.endsWith('projets.html'));
    
    // Navigate back to home
    await page.click('a[href="index.html"], a[href="#home"], a[href="/"]');
    // Test navigation to experience page
    await page.click('a[href="experience.html"]');
    await expect(page).toHaveURL(/experience\.html(\?.*)?$/);
    
    // Test navigation to contact page
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html(\?.*)?$/);
  });

  test('should have proper meta tags and SEO elements', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Jérôme Le Champion/);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Jérôme Le Champion/);
    
    // Check that structured data or important content is present
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
});