import React from 'react'
import { Avatar } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { Box } from '../atomics'
import { FollowButton } from '../following'
import { InlineName } from '../user'
import { paths } from '../../config'

import styles from './followee-suggestion.module.scss'

class FolloweeSuggestion extends React.Component {
  followees = [
    { username: 'test1', fullname: 'Test 1' },
    { username: 'test2', fullname: 'Test 2' },
    { username: 'test3', fullname: 'Test 3' },
    { username: 'test4', fullname: 'A very long name that will be truncated' },
  ]

  render() {
    return (
      <Box title={<FormattedMessage id="followeeSuggestion.title" />}>
        {this.followees.map(({ username, fullname }) => (
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
              <FollowButton />
            </div>
          </div>
        ))}
      </Box>
    )
  }
}

export default FolloweeSuggestion
