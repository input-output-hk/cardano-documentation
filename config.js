const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://docs.cardano.org',
    gaTrackingId: `UA-119953429-2`,
    trailingSlash: true,
  },
  header: {
    logo: '/images/cardano-logo.svg',
    logoLink: '/',
    title: '<p>DOCS</p>',
    githubUrl: 'https://github.com/input-output-hk/cardano-documentation',
    helpUrl: '',
    tweetText: '',
    social: `<li>
		    <a href="https://twitter.com/cardano" target="_blank" rel="noopener noreferrer">
		      <div class="twitterBtn">
		        <img src='/images/twitter-icon.svg' alt={'Twitter'}/>
		      </div>
		    </a>
		  </li>
			<li>
		    <a href="https://discord.gg/UjUP8nz" target="_blank" rel="noopener noreferrer">
		      <div class="discordBtn">
		        <img src='/images/discord-icon.svg' alt={'Discord'}/>
		      </div>
		    </a>
		  </li>`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: 'cardano',
      algoliaApiKey: process.env.GATSBY_ALGOLIA_API_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/01-introduction/', // add trailing slash if enabled above
      // '/02-getting-started/'
    ],
    collapsedNav: [
      // add headings here if to be collapsed by default
      // '/02-getting-started/', // add trailing slash if enabled above
      '/getting-started',
      '/getting-started/operating-a-stake-pool',
      '/new-to-cardano',
      '/core-concepts',
      '/explore-cardano',
      '/explore-cardano/cardano-architecture-overview',
      '/explore-cardano/about-cardano-network',
      '/cardano-components',
      '/native-tokens',
      '/marlowe',
      '/rosetta',
      '/community',
      '/tools',
    ],
    links: [
      { text: 'Glossary', link: 'https://www.essentialcardano.io/glossary?sort=alphabetical' },
      { text: 'Cardano.org', link: 'https://cardano.org' },
      { text: 'Developer Portal', link: 'https://developers.cardano.org/' },
    ],
    frontLine: true, // This toggles collapse arrows
    ignoreIndex: true,
    title:
      "<a href='https://why.cardano.org' target='_blank' rel='noopener noreferrer'>Cardano </a><div class='accentCircle'></div><a href='https://www.haskell.org/' target='_blank' rel='noopener noreferrer'>Haskell</a>",
  },
  siteMetadata: {
    title: 'Cardano Documentation',
    description: 'Documentation for the Cardano ecosystem ',
    ogImage: null,
    docsLocation:
      'https://github.com/input-output-hk/cardano-documentation/tree/master/content',
    favicon: 'pwa-512.png',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Cardano Documention',
      short_name: 'Cardano Docs',
      start_url: '/',
      background_color: '#1d1e21',
      theme_color: '#5281f7',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
}
module.exports = config
