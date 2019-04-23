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
  return attribute => {
    return touched[attribute] && (errors[attribute] || apiErrors[attribute])
  }
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
    resetOnSuccess: PropTypes.bool,
    onError: PropTypes.func,
  }

  static defaultProps = {
    resetOnSuccess: false,
    onError: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      apiErrors: {},
    }

    this.init()

    this.uploadHandlers = {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
  }

  async handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      setSubmitting(true)
      this.setState({ apiErrors: {} })
      const { onSubmit, resetOnSuccess } = this.props
      await AsyncUtils.delay(2000)
      await onSubmit(values)
      if (resetOnSuccess) {
        const { initialValues } = this.props
        resetForm(initialValues)
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        this.setState({
          apiErrors: new ValidationError(error.response.data.errors).data,
        })
      } else {
        this.props.onError()
        throw error
      }
    } finally {
      setSubmitting(false)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleUpload({ handleChange, handleBlur, values }) {
    return name => file => {
      handleChange({ target: { value: [...values[name], file], name } })
      handleBlur({ target: { name } })
      return false
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleRemove({ handleChange, handleBlur, values }) {
    return name => file => {
      handleChange({
        target: { value: values[name].filter(f => f !== file), name },
      })
      handleBlur({ target: { name } })
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
      handleUpload: this.handleUpload(formikProps),
      handleRemove: this.handleRemove(formikProps),
    })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { initialValues, schema, intl, onSubmit, ...formikProps } = this.props

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
        {...formikProps}
      >
        {this.renderChildren}
      </Formik>
    )
  }
}

export default injectIntl(StaticForm)
