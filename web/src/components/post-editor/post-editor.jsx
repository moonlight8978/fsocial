import React from 'react'
import { Input, Upload, Button, Icon } from 'antd'
import classnames from 'classnames'

import styles from './post-editor.module.scss'

class PostEditor extends React.Component {
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

  render() {
    const { isFocused } = this.state

    return (
      <div
        className={styles.container}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Input.TextArea
          autosize={false}
          placeholder="What's happening?"
          className={classnames(styles.input, {
            [styles.inputFocused]: isFocused,
          })}
          ref={this.actionButton}
        />
        <div className={classnames(styles.utilities, 'animated fadeIn')}>
          <div>
            <Upload>
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
              disabled={false}
              className={styles.publishButton}
            >
              Publish
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default PostEditor
