// Builds the whole site into ONE html file you can double-click (no server needed).
// Pages use #/ URLs in this build, e.g. "Open demo.html#/models/t2-idm".
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: { 'import.meta.env.VITE_HASH_ROUTER': JSON.stringify('1') },
  build: { outDir: 'preview', emptyOutDir: true },
})
