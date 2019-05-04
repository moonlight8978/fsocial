import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box, Text, Ellipsis } from '../../components/atomics'
import { withAuthContext, authSelectors } from '../../components/auth'
import {
  withStatisticsContext,
  statisticsSelectors,
} from '../../components/statistics'
import { paths } from '../../config'

import styles from './statistics.module.scss'
import { User } from '../../components/user'

class Statistics extends React.Component {
  static StatGroup = ({ title, count }) => (
    <div className={styles.statsGroup}>
      <Ellipsis>
        <Text size="small" bold color="secondary">
          {title}
        </Text>
      </Ellipsis>
      <Text bold color="link" size="xlarge">
        {count}
      </Text>
    </div>
  )

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
      <Box bordered>
        <div className={styles.container}>
          <div className={styles.cover}>
            <img
              src={user.cover.url}
              alt="Cover"
              className={styles.coverThumb}
            />
          </div>

          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <User.Avatar
                size={60}
                user={user}
                className={styles.avatarThumb}
              />
            </div>

            <div className={styles.userNames}>
              <Ellipsis>
                <Link to={paths.user.resolve({ username: user.username })}>
                  <Text bold size="large" hover hoverColor="link">
                    {user.fullname}
                  </Text>
                </Link>
                <br />
                <Text color="secondary">@{user.username}</Text>
              </Ellipsis>
            </div>

            <div className={styles.stats}>
              <Statistics.StatGroup
                title={<FormattedMessage id="statistics.headers.post" />}
                count={postsCount}
              />
              <Statistics.StatGroup
                title={<FormattedMessage id="statistics.headers.followee" />}
                count={followeesCount}
              />
              <Statistics.StatGroup
                title={<FormattedMessage id="statistics.headers.follower" />}
                count={followersCount}
              />
            </div>
          </div>
        </div>
      </Box>
    )
  }
}

export default withAuthContext(withStatisticsContext(Statistics))
