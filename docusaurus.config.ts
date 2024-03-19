import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Cardano Docs',
  favicon: 'img/cardano-favicon.png',

  // Set the production url of your site here
  url: 'https://docs.cardano.org/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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

  plugins: [['docusaurus-node-polyfills', { excludeAliases: ['console'] }]],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/input-output-hk/cardano-documentation',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
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
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/input-output-hk/cardano-documentation',
          label: 'GitHub',
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
      copyright: `Cardano is an open-source project. 
      
      Cardano is a software platform ONLY and does not conduct any independent diligence on, or substantive review of, any blockchain asset, digital currency, cryptocurrency or associated funds. You are fully and solely responsible for evaluating your investments, for determining whether you will exchange blockchain assets based on your own judgement, and for all your decisions as to whether to exchange blockchain assets with Cardano. In many cases, blockchain assets you exchange on the basis of your research may not increase in value, and may decrease in value. Similarly, blockchain assets you exchange on the basis of your research may fall or rise in value after your exchange.
      
      Past performance is not indicative of future results. Any investment in blockchain assets involves the risk of loss of part or all of your investment. The value of the blockchain assets you exchange is subject to market and other investment risks.
      
      © IOHK 2015-${new Date().getFullYear()} - IOHK Supported Project`,
    },
    prism: {
      theme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
