import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [reactRefresh()],
  css: { preprocessorOptions:
    {
      css: {
        charset: false
      },
      scss: {
        charset: false
      }
    }
  }
})
