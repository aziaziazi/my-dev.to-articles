---
published: false
title: 'How we reached react devs among our users'
cover_image: 'https://raw.githubusercontent.com/aziaziazi/my-dev.to-posts/master/posts/reach-react-devs/assets/reach-devs-cover.jpg'
description: ''
tags: javascript, react, career
series:
canonical_url:
---

_tldr: devtools globals variables let you guess if your user has a React debugger installed_

Last year my team was striving to find React developers to join us and happily translate fancy product team ideas into JavaScript. With a few million happy users per week, some of our users may be a good fit for our team! Did they know we hire? Probably not! Our career page was accessible by a tiny link between press and affiliation at the bottom of the unlogged home page. And indeed our product was so captivating that they were probably too busy using the app to think about career aspirations! Still we didn't want show a career message to everyone as it would be irrelevant for most of them.

# 🧑‍💻 Method

While performing delightful debugging session, [Nicolas](twitter.com/NicolasCordin) and myself came with this idea: as [React devtools plugin](https://www.npmjs.com/package/react-devtools) exposes a global variable, we can use it to know if a user has installed it and toggle a message !

> When the page loads, the devtools sets a global named `__REACT_DEVTOOLS_GLOBAL_HOOK__`, then React communicates with that hook during initialization.

Easy ! Let's try it:

```js
// code/hello-react-dev.js

if (!!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  return 'Hello React Dev!';
}
```

We can also detect any other dev plugin that exposes some variables. We came with `__REDUX_DEVTOOLS_EXTENSION__` and `__VUE_DEVTOOLS_GLOBAL_HOOK__` vars, let my know if you know more!

We also need a way to close the message and persist the information to avoid displaying it again. Let's wrap this in a component:

```jsx
// code/dev-message.js

import React from 'react';
import { useCookies } from 'react-cookie';

export const DevMessage = () => {
  // Store if user has already closed the message
  const [cookies, setCookie] = useCookies();
  const cookieName = 'hasClosedDevMessage';
  const hasClosedDevMessage = cookies[cookieName] === 'true';
  const handleClose = () => setCookie(cookieName, true);

  // Check what plugins what installed
  const userPluginNames = [
    ['react', !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__],
    ['redux', !!window.__REDUX_DEVTOOLS_EXTENSION__],
    ['vue', !!window.__VUE_DEVTOOLS_GLOBAL_HOOK__],
  ]
    .filter(([name, value]) => value)
    .map(([name]) => name)
    .join(', ');

  if (hasClosedDevMessage) return 'reset your cookies to see the message';
  if (!userPluginNames) return 'install a plugin to see the message';
  // Only display the message if user has a plugins installed
  // and if s.he didn't close the message yet
  return [
    <h1>Hello {userPluginNames} Dev !</h1>,
    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
      interested ?
    </a>,
    <button onClick={handleClose}>no thanks</button>,
  ];
};
```

And that's it ! You can [try it live here](https://092ij.csb.app/)

[![live exemple screenshot](https://dev-to-uploads.s3.amazonaws.com/i/vl9mesxa4u9d69bobetm.png)](https://092ij.csb.app/)

# 🕵️ Others techniques

With React, Redux and Vue plugins we target a precise but narrow field of developers. Others methods may be inspired by [fingerprinting](https://blog.mozilla.org/internetcitizen/2018/07/26/this-is-your-digital-fingerprint/) techniques :

- [Detect available fonts](https://gist.github.com/fijiwebdesign/3b0bf8e88ceef7518844) used by developer: if you have [FiraCode](https://github.com/tonsky/FiraCode) or [Jetbrains Mono](https://www.jetbrains.com/lp/mono/) installed on your machine, there's a good chance it's for your IDE!

- Uber "[Code on the Road](https://slate.com/technology/2016/03/uber-s-code-on-the-road-hacker-challenge-scouts-for-new-employees.html)" seems to only use you location to propose you a test during you ride.

- Google uses it's own data -your search history- to propose you to pass the [foo.bar challenge](https://medium.com/plutonic-services/things-you-should-know-about-google-foobar-invitation-703a535bf30f).

- You may search in the navigation history looking for Github, Stack Overflow, docs references... Not sure if thats legal or not, I wouldn't recommend you to do that!

- Last but not least: [console.log messages](http://console.love/). I like the fact that it's logged for everyone but only the curious will see it.

# 🕶️ Privacy concern

As long as the cookie is anonymous and stays on the user machine it seems fine: looking for someone's global variables is quite similar to approaching him/her in the street to compliment his/her cool webpack t-shirt.

# 🥳 Did it work ?

Kind of: with around 1.5 click/day -yes, we added google analytics- the exposure seems sufficient to keep the experiment going. And we did received a candidacy from it!

The approach I shared here with you is fairly basic and was not a technical challenge at all. However I think it's always nice to think about new original ways to take advantage of the tools we use every days. Hope it gave you some inspiration!
