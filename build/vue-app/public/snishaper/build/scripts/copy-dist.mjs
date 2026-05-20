/**
 * postbuild: 将 dist/ 产物复制到主项目的 public/snishaper 目录
 * 复制规则：
 *   dist/index.html  → ../../snishaper/index.html
 *   dist/assets/*    → ../../snishaper/assets/*（先清空再写入）
 *   logo.png         → ../../snishaper/logo.png
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir   = path.resolve(__dirname, '../dist');
const rootDir   = path.resolve(__dirname, '../..');

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

console.log('\n📦 postbuild: copying dist → public/snishaper…\n');

if (!fs.existsSync(distDir)) {
  console.error('❌  dist/ not found. Did vite build succeed?');
  process.exit(1);
}

// 1. index.html
copyFile(
  path.join(distDir, 'index.html'),
  path.join(rootDir, 'index.html'),
);

// 2. logo.png - 不复制，保留 snishaper 目录原有的 logo

// 3. assets/ — clean first to remove stale hashed files
const destAssets = path.join(rootDir, 'assets');
console.log(`  🗑  clearing ${path.relative(rootDir, destAssets).replace(/\\/g, '/')}/`);
cleanDir(destAssets);
copyDir(path.join(distDir, 'assets'), destAssets);

console.log('\n✅  done.\n');
