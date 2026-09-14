import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  server: { watch: { useFsEvents: false, usePolling: true } },
  plugins: [
    vinext(),
    {
      name: 'cairn-public-asset-paths',
      enforce: 'post',
      config() {
        if (!basePath) return;
        return {
          experimental: {
            // Vinext는 public URL에도 _next/static을 붙인다. public은 별도 경로다.
            renderBuiltUrl(filename: string, context: { type: string }) {
              return context.type === 'public' ? `${basePath}/${filename}` : `/${filename}`;
            },
          },
        };
      },
    },
  ],
});
