import twitter from 'twitter-text'

const Twitter = {
  config: {
    hashtagUrlBase: '/hashtags/',
    usernameUrlBase: '/users/',
  },
  autoLink: (content, attrs) => {
    return twitter.autoLink(twitter.htmlEscape(content), {
      ...Twitter.config,
      ...attrs,
    })
  },
}

export { Twitter }
