// Utility functions for the portfolio site

// DOM utilities
export const dom = {
  // Query selector with error handling
  select(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.error(`Invalid selector: ${selector}`, error);
      return null;
    }
  },

  selectAll(selector, context = document) {
    try {
      return Array.from(context.querySelectorAll(selector));
    } catch (error) {
      console.error(`Invalid selector: ${selector}`, error);
      return [];
    }
  },

  // Create element with attributes and children
  create(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

    return element;
  },

  // Add event listener with cleanup
  on(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  },

  // Debounced event listener
  onDebounced(element, event, handler, delay = 250, options = {}) {
    let timeoutId;
    const debouncedHandler = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handler(e), delay);
    };
    return this.on(element, event, debouncedHandler, options);
  }
};

// Form utilities
export const forms = {
  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Get form data as object
  getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  },

  // Validate required fields
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
  },

  // Show field error
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    field.classList.add('border-red-500', 'focus:border-red-500');
    field.setAttribute('aria-invalid', 'true');

    const errorElement = dom.create('div', {
      className: 'mt-1 text-sm text-red-600',
      textContent: message,
      id: `${field.name || field.id}-error`
    });

    field.setAttribute('aria-describedby', errorElement.id);
    field.parentNode.appendChild(errorElement);
  },

  // Clear field error
  clearFieldError(field) {
    field.classList.remove('border-red-500', 'focus:border-red-500');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');

    const existingError = field.parentNode.querySelector('.text-red-600');
    if (existingError) {
      existingError.remove();
    }
  }
};

// API utilities
export const api = {
  // Make HTTP request
  async request(url, options = {}) {
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // Send contact form
  async sendContactForm(formData) {
    return this.request('https://api.gaviota.fr/mail', {
      method: 'POST',
      headers: {
        'Authorization': 'API_KEY_JEROME',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'jerome.le.champion@gmail.com',
        subject: `New Contact from Portfolio - ${formData.subject || 'General Inquiry'}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject || 'General Inquiry'}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}

---
Sent from: ${window.location.origin}
IP: ${formData.ip || 'Unknown'}
User Agent: ${navigator.userAgent}
        `.trim()
      })
    });
  }
};

// Storage utilities
export const storage = {
  // Local storage with JSON support
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} to localStorage:`, error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
};

// URL utilities
export const url = {
  // Get query parameters
  getParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  },

  // Update URL without page reload
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
};

// Analytics utilities
export const analytics = {
  // Track event (placeholder for Google Analytics or similar)
  trackEvent(category, action, label = '', value = 0) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    } else {
      console.log('Analytics event:', { category, action, label, value });
    }
  },

  // Track page view
  trackPageView(page = window.location.pathname) {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page
      });
    } else {
      console.log('Page view:', page);
    }
  }
};

// Performance utilities
export const perf = {
  // Debounce function
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

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Lazy load images
  lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Accessibility utilities
export const a11y = {
  // Trap focus within element
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    firstElement.focus();

    return () => element.removeEventListener('keydown', handleTabKey);
  },

  // Announce to screen readers
  announce(message, priority = 'polite') {
    const announcer = dom.create('div', {
      'aria-live': priority,
      'aria-atomic': 'true',
      className: 'sr-only'
    });

    document.body.appendChild(announcer);
    announcer.textContent = message;

    setTimeout(() => announcer.remove(), 1000);
  }
};

// Export all utilities as default object
export default {
  dom,
  forms,
  api,
  storage,
  url,
  analytics,
  perf,
  a11y
};