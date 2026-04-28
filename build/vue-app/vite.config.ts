import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // 优化 Vue 插件性能
      template: {
        compilerOptions: {
          // 跳过不必要的注释处理
          comments: false
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // 优化构建性能
    minify: 'esbuild', // 使用 esbuild 替代 terser，速度更快
    cssMinify: 'lightningcss', // 使用 lightningcss 压缩 CSS
    target: 'esnext', // 使用现代浏览器目标，减少转译工作
    rollupOptions: {
      output: {
        // 优化代码分割 - Vite 8 使用函数形式
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vendor'
            }
            if (id.includes('bootstrap')) {
              return 'bootstrap'
            }
          }
          // 显式返回 undefined 表示不分割
          return undefined
        }
      }
    },
    // 启用 sourcemap 用于调试（生产环境可关闭）
    sourcemap: false,
    // 减少 chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: 'localhost',
    port: 5174
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'bootstrap'],
    // 排除不需要预构建的依赖
    exclude: []
  },
  // 禁用不必要的功能以提升性能
  esbuild: {
    // 移除 console 和 debugger（生产环境）
    drop: ['console', 'debugger']
  }
})