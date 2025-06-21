import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'
  
  if (isLib) {
    // Library build configuration
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          exclude: ['**/*.stories.*', '**/*.test.*', '**/demo/**']
        })
      ],
      build: {
        lib: {
          entry: {
            index: './src/index.ts',
            headless: './src/headless.ts'
          },
          formats: ['es', 'cjs'],
          fileName: (format, entryName) => {
            if (entryName === 'headless') return `headless.${format === 'es' ? 'esm' : format}.js`;
            return `index.${format === 'es' ? 'esm' : format}.js`;
          }
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              'react': 'React',
              'react-dom': 'ReactDOM'
            },
            // Bundle CSS as separate file with proper naming
            assetFileNames: (assetInfo) => {
              // Force CSS files to be named 'style.css'
              if (assetInfo.names?.[0]?.endsWith('.css') || assetInfo.type === 'asset') {
                return 'style.css';
              }
              return assetInfo.names?.[0] || 'assets/[name]-[hash][extname]';
            }
          }
        },
        // Ensure CSS is extracted and not split
        cssCodeSplit: false,
        // Copy CSS files to dist
        copyPublicDir: false
      }
    }
  }

  // Demo build configuration for GitHub Pages
  return {
    plugins: [react()],
    base: '/pastel-color-picker/',
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@': './src'
      }
    }
  }
}) 