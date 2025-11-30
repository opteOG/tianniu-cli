import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  outExtension() {
    return {
      js: '.js'
    }
  },
  clean: true,
  dts: true,
})
