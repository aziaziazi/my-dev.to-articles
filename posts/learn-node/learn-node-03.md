---
published: true
title: 'Set up an Express development environment'
cover_image: 'https://raw.githubusercontent.com/aziaziazi/my-dev.to-posts/master/posts/learn-node/assets/03-cover.jpg'
tags: node, todayilearned, express
series: 'Learn NodeJS'
---

I'm learning NodeJS following Odin's Express course and write here my notes. Today we're setting up the environment to use Express on macOS.

# Overview

We'll need to install:

- **Node and npm** globally. I recommend you to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating), it will help you manage multiple versions of node on your machine and updating them is needed. For the node version, uses the _LTS_ which is the more stable, or the _current_ with newer features. Npm is installed alongside with node.
- **Express** locally for each app, using _npm_.
- Any **other libraries** like template engines, database drivers, authentication middleware, middleware to serve static files... using _npm_. I won't talk about them here since they really depends of your need.

The **[Express Application Generator](https://expressjs.com/fr/starter/generator.html)** is a handy tool to create a modular skeleton Express app following the _[MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC)_ pattern. We'll use it here.

# Express Application Generator

After installing npm (with node, using nvm), we can use it to install the Express Application Generator.

We install it globaly (`-g` flag) because it won't be a dependency of our application. Instead, it's run once to create "skeletons" of apps. Run this command:

```bash
npm install express-generator -g
```

Then `cd` where you want to create your app and run:

```bash
express helloNode
```

This should create a folder named "helloNode" with the base express app. `express -h` outputs available options, like installing a template library.

Then enter the folder and install the dependencies:

```bash
cd helloNode
npm install
```

Now ready to go ! Let's run the app with the `DEBUG` environment variable set to the name of your app:

```bash
DEBUG=helloworld:* npm start
```

Our app is running at http://127.0.0.1:3000/ !

# Next

Now our bare app is running, we'll probably need to install others libraries to work with databases, authentication and others middlewares. Then we'll want to prepare the environment on the server to run the app in production.
