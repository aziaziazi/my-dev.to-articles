---
published: true
title: 'Server-side website programming'
cover_image: 'https://images.unsplash.com/photo-1566188969180-e765add9a9cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
description: 'Blocking vs not-blocking'
tags: node, todayilearned
series: 'Learn NodeJS'
---

# Blocking vs not-blocking

Last day assignment asked to browse the node.js website. During so, I encountered [blocking vs non blocking page](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/) that triggered my curiosity because it mentions:

> Some methods also have blocking counterparts, which have names that end with `Sync`.

In early project I have seen this functions with and without `Sync`, now let's see why they both exist:

_Blocking methods execute synchronously and non-blocking methods execute asynchronously._

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // 1. blocks the process until the file is read
console.log(data); // 2. called after data read
nextMethod(); // 3. called after console.log

fs.readFile('/file.md', (err, data) => {
  // 1. async method, do not block the process !
  if (err) throw err;
  console.log(data); // 3. console when 1. resolved
});
nextMethod(); // 2. called without waiting completion of 1.
```

**Blocking methods** execute synchronously and will block the execution until resolved. If there is an error, the error need to be caught, or the process will crash.
**Non-Blocking methods** execute asynchronously and will not block the execution. Usually a callback can be passed to execute others operation after resolution.

NodeJS is **single threaded**, therefore concurrent process refers to the event loop. Let's consider a server receiving multiple requests, and the request handler performing timely I/O operation on a database. Using blocking methods would handle the request one by one, delaying resolution of later requests. Using non-blocking methods however will let the server handle others requests while the I/O operation are in progress. This may lead to huge performance difference.

Beware of mixing sync and async methods ! The next exemple will cause errors:

```js
fs.readFile('/file.md', (err, data) => {
  // 1. start reading file.md
  if (err) throw err; // 3. crash ! can't read data as the file has been deleted whild reading it.
  console.log(data);
});
fs.unlinkSync('/file.md'); // 2. delete file.md
```

Placing non-blocking call inside callback guarantees a safer order of operations:

```js
fs.readFile('/file.md', (err, data) => {
  // 1. start reading file.md
  if (err) throw err;
  console.log(data); // 2. log data
  fs.unlink('/file.md', err => {
    // 3. start removing file
    if (err) throw err; // handle error if necessary
  });
});
```
