import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 源目录和目标目录
const srcDir = path.join(__dirname, '..', 'dist')
const destDir = path.join(__dirname, '..', '..', '..')

console.log('🚀 开始部署...')
console.log(`源目录: ${srcDir}`)
console.log(`目标目录: ${destDir}`)

// 检查源目录是否存在
if (!fs.existsSync(srcDir)) {
  console.error('❌ 错误: dist 目录不存在，请先运行 npm run build')
  process.exit(1)
}

// 递归复制函数（强制覆盖）
function copyRecursive(src, dest) {
  const stats = fs.statSync(src)
  
  if (stats.isDirectory()) {
    // 创建目标目录（如果不存在）
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    
    // 读取源目录中的所有文件
    const entries = fs.readdirSync(src)
    
    for (const entry of entries) {
      // 排除 node_modules 目录
      if (entry === 'node_modules') {
        console.log(`  ⊘ 跳过: ${path.relative(srcDir, path.join(src, entry))}`)
        continue
      }
      
      const srcPath = path.join(src, entry)
      const destPath = path.join(dest, entry)
      copyRecursive(srcPath, destPath)
    }
  } else {
    // 强制覆盖文件
    fs.copyFileSync(src, dest)
    const relPath = path.relative(srcDir, src)
    const mtime = fs.statSync(dest).mtime
    console.log(`  ✓ ${relPath} (${mtime.toLocaleString('zh-CN')})`)
  }
}


try {
  // 执行复制（强制覆盖）
  copyRecursive(srcDir, destDir)
  
  console.log('\n✅ 部署完成！')
  console.log(`已复制 ${countFiles(srcDir)} 个文件到 ${destDir}`)
  
  // 检查关键文件的修改日期
  console.log('\n📅 文件修改日期检查:')
  const keyFiles = ['index.html', 'assets']
  for (const file of keyFiles) {
    const filePath = path.join(destDir, file)
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      const type = stats.isDirectory() ? '目录' : '文件'
      console.log(`  ${type}: ${file}`)
      console.log(`    修改时间: ${stats.mtime.toLocaleString('zh-CN')}`)
      console.log(`    创建时间: ${stats.birthtime.toLocaleString('zh-CN')}`)
    }
  }
} catch (error) {
  console.error('❌ 部署失败:', error.message)
  process.exit(1)
}

// 统计文件数量
function countFiles(dir) {
  let count = 0
  const entries = fs.readdirSync(dir)
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = fs.statSync(fullPath)
    
    if (stats.isDirectory()) {
      count += countFiles(fullPath)
    } else {
      count++
    }
  }
  
  return count
}
