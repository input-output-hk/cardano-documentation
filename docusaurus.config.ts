import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import { redirects } from './redirects'

const editUrl =
  'https://github.com/input-output-hk/cardano-documentation/blob/master/'

const config: Config = {
  title: 'Cardano Docs',
  favicon: 'img/cardano-favicon.png',

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

  plugins: [
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
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/cardano-logo.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Cardano logo',
        src: 'img/cardano-logo.svg',
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
          html: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1"
                  viewBox="0 -2 30 30" size="25" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645
                  0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12
                  0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696
                  0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627
                  1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545
                   0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085
                   1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453
                   3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153
                   3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015
                   2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645
                   0-6.195-5.023-11.219-11.219-11.219z"></path></svg>`,
          href: 'https://github.com/input-output-hk/cardano-documentation',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Cardano Logo',
        src: 'img/cardano-logo.svg',
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
            { label: 'Why Cardano', href: 'https://why.cardano.org/' },
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
              label: 'Cardano Reddit',
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
          title: 'Legal',
          items: [
            {
              label: 'IOHK Privacy Policy',
              href: 'https://static.iohk.io/terms/iog-privacy-policy.pdf',
            },
            {
              label: 'IOHK Terms & Conditions',
              href: 'https://static.iohk.io/terms/iohktermsandconditions.pdf',
            },
          ],
        },
        {
          title: 'Social',
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
              label: 'Blog',
              href: 'https://iohk.io/en/blog/posts/page-1/',
            },
          ],
        },
      ],
      copyright: `<p>Cardano is an open-source project.

      Cardano is a software platform ONLY and does not conduct any independent diligence on, or substantive review of, any blockchain asset, digital currency, cryptocurrency or associated funds. You are fully and solely responsible for evaluating your investments, for determining whether you will exchange blockchain assets based on your own judgement, and for all your decisions as to whether to exchange blockchain assets with Cardano. In many cases, blockchain assets you exchange on the basis of your research may not increase in value, and may decrease in value. Similarly, blockchain assets you exchange on the basis of your research may fall or rise in value after your exchange.

      Past performance is not indicative of future results. Any investment in blockchain assets involves the risk of loss of part or all of your investment. The value of the blockchain assets you exchange is subject to market and other investment risks.</p>

      <p class="copyright-license">This work is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">CC BY 4.0<img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>
      
      <p>© IOHK 2015-${new Date().getFullYear()} - IOHK Supported Project</p>`,
    },
    prism: {
      theme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
