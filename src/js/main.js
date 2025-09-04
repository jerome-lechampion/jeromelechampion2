// Main application entry point
import i18n from './i18n.js';
import AnimationManager from './animations.js';
import themeManager from './theme.js';
import utils from './utils.js';

class PortfolioApp {
  constructor() {
    this.init();
  }

  async init() {
    try {
      // Initialize core systems
      this.setupNavigation();
      this.setupMobileMenu();
      this.setupContactForm();
      this.setupProjectFilters();
      this.initializeSkillBars();
      this.setupScrollEffects();
      this.setupLazyLoading();
      
      // Initialize analytics
      this.trackPageView();
      
      console.log('Portfolio app initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio app:', error);
    }
  }

  setupNavigation() {
    const nav = utils.dom.select('nav');
    if (!nav) return;

    // Highlight active nav item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = utils.dom.selectAll('nav a[href]');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === 'index.html' && href === '/')) {
        link.classList.add('active');
      }
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
      if (link.getAttribute('href').startsWith('#')) {
        utils.dom.on(link, 'click', (e) => {
          e.preventDefault();
          const target = utils.dom.select(link.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            utils.analytics.trackEvent('Navigation', 'anchor-click', link.getAttribute('href'));
          }
        });
      }
    });
  }

  setupMobileMenu() {
    const menuButton = utils.dom.select('[data-mobile-menu-toggle]');
    const mobileMenu = utils.dom.select('[data-mobile-menu]');
    
    if (!menuButton || !mobileMenu) return;

    let isOpen = false;

    const toggleMenu = () => {
      isOpen = !isOpen;
      
      menuButton.setAttribute('aria-expanded', isOpen.toString());
      mobileMenu.classList.toggle('hidden', !isOpen);
      
      // Toggle hamburger icon
      const bars = menuButton.querySelectorAll('span');
      bars.forEach((bar, index) => {
        if (isOpen) {
          if (index === 0) bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
          if (index === 1) bar.style.opacity = '0';
          if (index === 2) bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
          bar.style.transform = '';
          bar.style.opacity = '';
        }
      });

      // Trap focus when menu is open
      if (isOpen) {
        utils.a11y.trapFocus(mobileMenu);
      }
    };

    utils.dom.on(menuButton, 'click', toggleMenu);

    // Close menu when clicking outside
    utils.dom.on(document, 'click', (e) => {
      if (isOpen && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        toggleMenu();
      }
    });

    // Close menu on escape key
    utils.dom.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu();
      }
    });

    // Close menu when nav link is clicked
    utils.dom.selectAll('[data-mobile-menu] a').forEach(link => {
      utils.dom.on(link, 'click', () => {
        if (isOpen) toggleMenu();
      });
    });
  }

  setupContactForm() {
    const form = utils.dom.select('#contact-form');
    if (!form) return;

    const submitButton = utils.dom.select('#contact-submit', form);
    const statusDiv = utils.dom.select('#form-status', form);

    utils.dom.on(form, 'submit', async (e) => {
      e.preventDefault();
      
      // Clear previous errors
      utils.dom.selectAll('.text-red-600', form).forEach(error => error.remove());
      form.querySelectorAll('[aria-invalid]').forEach(field => {
        utils.forms.clearFieldError(field);
      });

      const formData = utils.forms.getFormData(form);
      
      // Validate form
      const errors = utils.forms.validateRequired(form);
      
      // Additional validation
      if (formData.email && !utils.forms.isValidEmail(formData.email)) {
        errors.push({
          field: 'email',
          message: i18n.get('contact.form.invalidEmail') || 'Please enter a valid email address'
        });
      }

      if (errors.length > 0) {
        errors.forEach(error => {
          const field = form.querySelector(`[name="${error.field}"]`);
          if (field) {
            utils.forms.showFieldError(field, error.message);
          }
        });
        utils.a11y.announce('Please fix the form errors');
        return;
      }

      // Honeypot check (spam protection)
      if (formData._honeypot) {
        console.log('Spam detected');
        return;
      }

      // Show loading state
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = i18n.get('contact.form.sending') || 'Sending...';

      try {
        await utils.api.sendContactForm(formData);
        
        // Success
        if (statusDiv) {
          statusDiv.innerHTML = `
            <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900/50">
              <div class="flex">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800 dark:text-green-200">
                    ${i18n.get('contact.form.success') || 'Message sent successfully!'}
                  </p>
                </div>
              </div>
            </div>
          `;
        }

        form.reset();
        utils.analytics.trackEvent('Contact', 'form-submit', 'success');
        
      } catch (error) {
        console.error('Form submission error:', error);
        
        if (statusDiv) {
          statusDiv.innerHTML = `
            <div class="rounded-lg bg-red-50 p-4 dark:bg-red-900/50">
              <div class="flex">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <div class="ml-3">
                  <p class="text-sm font-medium text-red-800 dark:text-red-200">
                    ${i18n.get('contact.form.error') || 'Error sending message. Please try again.'}
                  </p>
                </div>
              </div>
            </div>
          `;
        }
        
        utils.analytics.trackEvent('Contact', 'form-submit', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });

    // Add honeypot field for spam protection
    const honeypot = utils.dom.create('input', {
      type: 'text',
      name: '_honeypot',
      style: 'position: absolute; left: -9999px; visibility: hidden;',
      tabindex: '-1',
      'aria-hidden': 'true'
    });
    form.appendChild(honeypot);
  }

  setupProjectFilters() {
    const filterButtons = utils.dom.selectAll('[data-filter]');
    const projectCards = utils.dom.selectAll('[data-project]');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
      utils.dom.on(button, 'click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          const tags = card.getAttribute('data-project').split(',');
          const shouldShow = filter === 'all' || tags.includes(filter);
          
          card.style.display = shouldShow ? 'block' : 'none';
          
          if (shouldShow) {
            card.style.animation = 'fadeIn 0.5s ease-in-out';
          }
        });

        utils.analytics.trackEvent('Projects', 'filter', filter);
      });
    });
  }

  initializeSkillBars() {
    const skillBars = utils.dom.selectAll('[data-skill-level]');
    
    if (skillBars.length === 0) return;

    const animateSkillBar = (bar) => {
      const level = parseInt(bar.getAttribute('data-skill-level'));
      const progressBar = bar.querySelector('.progress-fill');
      
      if (progressBar) {
        progressBar.style.width = `${level}%`;
        progressBar.style.transition = 'width 1.5s ease-out';
      }
    };

    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => animateSkillBar(entry.target), 200);
          observer.unobserve(entry.target);
        }
      });
    });

    skillBars.forEach(bar => observer.observe(bar));
  }

  setupScrollEffects() {
    // Back to top button
    const backToTopButton = utils.dom.select('#back-to-top');
    
    if (backToTopButton) {
      const toggleBackToTop = utils.perf.throttle(() => {
        const shouldShow = window.scrollY > 500;
        backToTopButton.classList.toggle('opacity-100', shouldShow);
        backToTopButton.classList.toggle('opacity-0', !shouldShow);
        backToTopButton.classList.toggle('pointer-events-auto', shouldShow);
        backToTopButton.classList.toggle('pointer-events-none', !shouldShow);
      }, 100);

      utils.dom.on(window, 'scroll', toggleBackToTop);
      
      utils.dom.on(backToTopButton, 'click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        utils.analytics.trackEvent('Navigation', 'back-to-top');
      });
    }

    // Navbar background on scroll
    const navbar = utils.dom.select('nav');
    if (navbar) {
      const toggleNavbarBg = utils.perf.throttle(() => {
        const shouldAddBg = window.scrollY > 50;
        navbar.classList.toggle('bg-white/90', shouldAddBg);
        navbar.classList.toggle('backdrop-blur-sm', shouldAddBg);
        navbar.classList.toggle('border-b', shouldAddBg);
        navbar.classList.toggle('border-gray-200', shouldAddBg);
      }, 100);

      utils.dom.on(window, 'scroll', toggleNavbarBg);
    }
  }

  setupLazyLoading() {
    utils.perf.lazyLoadImages();
  }

  trackPageView() {
    const page = window.location.pathname;
    utils.analytics.trackPageView(page);
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
  });
} else {
  new PortfolioApp();
}

// Make utils available globally for debugging
if (process.env.NODE_ENV === 'development') {
  window.utils = utils;
}