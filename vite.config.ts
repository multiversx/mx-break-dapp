import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    tsconfigPaths(),
    svgrPlugin(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true }
    })
  ],
  server: {
    port: 3000,
    host: true,
    https: true,
    watch: {
      usePolling: false,
      useFsEvents: false
    },
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: 'build'
  },
  preview: {
    port: 3002,
    https: true,
    host: 'localhost',
    strictPort: true
  }
})
