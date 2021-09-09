# Plutus use cases
Typical high level use cases for Plutus implementations include, but are not restricted to:

- **Oracles** – fully functional oracles that bring off-chain data on the chain to interact with and feed smart contracts, In addition, oracles create a centralized and trusted off-chain data feed for Plutus applications (for example, to interact with price feeds from various centralized exchanges).

- **DEX token swaps** – creating an implementation that allows users to swap between supported tokens on a decentralized exchange. Users can create liquidity pools (or add funds to existing ones) providing coins necessary for swapping. In return, they can earn small fees for all transactions that use their funds. Users can also contribute to liquidity pools for any supported token, and therefore gain commissions in the form of exchange fees for doing so. When liquidity is provided to a pool, the user receives a liquidity token representing that deposit. The contract should calculate fees (e.g., 0.3%) which are then dispersed to liquidity providers dependent on each provider's share of the liquidity pool.

- **Lending and borrowing** – creating a lending protocol that enables users to lend and borrow cryptocurrencies of their choice in a trustworthy way, while offering stable and variable interest rates. Users can participate as depositors or borrowers. To transact, lenders have to deposit their funds into liquidity pools, so that borrowers can borrow from such liquidity pools. Depositors receive interest-bearing tokens (known as aTokens) in return. Each pool is set aside as reserves to safeguard against volatility.
NFTS, minting, and buying and selling NFTs – building core functionality for minting, sending, and receiving NFTs into a wallet, with other open scenarios and extensions possible.

- **Decentralized finance (DeFi) tools** – creating multipurpose dashboards (either web-based or mobile), that integrate with smart contracts to bring value to native token traders. These products can have multiple functional dashboards to show balances of tokens and liquidity pools, and so on. They can also bundle together multiple functions such as swapping and providing liquidity into a single transaction, making DeFi adoption easier.

- **Crypto-backed stable coins** – creating a new stable coin implementation based on chain collateral using the Atala identity system on Cardano. This can include transfer restrictions, asset freezing, as so on.

## Plutus Partners Program
In preparation for Alonzo, we launched the Plutus Partner Program. This program summoned an all-star team of software companies to tackle smart contract programming challenges, including the above-listed use cases. The goal of the program is to enable smart contract implementations – constructed using the Plutus language – that serve as instructive examples for incoming external decentralized DApp developers. These can later serve as canonical examples for the wider Cardano community too.

The following table outlines the challenges that each of the Plutus partners worked on. We have provided links where possible to the code so that you can compare the different implementations and learn more about Plutus expressiveness.

| Challenge      | GitHub code links (where available) |
| ----------- | ----------- |
| 1. Oracle      |        | |        | |        | |        |
| 2. Dex   | Altlabs.dev [code](https://github.com/input-output-hk/plutus-use-cases/tree/AltLabs/dex-token-swap/AltLabs/dex-token-swap), MLabs.city [code](https://github.com/mlabs-haskell/plutus-use-cases/blob/main/mlabs/README.md#use-case-lendex), Obsidian.systems [code](https://github.com/input-output-hk/plutus-use-cases/tree/obsidian-systems/dex/use-case-2)|
| 3. Lending   | MetaLamp.io [code](https://github.com/input-output-hk/plutus-use-cases/tree/MetaLamp/lending-pool/development/MetaLamp)| 
| 4. Stable coin   | dQuadrant [code](https://github.com/input-output-hk/plutus-use-cases/tree/Dquadrant/stablecoin/starter/Dquadrant), ChainSafe (NodeFactory) [code](https://github.com/input-output-hk/plutus-use-cases/tree/Nodefactory/stablecoin/vaultliquidation/NodeFactory/stable-coin)| 
| 5. NFTs   | Eleks.com [code](https://github.com/input-output-hk/plutus-use-cases/blob/eleks/nft/eleks/nft/README.md), MLabs.city [code](https://github.com/mlabs-haskell/plutus-use-cases/blob/main/mlabs/README.md#use-case-nft)| 
| 6. DeFi  | | 

Each of these implementations has a thorough README file where you can learn how to install the code. Usually, it involves installing the code using Nix and Git clone. Then you should study the unit tests to understand the sequence in which the API should be called. From there you can try to expand these examples with your own fork or try to implement your own view of the challenges.

## Results
The Plutus Partners have created, and more importantly, documented proof-of-concepts for the most common smart contracts. They are discovering the patterns that will become the standards and best practices in the community. Although the Plutus platform is just starting, it is already possible to write very expressive smart contracts.
