import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  resolve: {
    alias: {
      '@packages/ui': '../../packages/ui',
      '@packages/db': '../../packages/db',
      '@packages/rpc': '../../packages/rpc',
    },
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss],
      },
    },
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  output: {
    distPath: {
      root: '.output/frontend',
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
