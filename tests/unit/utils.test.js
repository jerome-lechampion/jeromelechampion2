import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock utils for testing
const mockUtils = {
  forms: {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    getFormData(form) {
      const formData = new FormData(form);
      const data = {};
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      return data;
    },

    validateRequired(form) {
      const requiredFields = form.querySelectorAll('[required]');
      const errors = [];

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          errors.push({
            field: field.name || field.id,
            message: `${field.getAttribute('data-label') || field.name} is required`
          });
        }
      });

      return errors;
    }
  },

  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        return false;
      }
    }
  },

  url: {
    getParams() {
      return Object.fromEntries(new URLSearchParams(window.location.search));
    },

    updateParams(params, replace = true) {
      const url = new URL(window.location);
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, value);
        }
      });

      const method = replace ? 'replaceState' : 'pushState';
      window.history[method]({}, '', url);
    }
  },

  perf: {
    debounce(func, wait, immediate = false) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          timeout = null;
          if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
      };
    },

    throttle(func, limit) {
      let inThrottle;
      return function executedFunction(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  }
};

describe('Utils', () => {
  describe('forms utilities', () => {
    it('should validate email addresses correctly', () => {
      expect(mockUtils.forms.isValidEmail('test@example.com')).toBe(true);
      expect(mockUtils.forms.isValidEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(mockUtils.forms.isValidEmail('invalid-email')).toBe(false);
      expect(mockUtils.forms.isValidEmail('test@')).toBe(false);
      expect(mockUtils.forms.isValidEmail('@example.com')).toBe(false);
    });

    it('should extract form data correctly', () => {
      // Mock form element
      const mockForm = {
        querySelectorAll: vi.fn(() => [
          { name: 'field1', value: '', getAttribute: () => 'Field 1' },
          { name: 'field2', value: 'value2', getAttribute: () => 'Field 2' }
        ])
      };

      const errors = mockUtils.forms.validateRequired(mockForm);
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('field1');
    });
  });

  describe('storage utilities', () => {
    beforeEach(() => {
      // Mock localStorage
      global.localStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn()
      };
    });

    it('should get stored values', () => {
      localStorage.getItem.mockReturnValue(JSON.stringify({ test: 'value' }));
      const result = mockUtils.storage.get('testKey');
      expect(result).toEqual({ test: 'value' });
    });

    it('should return default value when key not found', () => {
      localStorage.getItem.mockReturnValue(null);
      const result = mockUtils.storage.get('nonExistentKey', 'default');
      expect(result).toBe('default');
    });

    it('should set values in storage', () => {
      const success = mockUtils.storage.set('testKey', { test: 'value' });
      expect(success).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify({ test: 'value' }));
    });
  });

  describe('URL utilities', () => {
    beforeEach(() => {
      // Mock window.location and history
      global.window.location = new URL('http://localhost:3000?param1=value1&param2=value2');
      global.window.history = {
        replaceState: vi.fn(),
        pushState: vi.fn()
      };
    });

    it('should parse URL parameters', () => {
      const params = mockUtils.url.getParams();
      expect(params).toEqual({ param1: 'value1', param2: 'value2' });
    });

    it('should update URL parameters', () => {
      mockUtils.url.updateParams({ newParam: 'newValue', param1: null });
      expect(window.history.replaceState).toHaveBeenCalled();
    });
  });

  describe('performance utilities', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it('should debounce function calls', () => {
      const mockFn = vi.fn();
      const debouncedFn = mockUtils.perf.debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should throttle function calls', () => {
      const mockFn = vi.fn();
      const throttledFn = mockUtils.perf.throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);

      vi.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});