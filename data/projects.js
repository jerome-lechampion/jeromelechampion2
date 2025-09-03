export const projects = [
  {
    id: 'distributor-portal',
    title: {
      fr: 'Portail Distributeur B2B Multi-Pays',
      en: 'Multi-Country B2B Distributor Portal',
      es: 'Portal Distribuidor B2B Multi-País'
    },
    slug: 'distributor-portal-b2b',
    summary: {
      fr: 'Plateforme e-commerce B2B connectée au SI SAP, déployée dans 50+ pays avec gestion multi-devises et RBAC avancé.',
      en: 'B2B e-commerce platform connected to SAP ERP, deployed in 50+ countries with multi-currency support and advanced RBAC.',
      es: 'Plataforma e-commerce B2B conectada al ERP SAP, desplegada en 50+ países con soporte multi-divisa y RBAC avanzado.'
    },
    description: {
      fr: 'Conception et développement d\'une plateforme e-commerce B2B complexe intégrant catalogue produits SAP, gestion des commandes, pricing dynamique et authentification multi-tenant pour distributeurs internationaux.',
      en: 'Design and development of a complex B2B e-commerce platform integrating SAP product catalog, order management, dynamic pricing and multi-tenant authentication for international distributors.',
      es: 'Diseño y desarrollo de una plataforma e-commerce B2B compleja integrando catálogo de productos SAP, gestión de pedidos, precios dinámicos y autenticación multi-tenant para distribuidores internacionales.'
    },
    image: '/assets/images/projects/distributor-portal-cover.jpg',
    images: [
      '/assets/images/projects/distributor-portal-1.jpg',
      '/assets/images/projects/distributor-portal-2.jpg',
      '/assets/images/projects/distributor-portal-3.jpg'
    ],
    tags: ['B2B', 'E-commerce', 'SAP Integration', 'Multi-tenant'],
    technologies: ['Next.js', 'React', 'Node.js', 'GraphQL', 'Prisma', 'PostgreSQL', 'Redis', 'Material UI', 'Jest', 'Azure'],
    status: 'Completed',
    year: '2022',
    client: 'TotalEnergies',
    duration: '18 mois',
    team: '6 développeurs',
    role: {
      fr: 'Lead Technique & Architecte',
      en: 'Technical Lead & Architect', 
      es: 'Líder Técnico & Arquitecto'
    },
    metrics: {
      countries: '50+',
      users: '10k+',
      revenue: 'M€',
      uptime: '99.9%'
    },
    featured: true,
    priority: 1
  },
  {
    id: 'iot-monitoring',
    title: {
      fr: 'Plateforme Monitoring IoT Grande Échelle',
      en: 'Large-Scale IoT Monitoring Platform',
      es: 'Plataforma de Monitoreo IoT a Gran Escala'
    },
    slug: 'iot-monitoring-platform',
    summary: {
      fr: 'Système de monitoring temps réel pour milliers d\'objets connectés avec dashboards interactifs et alerting intelligent.',
      en: 'Real-time monitoring system for thousands of connected devices with interactive dashboards and intelligent alerting.',
      es: 'Sistema de monitoreo en tiempo real para miles de dispositivos conectados con dashboards interactivos y alertas inteligentes.'
    },
    description: {
      fr: 'Architecture complète pour supervision IoT : ingestion temps réel des données, normalisation, stockage optimisé, dashboards personnalisables et système d\'alertes basé sur des règles métier complexes.',
      en: 'Complete IoT supervision architecture: real-time data ingestion, normalization, optimized storage, customizable dashboards and alerting system based on complex business rules.',
      es: 'Arquitectura completa para supervisión IoT: ingesta de datos en tiempo real, normalización, almacenamiento optimizado, dashboards personalizables y sistema de alertas basado en reglas de negocio complejas.'
    },
    image: '/assets/images/projects/iot-monitoring-cover.jpg',
    images: [
      '/assets/images/projects/iot-monitoring-1.jpg',
      '/assets/images/projects/iot-monitoring-2.jpg',
      '/assets/images/projects/iot-monitoring-3.jpg'
    ],
    tags: ['IoT', 'Real-time', 'Data Visualization', 'Alerting'],
    technologies: ['React', 'Node.js', 'TypeScript', 'InfluxDB', 'Redis', 'WebSockets', 'Chart.js', 'Kubernetes'],
    status: 'Completed',
    year: '2021',
    client: 'TotalEnergies',
    duration: '12 mois',
    team: '4 développeurs',
    role: {
      fr: 'Lead Full-Stack',
      en: 'Full-Stack Lead',
      es: 'Líder Full-Stack'
    },
    metrics: {
      devices: '5k+',
      dataPoints: '1M+/jour',
      latency: '<100ms',
      availability: '99.95%'
    },
    featured: true,
    priority: 2
  },
  {
    id: 'swap-ecosystem',
    title: {
      fr: 'Écosystème SWAP - GPS & Apps Mobiles',
      en: 'SWAP Ecosystem - GPS & Mobile Apps',
      es: 'Ecosistema SWAP - GPS y Apps Móviles'
    },
    slug: 'swap-gps-ecosystem',
    summary: {
      fr: 'Plateforme complète trackers GPS + applications mobiles (Android/iOS) + backend avec ML pour analyse de trajectoires.',
      en: 'Complete platform GPS trackers + mobile applications (Android/iOS) + backend with ML for trajectory analysis.',
      es: 'Plataforma completa rastreadores GPS + aplicaciones móviles (Android/iOS) + backend con ML para análisis de trayectorias.'
    },
    description: {
      fr: 'Écosystème complet from scratch : protocoles de communication propriétaires, applications mobiles natives, algorithmes ML pour prédiction de trajectoires, chiffrement bout-en-bout et notifications multi-canal.',
      en: 'Complete ecosystem from scratch: proprietary communication protocols, native mobile applications, ML algorithms for trajectory prediction, end-to-end encryption and multi-channel notifications.',
      es: 'Ecosistema completo desde cero: protocolos de comunicación propietarios, aplicaciones móviles nativas, algoritmos ML para predicción de trayectorias, cifrado end-to-end y notificaciones multi-canal.'
    },
    image: '/assets/images/projects/swap-ecosystem-cover.jpg',
    images: [
      '/assets/images/projects/swap-ecosystem-1.jpg',
      '/assets/images/projects/swap-ecosystem-2.jpg',
      '/assets/images/projects/swap-ecosystem-3.jpg'
    ],
    tags: ['Mobile', 'GPS', 'Machine Learning', 'Real-time'],
    technologies: ['Node.js', 'Android (Java)', 'iOS (Swift)', 'MongoDB', 'Socket.io', 'TensorFlow', 'FCM'],
    status: 'Completed',
    year: '2018',
    client: 'SWAP (Startup)',
    duration: '36 mois',
    team: '3 développeurs',
    role: {
      fr: 'CTO & Lead Developer',
      en: 'CTO & Lead Developer',
      es: 'CTO & Desarrollador Principal'
    },
    metrics: {
      users: '10k+',
      devices: '2k+',
      accuracy: '95%',
      retention: '78%'
    },
    featured: true,
    priority: 3
  },
  {
    id: 'qa-automation',
    title: {
      fr: 'Outils Automatisation QA Transport',
      en: 'Transport QA Automation Tools',
      es: 'Herramientas de Automatización QA Transporte'
    },
    slug: 'transport-qa-automation',
    summary: {
      fr: 'Framework d\'automatisation pour validation & vérification de systèmes critiques ferroviaires avec génération de rapports.',
      en: 'Automation framework for validation & verification of critical railway systems with report generation.',
      es: 'Framework de automatización para validación y verificación de sistemas ferroviarios críticos con generación de reportes.'
    },
    description: {
      fr: 'Développement d\'outils Java pour automatisation complète des tests sur systèmes ferroviaires critiques : génération de cas de test, exécution parallèle, reporting détaillé et intégration CI/CD pour certification EN50128.',
      en: 'Development of Java tools for complete test automation on critical railway systems: test case generation, parallel execution, detailed reporting and CI/CD integration for EN50128 certification.',
      es: 'Desarrollo de herramientas Java para automatización completa de pruebas en sistemas ferroviarios críticos: generación de casos de prueba, ejecución paralela, reportes detallados e integración CI/CD para certificación EN50128.'
    },
    image: '/assets/images/projects/qa-automation-cover.jpg',
    images: [
      '/assets/images/projects/qa-automation-1.jpg',
      '/assets/images/projects/qa-automation-2.jpg'
    ],
    tags: ['QA', 'Automation', 'Railway', 'Critical Systems'],
    technologies: ['Java', 'Ada', 'Jenkins', 'TestComplete', 'SQL', 'XML'],
    status: 'Completed',
    year: '2016',
    client: 'Alstom Transport',
    duration: '24 mois',
    team: '2 développeurs',
    role: {
      fr: 'Lead QA Engineer',
      en: 'Lead QA Engineer',
      es: 'Ingeniero QA Principal'
    },
    metrics: {
      testReduction: '60%',
      coverage: '95%',
      projects: '5+',
      certification: 'EN50128'
    },
    featured: false,
    priority: 4
  }
];

export const projectCategories = {
  fr: [
    { id: 'all', name: 'Tous les projets' },
    { id: 'B2B', name: 'B2B / E-commerce' },
    { id: 'IoT', name: 'IoT / Temps réel' },
    { id: 'Mobile', name: 'Mobile / Apps' },
    { id: 'QA', name: 'QA / Automatisation' },
    { id: 'Integration', name: 'Intégrations SI' }
  ],
  en: [
    { id: 'all', name: 'All Projects' },
    { id: 'B2B', name: 'B2B / E-commerce' },
    { id: 'IoT', name: 'IoT / Real-time' },
    { id: 'Mobile', name: 'Mobile / Apps' },
    { id: 'QA', name: 'QA / Automation' },
    { id: 'Integration', name: 'System Integrations' }
  ],
  es: [
    { id: 'all', name: 'Todos los Proyectos' },
    { id: 'B2B', name: 'B2B / E-commerce' },
    { id: 'IoT', name: 'IoT / Tiempo Real' },
    { id: 'Mobile', name: 'Mobile / Apps' },
    { id: 'QA', name: 'QA / Automatización' },
    { id: 'Integration', name: 'Integraciones de Sistemas' }
  ]
};