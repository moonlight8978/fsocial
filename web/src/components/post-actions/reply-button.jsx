import React from 'react'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Text } from '../atomics'

import styles from './post-actions.module.scss'

class ReplyButton extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    showReplyModal: PropTypes.func.isRequired,
  }

  render() {
    const { post, showReplyModal } = this.props
    const { repliesCount } = post

    return (
      <Button
        className={classnames(styles.actionButton, styles.replyButton)}
        onClick={() => showReplyModal(post)}
      >
        <Text color="secondary">
          <FontAwesomeIcon size="lg" icon={['far', 'comment']} />
          <span className={styles.actionCount}>{repliesCount}</span>
        </Text>
      </Button>
    )
  }
}

export default ReplyButton
