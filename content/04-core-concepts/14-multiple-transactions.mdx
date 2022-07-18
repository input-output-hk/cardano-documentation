---
title: 'Submitting multiple transactions'
metaTitle: 'Submitting multiple transactions'
metaDescription: 'Submitting multiple transactions'
---

This section outlines some best practices for submitting multiple transactions. Users who need to submit many transactions one after the other can run into a problem when the mempool becomes full. This is known as high throughput. If the user continues to submit transactions after the mempool becomes full, some transactions may not be accepted.

The system as a whole has never guaranteed the reliability of transaction submission. It is impossible to provide such a guarantee in a distributed system like Cardano. Submitting agents are required to handle resubmission logic in an appropriate way.

The correct endpoint to use is the `cardano-submit-api`. When the mempool is full, the thread is blocked. Therefore, the API user can queue up multiple transactions that get processed as soon as mempool capacity becomes available. However, the application needs to allow for the fact that the number of in-flight transactions is limited by the number of open files allowed by the operating system. If this is exceeded, then `cardano-submit-api` just exits, so further requests are not served. Increasing the number of open files allowed by the operating system with `ulimit` will increase the available number of in-flight transactions.

A simpler alternative is to use the `cardano-submit-api` serially or with very low concurrency to minimize the need for sophisticated queue management.

It is a general rule that simplicity increases robustness; if possible, just submit a transaction and wait until it is confirmed before submitting the next one.
