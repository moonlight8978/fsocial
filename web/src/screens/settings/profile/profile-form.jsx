import React from 'react'
import { object, string, date } from 'yup'
import PropTypes from 'prop-types'

import { StaticForm } from '../../../components/form'
import { withAuthContext } from '../../../components/auth'
import SettingsApi from '../settings-api'
import { AuthResources } from '../../../components/auth/auth-resources'

const schema = intl =>
  object().shape({
    username: string()
      .required(
        intl.formatMessage({
          id: 'schemas.user.username.errors.required',
        })
      )
      .matches(
        /^[a-zA-Z]/,
        intl.formatMessage({
          id: 'schemas.user.username.errors.format.begin_with_character',
        })
      )
      .matches(
        /^[a-zA-Z0-9_]*$/,
        intl.formatMessage({
          id: 'schemas.user.username.errors.format.no_special_characters',
        })
      ),
    email: string()
      .required(
        intl.formatMessage({ id: 'schemas.user.email.errors.required' })
      )
      .email(intl.formatMessage({ id: 'schemas.user.email.errors.format' })),
    fullname: string().required(
      intl.formatMessage({ id: 'schemas.user.fullname.errors.required' })
    ),
    birthday: date(
      intl.formatMessage({ id: 'schemas.user.birthday.errors.invalidDate' })
    ).nullable(),
    description: string().notRequired(),
    gender: string().required(
      intl.formatMessage({ id: 'schemas.user.gender.errors.required' })
    ),
  })

class ProfileForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      register: PropTypes.func.isRequired,
    }).isRequired,
    defaultValues: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props)

    this.updateProfile = this.updateProfile.bind(this)
  }

  async updateProfile(user) {
    const { auth } = this.props
    const { data } = await SettingsApi.updateProfile(user)
    await auth.setUser(AuthResources.CurrentUser.parse(data))
  }

  render() {
    return (
      <StaticForm
        schema={schema}
        initialValues={this.props.defaultValues}
        onSubmit={this.updateProfile}
        resetOnSuccess
      >
        {this.props.children}
      </StaticForm>
    )
  }
}

export default withAuthContext(ProfileForm)
