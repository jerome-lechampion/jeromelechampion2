// Animation utilities using intersection observer and CSS transitions
class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize hover animations
    this.initHoverAnimations();
    
    // Initialize stagger animations
    this.initStaggerAnimations();
  }

  initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.1, 0.5]
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      scrollObserver.observe(el);
    });

    this.observers.set('scroll', scrollObserver);
  }

  animateElement(element) {
    const animationType = element.dataset.animation || 'fade-in';
    const delay = parseInt(element.dataset.delay) || 0;
    const duration = parseInt(element.dataset.duration) || 600;

    setTimeout(() => {
      element.style.transition = `all ${duration}ms ease-out`;
      
      switch (animationType) {
        case 'fade-in':
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          break;
        case 'slide-left':
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
          break;
        case 'slide-right':
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
          break;
        case 'scale-in':
          element.style.opacity = '1';
          element.style.transform = 'scale(1)';
          break;
        case 'rotate-in':
          element.style.opacity = '1';
          element.style.transform = 'rotate(0deg)';
          break;
      }

      element.classList.add('animated');
    }, delay);
  }

  initHoverAnimations() {
    // Card hover effects
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
      });
    });

    // Button hover effects
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
      });
    });

    // Image hover zoom
    document.querySelectorAll('.hover-zoom').forEach(img => {
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
      });

      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  }

  initStaggerAnimations() {
    // Stagger animation for lists and grids
    document.querySelectorAll('.stagger-children').forEach(parent => {
      const children = parent.children;
      const baseDelay = parseInt(parent.dataset.staggerDelay) || 100;

      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * baseDelay}ms`;
        child.classList.add('animate-on-scroll');
      });
    });
  }

  // Page transition animations
  pageTransition(callback) {
    const content = document.querySelector('main');
    
    // Fade out
    content.style.transition = 'opacity 300ms ease-out';
    content.style.opacity = '0';

    setTimeout(() => {
      callback();
      
      // Fade in
      setTimeout(() => {
        content.style.opacity = '1';
      }, 50);
    }, 300);
  }

  // Loading animation
  showLoading(element) {
    element.innerHTML = `
      <div class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span class="ml-2 text-gray-600 dark:text-gray-400">Chargement...</span>
      </div>
    `;
  }

  // Success animation
  showSuccess(element, message) {
    element.innerHTML = `
      <div class="flex items-center justify-center py-4 text-green-600 dark:text-green-400">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    // Add success animation
    element.querySelector('svg').style.animation = 'bounceIn 0.6s ease-out';
  }

  // Error animation
  showError(element, message) {
    element.innerHTML = `
      <div class="flex items-center justify-center py-4 text-red-600 dark:text-red-400">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    
    // Add shake animation
    element.style.animation = 'shake 0.5s ease-in-out';
  }

  // Counter animation
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easedProgress);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  // Typewriter effect
  typeWriter(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;
    
    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };
    
    type();
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Initialize animations when DOM is loaded
let animationManager;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    animationManager = new AnimationManager();
  });
} else {
  animationManager = new AnimationManager();
}

export default AnimationManager;