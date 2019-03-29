import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class List extends React.Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { items, renderItem, className } = this.props

    if (!items || items.length === 0) {
      return null
    }

    return (
      <div className={classnames({ [className]: className })}>
        {items.map(item => renderItem(item))}
      </div>
    )
  }
}
