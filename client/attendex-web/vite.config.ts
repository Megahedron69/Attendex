import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"android-chrome-512x5122.png",
			],
			devOptions: {
				enabled: true,
			},
		}),
	],
	server: {
		host: true,
		strictPort: true,
		proxy: {
			"/api/V1": {
				target: "https://localhost:5050/",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/V1/, "/api/V1"),
			},
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
});
