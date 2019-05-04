import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { Box, Text } from '../atomics'
import { FollowButton, FollowingUsersResource } from '../following'
import { InlineName, User } from '../user'
import { paths } from '../../config'
import { withLoading, FluidLoading, LoadingPropTypes } from '../loading'

import styles from './followee-suggestion.module.scss'
import { FolloweesSuggestionApi } from './followees-suggestion-api'

class FolloweeSuggestion extends React.Component {
  static propTypes = {
    ...LoadingPropTypes,
  }

  constructor(props) {
    super(props)

    this.state = {
      followees: [],
      visibleFolloweeIds: [],
      followeeIds: [],
    }
  }

  async componentDidMount() {
    try {
      const { data } = await FolloweesSuggestionApi.fetchFollowees()
      const followees = FollowingUsersResource.parse(data)
      const followeeIds = followees.map(followee => followee.id)
      const visibleFolloweeIds = followeeIds.slice(0, 3)
      this.setState({
        followees,
        visibleFolloweeIds,
        followeeIds: followeeIds.filter(
          followeeId => !visibleFolloweeIds.includes(followeeId)
        ),
      })
      this.props.finishLoading()
    } catch (error) {
      console.log(error)
    }
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
    const { isLoading } = this.props

    return (
      <Box
        title={
          <Text bold>
            <FormattedMessage id="followeeSuggestion.title" />
          </Text>
        }
        bordered
      >
        {isLoading ? (
          <FluidLoading />
        ) : (
          visibleFolloweeIds.map(followeeId => {
            const user = followees.find(followee => followee.id === followeeId)
            const { username, fullname, id } = user

            return (
              <div className={styles.followee} key={id}>
                <div>
                  <User.Avatar size={50} user={user} />
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
          })
        )}
      </Box>
    )
  }
}

export default withLoading(FolloweeSuggestion)
