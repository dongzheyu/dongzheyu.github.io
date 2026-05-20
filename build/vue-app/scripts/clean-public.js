import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const publicDir = path.join(__dirname, '..', 'public')

console.log('🧹 清理 public 目录中的 node_modules...')

// 需要清理的路径列表
const pathsToClean = [
  'snishaper/build/node_modules',
]

let cleanedCount = 0

for (const relativePath of pathsToClean) {
  const fullPath = path.join(publicDir, relativePath)
  
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true })
      console.log(`  ✓ 已删除: ${relativePath}`)
      cleanedCount++
    } catch (error) {
      console.error(`  ✗ 删除失败: ${relativePath}`, error.message)
    }
  } else {
    console.log(`  ⊘ 不存在: ${relativePath}`)
  }
}

console.log(`\n✅ 清理完成！共删除 ${cleanedCount} 个目录`)

