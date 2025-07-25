---
title: Extended UTXO model
metaTitle: Understanding the Extended UTXO model
---

:::info

The EUTXO handbook is now out! Deep dive into [Cardano's EUTXO accounting model here](https://ucarecdn.com/3da33f2f-73ac-4c9b-844b-f215dcce0628/EUTXOhandbook_for_EC.pdf).

:::

Cardano (like Bitcoin) is an Unspent Transaction Output (UTXO)-based blockchain, which utilizes a different accounting model for its ledger from other account-based blockchains like Ethereum. Cardano implements an innovative [Extended Unspent Transaction Output (EUTXO) model](https://iohk.io/en/blog/posts/2021/03/11/cardanos-extended-utxo-accounting-model/), which was introduced by the Alonzo upgrade to support multi-assets and smart contracts.

## Overview of the UTXO model

In the UTXO model, a transaction has inputs and outputs, where the inputs are outputs from previous transactions. A transaction can only have previously unspent transaction outputs as its inputs.

### Transaction output

A transaction output includes an *address* (that you can think of as a lock) and a *value*. In keeping with this analogy, the signature that belongs to the address is the key to unlock the output. Once unlocked, an output can be used as input. New transactions spend outputs of previous transactions, and produce new outputs that can be consumed by future transactions. Each UTXO can only be consumed once, and as a whole. Each output can be spent by exactly one input, and one input *only*.

### Transaction input

A transaction input is the output of a previous transaction. Transaction inputs include a pointer and a cryptographic signature that acts as the unlocking key. The pointer points back to a previous transaction output, and the key unlocks this output. When an output is unlocked by an input, the blockchain marks the unlocked output as 'spent'. New outputs created by a given transaction can then be pointed to by new inputs, and so the chain continues. These new outputs (which have not yet been unlocked, ie, spent) are the UTXOs. Unspent outputs are simply that, outputs that have not yet been spent.

In summary, transactions consume unspent outputs from previous transactions, and produce new outputs that can be used as inputs for future transactions.

![eutxo](https://ucarecdn.com/f4b3f730-2880-4098-897b-92346c73b8af/)

The users' wallets manage these UTXOs and initiate transactions involving the UTXOs owned by the user. Every node maintains a record of all currently unspent transaction outputs (UTXOs), called the UTXO set. In technical terms, this is the chainstate, which is stored in the data directory of every node. When a new block is added to the chain, the chainstate is updated accordingly. This new block contains the list of latest transactions (including, of course, a record of spent UTXOs, and new ones created since the chainstate was last updated). Every node maintains an exact copy of the chainstate.

## Cardano’s extended UTXO model 

The EUTXO model extends the UTXO model in two ways:

1. It generalizes the concept of ‘address’ by using the lock-and-key analogy. Instead of restricting locks to public keys and keys to signatures, addresses in the EUTXO model can contain arbitrary logic in the form of scripts. For example, when a node validates a transaction, the node determines whether or not the transaction is allowed to use a certain output as an input. The transaction will look up the script provided by the output's address and will execute the script if the transaction can use the output as an input.
2. The second difference between UTXO and EUTXO is that outputs can carry (almost) arbitrary data in addition to an address and value. This makes scripts much more powerful by allowing them to carry state information.

Furthermore, EUTXO extends the UTXO model by allowing output addresses to contain complex logic to decide which transactions can unlock them, and by adding custom data to all outputs. When validating an address, the script will access the data being carried by the output, the transaction being validated, and some additional pieces of data called redeemers, which the transaction provides for every input. By looking up all this information, the script has enough context to give a ‘yes’ or ‘no’ answer in what can be highly complex situations and use cases.

EUTXO enables arbitrary logic in the form of scripts. This arbitrary logic inspects the transaction and the data to decide whether the transaction is allowed to use an input or not.

The UTXO model with its graph structure is fundamentally different from the account-based model used by some existing smart-contract enabled blockchains. As a result, the design patterns that work for DApps on account-based blockchains do not translate directly to Cardano. New design patterns are needed because the underlying representation of the data is different.

EUTXO	 inherits the per-branches design of the UTXO (Bitcoin) model, where one branch is by definition a sequence of transactions that requires a sequence of validations. To split the logic across different branches and enforce more parallelism, it is essential to build DApps and other solutions using multiple UTXOs. This provides benefits in terms of scaling, just like developing Bitcoin services prerequisites splitting one wallet into sub wallets. 

## Advantages of EUTXO 

Cardano’s EUTXO model provides a secure and versatile environment to process multiple operations without system failures. This model offers better scalability and privacy, as well as more simplified transaction logic, as each UTXO can only be consumed once and as a whole, which makes transaction verification much simpler.

The EUTXO model offers unique advantages over other accounting models. The success or failure of transaction validation depends only on the transaction itself and its inputs, and not on anything else on the blockchain. As a consequence, the validity of a transaction can be checked off-chain, before the transaction is sent to the blockchain. A transaction can still fail if some other transaction concurrently consumes an input that the transaction is expecting, but if all inputs are still present, the transaction is guaranteed to succeed.

This contrasts with an account-based model (as used by Ethereum), where a transaction can fail in mid-script execution. This can never happen in EUTXO. 

Due to the ‘local’ nature of transaction validation, a high degree of parallelism is possible. A node could, in principle, validate transactions in parallel, if those transactions do not try to consume the same input. This is great both for efficiency and for reasoning, simplifying the analysis of possible outcomes, and proving that ‘nothing bad’ can happen. You can dive deeper into the EUTXO model blog post.

A powerful feature of the EUTXO model is that the fees required for a valid transaction can be predicted precisely prior to posting it. This is a unique feature not found in account-based models. Account-based blockchains, like Ethereum, are indeterministic, which means that they cannot guarantee the transaction’s effect on-chain. This uncertainty presents risks of monetary loss, unexpectedly high fees, and additional opportunities for adversarial behavior.

To summarize, EUTXO offers greater security, smart contract execution cost predictability (without unpleasant surprises) and more powerful parallelization. 
