import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   hmr: {
  //     port: 80 // vite@2.5.2 and newer: clientPort
  //   }
  // }

  define: {
    'process.env': {},
  },
});
