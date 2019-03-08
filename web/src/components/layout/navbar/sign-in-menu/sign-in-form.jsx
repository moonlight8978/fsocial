import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { object, string } from 'yup'
import { Formik } from 'formik'

import { AsyncUtils } from '../../../../utils'
import { ValidationError } from '../../../../resources/errors/validation-error'

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

function fieldStatus({ errors, touched, apiErrors }) {
  return attribute =>
    apiErrors[attribute] || (touched[attribute] && errors[attribute])
      ? 'error'
      : 'success'
}

function fieldError({ errors, touched, apiErrors }) {
  return attribute =>
    touched[attribute] && (errors[attribute] || apiErrors[attribute])
}

class SignInForm extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    children: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      apiErrors: {},
    }

    this.initForm()

    this.renderChildren = this.renderChildren.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  async handleSignIn(values, { setSubmitting }) {
    try {
      setSubmitting(true)
      this.setState({ apiErrors: {} })
      const { signIn } = this.props
      await AsyncUtils.delay(2000)
      await signIn(values)
    } catch (error) {
      this.setState({
        apiErrors: new ValidationError(error.response.data.errors).data,
      })
    } finally {
      setSubmitting(false)
    }
  }

  initForm() {
    const { intl } = this.props
    this.schema = schema(intl)
  }

  renderChildren(formikProps) {
    const { children } = this.props
    const { apiErrors } = this.state
    const { touched, errors } = formikProps
    return children({
      ...formikProps,
      apiErrors,
      fieldStatus: fieldStatus({ errors, touched, apiErrors }),
      fieldError: fieldError({ errors, touched, apiErrors }),
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
