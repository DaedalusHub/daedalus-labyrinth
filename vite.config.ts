// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: false,
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
