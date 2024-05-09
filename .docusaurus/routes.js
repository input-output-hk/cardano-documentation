import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/', '13a'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f2a'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '75a'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '493'),
            routes: [
              {
                path: '/about-cardano/evolution/about-hard-forks',
                component: ComponentCreator('/about-cardano/evolution/about-hard-forks', '4f5'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/cardano-design-rationale',
                component: ComponentCreator('/about-cardano/evolution/cardano-design-rationale', '204'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/eras-and-phases',
                component: ComponentCreator('/about-cardano/evolution/eras-and-phases', 'fad'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/upgrades/allegra',
                component: ComponentCreator('/about-cardano/evolution/upgrades/allegra', 'c60'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/upgrades/alonzo',
                component: ComponentCreator('/about-cardano/evolution/upgrades/alonzo', '796'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/upgrades/byron-to-shelley',
                component: ComponentCreator('/about-cardano/evolution/upgrades/byron-to-shelley', '4a6'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/upgrades/mary',
                component: ComponentCreator('/about-cardano/evolution/upgrades/mary', '593'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/upgrades/valentine',
                component: ComponentCreator('/about-cardano/evolution/upgrades/valentine', '102'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/evolution/upgrades/vasil',
                component: ComponentCreator('/about-cardano/evolution/upgrades/vasil', '527'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/cardano-architecture',
                component: ComponentCreator('/about-cardano/explore-more/cardano-architecture', '9d6'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/cardano-network/',
                component: ComponentCreator('/about-cardano/explore-more/cardano-network/', 'ec4'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/cardano-network/networking-protocol',
                component: ComponentCreator('/about-cardano/explore-more/cardano-network/networking-protocol', '967'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/cardano-network/p2p-networking',
                component: ComponentCreator('/about-cardano/explore-more/cardano-network/p2p-networking', 'e42'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/concurrency',
                component: ComponentCreator('/about-cardano/explore-more/concurrency', 'ec3'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/fee-structure',
                component: ComponentCreator('/about-cardano/explore-more/fee-structure', '111'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/monetary-policy',
                component: ComponentCreator('/about-cardano/explore-more/monetary-policy', '255'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/parameter-guide',
                component: ComponentCreator('/about-cardano/explore-more/parameter-guide', '0dd'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/relevant-research-papers',
                component: ComponentCreator('/about-cardano/explore-more/relevant-research-papers', '09a'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/explore-more/time',
                component: ComponentCreator('/about-cardano/explore-more/time', '4fb'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/introduction',
                component: ComponentCreator('/about-cardano/introduction', 'e76'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/cardano-addresses',
                component: ComponentCreator('/about-cardano/learn/cardano-addresses', 'a81'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/cardano-keys',
                component: ComponentCreator('/about-cardano/learn/cardano-keys', '505'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/cardano-node',
                component: ComponentCreator('/about-cardano/learn/cardano-node', 'c53'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/chain-confirmation-versus-transaction-confirmation',
                component: ComponentCreator('/about-cardano/learn/chain-confirmation-versus-transaction-confirmation', 'a11'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/collateral-mechanism',
                component: ComponentCreator('/about-cardano/learn/collateral-mechanism', '855'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/consensus-explained',
                component: ComponentCreator('/about-cardano/learn/consensus-explained', 'fc3'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/delegation',
                component: ComponentCreator('/about-cardano/learn/delegation', 'a7b'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/eutxo-explainer',
                component: ComponentCreator('/about-cardano/learn/eutxo-explainer', '481'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/ouroboros-overview',
                component: ComponentCreator('/about-cardano/learn/ouroboros-overview', '8e8'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/pledging-rewards',
                component: ComponentCreator('/about-cardano/learn/pledging-rewards', 'ee3'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/stake-pools',
                component: ComponentCreator('/about-cardano/learn/stake-pools', '725'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/learn/transaction-costs-determinism',
                component: ComponentCreator('/about-cardano/learn/transaction-costs-determinism', '768'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/',
                component: ComponentCreator('/about-cardano/new-to-cardano/', '0f9'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/cardano-tracking-tools',
                component: ComponentCreator('/about-cardano/new-to-cardano/cardano-tracking-tools', '356'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/how-to-delegate',
                component: ComponentCreator('/about-cardano/new-to-cardano/how-to-delegate', 'f09'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/proof-of-stake',
                component: ComponentCreator('/about-cardano/new-to-cardano/proof-of-stake', 'b97'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/staking-calculator',
                component: ComponentCreator('/about-cardano/new-to-cardano/staking-calculator', 'a21'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/types-of-wallets',
                component: ComponentCreator('/about-cardano/new-to-cardano/types-of-wallets', 'efe'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/what-is-a-blockchain',
                component: ComponentCreator('/about-cardano/new-to-cardano/what-is-a-blockchain', '26d'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/what-is-a-cryptocurrency',
                component: ComponentCreator('/about-cardano/new-to-cardano/what-is-a-cryptocurrency', 'd87'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/about-cardano/new-to-cardano/what-is-a-smart-contract',
                component: ComponentCreator('/about-cardano/new-to-cardano/what-is-a-smart-contract', '585'),
                exact: true,
                sidebar: "aboutCardano"
              },
              {
                path: '/cardano-testnets/environments',
                component: ComponentCreator('/cardano-testnets/environments', '07b'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/getting-started',
                component: ComponentCreator('/cardano-testnets/getting-started', '3e0'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/local-testnet',
                component: ComponentCreator('/cardano-testnets/local-testnet', '818'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/resources',
                component: ComponentCreator('/cardano-testnets/resources', 'e3c'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/support-feedback',
                component: ComponentCreator('/cardano-testnets/support-feedback', '48a'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/tools/daedalus-testnet',
                component: ComponentCreator('/cardano-testnets/tools/daedalus-testnet', '9ed'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/tools/faucet',
                component: ComponentCreator('/cardano-testnets/tools/faucet', '61e'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/cardano-testnets/tools/plutus-fee-estimator',
                component: ComponentCreator('/cardano-testnets/tools/plutus-fee-estimator', '88d'),
                exact: true,
                sidebar: "cardanoTestnets"
              },
              {
                path: '/community/ambassador-program',
                component: ComponentCreator('/community/ambassador-program', '85d'),
                exact: true
              },
              {
                path: '/community/Cardano-stack-exchange',
                component: ComponentCreator('/community/Cardano-stack-exchange', '6c3'),
                exact: true
              },
              {
                path: '/community/cips',
                component: ComponentCreator('/community/cips', '78a'),
                exact: true
              },
              {
                path: '/community/community-content',
                component: ComponentCreator('/community/community-content', '5a5'),
                exact: true
              },
              {
                path: '/community/essential-cardano',
                component: ComponentCreator('/community/essential-cardano', '250'),
                exact: true
              },
              {
                path: '/community/getting-support',
                component: ComponentCreator('/community/getting-support', '3a1'),
                exact: true
              },
              {
                path: '/developer-resources/cardano-node-course',
                component: ComponentCreator('/developer-resources/cardano-node-course', 'fca'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/native-tokens',
                component: ComponentCreator('/developer-resources/native-tokens', '1e9'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/release-notes/comp-matrix',
                component: ComponentCreator('/developer-resources/release-notes/comp-matrix', '19e'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/release-notes/release-notes',
                component: ComponentCreator('/developer-resources/release-notes/release-notes', '6ab'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/scalability-solutions/hydra',
                component: ComponentCreator('/developer-resources/scalability-solutions/hydra', 'fa4'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/scalability-solutions/mithril',
                component: ComponentCreator('/developer-resources/scalability-solutions/mithril', '54c'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/smart-contracts/aiken',
                component: ComponentCreator('/developer-resources/smart-contracts/aiken', '78e'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/smart-contracts/marlowe',
                component: ComponentCreator('/developer-resources/smart-contracts/marlowe', '89f'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/smart-contracts/plutus',
                component: ComponentCreator('/developer-resources/smart-contracts/plutus', '96c'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/developer-resources/welcome',
                component: ComponentCreator('/developer-resources/welcome', '65d'),
                exact: true,
                sidebar: "developerResources"
              },
              {
                path: '/development-guidelines/transaction-tutorials/',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/', 'b7d'),
                exact: true
              },
              {
                path: '/development-guidelines/transaction-tutorials/minting-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/minting-transaction', '1f9'),
                exact: true
              },
              {
                path: '/development-guidelines/transaction-tutorials/multiple-purposes',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/multiple-purposes', '03b'),
                exact: true
              },
              {
                path: '/development-guidelines/transaction-tutorials/redelegate-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/redelegate-transaction', '0ad'),
                exact: true
              },
              {
                path: '/development-guidelines/transaction-tutorials/stake-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/stake-transaction', '4f0'),
                exact: true
              },
              {
                path: '/development-guidelines/transaction-tutorials/withdraw-transaction',
                component: ComponentCreator('/development-guidelines/transaction-tutorials/withdraw-transaction', 'f44'),
                exact: true
              },
              {
                path: '/pioneer-programs/plutus-pioneers',
                component: ComponentCreator('/pioneer-programs/plutus-pioneers', 'c24'),
                exact: true,
                sidebar: "pioneerPrograms"
              },
              {
                path: '/stake-pool-operators/about-stake-pools',
                component: ComponentCreator('/stake-pool-operators/about-stake-pools', '358'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/creating-keys-and-certificates',
                component: ComponentCreator('/stake-pool-operators/creating-keys-and-certificates', 'a06'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/guidelines-for-large-spos',
                component: ComponentCreator('/stake-pool-operators/guidelines-for-large-spos', 'efa'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/maintenance',
                component: ComponentCreator('/stake-pool-operators/maintenance', '0b2'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/metadata-management',
                component: ComponentCreator('/stake-pool-operators/metadata-management', 'd63'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/monitoring',
                component: ComponentCreator('/stake-pool-operators/monitoring', 'd19'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/node-connectivity',
                component: ComponentCreator('/stake-pool-operators/node-connectivity', '687'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/operating-a-stake-pool',
                component: ComponentCreator('/stake-pool-operators/operating-a-stake-pool', '834'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/performance',
                component: ComponentCreator('/stake-pool-operators/performance', '211'),
                exact: true,
                sidebar: "stakePoolOperators"
              },
              {
                path: '/stake-pool-operators/ranking',
                component: ComponentCreator('/stake-pool-operators/ranking', '716'),
                exact: true,
                sidebar: "stakePoolOperators"
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
