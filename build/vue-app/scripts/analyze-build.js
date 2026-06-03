import { build } from 'vite'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// 分析构建配置
const analyzeBuildConfig = defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: './dist/bundle-analysis.html',
          open: true,
          gzipSize: true,
          brotliSize: true
        })
      ]
    }
  },
})

async function analyzeBuild() {
  try {
    console.log('🔍 开始分析构建...')
    await build(analyzeBuildConfig)
    console.log('✅ 构建分析完成! 报告已生成到 dist/bundle-analysis.html')
  } catch (error) {
    console.error('❌ 构建失败:', error)
    process.exit(1)
  }
}

analyzeBuild()