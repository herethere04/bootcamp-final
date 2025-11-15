import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bootcamp-final/', // Nome do seu repositório no GitHub

  plugins: [react()],
})