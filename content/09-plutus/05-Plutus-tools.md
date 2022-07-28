---
title: Plutus tools
metaTitle: Plutus tools
---

The Alonzo hard fork brings core smart contract capabilities to the Cardano ledger by establishing the infrastructure and adding tools for functional smart contract development using Plutus. This means that users, developers, and organizations can now securely build decentralized applications (DApps) based on smart contract solutions. 

There are different tools that developers can use to evaluate and deploy smart contracts on Cardano. Below we take a look at these tools, their main features and point to the exact sources to use them. 

## Plutus Playground

The [Plutus Playground](https://playground.plutus.iohkdev.io/) provides an environment for writing and testing smart contracts before they are released on the Cardano blockchain. It is a lightweight, web-based environment for exploratory Plutus development. As well as providing a web-based simulator for writing and executing smart contracts, the Plutus Playground also allows developers to access popular smart contracts that have already been written. [Tutorials](https://plutus-apps.readthedocs.io/en/latest/marlowe/tutorials/index.html) are available within the Plutus Playground to help you get started.

The Plutus Playground can be accessed through a web browser and there is no need to install software. The interface is split into three sections:

- editor
- simulation
- transactions

The simulator shows how a contract will behave on the Cardano blockchain. An important aspect of this is that it can act as a training tool for people who do not have advanced developer skills because it demonstrates the working principles. Users can define and modify the wallets that interact with a contract, as well as the actions that affect the outcome. The results can then be evaluated to see what happens on the blockchain and how transactions occur. For more information, watch the [Plutus application compiling and testing tutorial](https://www.youtube.com/watch?v=DhRS-JvoCw8) or visit the [Plutus GitHub repository](https://github.com/input-output-hk/plutus).

## Plutus Application Backend 

The Plutus Application Backend (PAB) provides the components and environment to help developers interact with smart contracts so that they can create and test DApps, before deploying them to a live production environment. Much like the [Plutus Playground](https://playground.plutus.iohkdev.io/), it is a sandbox environment where developers can try out DApp functionality in advance of any full deployment on Cardano. 

The PAB removes the need for developers to create their own infrastructure from scratch (including chain index, and so on) thereby reducing development time and resources needed. It allows developers to simulate how an application would behave on-chain for prior testing and error elimination, to ensure a flawless transition for launch. 

It is an off-chain, backend service for managing and handling the requirements of the application instance throughout its lifecycle. This includes interaction with external clients (such as wallet frontends) and acts as an intermediary between Plutus applications, the node, the wallet backend, and end users. Such interaction is made possible by PAB commands and mock components that enable convenient simulations and integration of DApps. 

The PAB is a single Haskell library that makes it easier to write this off-chain infrastructure and the on-chain scripts. It helps to build the UTXO transactions for both the read and write paths by getting information from the chain, reacting to events that occur, and constructing the transactions that run the actual Plutus scripts. 

The purpose of the PAB is to:

- provide a standardized environment in which Plutus applications run
- provide disciplined state management
- present discoverable interfaces to the external clients
- track on-chain information for smart contract uses
- allow developers to work in an emulated or non-emulated environment
- deal with requests such as running contract instances, forwarding user input to these instances, and notifying these instances of ledger state change events

The PAB can switch between emulated and non-emulated (real network) environments seamlessly. This makes it easier to write all kinds of different tests – unit tests, integration tests, property based tests, etc. The PAB allows DApps to easily communicate with it as the backend can receive and deliver messages. Thus, the DApp can send usual requests to endpoints that the PAB has exposed, and which correspond to actions and operations that any particular smart contract is capable of handling.

Applications deployed using the framework’s libraries can run on the PAB, which provides runtime support for access to the blockchain to further perform smart contract operations triggering transactions based on the EUTXO model. Additionally, PAB features functionality for persistence, logging, and monitoring.

The following diagram provides an overview of the PAB architecture:

![pab_schematic](pab_schematic.png)

There are two deployment models envisaged for the PAB once it is available:

- **hosted** - this option will be supported at the initial release of the PAB. In this scenario, the DApp provider / developer hosts an instance of the PAB alongside the chain index and an Alonzo node. The off-chain code of the Plutus app is run on the DApp provider’s infrastructure.
- **in-browser** - this option will be available later, after the initial release. 

In addition to the PAB itself, the following components are required:

- **Chain index** — the chain index is a database of data gathered from Cardano transactions. It uses the Cardano node’s chain sync protocol and needs to be co-located with a Cardano node. The chain index is a read-only component for the PAB. Multiple instances of the PAB can therefore share a single instance of the chain index. All chain index queries are served over an HTTP API.
- **Alonzo node** — the PAB subscribes to ledger state updates from the node, using a socket protocol.

The PAB is another powerful tool on Cardano that makes DApps simpler, more secure, and more cost-effective to develop. By providing information from canonical sources in a usable form, it relieves developers of many routine tasks.

We will share links in due course when these are available.

## Plutus fee estimator

The Plutus fee estimator has been developed by IOG performance experts as an in-house tool for price benchmarking and comparison. It uses information from real-world Plutus transactions to predict the fees that will be charged for a transaction. The estimator can be used to calculate fees for actual transactions (e.g., to determine the fees that will be charged if the network parameters change), and also to estimate fees for individual script transactions or complete DApps before or during development. It may be useful to determine the effect of script changes or optimizations on fees.

Fee calculation requires three pieces of information:

- **The total on-chain transaction size in bytes**: a simple transaction, for example, is around 300 bytes, the one with metadata is around 650 bytes, and Plutus scripts are typically 4,000-8,000 bytes (future optimizations will reduce this).
- **The number of computational (CPU) steps** that the script uses: each step represents 1 picosecond of execution time on a benchmark machine. Typical scripts should consume less than 1,000,000,000 (1 millisecond).
- **The number of memory units** that the script uses: this represents the number of bytes that the script allocates. Typical scripts should consume less than 1,000,000 memory units (1MB of memory allocation).

To use an estimator, a user just needs to fill in relative information, which can be obtained from the Plutus compiler after building a script in it. There is also no need to run a node for this, which significantly simplifies the process for general users. 
