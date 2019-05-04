import React from 'react'
import { Button, Col, Row, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'

import { Text, Ellipsis } from '../../../components/atomics'
import { User } from '../../../components/user'

import styles from './user-item.module.scss'
import UserApi from './user-api'
import UserResource from './user-resource'

class UserItem extends React.PureComponent {
  upgradeToAdmin = async () => {
    const { user, onChange } = this.props
    try {
      const { data } = await UserApi.update(user.id, { role: 'admin' })
      const newUser = UserResource.User.parse(data)
      onChange(user.id, _.pick(newUser, 'role'))
    } catch (error) {
      message.error(error.message)
    }
  }

  downgradeToUser = async () => {
    const { user, onChange } = this.props
    try {
      const { data } = await UserApi.update(user.id, { role: 'user' })
      const newUser = UserResource.User.parse(data)
      onChange(user.id, _.pick(newUser, 'role'))
    } catch (error) {
      message.error(error.message)
    }
  }

  render() {
    const { user } = this.props
    const { username, fullname, email, role } = user

    return (
      <div className={styles.item}>
        <Row gutter={32}>
          <Col span={3}>
            <User.Avatar size="large" user={user} />
          </Col>
          <Col span={6}>
            <Ellipsis>
              <User.Role role={role} className={styles.role} />
              <Text>{username}</Text>
            </Ellipsis>
          </Col>
          <Col span={4}>
            <Ellipsis>
              <Text>{fullname}</Text>
            </Ellipsis>
          </Col>
          <Col span={4}>
            <Ellipsis>
              <Text>{email}</Text>
            </Ellipsis>
          </Col>
          <Col span={7}>
            {role === 'user' && (
              <div>
                <Button
                  className={styles.upgradeAdmin}
                  onClick={this.upgradeToAdmin}
                >
                  <Text>
                    <FontAwesomeIcon icon="arrow-up" />
                  </Text>
                </Button>
                <Text>Upgrade to admin</Text>
              </div>
            )}
            {role === 'admin' && (
              <div>
                <Button
                  className={styles.downgradeUser}
                  onClick={this.downgradeToUser}
                >
                  <Text>
                    <FontAwesomeIcon icon="arrow-down" />
                  </Text>
                </Button>
                <Text>Downgrade to user</Text>
              </div>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

export default UserItem
