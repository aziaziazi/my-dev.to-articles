---
published: true
title: 'Day 0: Introduction and background'
cover_image: 'https://images.unsplash.com/photo-1558314266-8017415d5367?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
description: 'Introduction and background'
tags: node, todayilearned
series: 'Learn NodeJS'
---

Today I started Odin's [Node-js course](https://www.theodinproject.com/courses/nodejs). My company is very enthusiastic about self training and propose a curated list of courses to learn and practice different technologies. I choose NodeJS because as I'm already proficient with JS, I will be able to give more focus on good practice than syntax details.

Here I will log my learnings through it. The incentives to make it public are:

- Defeat timidity! I'm not used to publicly posting on the web and doing so is already a big step for me!
- [Learn by teaching](https://en.wikipedia.org/wiki/Learning_by_teaching#:~:text=In%20the%20field%20of%20pedagogy,along%20with%20the%20subject%20matter.): trying to re-explain what's just digested may benefit the memorization.

Let's dive in 🤿 !

## Introduction

- NodeJS exist since **2009**.
- It's a **JavaScript runtime**: it runs on a local machine, contrary to JavaScript that runs in a browser. in the background I guess Node is running in a virtual machine as JS does in the browser.
- It's **asynchronous event driven**: the lines of code won't necessarily execute in order. Instead, we write functions that gets called by events such as network request or callbacks

## Event Driven

Let's say I want an app that tell me if I forgot my umbrella. The steps are:

1. fetch the weather forecast
2. if it's sunny, stop
3. check in my database "backpack" if I already got the umbrella
4. If I got it, stop
5. Remind me to take the umbrella

There's two asynchronous process here: fetching the forecast and checking the DB. If I run the steps one by one the program will work. However, we can make it quicker by executing several actions at the same time:

1. fetch the forecast THEN if it's sunny, stop
2. check the database THEN if umbrella is there, stop
3. THEN is it's not sunny, and if I don't have the umbrella, remind me to take it

That way, we stop the program (or pass to the next action) as soon as we got the first response from the forecast or DB. While both actions are running (fetch & query), node waits on an **event**, here the completion of fetch/query. This process is close to the usage of `addEventListener` in frontend, but instead of waiting for mouse click, our events will mostly be network requests and DB query.

To handle events, we'll use [callbacks](https://briggs.dev/blog/understanding-callbacks).

> A callback is a function pass to another function as argument.

Many fonctions uses callback, even `map` and `forEach` : `[1, 2, 3].forEach(n => console.log(n)`. Event listeners uses callback the same way: `element.addEventListener('click', console.log)`.

Here's an exemple of callback usage in NodeJS:

```js
http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello Node!');
  })
  .listen(8080);
```

## Assignment

The course proposes some reading & watching materials.

Read & watch:

- Get familiar with the [NodeJS website](https://nodejs.org/en/)
- [MDN server-side introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps), especially the first two parts: Introduction to the server side and Client-Server Overview
- To get more insight of the nature of Node, this [article](https://www.freecodecamp.org/news/what-exactly-is-node-js-ae36e97449f5/) and the linked [video](https://youtu.be/8aGhZQkoFbQ)
- [7 things](https://blog.teamtreehouse.com/7-awesome-things-can-build-node-js) I can build with NodeJS. Those are all interesting and real projects. It's a good idea to link this to the course, it helps to project myself in the usage of node:
  - [Gif chat room](https://chat.meatspac.es/) :D
  - [Remote control a car](https://github.com/chalkers/extremely_remote_controlled_car)
  - We play pokemon (as twitch does !)
  - Remote control computer
  - Build a hangout-like website
  - Collaborative drawing tool
  - Desktop RSS reader

## Conclusion

Odin course start with the elementary notions. As I'm self trained and did not have CS academic, my learning sometimes jumped back and forth in complexity. Now I'm very happy to review the ordered basics!
