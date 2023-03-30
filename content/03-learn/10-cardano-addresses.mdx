---
title: Cardano addresses
metaTitle: Cardano addresses
---

The addresses are a blake2b-256 hash of the relevant verifying/public keys concatenated with some metadata that can be stored on the [Cardano blockchain](https://cardano.org/).

Shelley introduces four different types of addresses:

- base addresses
- pointer addresses
- enterprise addresses
- reward account addresses

Besides those new addresses, Shelley continues to support Byron-era *bootstrap addresses* and *script addresses*, but only the new base and
pointer addresses carry stake rights. Therefore, addresses consist of some serialized data specified in the ledger specification stored in the
blockchain’s blocks, e.g., an Unspent Transaction Output (UTXO) address. 

The serialized data (address) contains two parts:

- Metadata: used for interpreting.
- Payload: the raw or encoded data.

### Base addresses

A base address directly specifies the staking key that should control the stake for that address. The staking rights associated with funds held in this address
may be exercised by the owner of the staking key. Base addresses can be used in transactions without registering the staking key in advance.

The stake rights can only be exercised by registering the stake key and delegating to a [stake pool](https://docs.cardano.org/core-concepts/stake-pools). Once the stake key is registered, the stake rights can be exercised for base addresses used in transactions before or after the key registration.

### Pointer addresses

A pointer address indirectly specifies the staking key that should control the stake for the address. It references a stake key by a stake key pointer, which is a location on the blockchain of the stake key [registration certificate](https://docs.cardano.org/getting-started/operating-a-stake-pool/creating-keys-and-certificates#creatinganoperationalcertificate) for that key. Pointer addresses can be used in transactions, even if their target is not an active stake key registration. This covers the scenario where the key was unregistered after (or indeed, before) the transaction, and also covers pointers to targets that are plainly invalid. The reason for allowing such invalid targets is so that nodes only need to track the *currently active* stake keys.

The pointer can be considerably shorter than the hash used in base addresses.

There is a subtlety with pointer addresses. It might happen that a stake key registration certificate referenced by a pointer address might be lost due to a rollback. To prevent loss of funds in this scenario, the system considers pointer addresses with an invalid pointer to be *valid* for the purpose of using funds stored therein as inputs for transactions (but ignores them for the purpose of proof of stake participation). Optionally, a wallet might refuse to create transactions to pointer addresses before the referenced certificate has become immutable, to prevent funds from being excluded from the proof of stake, in the case of rollbacks.

### Enterprise addresses

Enterprise addresses carry no stake rights, so using these addresses means that you are opting out of participation in the proof-of-stake protocol.

Exchanges or other organizations that control large amounts of ada – but hold it on behalf of other users – may wish to follow a policy of not exercising stake rights. By using enterprise addresses, exchanges can demonstrate that they follow this policy. Since enterprise addresses are not associated with any staking key, they are automatically excluded from the mechanisms that influence the slot leadership schedule. Note that using addresses with no stake rights effectively decreases the total amount of stake, which plays into the hands of a potential adversary.

### Reward account addresses

A reward address is a cryptographic hash of the public staking key of the address. Reward account addresses are used to distribute rewards for participating in the proof-of-stake protocol (either directly or via delegation). 

They have the following properties:

- Account-style accounting is used, not UTXO-style.
- Funds cannot be received via transactions. Instead, their balance is only
  increased when rewards are distributed.
- A one-to-one correspondence exists between registered staking keys and reward
  account addresses.

This key is used whenever funds are withdrawn from the address. Furthermore, stake associated with funds in the address contributes to the stake of this key.
Just as in the case of enterprise addresses, the staking object for a reward address does not need to contain information.
