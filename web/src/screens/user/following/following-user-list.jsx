import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import {
  withLoading,
  LoadingPropTypes,
  FluidLoading,
} from '../../../components/loading'
import {
  FollowingUsersResource,
  FollowButton,
} from '../../../components/following'
import { paths } from '../../../config'
import { Box, Text, Ellipsis, BoxSpacer } from '../../../components/atomics'

import styles from './following-user.module.scss'

class FollowingUserList extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    fetch: PropTypes.func.isRequired,
    ...LoadingPropTypes,
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }

    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  async componentDidMount() {
    try {
      const { user, finishLoading, fetch } = this.props
      const { data } = await fetch(user.username)
      this.setState({ data: FollowingUsersResource.parse(data) }, finishLoading)
    } catch (error) {
      console.log(error)
    }
  }

  handleFollow(targetUser) {
    this.setState(state => ({
      data: state.data.map(user =>
        user.id === targetUser.id ? { ...user, isFollowed: true } : user
      ),
    }))
  }

  handleUnfollow(targetUser) {
    this.setState(state => ({
      data: state.data.map(user =>
        user.id === targetUser.id ? { ...user, isFollowed: false } : user
      ),
    }))
  }

  render() {
    const { data } = this.state
    const { isLoading } = this.props

    return (
      <div>
        {isLoading ? (
          <FluidLoading />
        ) : (
          <Row gutter={16}>
            {data.map(user => (
              <Col span={8} key={user.id}>
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
                      <FollowButton
                        user={user}
                        onFollow={this.handleFollow}
                        onUnfollow={this.handleUnfollow}
                      />
                    </div>

                    <Ellipsis>
                      <Link
                        to={paths.user.resolve({ username: user.username })}
                      >
                        <Text bold size="xlarge" hover hoverColor="link">
                          {user.fullname}
                        </Text>
                      </Link>
                      <br />
                      <Text color="secondary">@{user.username}</Text>
                    </Ellipsis>
                  </div>
                </Box>
                <BoxSpacer />
              </Col>
            ))}
          </Row>
        )}
      </div>
    )
  }
}

export default withLoading(FollowingUserList)
