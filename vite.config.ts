import { defineConfig } from 'vite';

// Nom du dépôt GitHub : https://maxence-villet.github.io/portfolio/
// → en production, les assets doivent être servis depuis /portfolio/.
const REPO_NAME = 'portfolio';

export default defineConfig(({ mode }) => ({
    // `vite dev` tourne en mode development : on reste à la racine
    // (http://localhost:5173/). Build et preview sont en mode production :
    // on préfixe avec le sous-chemin de GitHub Pages.
    base: mode === 'production' ? `/${REPO_NAME}/` : '/',
    build: {
        outDir: 'dist',
        // Sépare three.js de l'application pour éviter un chunk > 500 kB
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: 'three-addons',
                            test: /node_modules[\\/]three[\\/]examples[\\/]/,
                            priority: 20,
                            // Les addons importent three : on les laisse dans leur
                            // propre chunk au lieu de tirer tout le core dedans.
                            includeDependenciesRecursively: false
                        },
                        {
                            name: 'three',
                            test: /node_modules[\\/]three[\\/]/,
                            priority: 10
                        }
                    ]
                }
            }
        }
    }
}));
