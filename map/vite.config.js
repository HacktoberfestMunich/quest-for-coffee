import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
  ],

  build: {
    assetsDir: '',
    sourcemap: true,
    lib: {
      entry: 'scripts/main.js',
      formats: ['iife'],
      name: 'QuestForCoffee',
      fileName: 'quest-for-coffee'
    }
  }
})