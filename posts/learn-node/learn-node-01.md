---
published: false
title: 'test'
cover_image: 'https://images.unsplash.com/photo-1566188969180-e765add9a9cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
description: 'Blocking vs not-blocking'
tags: node, todayilearned
series: 'Learn NodeJS'
---

```js
// code/01-hello-node.js

var http = require('http');

http
  .createServer(function (req, res) {
    console.log(req, res);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello Node!');
  })
  .listen(8080);
```
