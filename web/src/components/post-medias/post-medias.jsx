import React from 'react'
import PropTypes from 'prop-types'

import { ImagePreloader } from '../atomics'

import styles from './post-medias.module.scss'

export default class PostMedias extends React.PureComponent {
  static propTypes = {
    post: PropTypes.shape().isRequired,
  }

  // eslint-disable-next-line class-methods-use-this
  renderMedia(media) {
    return (
      <ImagePreloader
        className={styles.item}
        key={media.path}
        alt={media.filename}
        src={media.url}
      />
    )
  }

  render() {
    const { post } = this.props
    const { medias } = post

    if (medias.length === 0) {
      return null
    }

    let children

    switch (medias.length) {
      case 1: {
        children = (
          <div className={styles.mediasJust}>{this.renderMedia(medias[0])}</div>
        )
        break
      }
      case 2: {
        children = (
          <div className={styles.mediasDouble}>
            {medias.map(media => (
              <div className={styles.highlightedItem} key={media.path}>
                <div className={styles.innerItems}>
                  {this.renderMedia(media)}
                </div>
              </div>
            ))}
          </div>
        )

        break
      }
      case 3: {
        children = (
          <div className={styles.mediasTriple}>
            <div className={styles.highlightedItem}>
              <div className={styles.innerItems}>
                {this.renderMedia(medias[0])}
              </div>
            </div>
            <div className={styles.restItems}>
              {medias.slice(1, medias.length).map(media => (
                <div className={styles.restItem} key={media.path}>
                  <div className={styles.innerItems}>
                    {this.renderMedia(media)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        break
      }
      case 4: {
        children = medias.map(media => (
          <div className={styles.quarter}>
            <ImagePreloader
              className={styles.mediaQuarter}
              key={media.path}
              alt={media.filename}
              src={media.url}
            />
          </div>
        ))
        break
      }
      default: {
        break
      }
    }

    return <picture className={styles.container}>{children}</picture>
  }
}
