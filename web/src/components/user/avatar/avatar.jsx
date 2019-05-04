import React from 'react'
import { Avatar as AntdAvatar } from 'antd'

const Avatar = ({ user, ...rest }) => (
  <AntdAvatar src={user.avatar.url} {...rest} />
)

export default Avatar
