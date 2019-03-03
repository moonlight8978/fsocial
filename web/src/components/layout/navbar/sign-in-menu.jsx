import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

import { AuthContext } from '../../auth'
import { Text } from '../../atomics'

import styles from './sign-in-menu.module.scss'

const FormItem = Form.Item

export class SignInMenu extends React.Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)

    this.state = {
      values: {
        identity: '',
        password: '',
      },
      apiErrors: {},
      isDirty: false,
    }

    this.getApiError = {
      identity: errors => errors.identity,
      password: errors => errors.password,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  handleChange({ target }) {
    const { name, value } = target
    this.setState(state => ({
      values: { ...state.values, [name]: value },
      isDirty: true,
    }))
  }

  async handleSubmit(event) {
    event.preventDefault()

    console.log(this.state)
  }

  getFieldStatus(field) {
    const { apiErrors, isDirty } = this.state
    if (isDirty || _.isEmpty(apiErrors)) {
      return {
        status: 'success',
      }
    }
    const messages = this.getApiError[field](apiErrors)
    if (messages) {
      return {
        status: 'error',
        message: messages.join(', '),
      }
    }
    return { status: 'success' }
  }

  signOut() {
    const { signOut } = this.context
    signOut()
  }

  render() {
    const {
      values: { identity, password },
    } = this.state

    const identityField = this.getFieldStatus('identity')
    const passwordField = this.getFieldStatus('password')

    return (
      <div className={styles.menu}>
        <Form onSubmit={this.handleSubmit}>
          <div className={styles.groupTitle}>
            <Text color="secondary" size="large">
              <FormattedMessage id="signIn.memberTitle" />
            </Text>
          </div>

          <FormItem
            validateStatus={identityField.status}
            help={identityField.message}
            className={styles.formItem}
          >
            <Input
              type="text"
              placeholder="Email or Username"
              value={identity}
              name="identity"
              onChange={this.handleChange}
            />
          </FormItem>

          <FormItem
            validateStatus={passwordField.status}
            help={passwordField.message}
            className={styles.formItem}
          >
            <Input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={this.handleChange}
            />
          </FormItem>

          <Button
            block
            type="primary"
            shape="round"
            htmlType="submit"
            className={styles.button}
          >
            <FormattedMessage id="signIn.submit" />
          </Button>
        </Form>

        <Divider className={styles.divider} />

        <div>
          <div className={styles.groupTitle}>
            <Text color="secondary" size="large">
              <FormattedMessage id="signIn.guestTitle" />
            </Text>
          </div>

          <Button
            block
            type="primary"
            shape="round"
            htmlType="button"
            className={styles.button}
          >
            <FormattedMessage id="signIn.signUp" />
          </Button>
        </div>
      </div>
    )
  }
}
