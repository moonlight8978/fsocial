import React from 'react'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { Text } from '../atomics'
import { Twitter } from '../../services/twitter'

import SanitizedHtml from './sanitized-html'

class PostContent extends React.PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    className: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    className: '',
  }

  componentDidMount() {
    this.links = Array.from(document.getElementsByClassName(this.className))
    this.links.forEach(link => {
      link.addEventListener('click', this.handleClick)
    })
  }

  componentWillUnmount() {
    this.links.forEach(link => {
      link.removeEventListener('click', this.handleClick)
    })
  }

  handleClick = event => {
    event.preventDefault()
    const href = event.target.getAttribute('href')
    this.props.history.push(href)
  }

  className = `postContent_${_.uniqueId()}`

  render() {
    const { content, className } = this.props

    return (
      <p className={className}>
        <Text>
          <SanitizedHtml
            content={Twitter.autoLink(content, {
              hashtagClass: this.className,
              usernameClass: this.className,
            })}
          />
        </Text>
      </p>
    )
  }
}

export default withRouter(PostContent)
