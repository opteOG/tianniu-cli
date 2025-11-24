import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  format: ['cjs'],
  outExtension() {
    return {
      js: '.js'
    }
  },
  clean: true,
})
