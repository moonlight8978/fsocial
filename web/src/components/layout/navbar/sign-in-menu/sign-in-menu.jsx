import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { AuthContext } from '../../../auth'
import { Text } from '../../../atomics'

import styles from './sign-in-menu.module.scss'
import { SignInForm } from './sign-in-form'

const FormItem = Form.Item

export class SignInMenu extends React.Component {
  static contextType = AuthContext

  static propTypes = {
    intl: PropTypes.shape().isRequired,
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

    return (
      <div className={styles.menu}>
        <SignInForm />

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
