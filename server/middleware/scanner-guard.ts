import { defineEventHandler, getRequestHeader, setResponseHeaders, setResponseStatus } from 'h3'

const SCANNER_PREFIX_RE = /^\/(?:\.env|\.git|\.aws|\.vscode|\.svn|wp-admin|wp-login|wp-includes|wp-content|phpmyadmin|FIRST_CONFIG|_static\/\.env|cookies\/\.env)(?:\/|$|\.)/i
const SCANNER_SUFFIX_RE = /\.(?:php|php\d|phtml|bak|sql|env|ini|asp|aspx|jsp|cgi|dll)(?:$|\.)/i
const SCANNER_EXACT_OR_TAIL_RE = /(?:^|\/)(?:web\.config|composer\.json|composer\.lock|secrets\.yml|laravel\.log|mail\.json|mail-credentials\.env|\.gitattributes|\.htaccess|credentials)$/i
const BLOCKED_UA_RE = /(?:TLM-Audit-Scanner|sqlmap|nikto|nuclei|masscan|zgrab|dirbuster|gobuster|acunetix|nessus)/i

export default defineEventHandler((event) => {
  const path = String(event.path || event.node?.req?.url || '/').split('?')[0] || '/'
  const ua = getRequestHeader(event, 'user-agent') || ''

  if (path === '/robots.txt' || path === '/sitemap.xml' || path === '/llms.txt') {
    return
  }

  if (
    SCANNER_PREFIX_RE.test(path) ||
    SCANNER_SUFFIX_RE.test(path) ||
    SCANNER_EXACT_OR_TAIL_RE.test(path) ||
    /\/\.env(?:\.|$)/i.test(path)
  ) {
    setResponseStatus(event, 404, 'Not Found')
    setResponseHeaders(event, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'noindex, nofollow'
    })
    return 'Not Found'
  }

  if (BLOCKED_UA_RE.test(ua)) {
    setResponseStatus(event, 403, 'Forbidden')
    setResponseHeaders(event, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'noindex, nofollow'
    })
    return 'Forbidden'
  }
})
