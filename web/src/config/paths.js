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
    resolve: (params = {}) =>
      params.subPath
        ? createUri('/settings/{subPath}').expand({ subPath: params.subPath })
        : '/settings',
  },
  settingsProfile: {
    route: '/:path(settings|settings/profile)',
  },
  settingsPassword: {
    route: '/settings/password',
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
  hashtag: {
    route: '/hashtags/:slug',
    resolve: ({ slug }) => createUri('/hashtags/{slug}').expand({ slug }),
  },
  dashboard: {
    route: '/dashboard',
    resolve: (params = {}) =>
      params.managedTarget
        ? createUri('/dashboard/{managedTarget}').expand({
            managedTarget: params.managedTarget,
          })
        : '/dashboard/reports',
  },
  memories: {
    route: '/memories',
    resolve: () => '/memories',
  },
}
