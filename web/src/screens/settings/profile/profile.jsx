import React from 'react'
import { Form, Input, Button, DatePicker, Select } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box } from '../../../components/atomics'
import { withAuthContext, authSelectors } from '../../../components/auth'

import ProfileForm from './profile-form'
import styles from './profile.module.scss'

class Profile extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
  }

  dateFormat = 'YYYY/MM/DD'

  formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    labelAlign: 'left',
    colon: false,
  }

  defaultValues = () => {
    const { auth } = this.props
    const user = authSelectors.getUser(auth)
    const userForm = _.pick(user, [
      'username',
      'fullname',
      'email',
      'gender',
      'birthday',
      'description',
    ])
    userForm.birthday = userForm.birthday ? moment(userForm.birthday) : null
    return userForm
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl

    console.log(this.defaultValues())

    return (
      <Box className={styles.container}>
        <ProfileForm defaultValues={this.defaultValues()}>
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
                validateStatus={fieldStatus('username')}
                help={fieldError('username')}
                label={formatMessage({ id: 'schemas.user.username.label' })}
                required
              >
                <Input
                  type="text"
                  placeholder={formatMessage({
                    id: 'schemas.user.username.placeholder',
                  })}
                  value={values.username}
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled
                />
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('fullname')}
                help={fieldError('fullname')}
                label={formatMessage({ id: 'schemas.user.fullname.label' })}
                required
              >
                <Input
                  type="text"
                  placeholder={formatMessage({
                    id: 'schemas.user.fullname.placeholder',
                  })}
                  value={values.fullname}
                  name="fullname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('email')}
                help={fieldError('email')}
                label={formatMessage({ id: 'schemas.user.email.label' })}
                required
              >
                <Input
                  type="text"
                  placeholder={formatMessage({
                    id: 'schemas.user.email.placeholder',
                  })}
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('birthday')}
                help={fieldError('birthday')}
                label={formatMessage({ id: 'schemas.user.birthday.label' })}
              >
                <DatePicker
                  defaultValue={moment()}
                  value={values.birthday}
                  format={this.dateFormat}
                  onChange={momentValue =>
                    handleChange({
                      target: { name: 'birthday', value: momentValue },
                    })
                  }
                  onBlur={() => handleBlur({ target: { name: 'birthday' } })}
                  placeholder={formatMessage({
                    id: 'schemas.user.birthday.placeholder',
                  })}
                />
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('gender')}
                help={fieldError('gender')}
                label={formatMessage({ id: 'schemas.user.gender.label' })}
              >
                <Select
                  placeholder={formatMessage({
                    id: 'schemas.user.gender.placeholder',
                  })}
                  allowClear
                  value={values.gender}
                  onChange={value =>
                    handleChange({ target: { name: 'gender', value } })
                  }
                  onBlur={() => handleBlur({ target: { name: 'gender' } })}
                >
                  {['male', 'female'].map(gender => (
                    <Select.Option value={gender} key={gender}>
                      {formatMessage({
                        id: `schemas.user.gender.enums.${gender}`,
                      })}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                validateStatus={fieldStatus('description')}
                help={fieldError('description')}
                label={formatMessage({ id: 'schemas.user.description.label' })}
              >
                <Input.TextArea
                  autosize
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="description"
                  value={values.description}
                  placeholder={formatMessage({
                    id: 'schemas.user.description.placeholder',
                  })}
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
        </ProfileForm>
      </Box>
    )
  }
}

export default withAuthContext(injectIntl(Profile))
