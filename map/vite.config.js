import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
  ],

  build: {
    assetsDir: '',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'scripts/main.js'),
      formats: ['iife'],
      name: 'QuestForCoffee',
      fileName: 'quest-for-coffee'
    }
  }
})