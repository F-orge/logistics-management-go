import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';

export default defineConfig({
  environments: {
    web: {
      plugins: [pluginReact()],
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
      source: {
        entry: {
          index: './src/client.tsx',
        },
      },
      output: {
        target: 'web',
      },
    },
    server: {
      source: {
        entry: {
          server: './src/server.ts',
        },
      },
      output: {
        target: 'node',
      },
    },
  },
  server: {
    proxy: {
      '/trpc': 'http://localhost:8080',
    },
  },
});
