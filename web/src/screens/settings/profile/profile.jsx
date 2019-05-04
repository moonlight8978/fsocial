import React from 'react'
import { Form, Input, Button, DatePicker, Select, Upload, Avatar } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { injectIntl, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box } from '../../../components/atomics'
import { withAuthContext, authSelectors } from '../../../components/auth'
import { WindowTitle } from '../../layout'

import ProfileForm from './profile-form'
import styles from './profile.module.scss'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.onload = () => callback(reader.result)
  reader.onerror = error => console.log(error)
  reader.readAsDataURL(img)
}

class Profile extends React.PureComponent {
  static propTypes = {
    auth: PropTypes.shape().isRequired,
    intl: PropTypes.shape().isRequired,
  }

  state = {
    avatarPreview: this.props.auth.user.avatar.url || '/avatar-placeholder.png',
    coverPreview: this.props.auth.user.cover.url || '/cover-placeholder.png',
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
    let userForm = _.pick(user, [
      'username',
      'fullname',
      'email',
      'gender',
      'birthday',
      'description',
    ])
    userForm = {
      ...userForm,
      birthday: userForm.birthday ? moment(userForm.birthday) : null,
      avatar: null,
      cover: null,
    }
    return userForm
  }

  setPreview = prefix => file => {
    getBase64(file, imageUrl => {
      this.setState({ [`${prefix}Preview`]: imageUrl })
    })
  }

  render() {
    const { intl } = this.props
    const { formatMessage } = intl
    const { avatarPreview, coverPreview } = this.state

    return (
      <Box className={styles.container}>
        <WindowTitle
          title={formatMessage({ id: 'settings.profile.windowTitle' })}
        />

        <ProfileForm defaultValues={this.defaultValues()}>
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            fieldStatus,
            fieldError,
            isSubmitting,
            handleUploadSingle,
          }) => (
            <Form onSubmit={handleSubmit} {...this.formLayout}>
              <div className={styles.profileImages}>
                <Upload
                  name="cover"
                  beforeUpload={handleUploadSingle(
                    'cover',
                    this.setPreview('cover')
                  )}
                  fileList={[]}
                  accept=".png,.jpg,.jpeg"
                  onBlur={handleBlur}
                  className={styles.cover}
                >
                  <img src={coverPreview} alt="Cover" />
                </Upload>

                <Upload
                  name="avatar"
                  beforeUpload={handleUploadSingle(
                    'avatar',
                    this.setPreview('avatar')
                  )}
                  fileList={[]}
                  accept=".png,.jpg,.jpeg"
                  onBlur={handleBlur}
                  className={styles.avatar}
                >
                  <Avatar src={avatarPreview} size={100} />
                </Upload>
              </div>

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
