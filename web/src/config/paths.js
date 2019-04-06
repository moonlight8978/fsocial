import URITemplate from 'urijs/src/URITemplate'

function createUri(uri) {
  return new URITemplate(uri)
}

export const paths = {
  home: {
    route: '/',
    resolve: () => '/',
  },
  about: {
    route: '/about',
    resolve: () => '/about',
  },
  signUp: {
    route: '/sign_up',
    resolve: () => '/sign_up',
  },
  settings: {
    route: '/settings',
    resolve: () => '/settings',
  },
  notifications: {
    route: '/notifications',
    resolve: () => '/notifications',
  },
  messages: {
    route: '/messages',
    resolve: () => '/messages',
  },
  user: {
    route: '/users/:username([a-zA-Z]{1}[a-zA-Z0-9_]*)',
    resolve: ({ username }) =>
      createUri('/users/{username}').expand({ username }),
    extend: ({ username }, path) =>
      `${paths.user.resolve({ username })}${path}`,
  },
  post: {
    route: '/users/:username([a-zA-Z]{1}[a-zA-Z0-9_]*)/posts/:id',
    resolve: ({ username, id }) =>
      createUri('/users/{username}/posts/{id}').expand({ username, id }),
  },
}
