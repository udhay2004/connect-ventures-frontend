import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          '5c-model': path.resolve(__dirname, '5c-model.html'),
          'co-creation': path.resolve(__dirname, 'co-creation.html'),
          coaching: path.resolve(__dirname, 'coaching.html'),
          collaboration: path.resolve(__dirname, 'collaboration.html'),
          connecting: path.resolve(__dirname, 'connecting.html'),
          consulting: path.resolve(__dirname, 'consulting.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          countries: path.resolve(__dirname, 'countries.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          services: path.resolve(__dirname, 'services.html'),
          projects: path.resolve(__dirname, 'projects.html'),
          marketplace: path.resolve(__dirname, 'marketplace.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
