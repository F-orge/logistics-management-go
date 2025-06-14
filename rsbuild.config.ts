import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: true,
        }),
      ],
    },
    //@ts-ignore
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss],
      },
    },
  },
  output: {
    distPath: {
      root: 'target/frontend-dist',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
