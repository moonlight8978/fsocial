import React from 'react'
import { Form, Input, Button } from 'antd'
import _ from 'lodash'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Layout, UnauthorizedNavbar } from '../../components/layout'
import { AuthContext } from '../../components/auth'
import { Box } from '../../components/atomics'

import styles from './sign-up.module.scss'

const FormItem = Form.Item

export class SignUp extends React.Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)

    this.state = {
      values: {
        username: '',
        email: '',
        password: '',
      },
      apiErrors: {},
      isDirty: false,
    }

    this.getApiError = {
      username: errors => errors.username,
      email: errors => errors.email,
      password: errors => errors.password,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

    const auth = this.context
    const { values } = this.state

    try {
      await auth.signIn(values)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          this.setState({ apiErrors: error.response.data.errors })
        } else {
          this.setState({ apiErrors: {} })
        }
      } else {
        console.log(error.message)
      }
    }
  }

  fieldStatus(field) {
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

  render() {
    const {
      values: { username, email, password },
    } = this.state

    const usernameField = this.fieldStatus('username')
    const emailField = this.fieldStatus('email')
    const passwordField = this.fieldStatus('password')

    return (
      <Layout fluid hasNavbar navbar={<UnauthorizedNavbar hasSubmenu />}>
        <div className={styles.wrapper}>
          <div className={classnames(styles.pane, styles.paneLeft)}>
            <div>
              <h3 className={styles.slogan}>
                <FontAwesomeIcon
                  icon="search"
                  size="2x"
                  fixedWidth
                  className={styles.sloganIcon}
                />
                <FormattedMessage id="signUp.slogans.first" />
              </h3>
              <h3 className={styles.slogan}>
                <FontAwesomeIcon
                  icon="users"
                  size="2x"
                  fixedWidth
                  className={styles.sloganIcon}
                />
                <FormattedMessage id="signUp.slogans.second" />
              </h3>
              <h3 className={styles.slogan}>
                <FontAwesomeIcon
                  icon="comments"
                  size="2x"
                  fixedWidth
                  className={styles.sloganIcon}
                />
                <FormattedMessage id="signUp.slogans.third" />
              </h3>
            </div>
          </div>

          <div className={classnames(styles.pane, styles.paneRight)}>
            <Box
              title={
                <h2>
                  <FormattedMessage id="signUp.title" />
                </h2>
              }
              className={styles.signUpBox}
              bordered
            >
              <Form onSubmit={this.handleSubmit}>
                <FormItem
                  validateStatus={usernameField.status}
                  help={usernameField.message}
                >
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    name="username"
                    onChange={this.handleChange}
                    className={styles.input}
                  />
                </FormItem>
                <FormItem
                  validateStatus={emailField.status}
                  help={emailField.message}
                >
                  <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                    className={styles.input}
                  />
                </FormItem>

                <FormItem
                  validateStatus={passwordField.status}
                  help={passwordField.message}
                >
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={this.handleChange}
                    className={styles.input}
                  />
                </FormItem>

                <Button
                  block
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  className={styles.button}
                >
                  <FormattedMessage id="signUp.submit" />
                </Button>
              </Form>
            </Box>
          </div>
        </div>
      </Layout>
    )
  }
}
