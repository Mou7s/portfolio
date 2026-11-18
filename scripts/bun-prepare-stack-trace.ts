/**
 * Bun 兼容垫片：修复 `Error.prepareStackTrace` 遇到非原生 Error 实例时抛出 TypeError 的问题。
 *
 * 背景：
 * - jiti 在缓存未命中时会调用内置 `@babel/core`（`jiti/dist/babel.cjs`），其 `setupPrepareStackTrace()`
 *   会捕获并包装当前的 `Error.prepareStackTrace`。
 * - Node/V8 下 `Error.prepareStackTrace` 默认为 `undefined`，Babel 会回退到纯 JS 的默认格式化器；
 *   而 Bun 默认将其初始化为原生函数 `ErrorPrepareStackTrace`，当传入非内部 Error 实例
 *   （`Error.isError(err) === false`）时会抛出 `TypeError: First argument must be an Error object`。
 * - Vite 内联的 `follow-redirects` 等库通过 `CustomError.prototype = new Error()` 继承，
 *   并在构造时调用 `Error.captureStackTrace(this, this.constructor)`；当 `Error.prepareStackTrace`
 *   被包装后，Bun 会立即调用该函数并触发上述报错，导致 `nuxt prepare` / `nuxt build` 中断。
 * - 本文件由 `bunfig.toml` 顶层 `preload` 注入，在所有依赖加载前为原生 `Error.prepareStackTrace`
 *   包裹一层类型守卫，对非原生 Error 对象回退为标准 `Error.prototype.toString` + 栈帧格式化。
 *
 * 一旦 Bun 原生 `ErrorPrepareStackTrace` 兼容继承自 Error 的自定义对象，可移除本垫片。
 */
const SHIM_MARKER = Symbol.for('portfolio.bunPrepareStackTraceShim')

type PrepareStackTraceFn = ((error: unknown, stackTraces: unknown[]) => unknown) & {
  [SHIM_MARKER]?: boolean
}

type ErrorConstructorWithInternals = ErrorConstructor & {
  isError?: (value: unknown) => boolean
  prepareStackTrace?: PrepareStackTraceFn
}

const errorCtor = Error as ErrorConstructorWithInternals
const originalPrepareStackTrace = errorCtor.prepareStackTrace

function formatFallbackStack(error: unknown, stackTraces: readonly unknown[]): string {
  const header = error != null && typeof error === 'object'
    ? Error.prototype.toString.call(error)
    : String(error)

  if (!Array.isArray(stackTraces) || stackTraces.length === 0) {
    return header
  }

  return `${header}\n    at ${stackTraces.join('\n    at ')}`
}

if (typeof originalPrepareStackTrace === 'function' && !originalPrepareStackTrace[SHIM_MARKER]) {
  const isNativeError = typeof errorCtor.isError === 'function'
    ? errorCtor.isError.bind(errorCtor)
    : null

  const shimmedPrepareStackTrace: PrepareStackTraceFn = function prepareStackTraceShim(
    this: unknown,
    error: unknown,
    stackTraces: unknown[],
  ): unknown {
    if (isNativeError && !isNativeError(error)) {
      return formatFallbackStack(error, stackTraces)
    }

    try {
      return Reflect.apply(originalPrepareStackTrace, this, [error, stackTraces])
    }
    catch (err) {
      if (err instanceof TypeError && err.message.includes('Error object')) {
        return formatFallbackStack(error, stackTraces)
      }
      throw err
    }
  }

  shimmedPrepareStackTrace[SHIM_MARKER] = true
  errorCtor.prepareStackTrace = shimmedPrepareStackTrace
}
