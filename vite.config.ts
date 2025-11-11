import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [NaiveUiResolver()],
      imports: ['vue'],
      dts: './src/generated/types/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: './src/generated/types/components.d.ts',
    }),
  ],
  test: {
    environment: 'jsdom',
  },
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}));
