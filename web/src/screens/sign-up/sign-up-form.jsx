import React from 'react'
import { object, string } from 'yup'
import PropTypes from 'prop-types'

import { StaticForm } from '../../components/form'
import { withAuthContext } from '../../components/auth'

const defaultValues = {
  username: '',
  email: '',
  password: '',
}

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
    password: string().required(
      intl.formatMessage({ id: 'schemas.user.password.errors.required' })
    ),
  })

class SignUpForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      register: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.register = this.register.bind(this)
  }

  async register(user) {
    const { auth } = this.props
    await auth.register(user)
  }

  render() {
    return (
      <StaticForm
        schema={schema}
        initialValues={defaultValues}
        onSubmit={this.register}
      >
        {this.props.children}
      </StaticForm>
    )
  }
}

export default withAuthContext(SignUpForm)
