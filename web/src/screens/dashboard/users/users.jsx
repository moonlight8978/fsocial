import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'

import {
  withLoading,
  LoadingPropTypes,
  FluidLoading,
} from '../../../components/loading'
import { Box, Text } from '../../../components/atomics'
import { WindowTitle } from '../../layout'

import UserApi from './user-api'
import UserResource from './user-resource'
import UserItem from './user-item'
import styles from './users.module.scss'

class Users extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
    intl: PropTypes.shape().isRequired,
  }

  state = {
    users: [],
    page: 1,
    isLastPage: false,
    filter: {
      q: '',
    },
  }

  componentDidMount() {
    this.fetchUsers()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.fetchUsers()
    }
  }

  async fetchUsers() {
    if (this.state.isLastPage) {
      return
    }

    try {
      this.props.startLoading()
      const { data } = await UserApi.fetchUsers(this.state.filter)(
        this.state.page
      )
      const users = UserResource.Users.parse(data)
      this.setState(state => ({
        users: _.uniqBy([...state.users, ...users], 'id'),
        isLastPage: users.length < 20,
      }))
      this.props.finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  handleChangePage = () => this.setState(state => ({ page: state.page + 1 }))

  handleChangeUser = (id, newUser) => {
    this.setState(state => ({
      users: state.users.map(user =>
        user.id === id ? { ...user, ...newUser } : user
      ),
    }))
  }

  render() {
    const { intl, isLoading } = this.props
    const { users, isLastPage } = this.state

    return (
      <>
        <WindowTitle
          title={intl.formatMessage({ id: 'dashboard.users.windowTitle' })}
        />
        <Box
          title={
            <Row gutter={32}>
              <Col span={6} offset={3}>
                <Text bold>
                  <FormattedMessage id="dashboard.users.headers.username" />
                </Text>
              </Col>
              <Col span={4}>
                <Text bold>
                  <FormattedMessage id="dashboard.users.headers.fullname" />
                </Text>
              </Col>
              <Col span={4}>
                <Text bold>
                  <FormattedMessage id="dashboard.users.headers.email" />
                </Text>
              </Col>
              <Col span={7}>
                <Text bold>
                  <FormattedMessage id="dashboard.users.headers.actions" />
                </Text>
              </Col>
            </Row>
          }
        >
          <div>
            {users.map(user => (
              <UserItem
                key={user.id}
                user={user}
                onChange={this.handleChangeUser}
              />
            ))}
          </div>

          {isLoading && <FluidLoading />}

          {!isLoading && (
            <Button
              onClick={this.handleChangePage}
              htmlType="button"
              type="primary"
              className={styles.buttonLoadMore}
              block
              disabled={isLastPage}
            >
              {isLastPage ? (
                <>
                  <FontAwesomeIcon icon="angle-up" />
                  <span>&nbsp;</span>
                  <FormattedMessage id="dashboard.users.lastPage" />
                  <span>&nbsp;</span>
                  <FontAwesomeIcon icon="angle-up" />
                </>
              ) : (
                <FontAwesomeIcon icon="ellipsis-h" />
              )}
            </Button>
          )}
        </Box>
      </>
    )
  }
}

export default withLoading(injectIntl(Users))
