import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { object, string } from 'yup'
import { Formik } from 'formik'

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

function fieldStatus(errors, touched) {
  return attribute =>
    touched[attribute] && errors[attribute] ? 'error' : 'success'
}

function fieldError(errors, touched) {
  return attribute => touched[attribute] && errors[attribute]
}

class SignInForm extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    children: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.initForm()

    this.renderChildren = this.renderChildren.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  async handleSignIn(values) {
    const { signIn } = this.props
    await signIn(values)
  }

  initForm() {
    const { intl } = this.props
    this.schema = schema(intl)
  }

  renderChildren(formikProps) {
    const { children } = this.props
    const { touched, errors } = formikProps
    return children({
      ...formikProps,
      fieldStatus: fieldStatus(errors, touched),
      fieldError: fieldError(errors, touched),
    })
  }

  render() {
    return (
      <Formik
        initialValues={defaultValues}
        validationSchema={this.schema}
        onSubmit={this.handleSignIn}
      >
        {this.renderChildren}
      </Formik>
    )
  }
}

const SignInFormWithIntl = injectIntl(SignInForm)

export { SignInFormWithIntl as SignInForm }
