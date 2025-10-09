import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './src/client.tsx',
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
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
