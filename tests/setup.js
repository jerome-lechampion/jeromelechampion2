// Test setup file for Vitest
import { beforeEach, afterEach } from 'vitest';

// Mock DOM if not available
if (typeof window === 'undefined') {
  global.window = {
    location: { pathname: '/', search: '', hostname: 'localhost' },
    history: { pushState: () => {}, replaceState: () => {} },
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    },
    matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
    navigator: { language: 'fr' }
  };
}

// Clean up after each test
afterEach(() => {
  // Clear any global state
  if (typeof document !== 'undefined') {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  }
});