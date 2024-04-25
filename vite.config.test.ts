import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 1974
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages')
    }
  },
  build: {
    rollupOptions: {
      output: {
        sourcemap:false,
        compact:true,

        manualChunks (filePath) { 
          console.log('###########'+filePath)
          if (filePath.includes('node_modules')) {    
            return 'vender'
            // console.log(filePath.toString().split('node_modules/')[1].split('/')[0].toString())
            // return filePath.toString().split('node_modules/')[1].split('/')[0].toString();
          }else{
            return 'mttk-bi'
          }
        }
      }
    }
  }
})
