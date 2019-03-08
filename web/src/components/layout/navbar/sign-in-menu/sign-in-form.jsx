import React from 'react'
import PropTypes from 'prop-types'
import { object, string } from 'yup'

import { withAuthContext } from '../../../auth'
import { StaticForm } from '../../../form'

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

class SignInForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      signIn: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.signIn = this.signIn.bind(this)
  }

  async signIn(user) {
    const { auth } = this.props
    await auth.signIn(user)
  }

  render() {
    return (
      <StaticForm
        initialValues={defaultValues}
        schema={schema}
        onSubmit={this.signIn}
      >
        {this.props.children}
      </StaticForm>
    )
  }
}

export default withAuthContext(SignInForm, ['signIn'])
