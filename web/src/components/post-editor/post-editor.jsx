import React from 'react'
import { Input, Upload, Button, Icon, Form } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { StaticForm } from '../form'

import styles from './post-editor.module.scss'
import { defaultValues, schema } from './post-editor-form'

const FormItem = Form.Item

class PostEditor extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    submitText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isFocused: false,
      isPopupOpen: false,
    }

    this.actionButton = React.createRef()

    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleActionBlur = this.handleActionBlur.bind(this)
    this.handleActionFocus = this.handleActionFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBlur(event) {
    if (event.relatedTarget === null && !this.state.isPopupOpen) {
      this.setState({ isFocused: false })
    }
  }

  handleFocus(event) {
    this.setState({ isFocused: true })
  }

  handleActionFocus(event) {
    event.stopPropagation()
    this.setState(state => ({ isPopupOpen: !state.isPopupOpen }))
    if (this.state.isPopupOpen) {
      event.target.blur()
      this.actionButton.current.textAreaRef.focus()
    }
  }

  handleActionBlur(event) {
    event.stopPropagation()
    if (!this.state.isPopupOpen && event.relatedTarget === null) {
      this.setState({ isFocused: false })
    }
  }

  handleSubmit(event) {
    console.log(this.state)
  }

  render() {
    const { submitText, placeholder } = this.props
    const { isFocused } = this.state

    return (
      <div
        className={styles.container}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <StaticForm
          initialValues={defaultValues}
          schema={schema}
          onSubmit={this.handleSubmit}
        >
          {({
            values,
            handleChange,
            handleUpload,
            handleBlur,
            handleSubmit,
            fieldStatus,
            fieldError,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormItem
                validateStatus={fieldStatus('content')}
                help={fieldError('content')}
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
                  ref={this.actionButton}
                />
              </FormItem>

              <div
                className={classnames(styles.utilities, 'animated fadeIn', {
                  [styles.utilitiesFocused]: isFocused,
                })}
              >
                <div>
                  <Upload
                    multiple
                    name="medias"
                    beforeUpload={() => false}
                    fileList={values.medias}
                    onChange={handleUpload('medias')}
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
                </div>

                <div>
                  <Button
                    htmlType="button"
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
