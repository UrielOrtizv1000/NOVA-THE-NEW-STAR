import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite development server configuration for the NOVA desktop app.
// Tauri serves this frontend inside its WebView2 window.
export default defineConfig({
  plugins: [react()],
  // Recommended by Tauri: avoid port conflicts on the dev server.
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
});
