import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        bloomFilter: 'src/bloomFilter.tsx',
        swissTables: 'src/swissTables.tsx'
      }
    },
    outDir: 'public',
    assetsDir: ''
  },
});
