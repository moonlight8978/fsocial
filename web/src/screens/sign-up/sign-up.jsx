import React from 'react'
import { Form, Input, Button } from 'antd'
import classnames from 'classnames'
import { FormattedMessage, injectIntl } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import { Box } from '../../components/atomics'
import { LocaleConsumer } from '../../components/locale'
import { UnauthorizedNavbar, Layout } from '../layout'

import styles from './sign-up.module.scss'
import SignUpForm from './sign-up-form'

const FormItem = Form.Item

class SignUp extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    return (
      <Layout
        fluid
        hasNavbar
        navbar={<UnauthorizedNavbar hasSubmenu />}
        windowTitle={formatMessage({ id: 'signUp.windowTitle' })}
      >
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
            <div className={styles.signUpBox}>
              <Box
                title={
                  <h2>
                    <FormattedMessage id="signUp.title" />
                  </h2>
                }
                bordered
              >
                <SignUpForm>
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    fieldStatus,
                    fieldError,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormItem
                        validateStatus={fieldStatus('username')}
                        help={fieldError('username')}
                      >
                        <Input
                          type="text"
                          placeholder={formatMessage({
                            id: 'schemas.user.username.placeholder',
                          })}
                          value={values.username}
                          name="username"
                          className={styles.input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormItem>
                      <FormItem
                        validateStatus={fieldStatus('email')}
                        help={fieldError('email')}
                      >
                        <Input
                          type="text"
                          placeholder={formatMessage({
                            id: 'schemas.user.email.placeholder',
                          })}
                          value={values.email}
                          name="email"
                          className={styles.input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </FormItem>

                      <FormItem
                        validateStatus={fieldStatus('password')}
                        help={fieldError('password')}
                      >
                        <Input
                          type="password"
                          placeholder={formatMessage({
                            id: 'schemas.user.password.placeholder',
                          })}
                          value={values.password}
                          name="password"
                          className={styles.input}
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
                        <FormattedMessage id="signUp.submit" />
                      </Button>
                    </Form>
                  )}
                </SignUpForm>
              </Box>

              <LocaleConsumer>
                {({ changeLocale, currentLocale }) => (
                  <div className={styles.langList}>
                    <Button
                      onClick={changeLocale('en')}
                      className={classnames(styles.langSwitch, {
                        [styles.langActive]: currentLocale === 'en',
                      })}
                    >
                      <FormattedMessage id="locales.english" />
                    </Button>
                    <Button
                      onClick={changeLocale('vi')}
                      className={classnames(styles.langSwitch, {
                        [styles.langActive]: currentLocale === 'vi',
                      })}
                    >
                      <FormattedMessage id="locales.vietnamese" />
                    </Button>
                  </div>
                )}
              </LocaleConsumer>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default injectIntl(SignUp)
