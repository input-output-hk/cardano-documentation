const config = require('../../config')

const stripNumbersFromPath = require('./stripNumbersFromPath')

const canonicalPath = path => {
  let canonical = stripNumbersFromPath(path) ?? '/'

  if (!canonical.startsWith('/')) {
    canonical = '/' + canonical
  }

  if (!canonical.endsWith('/') && config.gatsby.trailingSlash) {
    canonical = canonical + '/'
  }

  return (config.gatsby.pathPrefix + canonical).replace(/\/+/g, '/')
}

/**
 * @param {string} path
 * @returns {string}
 */
const canonicalUrl = path => {
  return (config.gatsby.siteUrl + canonicalPath(path)).replace(/\/+/g, '/')
}

module.exports = {
  canonicalPath,
  canonicalUrl,
}
