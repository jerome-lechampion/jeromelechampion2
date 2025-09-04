// Theme management with dark mode support
class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.init();
  }

  init() {
    // Check for saved theme or system preference
    this.currentTheme = this.getSavedTheme() || this.getSystemTheme();
    this.applyTheme(this.currentTheme);
    this.setupThemeToggle();
    this.watchSystemTheme();
  }

  getSavedTheme() {
    return localStorage.getItem('theme');
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.updateThemeToggle();
    this.updateMetaThemeColor();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.animateThemeTransition();
  }

  setupThemeToggle() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.toggleTheme();
      });
    });

    // Keyboard shortcut (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }

  updateThemeToggle() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    
    toggleButtons.forEach(button => {
      const iconSun = button.querySelector('.icon-sun');
      const iconMoon = button.querySelector('.icon-moon');
      const text = button.querySelector('.theme-text');

      if (this.currentTheme === 'dark') {
        if (iconSun) iconSun.classList.add('hidden');
        if (iconMoon) iconMoon.classList.remove('hidden');
        if (text) text.textContent = window.i18n ? window.i18n.get('common.lightMode') : 'Light mode';
      } else {
        if (iconSun) iconSun.classList.remove('hidden');
        if (iconMoon) iconMoon.classList.add('hidden');
        if (text) text.textContent = window.i18n ? window.i18n.get('common.darkMode') : 'Dark mode';
      }

      // Update aria-label for accessibility
      const label = this.currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
    });
  }

  updateMetaThemeColor() {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const color = this.currentTheme === 'dark' ? '#1f2937' : '#ffffff';
      metaThemeColor.setAttribute('content', color);
    }
  }

  animateThemeTransition() {
    // Add smooth transition class
    document.documentElement.classList.add('theme-transition');
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Only update if no theme is saved (user hasn't made a choice)
      if (!this.getSavedTheme()) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(newTheme);
      }
    });
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  // Reset to system preference
  resetToSystem() {
    localStorage.removeItem('theme');
    const systemTheme = this.getSystemTheme();
    this.applyTheme(systemTheme);
  }
}

// CSS for smooth theme transitions
const themeTransitionStyle = document.createElement('style');
themeTransitionStyle.textContent = `
  .theme-transition,
  .theme-transition *,
  .theme-transition *:before,
  .theme-transition *:after {
    transition: all 300ms !important;
    transition-delay: 0 !important;
  }
`;
document.head.appendChild(themeTransitionStyle);

// Initialize theme manager
const themeManager = new ThemeManager();

export default themeManager;