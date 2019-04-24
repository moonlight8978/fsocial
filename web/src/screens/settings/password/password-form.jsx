import React from 'react'
import { object, string, ref } from 'yup'
import PropTypes from 'prop-types'

import { StaticForm } from '../../../components/form'
import SettingsApi from '../settings-api'

const defaultValues = {
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
}

const schema = intl =>
  object().shape({
    currentPassword: string().required(
      intl.formatMessage({
        id: 'schemas.user.currentPassword.errors.required',
      })
    ),
    password: string().required(
      intl.formatMessage({
        id: 'schemas.user.password.errors.required',
      })
    ),
    passwordConfirmation: string()
      .oneOf(
        [ref('password')],
        intl.formatMessage({
          id: 'schemas.user.passwordConfirmation.errors.mustMatchWithPassword',
        })
      )
      .required(
        intl.formatMessage({
          id: 'schemas.user.passwordConfirmation.errors.required',
        })
      ),
  })

class PasswordForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.updatePassword = this.updatePassword.bind(this)
  }

  updatePassword = user => SettingsApi.updatePassword(user)

  render() {
    return (
      <StaticForm
        schema={schema}
        initialValues={defaultValues}
        onSubmit={this.updatePassword}
        resetOnSuccess
      >
        {this.props.children}
      </StaticForm>
    )
  }
}

export default PasswordForm
