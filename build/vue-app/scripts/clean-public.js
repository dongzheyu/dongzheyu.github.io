import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const target = path.join(__dirname, '..', 'public', 'snishaper', 'build', 'node_modules')

if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true })
  console.log('cleaned:', target)
}

