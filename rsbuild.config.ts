import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss],
      },
    },
    rspack: {
      plugins: [
        TanStackRouterRspack({ target: 'react', autoCodeSplitting: true }),
      ],
    },
  },
  html: {
    tags: [{ tag: 'body', attrs: { class: 'bg-background text-foreground' } }],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8090',
    },
  },
  output: {
    distPath: {
      root: '.output/dist',
    },
  },
});
