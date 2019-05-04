import React from 'react'
import { Avatar as AntdAvatar } from 'antd'
import PropTypes from 'prop-types'

const Avatar = ({ user, ...rest }) => (
  <AntdAvatar src={user.avatar.url} {...rest} />
)

Avatar.propTypes = {
  user: PropTypes.shape().isRequired,
}

export default Avatar
