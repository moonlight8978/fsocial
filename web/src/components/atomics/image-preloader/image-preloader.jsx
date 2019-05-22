import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './image-preloader.module.scss'
import placeholder from './placeholder.png'

class ImagePreloader extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    onLoad: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    onLoad: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    this.loadImage()
  }

  componentWillUnmount() {
    if (!this.image) {
      return
    }
    this.image.onload = () => {}
    delete this.image
  }

  loadImage() {
    const { src, onLoad } = this.props
    this.image = new Image()
    this.image.src = src
    this.image.onload = event => {
      this.setState({ isLoading: false })
      onLoad({
        width: event.target.naturalWidth,
        height: event.target.naturalHeight,
        src,
      })
    }
    this.image.onerror = error => console.log(error)
  }

  render() {
    const { src, alt, className } = this.props
    const { isLoading } = this.state

    return (
      <img
        className={classnames(styles.image, className)}
        src={isLoading ? placeholder : src}
        alt={alt}
      />
    )
  }
}

export default ImagePreloader
