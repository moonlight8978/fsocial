import React from 'react'

import { FollowingConsumer } from './following'

export function withFollowingContext(Component) {
  function WithFollowingContext(props) {
    return (
      <FollowingConsumer>
        {context => <Component {...props} following={context} />}
      </FollowingConsumer>
    )
  }

  return WithFollowingContext
}
