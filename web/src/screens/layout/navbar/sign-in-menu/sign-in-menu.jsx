import React from 'react'
import { Button, Divider, Form, Input } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Text } from '../../../../components/atomics'

import styles from './sign-in-menu.module.scss'
import SignInForm from './sign-in-form'

const FormItem = Form.Item

class SignInMenu extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    const { signOut } = this.context
    signOut()
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    return (
      <div className={styles.menu}>
        <SignInForm>
          {({
            values,
            fieldStatus,
            fieldError,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
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
                  placeholder={formatMessage({
                    id: 'schemas.session.identity.placeholder',
                  })}
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
                  placeholder={formatMessage({
                    id: 'schemas.session.password.placeholder',
                  })}
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
                disabled={isSubmitting}
              >
                <FormattedMessage id="signIn.submit" />
              </Button>
            </Form>
          )}
        </SignInForm>

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

export default injectIntl(SignInMenu)
