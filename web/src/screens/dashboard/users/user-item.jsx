import React from 'react'
import { Button, Col, Row, Avatar } from 'antd'

import { Text, Ellipsis } from '../../../components/atomics'
import { User } from '../../../components/user'

class UserItem extends React.PureComponent {
  render() {
    const { user } = this.props
    const { username, fullname, email, role } = user

    return (
      <Row>
        <Col span="3">
          <Avatar size="large" src="/avatar-placeholder.png" />
        </Col>
        <Col span="5">
          <Ellipsis>
            <User.Role role={role} />
            <Text bold>{username}</Text>
          </Ellipsis>
        </Col>
        <Col span="5">
          <Ellipsis>
            <Text bold>{fullname}</Text>
          </Ellipsis>
        </Col>
        <Col span="5">
          <Ellipsis>
            <Text bold>{email}</Text>
          </Ellipsis>
        </Col>
        <Col span="6">
          <Button>Change user to admin</Button>
          <br />
          <Button>Change user to user</Button>
        </Col>
      </Row>
    )
  }
}

export default UserItem
