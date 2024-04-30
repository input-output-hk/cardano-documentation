import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '9f6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'eb0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'ad9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '07c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '9b8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'ddb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '628'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '13a'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'ff5'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '076'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'ea9'),
            routes: [
              {
                path: '/cardano-testnets/',
                component: ComponentCreator('/cardano-testnets/', '54e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/daedalus-testnet',
                component: ComponentCreator('/cardano-testnets/daedalus-testnet', 'dab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/environments',
                component: ComponentCreator('/cardano-testnets/environments', '620'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/getting-started',
                component: ComponentCreator('/cardano-testnets/getting-started', '326'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/local-testnet',
                component: ComponentCreator('/cardano-testnets/local-testnet', 'aad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/resources',
                component: ComponentCreator('/cardano-testnets/resources', 'c60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/support-feedback',
                component: ComponentCreator('/cardano-testnets/support-feedback', '60b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/tools/faucet',
                component: ComponentCreator('/cardano-testnets/tools/faucet', 'ce4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/tools/plutus-fee-estimator',
                component: ComponentCreator('/cardano-testnets/tools/plutus-fee-estimator', '0da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/cardano-testnets/tools/staking-calculator',
                component: ComponentCreator('/cardano-testnets/tools/staking-calculator', '1eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/community/ambassador-program',
                component: ComponentCreator('/community/ambassador-program', '403'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/community/Cardano-stack-exchange',
                component: ComponentCreator('/community/Cardano-stack-exchange', 'e9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/community/cips',
                component: ComponentCreator('/community/cips', 'e71'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/community/community-content',
                component: ComponentCreator('/community/community-content', '998'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/community/essential-cardano',
                component: ComponentCreator('/community/essential-cardano', 'ad4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/community/getting-support',
                component: ComponentCreator('/community/getting-support', 'e9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/',
                component: ComponentCreator('/development-guidelines/', '258'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/cardano-node-course',
                component: ComponentCreator('/development-guidelines/cardano-node-course', 'e84'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/native-tokens',
                component: ComponentCreator('/development-guidelines/native-tokens', '060'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/scalability/hydra',
                component: ComponentCreator('/development-guidelines/scalability/hydra', 'ab0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/scalability/mithril',
                component: ComponentCreator('/development-guidelines/scalability/mithril', '012'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/smart-contracts/aiken',
                component: ComponentCreator('/development-guidelines/smart-contracts/aiken', 'c1c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/smart-contracts/marlowe',
                component: ComponentCreator('/development-guidelines/smart-contracts/marlowe', '4fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/smart-contracts/plutus',
                component: ComponentCreator('/development-guidelines/smart-contracts/plutus', '58d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/transaction-tutorials/',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/', 'e70'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/transaction-tutorials/minting-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/minting-transaction', '68b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/transaction-tutorials/multiple-purposes',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/multiple-purposes', '8db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/transaction-tutorials/redelegate-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/redelegate-transaction', '922'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/transaction-tutorials/stake-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/stake-transaction', '654'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/development-guidelines/transaction-tutorials/withdraw-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/withdraw-transaction', 'e8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/about-hard-forks',
                component: ComponentCreator('/evolution/about-hard-forks', '938'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/cardano-design-rationale',
                component: ComponentCreator('/evolution/cardano-design-rationale', '2ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/eras-and-phases',
                component: ComponentCreator('/evolution/eras-and-phases', 'a1b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/upgrades/allegra',
                component: ComponentCreator('/evolution/upgrades/allegra', 'ea0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/upgrades/alonzo',
                component: ComponentCreator('/evolution/upgrades/alonzo', '6a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/upgrades/byron-to-shelley',
                component: ComponentCreator('/evolution/upgrades/byron-to-shelley', 'c7a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/upgrades/mary',
                component: ComponentCreator('/evolution/upgrades/mary', '940'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/upgrades/valentine',
                component: ComponentCreator('/evolution/upgrades/valentine', '4ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/evolution/upgrades/vasil',
                component: ComponentCreator('/evolution/upgrades/vasil', '343'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/cardano-architecture',
                component: ComponentCreator('/explore-cardano/cardano-architecture', '3ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/cardano-network/',
                component: ComponentCreator('/explore-cardano/cardano-network/', '352'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/cardano-network/networking-protocol',
                component: ComponentCreator('/explore-cardano/cardano-network/networking-protocol', 'b3f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/cardano-network/p2p-networking',
                component: ComponentCreator('/explore-cardano/cardano-network/p2p-networking', '0df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/concurrency',
                component: ComponentCreator('/explore-cardano/concurrency', 'f08'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/fee-structure',
                component: ComponentCreator('/explore-cardano/fee-structure', '359'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/monetary-policy',
                component: ComponentCreator('/explore-cardano/monetary-policy', '32d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/parameter-guide',
                component: ComponentCreator('/explore-cardano/parameter-guide', 'b4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/relevant-research-papers',
                component: ComponentCreator('/explore-cardano/relevant-research-papers', '2fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/explore-cardano/time',
                component: ComponentCreator('/explore-cardano/time', 'cb5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/introduction',
                component: ComponentCreator('/introduction', '83b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/cardano-addresses',
                component: ComponentCreator('/learn/cardano-addresses', '641'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/cardano-keys',
                component: ComponentCreator('/learn/cardano-keys', 'd74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/cardano-node',
                component: ComponentCreator('/learn/cardano-node', '3d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/chain-confirmation-versus-transaction-confirmation',
                component: ComponentCreator('/learn/chain-confirmation-versus-transaction-confirmation', '4b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/collateral-mechanism',
                component: ComponentCreator('/learn/collateral-mechanism', '89b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/consensus-explained',
                component: ComponentCreator('/learn/consensus-explained', '281'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/delegation',
                component: ComponentCreator('/learn/delegation', '2cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/eutxo-explainer',
                component: ComponentCreator('/learn/eutxo-explainer', '3fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/ouroboros-overview',
                component: ComponentCreator('/learn/ouroboros-overview', 'dec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/pledging-rewards',
                component: ComponentCreator('/learn/pledging-rewards', 'e7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/stake-pools',
                component: ComponentCreator('/learn/stake-pools', 'a60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/learn/transaction-costs-determinism',
                component: ComponentCreator('/learn/transaction-costs-determinism', '16f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/',
                component: ComponentCreator('/new-to-cardano/', '5c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/cardano-tracking-tools',
                component: ComponentCreator('/new-to-cardano/cardano-tracking-tools', '4cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/how-to-delegate',
                component: ComponentCreator('/new-to-cardano/how-to-delegate', 'e3a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/proof-of-stake',
                component: ComponentCreator('/new-to-cardano/proof-of-stake', '7d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/types-of-wallets',
                component: ComponentCreator('/new-to-cardano/types-of-wallets', '57d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/what-is-a-blockchain',
                component: ComponentCreator('/new-to-cardano/what-is-a-blockchain', '163'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/what-is-a-cryptocurrency',
                component: ComponentCreator('/new-to-cardano/what-is-a-cryptocurrency', '91f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/new-to-cardano/what-is-a-smart-contract',
                component: ComponentCreator('/new-to-cardano/what-is-a-smart-contract', '8b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/about-stake-pools',
                component: ComponentCreator('/operating-a-stake-pool/about-stake-pools', '19a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/creating-a-stake-pool',
                component: ComponentCreator('/operating-a-stake-pool/creating-a-stake-pool', '810'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/creating-keys-and-certificates',
                component: ComponentCreator('/operating-a-stake-pool/creating-keys-and-certificates', 'a6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/guidelines-for-large-spos',
                component: ComponentCreator('/operating-a-stake-pool/guidelines-for-large-spos', '445'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/node-connectivity',
                component: ComponentCreator('/operating-a-stake-pool/node-connectivity', 'ab8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/performance',
                component: ComponentCreator('/operating-a-stake-pool/performance', 'ec6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/public-stake-pools',
                component: ComponentCreator('/operating-a-stake-pool/public-stake-pools', 'c03'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/ranking',
                component: ComponentCreator('/operating-a-stake-pool/ranking', 'ebd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/SMASH',
                component: ComponentCreator('/operating-a-stake-pool/SMASH', '053'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/operating-a-stake-pool/stake-pool-operations-101',
                component: ComponentCreator('/operating-a-stake-pool/stake-pool-operations-101', '648'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pioneer-programs/plutus-pioneers',
                component: ComponentCreator('/pioneer-programs/plutus-pioneers', '6f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/release-notes/comp-matrix',
                component: ComponentCreator('/release-notes/comp-matrix', 'ac2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/release-notes/release-notes',
                component: ComponentCreator('/release-notes/release-notes', 'e6c'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
