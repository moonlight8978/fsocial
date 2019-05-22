import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { ImagePreloader } from '../../../components/atomics'
import useMouseHighlight from '../use-mouse-highlight'

import styles from './marked-image.module.scss'

function MarkedImage({ src, renderTaggings, className, taggings }) {
  const [
    highlightedPersonId,
    { handleMouseOut, handleMouseOver },
  ] = useMouseHighlight()
  const [dimension, setDimension] = useState({ width: null, height: null })

  const { width, height } = dimension

  return (
    <>
      <div className={classnames(styles.attachment, className)}>
        <ImagePreloader
          src={src}
          alt="Trump and Un"
          className={styles.image}
          onLoad={setDimension}
        />
        {width && height && (
          <svg className={styles.canvas}>
            {taggings.map(({ id, vertices }) => (
              <rect
                width={`${((vertices[1].x - vertices[0].x) / width) * 100}%`}
                height={`${((vertices[3].y - vertices[0].y) / height) * 100}%`}
                x={`${(vertices[0].x / width) * 100}%`}
                y={`${(vertices[0].y / height) * 100}%`}
                className={classnames(styles.rect, {
                  [styles.rectHighlight]: highlightedPersonId === id,
                })}
                onMouseOver={handleMouseOver(id)}
                onFocus={handleMouseOver(id)}
                onMouseOut={handleMouseOut}
                onBlur={handleMouseOut}
                key={id}
              />
            ))}
          </svg>
        )}
      </div>

      {taggings &&
        renderTaggings({
          dimension,
          handleMouseOut,
          handleMouseOver,
          highlightedPersonId,
          taggings,
        })}
    </>
  )
}

MarkedImage.propTypes = {
  src: PropTypes.string.isRequired,
  renderTaggings: PropTypes.func.isRequired,
  className: PropTypes.string,
  taggings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

MarkedImage.defaultProps = {
  className: '',
}

export default React.memo(MarkedImage)
