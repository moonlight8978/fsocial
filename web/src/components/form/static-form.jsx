import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { injectIntl } from 'react-intl'

import { ValidationError } from '../../resources/errors/validation-error'
import { AsyncUtils } from '../../utils'

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

class StaticForm extends React.Component {
  static propTypes = {
    schema: PropTypes.func.isRequired,
    initialValues: PropTypes.shape().isRequired,
    onSubmit: PropTypes.func.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      apiErrors: {},
    }

    this.init()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
  }

  async handleSubmit(values, { setSubmitting }) {
    try {
      setSubmitting(true)
      this.setState({ apiErrors: {} })
      const { onSubmit } = this.props
      await AsyncUtils.delay(2000)
      await onSubmit(values)
    } catch (error) {
      if (error.response && error.response.status === 422) {
        this.setState({
          apiErrors: new ValidationError(error.response.data.errors).data,
        })
      } else {
        throw error
      }
    } finally {
      setSubmitting(false)
    }
  }

  init() {
    const { intl, schema } = this.props
    this.validationSchema = schema(intl)
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
    const { initialValues } = this.props

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
      >
        {this.renderChildren}
      </Formik>
    )
  }
}

export default injectIntl(StaticForm)