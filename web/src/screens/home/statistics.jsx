import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box, Text } from '../../components/atomics'
import { withAuthContext, authSelectors } from '../../components/auth'
import {
  withStatisticsContext,
  statisticsSelectors,
} from '../../components/statistics'

import styles from './statistics.module.scss'

class Statistics extends React.Component {
  static propTypes = {
    statistics: PropTypes.shape().isRequired,
    auth: PropTypes.shape().isRequired,
  }

  render() {
    const { statistics, auth } = this.props
    const user = authSelectors.getUser(auth)
    const followeesCount = statisticsSelectors.getFolloweesCount(statistics)
    const followersCount = statisticsSelectors.getFollowersCount(statistics)
    const postsCount = statisticsSelectors.getPostsCount(statistics)

    return (
      <Box>
        <div className={styles.container}>
          <div className={styles.cover} />

          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <Avatar
                size={60}
                src="/avatar-placeholder.png"
                className={styles.avatarThumb}
              />
            </div>

            <div className={styles.userNames}>
              <Link to="/">
                <Text bold size="large">
                  {user.fullname}
                </Text>
                <br />
                <Text color="secondary">@{user.username}</Text>
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.statsGroup}>
                <Text bold>
                  <FormattedMessage id="statistics.headers.post" />
                </Text>
                <br />
                <Text bold color="link" size="xlarge">
                  {postsCount}
                </Text>
              </div>

              <div className={styles.statsGroup}>
                <Text bold>
                  <FormattedMessage id="statistics.headers.followee" />
                </Text>
                <br />
                <Text bold color="link" size="xlarge">
                  {followeesCount}
                </Text>
              </div>

              <div className={styles.statsGroup}>
                <Text bold>
                  <FormattedMessage id="statistics.headers.follower" />
                </Text>
                <br />
                <Text bold color="link" size="xlarge">
                  {followersCount}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Box>
    )
  }
}

export default withAuthContext(withStatisticsContext(Statistics))
