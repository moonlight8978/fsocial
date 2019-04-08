/* eslint-disable react/no-unused-state */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

import { ActivityListProvider } from '../activity-list-context'

const initialState = {
  post: {},
  setPost: () => {},
  createReply: () => {},
}

const ReplyContext = React.createContext(initialState)

export const ReplyConsumer = ReplyContext.Consumer

class Provider extends React.PureComponent {
  static propTypes = {
    changePost: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      setPost: this.setPost.bind(this),
      showModal: this.showModal.bind(this),
    }
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }

  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }

  showModal(post) {
    this.setState({ post, visible: true })
  }

  setPost(post) {
    this.setState({ post })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { changePost, children, ...rest } = this.props
    const { visible, confirmLoading } = this.state

    return (
      <ReplyContext.Provider value={this.state} {...rest}>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>Modal text</p>
        </Modal>
        {children}
      </ReplyContext.Provider>
    )
  }
}

export const ReplyProvider = props => (
  <ActivityListProvider>
    {({ changePost }) => <Provider {...props} />}
  </ActivityListProvider>
)
