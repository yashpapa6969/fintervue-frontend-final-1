import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

function ignoreSourceMapWarnings() {
  return {
    name: 'ignore-sourcemap-warnings',
    load(id) {
      if (this.meta.watchMode) return null;
      return null;
    },
    transform(code, id) {
      if (this.meta.watchMode) return null;
      return {
        code,
        map: null
      };
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    ignoreSourceMapWarnings()
  ],
  build: {
    rollupOptions: {
      external: ['react-auth-kit/createStore', '@auth-kit/react-router/RequireAuth'],
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    include: ['@100mslive/hms-video-react'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components/navbar": path.resolve(__dirname, "./src/components/navbar"),
      "@/components": path.resolve(__dirname, "./src/components")
    },
  },
});
