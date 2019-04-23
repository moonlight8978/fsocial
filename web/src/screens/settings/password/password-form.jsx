import React from 'react'
import { object, string } from 'yup'
import PropTypes from 'prop-types'

import { StaticForm } from '../../../components/form'

const defaultValues = {
  password: '',
  passwordConfirmation: '',
}

const schema = intl =>
  object().shape({
    password: string().required(),
    passwordConfirmation: string().required(),
  })

class PasswordForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      register: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.updatePassword = this.updatePassword.bind(this)
  }

  async updatePassword(user) {
    console.log(user)
  }

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
