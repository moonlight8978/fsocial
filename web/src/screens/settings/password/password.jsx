import React from 'react'
import { Form, Input, Button } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Box } from '../../../components/atomics'

import PasswordForm from './password-form'
import styles from './password.module.scss'

class Password extends React.PureComponent {
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
                validateStatus={fieldStatus('password')}
                help={fieldError('password')}
                label={formatMessage({ id: 'schemas.user.password.label' })}
                required
              >
                <Input
                  type="text"
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
                  type="text"
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
                  <FormattedMessage id="settings.profile.submit" />
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
