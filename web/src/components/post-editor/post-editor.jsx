import React from 'react'
import { Input, Upload, Button, Icon, Form } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'

import { StaticForm } from '../form'

import styles from './post-editor.module.scss'
import { defaultValues, schema, allowedMimeTypes } from './post-editor-form'

const FormItem = Form.Item

class PostEditor extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    submitText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    collapsible: PropTypes.bool,
    context: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    collapsible: true,
    context: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      isFocused: !props.collapsible,
    }

    this.actionButton = React.createRef()

    this.handleFocus = this.handleFocus.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleFocus(event) {
    if (this.props.collapsible) {
      this.setState({ isFocused: true })
    }
  }

  handleCollapse() {
    if (this.props.collapsible) {
      this.setState({ isFocused: false })
    }
  }

  render() {
    const {
      submitText,
      placeholder,
      className,
      collapsible,
      onSubmit,
      context,
    } = this.props
    const { isFocused } = this.state

    return (
      <div
        className={classnames(styles.container, className)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {context}
        <StaticForm
          initialValues={defaultValues}
          schema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
          resetOnSuccess
        >
          {({
            values,
            handleChange,
            handleUpload,
            handleRemove,
            handleBlur,
            handleSubmit,
            fieldStatus,
            fieldError,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormItem
                validateStatus={isFocused ? fieldStatus('content') : ''}
                help={isFocused && fieldError('content')}
              >
                <Input.TextArea
                  autosize={false}
                  placeholder={placeholder}
                  className={classnames(styles.input, {
                    [styles.inputFocused]: isFocused,
                  })}
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  ref={this.actionButton}
                />
              </FormItem>

              <div
                className={classnames(styles.utilities, 'animated fadeIn', {
                  [styles.utilitiesFocused]: isFocused,
                })}
              >
                <div>
                  <FormItem
                    validateStatus={isFocused ? fieldStatus('medias') : ''}
                    help={
                      isFocused && fieldError('medias')
                        ? _.compact(fieldError('medias')).map(errors =>
                            Object.values(errors)
                          )[0]
                        : null
                    }
                  >
                    <Upload
                      name="medias"
                      beforeUpload={handleUpload('medias')}
                      fileList={values.medias}
                      onRemove={handleRemove('medias')}
                      accept={allowedMimeTypes.join(',')}
                      onBlur={handleBlur}
                      disabled={values.medias.length >= 3}
                    >
                      <Button
                        ghost
                        className={styles.actionButton}
                        onBlur={this.handleActionBlur}
                        onFocus={this.handleActionFocus}
                      >
                        <Icon type="picture" className={styles.actionIcon} />
                      </Button>
                    </Upload>
                  </FormItem>
                </div>

                <div>
                  {collapsible && (
                    <Button
                      onClick={this.handleCollapse}
                      htmlType="button"
                      className={styles.collapseButton}
                      shape="circle"
                    >
                      <FontAwesomeIcon icon="angle-up" size="lg" />
                    </Button>
                  )}
                  <Button
                    htmlType="submit"
                    shape="round"
                    type="primary"
                    disabled={isSubmitting}
                    className={styles.publishButton}
                  >
                    {submitText}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </StaticForm>
      </div>
    )
  }
}

export default PostEditor
