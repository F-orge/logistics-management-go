import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import path from "node:path";

export default defineConfig({
	plugins: [
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
		}),
		pluginSolid(),
	],
	source: {
		entry: {
			index: "./web/index.tsx",
		},
	},
	server: {
		proxy: {
			"/api": "http://localhost:8090/api",
		},
	},
	resolve: {
		alias: {
			"~": path.resolve(import.meta.dirname, "./web"),
		},
	},
});
