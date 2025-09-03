#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Configuration
const baseUrl = 'https://jeromelechampion.dev';
const currentDate = new Date().toISOString().split('T')[0];

// Pages du site
const pages = [
  {
    url: '/',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '1.0'
  },
  {
    url: '/projets.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/experience.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/contact.html',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.6'
  }
];

// Génération du XML
const generateSitemap = () => {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Écriture du fichier
const sitemapPath = join(rootDir, 'sitemap.xml');
const sitemapContent = generateSitemap();

try {
  writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ Sitemap généré avec succès:', sitemapPath);
  console.log(`📄 ${pages.length} pages ajoutées au sitemap`);
} catch (error) {
  console.error('❌ Erreur lors de la génération du sitemap:', error);
  process.exit(1);
}