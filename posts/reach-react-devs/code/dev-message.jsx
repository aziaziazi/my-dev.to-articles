import React from 'react';
import { useCookies } from 'react-cookie';

export const DevMessage = () => {
  // Store if user has already closed the message
  const [cookies, setCookie] = useCookies();
  const cookieName = 'hasClosedDevMessage';
  const hasClosedDevMessage = cookies[cookieName] === 'true';
  const handleClose = () => setCookie(cookieName, true);

  // Check what plugins are installed
  const userPluginNames = [
    ['react', !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__],
    ['redux', !!window.__REDUX_DEVTOOLS_EXTENSION__],
    ['vue', !!window.__VUE_DEVTOOLS_GLOBAL_HOOK__],
  ]
    .filter(([name, value]) => value)
    .map(([name]) => name)
    .join(', ');

  // Only display the message if user has a plugins installed
  // and if s.he didn't close the message yet
  if (hasClosedDevMessage) return 'reset your cookies to see the message';
  if (!userPluginNames) return 'install a plugin to see the message';
  return [
    <h1>Hello {userPluginNames} Dev !</h1>,
    <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
      interested ?
    </a>,
    <button onClick={handleClose}>no thanks</button>,
  ];
};
