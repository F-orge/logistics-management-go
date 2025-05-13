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
  
  server: {
		proxy: {
			"/api": "http://localhost:8090/api",
		},
	},
  output: {
    distPath: {
      root: '.output/dist',
    },
  },
});
