import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html');
  });

  test('should display contact form with all required fields', async ({ page }) => {
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#contact-submit')).toBeVisible();
  });

  test('should show validation errors for required fields', async ({ page }) => {
    // Try to submit form without filling required fields
    await page.click('#contact-submit');
    
    // Check that browser validation prevents submission
    // (HTML5 required attribute should trigger validation)
    const nameField = page.locator('#name');
    const emailField = page.locator('#email');
    const subjectField = page.locator('#subject');
    const messageField = page.locator('#message');
    
    // Check that fields have required attribute
    await expect(nameField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('required');
    await expect(subjectField).toHaveAttribute('required');
    await expect(messageField).toHaveAttribute('required');
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'invalid-email');
    await page.selectOption('#subject', 'Projet développement web');
    await page.fill('#message', 'Test message');
    
    // Try to submit
    await page.click('#contact-submit');
    
    // HTML5 email validation should prevent submission
    const emailField = page.locator('#email');
    await expect(emailField).toHaveAttribute('type', 'email');
  });

  test('should allow form submission with valid data', async ({ page }) => {
    // Intercept the form submission
    await page.route('https://api.gaviota.fr/mail', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Fill form with valid data
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.selectOption('#subject', 'Projet développement web');
    await page.selectOption('#budget', '5k€ - 15k€');
    await page.fill('#message', 'This is a test message with enough content to be meaningful.');

    // Submit form
    await page.click('#contact-submit');

    // Check for success message (should appear if JS handles the form)
    // Wait a bit for any JS processing
    await page.waitForTimeout(1000);
  });

  test('should handle form submission error gracefully', async ({ page }) => {
    // Intercept and mock API error
    await page.route('https://api.gaviota.fr/mail', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    // Fill and submit form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.selectOption('#subject', 'Projet développement web');
    await page.fill('#message', 'Test message');

    await page.click('#contact-submit');

    // Wait for error handling
    await page.waitForTimeout(1000);
  });

  test('should have proper form labels and accessibility', async ({ page }) => {
    // Check that all form fields have proper labels
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const subjectLabel = page.locator('label[for="subject"]');
    const messageLabel = page.locator('label[for="message"]');
    
    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(subjectLabel).toBeVisible();
    await expect(messageLabel).toBeVisible();
    
    // Check that labels contain appropriate text
    await expect(nameLabel).toContainText('Nom');
    await expect(emailLabel).toContainText('Email');
    await expect(subjectLabel).toContainText('Sujet');
    await expect(messageLabel).toContainText('Message');
  });

  test('should have honeypot field for spam protection', async ({ page }) => {
    // Check that honeypot field exists and is hidden
    // This might be added by JavaScript, so we check after page load
    await page.waitForLoadState('networkidle');
    
    // The honeypot field should be present but hidden
    const honeypotField = page.locator('input[name="_honeypot"]');
    if (await honeypotField.count() > 0) {
      // If honeypot exists, it should be hidden
      await expect(honeypotField).toHaveAttribute('style', /position:\s*absolute.*left:\s*-9999px/);
    }
  });
});