import React from 'react'
import { Button, Divider, Form, Input } from 'antd'
import { FormattedMessage } from 'react-intl'

import { Text } from '../../../atomics'
import { AuthConsumer } from '../../../auth'

import styles from './sign-in-menu.module.scss'
import { SignInForm } from './sign-in-form'

const FormItem = Form.Item

export class SignInMenu extends React.Component {
  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    const { signOut } = this.context
    signOut()
  }

  render() {
    return (
      <div className={styles.menu}>
        <AuthConsumer>
          {({ signIn }) => (
            <SignInForm signIn={signIn}>
              {({
                values,
                fieldStatus,
                fieldError,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className={styles.groupTitle}>
                    <Text color="secondary" size="large">
                      <FormattedMessage id="signIn.memberTitle" />
                    </Text>
                  </div>

                  <FormItem
                    validateStatus={fieldStatus('identity')}
                    help={fieldError('identity')}
                    className={styles.formItem}
                  >
                    <Input
                      type="text"
                      placeholder="Email or Username"
                      value={values.identity}
                      name="identity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormItem>

                  <FormItem
                    validateStatus={fieldStatus('password')}
                    help={fieldError('password')}
                    className={styles.formItem}
                  >
                    <Input
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
              )}
            </SignInForm>
          )}
        </AuthConsumer>

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
