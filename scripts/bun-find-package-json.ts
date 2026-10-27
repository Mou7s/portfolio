/**
 * Bun 兼容垫片：`node:module` 的 `findPackageJSON`。
 *
 * 背景：
 * - nuxt-og-image v7 在模块 setup 阶段调用 `findPackageJSON()`（Node 22.14+ 新增 API）。
 * - Bun（截至 1.4.x）尚未实现该 API，且对 `node:` 内建模块的具名导入会在链接阶段报
 *   `Export named 'findPackageJSON' not found`，因此只能在进程启动前补到内建模块对象上。
 * - 该文件由 bunfig.toml 的 `[run] preload` 注入，先于 Nuxt 加载执行。
 *
 * 一旦 Bun 实现了 `findPackageJSON`，本文件会自动跳过（幂等），之后可整体删除。
 */
import { createRequire } from 'node:module'
import { existsSync, statSync } from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
// 必须使用 CJS 的 require 拿到可写的内建模块对象；ESM 命名空间是只读的。
const nodeModule = require('node:module') as Record<string, unknown>

function toPath(value: string | URL): string {
  if (value instanceof URL) return fileURLToPath(value)
  return String(value).startsWith('file:') ? fileURLToPath(value) : String(value)
}

function findPackageJSON(specifier: string | URL, base?: string | URL): string | undefined {
  const basePath = base == null ? process.cwd() : toPath(base)
  const baseDir = existsSync(basePath) && statSync(basePath).isDirectory() ? basePath : dirname(basePath)

  const spec = specifier instanceof URL ? toPath(specifier) : String(specifier)
  let start = baseDir

  if (spec && spec !== './' && spec !== '.' && spec !== '/') {
    const target = isAbsolute(spec) ? spec : resolve(baseDir, spec)
    start = existsSync(target) && statSync(target).isDirectory() ? target : dirname(target)
  }

  let dir = start
  while (true) {
    const candidate = join(dir, 'package.json')
    if (existsSync(candidate)) return candidate
    const parent = dirname(dir)
    if (parent === dir) return undefined
    dir = parent
  }
}

if (typeof nodeModule.findPackageJSON !== 'function') {
  nodeModule.findPackageJSON = findPackageJSON
}
