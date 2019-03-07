import React from 'react'
import { Form, Input, Button, Divider } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { object, string } from 'yup'
import { Formik } from 'formik'

import { AuthContext } from '../../../auth'
import { Text } from '../../../atomics'

import styles from './sign-in-menu.module.scss'

const FormItem = Form.Item

const defaultValues = {
  identity: '',
  password: '',
}

const schema = intl =>
  object().shape({
    identity: string().required(
      intl.formatMessage({ id: 'schemas.session.identity.errors.required' })
    ),
    password: string().required(
      intl.formatMessage({ id: 'schemas.session.password.errors.required' })
    ),
  })

export class SignInForm extends React.Component {
  static contextType = AuthContext

  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props)

    this.initForm()
  }

  initForm() {
    const { intl } = this.props
    this.schema = schema(intl)
  }

  render() {
    const { intl } = this.props

    return (
      <Formik
        initialValues={defaultValues}
        validationSchema={this.schema}
        onSubmit={values => console.log(values)}
      >
        {({ values, errors, handleChange, handleBlur, touched }) => {
          console.log(touched)
          return (
            <>
              <div className={styles.groupTitle}>
                <Text color="secondary" size="large">
                  <FormattedMessage id="signIn.memberTitle" />
                </Text>
              </div>

              <FormItem
                validateStatus={
                  errors.identity && touched.identity ? 'error' : 'success'
                }
                help={touched.identity && errors.identity}
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
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
                help={touched.password && errors.password}
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
            </>
          )
        }}
      </Formik>
    )
  }
}
