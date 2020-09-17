---
published: true
title: 'Create a simple Node server with http, url and fs'
cover_image: 'https://raw.githubusercontent.com/aziaziazi/my-dev.to-posts/master/posts/learn-node/assets/01-cover.jpg'
tags: node, todayilearned
series: 'Learn NodeJS'
---

# Minimal server

Continuing my journey through the [Odin Project](https://www.theodinproject.com/courses/nodejs), I go along w3school NodeJS introduction. Here's a minimal server that return "Hello Node!" to localhost:8080:

```js
// code/01-minimal-server.js

var http = require('http');

http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello Node!');
  })
  .listen(8080);
```

# Modules

We can also create our own **modules** using the `exports` keyword:

```js
// code/01-exports-module.js

exports.myDateTime = function () {
  return Date();
};
```

The **FileStystem** module `fs` includes methods to work with files:

- **Read** a file on the system: `fs.readFile('file.html', (err, data) => {...})`;
- **Create** a file with `appendFile`, `open` (with `w` flag) or `writeFile`
- **Update** a file with `appendFile` or `writeFile`
- **Delete** a file with `unlink`.
- **Rename** a file with `rename`.

The **url** module helps to retrieve url's parts:

```js
// code/01-url-module.js

var url = require('url');
var adr = 'http://localhost:8080/default.html?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.html'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'
```

We may use the modules `http`, `url` and `fs` to serve specific files depending on path the user navigates to.

We can use **npm** the same way as in front end: `npm i module-name` and then use is with `var module = require('module-name')`. Here's two useful modules:

- [formidale][https://www.npmjs.com/package/formidable] to parse file upload
- [nodemailer][https://www.npmjs.com/package/nodemailer] to send emails

# Events

Node is **perfect** for event-driven application ! Every action is an event, like a when a connection is made, or a file opened. Some objects can fire events, like `readStream` that listen for opening or closing a file: `fs.createReadStream('./file.txt').on('open', () => {...})`.

Then module `events` let us create, fire and listen for our own events:

```js
// code/01-events-module.js

var events = require('events');
var customEvent = new events.EventEmitter();

// handler
var handleNodeLearned = () => console.log('Congrats, you learned Node!');

// listener
customEvent.on('nodeLearned', handleNodeLearned);

// fire events with emit()
customEvent.emit('nodeLearned');
```

# Simple Site

The assignment is to create a simple site with and index, two pages, and a 404-page handler. Here's the server and index page, and you'll find the [full code here](https://github.com/aziaziazi/my-dev.to-posts/tree/master/posts/learn-node/code/01-simple-site/).

```js
// code/01-simple-site/index.js

var http = require('http');
var url = require('url');
var fs = require('fs');

var writeAndEnd = function (res, data) {
  res.write(data);
  res.end();
};

http
  .createServer((req, res) => {
    var pathname = url.parse(req.url, true).pathname;
    if (pathname === '/') pathname = '/index.html'; // handle root path

    fs.readFile(`.${pathname}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.readFile('404.html', (err, data) => {
          if (err) {
            writeAndEnd(res, '404 not handled :('); //
          } else {
            writeAndEnd(res, data);
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        writeAndEnd(res, data);
      }
    });
  })
  .listen(8080);
```

```html
<!--code/01-simple-site/index.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Simple Site</title>
  </head>
  <body>
    <h1>Welcome to the Simple Site</h1>
    <p>
      You may navigate to the
      <a href="/about.html">about</a>
      or
      <a href="/contact.html">contact</a>
      pages. You also may try others routes:
    </p>
    <form onsubmit="window.location.href = event.target[0].value; return false">
      <input type="text" />
      <button type="submit">Go !</button>
    </form>
  </body>
</html>
```
