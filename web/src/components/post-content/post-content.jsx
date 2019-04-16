import React from 'react'
import twitter from 'twitter-text'

import { Text } from '../atomics'

class PostContent extends React.PureComponent {
  render() {
    const { content, className } = this.props

    return (
      <p className={className}>
        <Text>
          <span
            dangerouslySetInnerHTML={{
              __html: twitter.autoLink(twitter.htmlEscape(content)),
            }}
          />
        </Text>
      </p>
    )
  }
}

export default PostContent
