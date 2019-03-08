import React from 'react'
import { object, string } from 'yup'
import { Formik } from 'formik'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { ValidationError } from '../../resources/errors/validation-error'
import { AsyncUtils } from '../../utils'

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

class SignUpForm extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      apiErrors: {},
    }

    this.initForm()

    this.renderChildren = this.renderChildren.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  async handleRegister(values, { setSubmitting }) {
    try {
      setSubmitting(true)
      this.setState({ apiErrors: {} })
      const { register } = this.props
      await AsyncUtils.delay(2000)
      await register(values)
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
    const { errors, touched } = formikProps

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
        validationSchema={this.schema}
        initialValues={defaultValues}
        onSubmit={this.handleRegister}
      >
        {this.renderChildren}
      </Formik>
    )
  }
}

export default injectIntl(SignUpForm)
