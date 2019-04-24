import React from 'react'
import { Form, Input, Button } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box } from '../../../components/atomics'
import { WindowTitle } from '../../layout'

import PasswordForm from './password-form'
import styles from './password.module.scss'

class Password extends React.PureComponent {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    labelAlign: 'left',
    colon: false,
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    return (
      <Box className={styles.container}>
        <WindowTitle
          title={formatMessage({ id: 'settings.password.windowTitle' })}
        />

        <PasswordForm>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            fieldStatus,
            fieldError,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} {...this.formLayout}>
              <Form.Item
                validateStatus={fieldStatus('currentPassword')}
                help={fieldError('currentPassword')}
                label={formatMessage({
                  id: 'schemas.user.currentPassword.label',
                })}
                required
              >
                <Input
                  type="password"
                  placeholder={formatMessage({
                    id: 'schemas.user.currentPassword.placeholder',
                  })}
                  value={values.currentPassword}
                  name="currentPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('password')}
                help={fieldError('password')}
                label={formatMessage({ id: 'schemas.user.password.label' })}
                required
              >
                <Input
                  type="password"
                  placeholder={formatMessage({
                    id: 'schemas.user.password.placeholder',
                  })}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('passwordConfirmation')}
                help={fieldError('passwordConfirmation')}
                label={formatMessage({
                  id: 'schemas.user.passwordConfirmation.label',
                })}
                required
              >
                <Input
                  type="password"
                  placeholder={formatMessage({
                    id: 'schemas.user.passwordConfirmation.placeholder',
                  })}
                  value={values.passwordConfirmation}
                  name="passwordConfirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <div className={styles.submitWrapper}>
                <Button
                  htmlType="submit"
                  type="primary"
                  shape="round"
                  disabled={isSubmitting}
                  className={styles.submit}
                >
                  <FormattedMessage id="settings.password.submit" />
                </Button>
              </div>
            </Form>
          )}
        </PasswordForm>
      </Box>
    )
  }
}

export default injectIntl(Password)
