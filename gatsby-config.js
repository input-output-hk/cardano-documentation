require('dotenv').config()

const config = require('./config')

const plugins = [
  'gatsby-plugin-sitemap',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.js`),
    },
  },
  'gatsby-plugin-emotion',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/content/images`,
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-mermaid',
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
      ],
      extensions: ['.mdx', '.md'],
    },
  },
  {
    resolve: `gatsby-plugin-posthog`,
    options: {
      // Specify the API key for your PostHog Project (required)
      apiKey: 'phc_GB82t5tMT4EVKUpOCPTOuhezu3trmJUCGtSnFHB3fK3',
      // Specify the app host if self-hosting (optional, default: https://app.posthog.com)
      apiHost: 'https://eu.posthog.com',
      projectId: 11673,
      // Puts tracking script in the head instead of the body (optional, default: true)
      head: true,
      // Enable posthog analytics tracking during development (optional, default: false)
      isEnabledDevMode: true,
    },
  },
  // {
  //   resolve: 'gatsby-transformer-remark',
  //   options: {
  //     plugins: [
  //       'gatsby-remark-mermaid'
  //     ]
  //   }
  // }
]

// check and add pwa functionality

if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  })
  plugins.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: require.resolve(`./src/custom-sw-code.js`),
    },
  })
} else {
  plugins.push('gatsby-plugin-remove-serviceworker')
}

// check and remove trailing slash
if (config.gatsby && !config.gatsby.trailingSlash) {
  plugins.push('gatsby-plugin-remove-trailing-slashes')
}

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : '/',
      image: config.header.logo,
    }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins: plugins,
}
