/**
 * postbuild: 将 dist/ 产物复制到主项目的 public/SnishaperWeb 目录
 * 复制规则：
 *   dist/index.html  → ../../../public/SnishaperWeb/index.html
 *   dist/assets/*    → ../../../public/SnishaperWeb/assets/*（先清空再写入）
 *   logo.png         → ../../../public/SnishaperWeb/logo.png
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '../dist');
const rootDir   = path.resolve(__dirname, '../../../public/SnishaperWeb');

// ── helpers ──────────────────────────────────────────────────────────────────

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  const rel = path.relative(rootDir, dest).replace(/\\/g, '/');
  console.log(`  ✔  ${rel}`);
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

console.log('\n📦 postbuild: copying dist → public/SnishaperWeb…\n');

if (!fs.existsSync(distDir)) {
  console.error('❌  dist/ not found. Did vite build succeed?');
  process.exit(1);
}

// 1. index.html
copyFile(
  path.join(distDir, 'index.html'),
  path.join(rootDir, 'index.html'),
);

// 2. logo.png
const sourceLogo = path.resolve(__dirname, '../../logo.png');
if (fs.existsSync(sourceLogo)) {
  copyFile(sourceLogo, path.join(rootDir, 'logo.png'));
}

// 3. assets/ — clean first to remove stale hashed files
const destAssets = path.join(rootDir, 'assets');
console.log(`  🗑  clearing ${path.relative(rootDir, destAssets).replace(/\\/g, '/')}/`);
cleanDir(destAssets);
copyDir(path.join(distDir, 'assets'), destAssets);

console.log('\n✅  done.\n');
