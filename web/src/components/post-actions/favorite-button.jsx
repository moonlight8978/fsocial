import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

import { AsyncUtils } from '../../utils'
import { Text } from '../atomics'
import { Activity } from '../activity-list/activity-resource'

import PostApi from './post-api'
import styles from './post-actions.module.scss'

class FavoriteButton extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      isFavoriting: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const { post } = this.props
    this.setState({ isFavoriting: true })
    try {
      if (post.isFavorited) {
        await this.handleUnfavorite()
      } else {
        await this.handleFavorite()
      }
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ isFavoriting: false })
    }
  }

  async handleFavorite() {
    const { post } = this.props
    const { data } = await PostApi.favorite(post.id)
    const { trackable } = Activity.parse(data)
    await AsyncUtils.delay(500)
    const { onChange } = this.props
    onChange(post.id, {
      ...post,
      isFavorited: trackable.post.isFavorited,
      favoritesCount: trackable.post.favoritesCount,
    })
  }

  async handleUnfavorite() {
    const { post } = this.props
    await PostApi.unfavorite(post.id)
    await AsyncUtils.delay(500)
    const { onChange } = this.props
    onChange(post.id, {
      ...post,
      isFavorited: false,
      favoritesCount: post.favoritesCount - 1,
    })
  }

  render() {
    const { isFavoriting } = this.state
    const { post } = this.props
    const { isFavorited, favoritesCount } = post

    return (
      <Button
        className={classnames(styles.actionButton, styles.favoriteButton, {
          [styles.favorited]: isFavorited,
        })}
        onClick={this.handleClick}
        disabled={isFavoriting}
      >
        <Text color="secondary">
          <FontAwesomeIcon size="lg" icon={['far', 'heart']} />
          <span className={styles.actionCount}>{favoritesCount}</span>
        </Text>
      </Button>
    )
  }
}

export default FavoriteButton
