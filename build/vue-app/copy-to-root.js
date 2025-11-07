import fs from 'fs'
import path from 'path'

const sourceDir = './dist'
const targetDir = 'D:\WEB\JetCPPWebsite\'

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

console.log('正在复制Vue构建文件到项目根目录...')

try {
  // 复制所有文件和目录
  copyRecursiveSync(sourceDir, targetDir)
  console.log('✅ 复制完成！Vue网站已更新到项目根目录')
} catch (error) {
  console.error('❌ 复制失败:', error.message)
  process.exit(1)
}