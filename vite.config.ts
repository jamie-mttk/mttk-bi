// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      //'@': fileURLToPath(new URL('./packages', import.meta.url))
      '@': path.resolve(__dirname, 'packages')
    }
  },
  server: {
    port: 2008,
  },
  build: {
    outDir: "dist",
    lib: {
      entry: "./packages/index.ts",
      name: "mttk-lowcode",
      fileName: "mttk-lowcode",
    },
    rollupOptions: { external: ["vue",'vuedraggable'], output: { 
      globals: { vue: "Vue",vuedraggable:"vuedraggable" },
      assetFileNames: 'index.css', },
   },
  },
})
