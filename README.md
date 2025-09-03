# Portfolio Jérôme Le Champion

Portfolio professionnel moderne et responsive développé en HTML5, CSS3 (Tailwind) et JavaScript vanilla. Site statique optimisé pour les performances, l'accessibilité et le SEO.

## 🚀 Aperçu

Site portfolio présentant les compétences, projets et expériences de Jérôme Le Champion, Lead Développeur Full-Stack. Architecture moderne avec support multilingue (FR/EN/ES), mode sombre, animations fluides et formulaire de contact fonctionnel.

**[🔗 Voir le site en ligne](https://jeromelechampion.dev)**

## ✨ Fonctionnalités

### 🎨 Design & UX
- **Responsive Design** : Optimisé pour mobile, tablette et desktop
- **Mode sombre** : Basculement automatique selon les préférences système
- **Animations fluides** : Transitions CSS et animations on-scroll
- **Typographie moderne** : Police Inter avec optimisation des performances

### 🌍 Internationalisation
- **Multilingue** : Support FR/EN/ES avec détection automatique
- **URLs localisées** : Paramètres de langue dans l'URL
- **Fallback intelligent** : Système de repli vers la langue par défaut

### 🔧 Fonctionnalités techniques
- **Site statique** : Hébergement simple, performances optimales
- **SEO optimisé** : Meta tags, Open Graph, Twitter Cards, sitemap
- **PWA ready** : Manifeste et icons pour l'installation
- **Formulaire fonctionnel** : API intégrée pour l'envoi d'emails

### ♿ Accessibilité
- **WCAG 2.1 AA** : Navigation clavier, lecteurs d'écran, contrastes
- **Skip links** : Navigation rapide pour les utilisateurs de clavier
- **ARIA labels** : Étiquettes appropriées pour les technologies d'assistance

## 🛠 Stack technique

### Frontend
- **HTML5** : Structure sémantique et accessible
- **Tailwind CSS** : Framework CSS utility-first
- **JavaScript ES6+** : Modules natifs, pas de framework lourd
- **CSS Custom Properties** : Thématisation et mode sombre

### Outils de build
- **esbuild** : Bundler JavaScript ultra-rapide
- **Tailwind CLI** : Compilation et purge CSS
- **Live Server** : Serveur de développement avec rechargement

### Tests & Qualité
- **Vitest** : Tests unitaires des utilitaires
- **Playwright** : Tests end-to-end multi-navigateurs
- **ESLint** : Linting JavaScript
- **Prettier** : Formatage de code

### CI/CD
- **GitHub Actions** : Pipeline automatisé
- **Vercel** : Déploiement et hébergement
- **Lighthouse CI** : Audit de performance automatique

## 📁 Structure du projet

```
jeromelechampion2/
├── index.html                 # Page d'accueil
├── projets.html              # Liste des projets
├── experience.html           # Parcours professionnel
├── contact.html              # Formulaire de contact
├── package.json              # Dépendances et scripts
├── tailwind.config.js        # Configuration Tailwind
├── tsconfig.json             # Configuration TypeScript
├── playwright.config.js      # Configuration Playwright
├── vitest.config.js          # Configuration Vitest
├── manifest.json             # Manifeste PWA
├── robots.txt               # Directives pour les robots
├── sitemap.xml              # Plan du site
├── assets/                  # Images et icônes
├── css/                     # CSS compilé
├── js/                      # JavaScript compilé
├── src/                     # Sources
│   ├── css/
│   │   └── input.css        # Styles Tailwind
│   └── js/
│       ├── main.js          # Point d'entrée principal
│       ├── i18n.js          # Système d'internationalisation
│       ├── animations.js    # Gestionnaire d'animations
│       ├── theme.js         # Gestion du mode sombre
│       └── utils.js         # Utilitaires
├── data/                    # Données du site
│   ├── profile.js           # Informations personnelles
│   ├── skills.js            # Compétences techniques
│   ├── timeline.js          # Expériences professionnelles
│   ├── testimonials.js      # Témoignages clients
│   ├── projects.js          # Projets portfolio
│   └── i18n.js              # Traductions
├── content/                 # Contenu MDX (études de cas)
├── tests/                   # Tests
│   ├── unit/               # Tests unitaires
│   └── e2e/                # Tests end-to-end
├── scripts/                 # Scripts utilitaires
└── .github/
    └── workflows/
        └── ci.yml           # Pipeline CI/CD
```

## 🚀 Démarrage rapide

### Prérequis
- **Node.js** 18+ 
- **npm** 8+

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/jerome-le-champion/portfolio.git
   cd portfolio
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📜 Scripts disponibles

### Développement
```bash
npm run dev         # Serveur de dev avec watch CSS/JS
npm run css:watch   # Watch mode pour Tailwind CSS
npm run js:watch    # Watch mode pour JavaScript
```

### Build
```bash
npm run build       # Build complet (CSS + JS)
npm run css:build   # Compilation CSS avec minification
npm run js:build    # Bundle JavaScript avec minification
```

### Tests
```bash
npm run test        # Tests unitaires (Vitest)
npm run test:watch  # Tests en mode watch
npm run e2e         # Tests end-to-end (Playwright)
npm run e2e:ui      # Interface graphique Playwright
```

### Qualité
```bash
npm run lint        # Linting ESLint
npm run typecheck   # Vérification TypeScript
npm run format      # Formatage avec Prettier
```

### Utilitaires
```bash
npm run preview            # Serveur de prévisualisation
npm run generate:sitemap   # Génération du sitemap
npm run clean              # Nettoyage des fichiers générés
```

## 🎨 Personnalisation

### Modifier le contenu

1. **Informations personnelles** : `data/profile.js`
2. **Compétences** : `data/skills.js` 
3. **Expériences** : `data/timeline.js`
4. **Projets** : `data/projects.js`
5. **Témoignages** : `data/testimonials.js`

### Ajouter des traductions

1. Éditer `data/i18n.js`
2. Ajouter la nouvelle langue dans les objets de traduction
3. Mettre à jour la liste des langues disponibles dans `data/profile.js`

### Personnaliser le style

1. **Couleurs** : Modifier `tailwind.config.js`
2. **Fonts** : Changer les imports dans `src/css/input.css`
3. **Animations** : Personnaliser dans `src/css/input.css` et `src/js/animations.js`

### Ajouter un projet

1. Ajouter les données dans `data/projects.js`
2. Créer l'étude de cas dans `content/projects/`
3. Ajouter les images dans `assets/images/projects/`

## 🌐 Internationalisation

### Langues supportées
- **Français** (fr) - langue par défaut
- **Anglais** (en)
- **Espagnol** (es)

### Ajouter une langue

1. **Traductions** : Ajouter dans `data/i18n.js`
   ```javascript
   export const translations = {
     fr: { /* ... */ },
     en: { /* ... */ },
     de: { // Nouvelle langue
       nav: {
         home: 'Startseite',
         projects: 'Projekte'
       }
       // ...
     }
   };
   ```

2. **Configuration** : Mettre à jour `data/profile.js`
   ```javascript
   languages: ['fr', 'en', 'es', 'de']
   ```

3. **Interface** : Ajouter les boutons dans les templates HTML

## 📧 Configuration du formulaire

Le formulaire de contact utilise l'API Gaviota. Pour le configurer :

1. **Modifier l'endpoint** dans `src/js/utils.js` :
   ```javascript
   async sendContactForm(formData) {
     return this.request('VOTRE_API_ENDPOINT', {
       method: 'POST',
       headers: {
         'Authorization': 'VOTRE_API_KEY',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         to: 'votre@email.com',
         subject: `Contact depuis le portfolio - ${formData.subject}`,
         body: `Message de ${formData.name} (${formData.email}): ${formData.message}`
       })
     });
   }
   ```

2. **Variables d'environnement** (si nécessaire) :
   - Créer `.env.local`
   - Ajouter vos clés API
   - Mettre à jour le script de build

## 🚀 Déploiement

### Vercel (recommandé)

1. **Connecter le repository** à Vercel
2. **Variables d'environnement** (si nécessaire) :
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID` 
   - `VERCEL_PROJECT_ID`
3. **Build automatique** sur chaque push vers `main`

### Autres plateformes

Le site étant statique, il peut être déployé sur :
- **Netlify** : Glisser-déposer le dossier build
- **GitHub Pages** : Push vers la branche `gh-pages`
- **Firebase Hosting** : `firebase deploy`
- **Surge.sh** : `surge dist/`

### Build pour production

```bash
npm run build
npm run generate:sitemap
```

Les fichiers à déployer :
```
*.html
css/
js/ 
assets/
data/
manifest.json
robots.txt
sitemap.xml
```

## 🧪 Tests

### Tests unitaires (Vitest)

Tests des utilitaires JavaScript :
```bash
npm run test
```

Couvrent :
- ✅ Système d'internationalisation
- ✅ Validation de formulaires  
- ✅ Utilitaires de stockage
- ✅ Gestion des URLs
- ✅ Fonctions de performance

### Tests E2E (Playwright)

Tests complets de l'application :
```bash
npm run e2e
```

Scénarios testés :
- ✅ Navigation entre pages
- ✅ Formulaire de contact
- ✅ Accessibilité (axe-core)
- ✅ Responsive design
- ✅ Fonctionnalités JavaScript

### Tests d'accessibilité

Vérifications automatiques :
- Contraste des couleurs
- Navigation clavier
- Hiérarchie des titres
- Labels de formulaire
- ARIA attributes

## 📊 Performance

### Métriques cibles
- **LCP** : < 2.5s (Largest Contentful Paint)
- **FID** : < 100ms (First Input Delay)  
- **CLS** : < 0.1 (Cumulative Layout Shift)
- **Speed Index** : < 3s

### Optimisations intégrées
- CSS et JS minifiés
- Images optimisées (.webp)
- Fonts préchargées
- CSS critique en inline
- Compression gzip/brotli
- Service Worker (cache)

### Outils de mesure
- **Lighthouse CI** : Audit automatique
- **WebPageTest** : Tests réels
- **Core Web Vitals** : Métriques Google

## 🔧 Maintenance

### Mise à jour des dépendances

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour (patch/minor)
npm update

# Mise à jour majeure (avec précaution)
npm install package@latest
```

### Surveillance

- **Uptime** : Monitoring Vercel
- **Performance** : Lighthouse CI weekly
- **Erreurs** : Error boundary + Sentry (optionnel)

### SEO

- **Meta tags** : Vérifier régulièrement
- **Sitemap** : Régénérer après ajout de contenu
- **Schema markup** : Ajouter si pertinent
- **Analytics** : Google Analytics 4 (à configurer)

## 🤝 Contribution

### Workflow

1. **Fork** le repository
2. **Créer une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Développer** avec tests
4. **Commit** : `git commit -m "feat: ajouter ma fonctionnalité"`
5. **Push** : `git push origin feature/ma-fonctionnalite`
6. **Pull Request** avec description détaillée

### Standards

- **Commits** : Convention conventionnelle
- **Code** : Prettier + ESLint
- **Tests** : Couverture > 80%
- **Accessibilité** : WCAG 2.1 AA

## 📄 Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour les détails.

## 📞 Contact

**Jérôme Le Champion**
- Email : jerome.le.champion@gmail.com
- LinkedIn : [jerome-le-champion](https://linkedin.com/in/jerome-le-champion)  
- Portfolio : [jeromelechampion.dev](https://jeromelechampion.dev)

---

*Développé avec ❤️ à Paris • Made with HTML5, Tailwind CSS & JavaScript*