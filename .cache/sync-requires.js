

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": (preferDefault(require("/Users/fstoqnov/cardano-documentation/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": (preferDefault(require("/Users/fstoqnov/cardano-documentation/src/pages/404.js"))),
  "component---src-pages-index-tsx": (preferDefault(require("/Users/fstoqnov/cardano-documentation/src/pages/index.tsx")))
}

