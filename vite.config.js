// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import { VitePWA } from 'vite-plugin-pwa'

// export default defineConfig({
// 	plugins: [
// 		react(),
//     	// VitePWA({
// 		// 	registerType: 'autoUpdate',
// 		// 	workbox: {
// 		// 		clientsClaim: true,
// 		// 		skipWaiting: true
// 		// 	},
// 		// 	devOptions: {
// 		// 		enabled: true
// 		// 	},
// 		// 	injectRegister: 'auto',
// 		// 	workbox: {
// 		// 		globPatterns: ['**/*.{js,css,html,ico,png,svg}']
// 		// 	}
// 		// })
// 	],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
})