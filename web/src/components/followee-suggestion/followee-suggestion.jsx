import React from 'react'
import { Avatar } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { Box } from '../atomics'
import { FollowButton } from '../following'
import { InlineName } from '../user'
import { paths } from '../../config'

import styles from './followee-suggestion.module.scss'
import { FolloweesSuggestionApi } from './followees-suggestion-api'

class FolloweeSuggestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      followees: [],
      visibleFolloweeIds: [],
      followeeIds: [],
    }
  }

  async componentDidMount() {
    const { data: followees } = await FolloweesSuggestionApi.fetchFollowees()
    const followeeIds = followees.map(followee => followee.id)
    const visibleFolloweeIds = followeeIds.slice(0, 3)
    this.setState({
      followees,
      visibleFolloweeIds,
      followeeIds: followeeIds.filter(
        followeeId => !visibleFolloweeIds.includes(followeeId)
      ),
    })
  }

  handleAfterFollow(id) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const visibleFolloweeIds = this.state.visibleFolloweeIds
      .map(followeeId =>
        followeeId === id ? this.state.followeeIds[0] : followeeId
      )
      .filter(followeeId => followeeId)
    // eslint-disable-next-line react/no-access-state-in-setstate
    const followeeIds = this.state.followeeIds.filter(
      followeeId => !visibleFolloweeIds.includes(followeeId)
    )
    this.setState({
      visibleFolloweeIds,
      followeeIds,
    })
  }

  handleAfterUnfollow(id) {
    this.setState(state => ({
      followeeIds: [...state.followedIds, id],
    }))
  }

  render() {
    const { followees, visibleFolloweeIds } = this.state

    return (
      <Box title={<FormattedMessage id="followeeSuggestion.title" />}>
        {visibleFolloweeIds.map(followeeId => {
          const user = followees.find(followee => followee.id === followeeId)
          const { username, fullname, id } = user

          return (
            <div className={styles.followee}>
              <div>
                <Avatar size={50} src="/avatar-placeholder.png" />
              </div>

              <div className={styles.userInfo}>
                <div className={styles.name}>
                  <Link to={paths.user.resolve({ username })}>
                    <InlineName username={username} fullname={fullname} />
                  </Link>
                </div>
                <FollowButton
                  key={id}
                  user={user}
                  onFollow={() => this.handleAfterFollow(id)}
                  onUnfollow={() => this.handleAfterUnfollow(id)}
                />
              </div>
            </div>
          )
        })}
      </Box>
    )
  }
}

export default FolloweeSuggestion
