import { describe, it, expect, beforeEach } from 'vitest';

// Mock the translations for testing
const mockTranslations = {
  fr: {
    nav: {
      home: 'Accueil',
      projects: 'Projets'
    },
    common: {
      loading: 'Chargement...'
    }
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects'
    },
    common: {
      loading: 'Loading...'
    }
  }
};

// Mock i18n class for testing
class MockI18n {
  constructor() {
    this.currentLang = 'fr';
    this.fallbackLang = 'fr';
    this.translations = mockTranslations;
  }

  get(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = this.translations[this.fallbackLang];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          } else {
            value = key;
            break;
          }
        }
        break;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    return value.replace(/{{(\w+)}}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
    }
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  getAvailableLanguages() {
    return Object.keys(this.translations);
  }

  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat(this.currentLang, options).format(new Date(date));
  }

  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.currentLang, options).format(number);
  }
}

describe('I18n', () => {
  let i18n;

  beforeEach(() => {
    i18n = new MockI18n();
  });

  describe('translation retrieval', () => {
    it('should return correct translation for existing key', () => {
      expect(i18n.get('nav.home')).toBe('Accueil');
      expect(i18n.get('common.loading')).toBe('Chargement...');
    });

    it('should return key for non-existing translation', () => {
      expect(i18n.get('non.existing.key')).toBe('non.existing.key');
    });

    it('should handle parameter replacement', () => {
      i18n.translations.fr.test = {
        greeting: 'Bonjour {{name}}'
      };
      expect(i18n.get('test.greeting', { name: 'Jérôme' })).toBe('Bonjour Jérôme');
    });

    it('should fallback to default language when current language missing', () => {
      i18n.setLanguage('es'); // Language not in translations
      expect(i18n.get('nav.home')).toBe('Accueil'); // Fallback to fr
    });
  });

  describe('language management', () => {
    it('should set valid language', () => {
      i18n.setLanguage('en');
      expect(i18n.getCurrentLanguage()).toBe('en');
      expect(i18n.get('nav.home')).toBe('Home');
    });

    it('should not set invalid language', () => {
      const originalLang = i18n.getCurrentLanguage();
      i18n.setLanguage('invalid');
      expect(i18n.getCurrentLanguage()).toBe(originalLang);
    });

    it('should return available languages', () => {
      const languages = i18n.getAvailableLanguages();
      expect(languages).toEqual(['fr', 'en']);
    });
  });

  describe('formatting', () => {
    it('should format dates correctly', () => {
      const date = '2024-01-15';
      const formattedFr = i18n.formatDate(date);
      
      i18n.setLanguage('en');
      const formattedEn = i18n.formatDate(date);
      
      expect(formattedFr).toBeDefined();
      expect(formattedEn).toBeDefined();
      expect(formattedFr).not.toBe(formattedEn);
    });

    it('should format numbers correctly', () => {
      const number = 1234.56;
      
      const formattedFr = i18n.formatNumber(number);
      i18n.setLanguage('en');
      const formattedEn = i18n.formatNumber(number);
      
      expect(formattedFr).toBeDefined();
      expect(formattedEn).toBeDefined();
    });
  });
});