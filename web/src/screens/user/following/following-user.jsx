import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { paths } from '../../../config'
import { Box, Text, Ellipsis } from '../../../components/atomics'
import { FollowButton } from '../../../components/following'

import styles from './following-user.module.scss'

class FollowingUser extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
  }

  render() {
    const { user } = this.props
    const { username, fullname } = user

    return (
      <Box className={styles.wrapper} bordered>
        <div className={styles.profilePictures}>
          <div className={styles.cover}>
            <img src="/cover-placeholder.png" alt="Cover" />
          </div>

          <div className={styles.avatar}>
            <Avatar
              className={styles.avatarThumb}
              size={80}
              src="/avatar-placeholder.png"
              alt="Avatar"
            />
          </div>
        </div>

        <div className={styles.profile}>
          <div className={styles.actions}>
            <FollowButton user={user} />
          </div>

          <Ellipsis>
            <Link to={paths.user.resolve({ username })}>
              <Text bold size="xlarge" hover hoverColor="link">
                {fullname}
              </Text>
            </Link>
            <br />
            <Text color="secondary">@{username}</Text>
          </Ellipsis>
        </div>
      </Box>
    )
  }
}

export default FollowingUser
