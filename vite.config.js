import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    // Нужно для работы горячей перезагрузки, когда папка проекта
    // примонтирована в контейнер Docker (Windows/macOS)
    watch: {
      usePolling: true,
    },
  },
})
