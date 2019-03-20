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
      followeeIds: [],
    }
  }

  async componentDidMount() {
    const { data: followees } = await FolloweesSuggestionApi.fetchFollowees()
    this.setState({
      followees,
      followeeIds: followees.map(followee => followee.id),
    })
  }

  handleAfterFollow(id) {
    this.setState(state => ({
      followeeIds: state.followeeIds.filter(followeeId => followeeId !== id),
    }))
  }

  handleAfterUnfollow(id) {
    this.setState(state => ({
      followeeIds: [...state.followedIds, id],
    }))
  }

  render() {
    const { followees, followeeIds } = this.state

    return (
      <Box title={<FormattedMessage id="followeeSuggestion.title" />}>
        {followeeIds.slice(0, 3).map(followeeId => {
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
                  user={user}
                  onFollow={() => this.handleAfterFollow(id)}
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
