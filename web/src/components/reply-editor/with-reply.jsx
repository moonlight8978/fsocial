import React from 'react'
import { Modal, Button } from 'antd'

function withReply(Component) {
  class WithReply extends React.PureComponent {
    state = {
      visible: false,
      confirmLoading: false,
      ModalText: 'Content of the modal',
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

    showModal = () => {
      this.setState({
        visible: true,
      })
    }

    render() {
      const { visible, confirmLoading, ModalText } = this.state

      return (
        <div>
          <Component {...this.props} showModal={this.showModal} />
          <Modal
            title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>{ModalText}</p>
          </Modal>
        </div>
      )
    }
  }

  return WithReply
}

export default withReply
