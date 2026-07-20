import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const src = path.join(__dirname, '..', 'dist')
const dest = path.join(__dirname, '..', '..', '..')

if (!fs.existsSync(src)) { console.error('dist not found'); process.exit(1) }

fs.cpSync(src, dest, { recursive: true, force: true })
console.log(`Deployed ${src} → ${dest}`)
