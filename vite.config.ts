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
    host: '0.0.0.0',
    port: 2008
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/installer/styles/element/index.scss" as *;`,
  //     },
  //   },
  // },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    lib: {
      entry: './packages/index.ts',
      name: 'mttk-bi',
      fileName: 'mttk-bi'
    },
    rollupOptions: {
      external: [
        'dayjs',
        'echarts',
        'echarts-simple-transform',
        'echarts-stat',
        'echarts-wordcloud',
        'mttk-lowcode-engine',
        'vue',
        'vue-echarts'
      ],
      output: {
        globals: {
          dayjs: 'dayjs',
          vue: 'vue',
          echarts: 'echarts',
          'echarts-stat': 'echarts-stat',
          'vue-echarts': 'vue-echarts',
          'mttk-lowcode-engine': 'mttk-lowcode-engine'
        },
        assetFileNames: 'index.css'
      }
    }
  }
})
