import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // 포트 번호 설정
    hmr: {
      path: '/ws', // WebSocket 경로 설정
    },
  }
});
