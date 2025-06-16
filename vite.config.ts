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
          entry: './src/index.ts',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              'react': 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
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