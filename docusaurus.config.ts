import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { redirects } from './redirects'

import customWebpackPlugin from './customWebpackPlugin'

const editUrl =
  'https://github.com/input-output-hk/cardano-documentation/blob/master/'

const config: Config = {
  title: 'Cardano Docs',
  favicon: 'assets/cardano-favicon.png',

  // Set the production url of your site here
  url: 'https://docs.cardano.org/',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'IOHK', // Usually your GitHub org/user name.
  projectName: 'Cardano-documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    posthogApiKey: 'phc_GB82t5tMT4EVKUpOCPTOuhezu3trmJUCGtSnFHB3fK3',
    posthogApiHost: 'https://eu.posthog.com',
    posthogProjectId: 11673,
  },

  scripts: [
    {
      // GDPR
      src: 'https://cmp.osano.com/AzZXI3TYiFWNB5yus/b2ba081d-c77c-4db8-bbf7-46c47e1d7f80/osano.js',
      async: false,
    },
  ],

  plugins: [
    customWebpackPlugin,
    [
      '@cmfcmf/docusaurus-search-local',
      {
        indexDocs: true,
      },
    ],
    ['docusaurus-node-polyfills', { excludeAliases: ['console'] }],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: redirects,
        createRedirects(existingPath) {
          if (existingPath.includes('/cardano-testnet')) {
            return [
              existingPath.replace('/cardano-testnet', '/cardano-testnets'),
            ]
          }
          return undefined // Return a falsy value: no redirect created
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          editUrl: editUrl,
          editLocalizedFiles: true,
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/osano.css'),
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'assets/cardano-logo.svg',
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      logo: {
        alt: 'Cardano logo',
        src: 'assets/cardano-logo.svg',
      },
      items: [
        {
          to: 'about-cardano/introduction',
          label: 'About',
          position: 'left',
        },
        {
          to: 'developer-resources/welcome',
          label: 'Developer resources',
          position: 'left',
        },
        {
          to: 'stake-pool-operators/operating-a-stake-pool',
          label: 'Stake pool operations',
          position: 'left',
        },
        {
          to: 'cardano-testnets/environments',
          label: 'Testnets',
          position: 'left',
        },
        {
          to: 'pioneer-programs/plutus-pioneers',
          label: 'Education',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'right',
          items: [
            {
              label: 'Support',
              href: 'https://iohk.zendesk.com/hc/en-us/requests/new',
            },
            {
              label: 'Essential Cardano',
              href: 'https://www.essentialcardano.io/',
            },
            {
              label: 'Cardano Stack Exchange',
              href: 'https://cardano.stackexchange.com/',
            },
            {
              label: 'Ambassadors program',
              href: 'https://cardano.org/ambassadors/',
            },
            {
              label: 'Cardano Improvement Proposals (CIPs)',
              href: 'https://cips.cardano.org/',
            },
          ],
        },
        {
          label: 'Developer portal',
          href: 'https://developers.cardano.org/',
          position: 'right',
        },
        {
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clip-path="url(#clip0_2171_3372)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9702 0.5C4.45694 0.5 0 4.85417 0 10.2409C0 14.5467 2.85571 18.1916 6.81735 19.4816C7.31265 19.5786 7.49408 19.272 7.49408 19.0141C7.49408 18.7883 7.47776 18.0142 7.47776 17.2077C4.70429 17.7884 4.12674 16.0466 4.12674 16.0466C3.68102 14.9176 3.02061 14.6275 3.02061 14.6275C2.11286 14.0308 3.08673 14.0308 3.08673 14.0308C4.09367 14.0953 4.62204 15.0306 4.62204 15.0306C5.51327 16.5142 6.94939 16.095 7.52714 15.837C7.60959 15.208 7.87388 14.7726 8.15449 14.5307C5.94245 14.3049 3.6151 13.4663 3.6151 9.7247C3.6151 8.6603 4.01102 7.78947 4.63837 7.1122C4.53939 6.87034 4.19265 5.87027 4.73755 4.53176C4.73755 4.53176 5.57939 4.27368 7.47755 5.53164C8.29022 5.31841 9.12832 5.20994 9.9702 5.20903C10.812 5.20903 11.6702 5.32204 12.4627 5.53164C14.361 4.27368 15.2029 4.53176 15.2029 4.53176C15.7478 5.87027 15.4008 6.87034 15.3018 7.1122C15.9457 7.78947 16.3253 8.6603 16.3253 9.7247C16.3253 13.4663 13.998 14.2887 11.7694 14.5307C12.1327 14.8371 12.4461 15.4176 12.4461 16.3369C12.4461 17.6431 12.4298 18.6915 12.4298 19.0139C12.4298 19.272 12.6114 19.5786 13.1065 19.4818C17.0682 18.1914 19.9239 14.5467 19.9239 10.2409C19.9402 4.85417 15.4669 0.5 9.9702 0.5Z" fill="currentColor"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_2171_3372">
                  <rect width="20" height="19" fill="currentColor" transform="translate(0 0.5)"/>
                  </clipPath>
                  </defs>
                </svg>`,
          href: 'https://github.com/input-output-hk/cardano-documentation',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Cardano Logo',
        src: 'assets/cardano-logo-blue.svg',
        srcDark: 'assets/cardano-logo.svg',
      },
      links: [
        {
          title: 'More About Cardano',
          items: [
            { label: 'Cardano Explorer', href: 'https://cardanoexplorer.com/' },
            {
              label: 'Cardano Foundation',
              href: 'https://cardanofoundation.org/',
            },
            { label: 'Cardano.org', href: 'https://www.cardano.org/' },
            { label: 'Daedalus', href: 'https://daedaluswallet.io/' },
          ],
        },
        {
          title: 'Join the community',
          items: [
            { label: 'Cardano Community', href: 'https://cardano.org/' },
            {
              label: 'Cardano Telegram',
              href: 'https://t.me/CardanoAnnouncements/',
            },
            { label: 'Cardano Forum', href: 'https://forum.cardano.org/' },
            {
              label: 'Cardano Blog',
              href: 'https://www.reddit.com/r/cardano/',
            },
            { label: 'IOHK', href: 'https://www.iohk.io/' },
            { label: 'IOHK blog', href: 'https://www.iohk.io/blog/' },
            {
              label: 'IOHK YouTube',
              href: 'https://www.youtube.com/channel/UCBJ0p9aCW-W82TwNM-z3V2w',
            },
            {
              label: 'Cardano Foundation YouTube',
              href: 'https://www.youtube.com/channel/UCbQ9vGfezru1YRI1zDCtTGg',
            },
            {
              label: 'Cardano Foundation Twitter',
              href: 'https://twitter.com/Cardano_CF',
            },
            {
              label: 'IOG Academy',
              href: 'https://www.youtube.com/channel/UCX9j__vYOJu00iqBrCzecVw',
            },
          ],
        },
        {
          title: 'Follow us',
          items: [
            {
              label: 'X',
              href: 'https://twitter.com/inputoutputHK',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/iohk.io/',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/c/IohkIo',
            },
            {
              label: 'Reddit',
              href: 'https://www.reddit.com/r/cardano/',
            },
          ],
        },
      ],
      copyright: `<p>Cardano is an open-source project. Cardano is a software platform ONLY and does not conduct any independent diligence on, or substantive review of, any blockchain asset, digital currency, cryptocurrency or associated funds. You are fully and solely responsible for evaluating your investments, for determining whether you will exchange blockchain assets based on your own judgement, and for all your decisions as to whether to exchange blockchain assets with Cardano. In many cases, blockchain assets you exchange on the basis of your research may not increase in value, and may decrease in value. Similarly, blockchain assets you exchange on the basis of your research may fall or rise in value after your exchange. Past performance is not indicative of future results. Any investment in blockchain assets involves the risk of loss of part or all of your investment. The value of the blockchain assets you exchange is subject to market and other investment risks.</p>
      <p class="copyright-license">This work is licensed under CC BY 4.0</p>
      
      <p>© IOHK 2015-${new Date().getFullYear()} - IOHK Supported Project</p>`,
    },
    prism: {
      theme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
