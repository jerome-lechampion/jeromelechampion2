import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@/data': new URL('./data', import.meta.url).pathname,
    },
  },
});