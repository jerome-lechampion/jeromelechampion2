import { translations } from '../data/i18n.js';

class I18n {
  constructor() {
    this.currentLang = 'fr';
    this.fallbackLang = 'fr';
    this.translations = translations;
    this.init();
  }

  init() {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    const savedLang = localStorage.getItem('preferred-language');
    const urlLang = new URLSearchParams(window.location.search).get('lang');

    // Priority: URL > localStorage > browser > fallback
    this.currentLang = urlLang || savedLang || 
      (this.translations[browserLang] ? browserLang : this.fallbackLang);

    this.setLanguage(this.currentLang);
    this.setupLanguageSwitcher();
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language '${lang}' not found. Using fallback.`);
      lang = this.fallbackLang;
    }

    this.currentLang = lang;
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    this.updateContent();
    this.updateLanguageSwitcher();
  }

  get(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to default language
        value = this.translations[this.fallbackLang];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          } else {
            value = key; // Return key if translation not found
            break;
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key '${key}' not found`);
      return key;
    }

    // Replace parameters
    return value.replace(/{{(\w+)}}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }

  updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.get(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });

    // Update elements with data-i18n-html for HTML content
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      element.innerHTML = this.get(key);
    });

    // Update title and meta descriptions
    this.updateMetaTags();
  }

  updateMetaTags() {
    const pageType = document.body.getAttribute('data-page') || 'home';
    const titleKey = `meta.${pageType}.title`;
    const descriptionKey = `meta.${pageType}.description`;

    // Update title
    const title = this.get(titleKey);
    if (title !== titleKey) {
      document.title = title;
    }

    // Update meta description
    const description = this.get(descriptionKey);
    if (description !== descriptionKey) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }

  setupLanguageSwitcher() {
    const switchers = document.querySelectorAll('.language-switcher');
    switchers.forEach(switcher => {
      switcher.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    });

    // Setup language buttons
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  }

  updateLanguageSwitcher() {
    // Update select elements
    document.querySelectorAll('.language-switcher').forEach(select => {
      select.value = this.currentLang;
    });

    // Update button states
    document.querySelectorAll('[data-lang]').forEach(button => {
      const lang = button.getAttribute('data-lang');
      button.classList.toggle('active', lang === this.currentLang);
    });
  }

  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Intl.DateTimeFormat(this.currentLang, { ...defaultOptions, ...options })
      .format(new Date(date));
  }

  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.currentLang, options).format(number);
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  getAvailableLanguages() {
    return Object.keys(this.translations);
  }
}

// Create and export a singleton instance
const i18n = new I18n();
window.i18n = i18n; // Make available globally

export default i18n;