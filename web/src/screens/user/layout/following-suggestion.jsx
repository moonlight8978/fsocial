import React from 'react'

import { FollowingProvider } from '../../../components/following'
import { FolloweeSuggestion } from '../../../components/followee-suggestion'

class FollowingSuggestionWrapper extends React.PureComponent {
  render() {
    return (
      <FollowingProvider authorized>
        <FolloweeSuggestion />
      </FollowingProvider>
    )
  }
}

export default FollowingSuggestionWrapper
