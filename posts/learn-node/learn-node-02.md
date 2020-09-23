---
published: true
title: 'Express 101'
cover_image: 'https://raw.githubusercontent.com/aziaziazi/my-dev.to-posts/master/posts/learn-node/assets/02-cover.jpg'
tags: node, todayilearned
series: 'Learn NodeJS'
---

I'm learning NodeJS following Odin's Express course and write here my notes. Each courses on Odin have a _Learning Outcomes_ section for self evaluation, today I'll use it here as a template:

# Describe Express and Node’s main benefits.

Node is a great choice for web development because:

- It's optimized for **network speed and scalability** because it's event-driven.
- The **ecosystem** (with npm) is big and the **community** active.
- As it's **plain JS**, they're easy to write and maintain with the front end (in JS too). Also, the popularity of JS brought many others languages to compile in it: TypeScript, ClojureScript, coffeeScript, Scala, LiveScript...
- Node is also **portable** in Windows, macOS, Linux, Solaris, FreeBSD, OpenBSD, WebOS and NonStopOS.

Express provide tools and helpers for common tasks on web servers:

- Handlers for HTTP **routes** and **verbs**
- Integrate with **view** rendering engines
- Set common **webapp settings**: ports, location for templates.
- custom **Middlewares**
- Lots of [middleware packages](http://expressjs.com/en/resources/middleware.html): cookies, sessions, login, url params...

# Describe the relationship between Node and Express.

Express is a node framework: it provides functions to do common tasks. However, it's unopinionated: more flexible but harder to set up.

# Explain what a module is and how Express fits in.

A module is a bit of code (usually a file or folder) that we can import in our code to add functionalities. Express is a module, so are express middlewares.

# Import and create modules.

Import a module with `require`: `var importedModule = require('./path/to/module')`. Create a module with `modules.exports = {exportedKey: 'value}` or `exports.exportedKey = 'value'`.

# Describe asynchronous APIs.

Asynchronous APIs handle actions that takes time without blocking the thread: the action run in the background and trigger a "callback" when it's resolved. There's various way to handle them: **callback**, **promises**, **generators**, **async/await**... The more important is to keep code simple, not nested and split up in small modules. Be carefully of [callback hell](http://callbackhell.com/)!

A convention for node and Express is to use [Error First Callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/).

# Describe and create route handlers.

We use handlers to trigger actions when a route is reach by a user. Usually, the action is to respond with a page! There's many handler methods to respond to different cases: `checkout()`, `copy()`, `delete()`, `get()`, `head()`, `lock()`, `merge()`, `mkactivity()`, `mkcol()`, `move(),` `m-search()`, `notify()`, `options()`, `patch()`, `post()`, `purge()`, `put()`, `report()`, `search()`, `subscribe()`, `trace()`, `unlock()`, `unsubscribe()`. They mostly use te same arguments: a pattern to match the route (ex: `/about`), and a callback function that takes as arguments the `request` and the `response`. Uses one of the [response methods](https://expressjs.com/en/guide/routing.html#response-methods) to return:

```js
// code/02-route-handler.js

app.get('/about', function (req, res) {
  res.send('about page');
});
```

`app.all` is usually used for middlewares.

We can [group handlers](http://expressjs.com/en/guide/routing.html#express-router) to organize the code. Do so with `app.use()` and `router`.

# Describe and use middleware.

A Middleware is a method executing before or after handlers. They are frequent in Express and helps with many tasks. The order the middlewares executes is up to the developer. It must call `next()` (third argument of the function) to pass to the next middleware or handler, or end the request. `next('router')` to pass controll out of the router instance.

Add a middleware the same way as route handlers: `app.use('/', a_middleware, another_middleware)`.

We can find express middlewares on [the official doc](http://expressjs.com/en/resources/middleware.html) or on NPM. We also may write our own middleware. The express doc has pages about [using](https://expressjs.com/en/guide/using-middleware.html) and [writing](http://expressjs.com/en/guide/writing-middleware.html) them.

# Describe error handling in Express.

Express comes with a default build-in error middleware: any error occurring in synchronous code will be catch. For async functions, we can pass the error object to `next()`. Then the error stack will be sent to the client (if we're not in production env).

Customs error middleware **must** take four arguments to preserve signature and get the `error` object as first parameter:

```js
// code/02-handle-errors.js

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something wrong!');
});
```

Custom handlers must be placed at the end of the middleware list, after all other `app.use()` or route handlers to be sure to get all potential errors.

Express [error handling page](https://expressjs.com/en/guide/error-handling.html)

# Describe what the main parts of an Express app might look like.

It really depends on the purpose of our app. Modules may be:

- settings: network options, middlewares...
- routes handlers
- [database](https://expressjs.com/en/guide/database-integration.html) write/access
- [views engines](https://expressjs.com/en/resources/template-engines.html() (templates)

# Conclusion

Express seems very solid and well documented. It's flexibility makes it a good choice for most off the apps. Many fonctions have to be added by third party modules (databases, views engines...), and it can be a time-consuming to make the good choice. Fortunately there's plentiful of articles and docs about them because of express popularity.
