# Configuration du déploiement GitHub Pages

## Étapes pour activer GitHub Pages

1. **Aller dans les Settings du repository GitHub**
   - Naviguez vers votre repository sur GitHub
   - Cliquez sur l'onglet "Settings"

2. **Configurer Pages**
   - Dans le menu de gauche, cliquez sur "Pages"
   - Dans "Source", sélectionnez "GitHub Actions"
   - Sauvegardez les paramètres

3. **Permissions du GITHUB_TOKEN**
   - Toujours dans "Settings" → "Actions" → "General"
   - Descendez jusqu'à "Workflow permissions"
   - Sélectionnez "Read and write permissions"
   - Cochez "Allow GitHub Actions to create and approve pull requests"
   - Cliquez sur "Save"

## URL du site déployé

Une fois configuré, votre site sera accessible à l'adresse :
```
https://[votre-username].github.io/[nom-du-repo]/
```

## Déploiement automatique

Le déploiement se fait automatiquement :
- À chaque push sur la branche `main`
- Après que tous les tests aient réussi
- Le processus inclut :
  - Build du CSS et JS
  - Tests unitaires et E2E
  - Génération du sitemap
  - Déploiement sur GitHub Pages
  - Audit Lighthouse du site déployé

## Rollback

En cas de problème, vous pouvez :
1. Faire un revert du commit problématique
2. Pusher sur main pour redéclencher le déploiement
3. Ou désactiver temporairement Pages dans les settings