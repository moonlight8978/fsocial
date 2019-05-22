import React from 'react'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box, BoxSpacer } from '../../../components/atomics'
import { User } from '../../../components/user'
import MarkedImage from '../marked-image'

import styles from './memory-list-item.module.scss'

const boundingPoly = [
  [{ x: 91, y: 76 }, { x: 212, y: 76 }, { x: 212, y: 216 }, { x: 91, y: 216 }],
  [
    { x: 375, y: 20 },
    { x: 507, y: 20 },
    { x: 507, y: 173 },
    { x: 375, y: 173 },
  ],
]

function MemoryListItem({ memory }) {
  const { createdAt, creator, picture, memoryTaggings } = memory

  return (
    <>
      <Box>
        <User.OverallInfo user={creator} time={createdAt} />

        <div className={styles.wrapper}>
          <MarkedImage
            className={styles.attachment}
            boundingPoly={boundingPoly}
            taggings={memoryTaggings}
            src={picture.url}
            renderTaggings={({
              handleMouseOut,
              handleMouseOver,
              highlightedPersonId,
              taggings,
            }) => (
              <div className={styles.taggings}>
                {taggings.length > 0 ? (
                  <>
                    <header>
                      <FormattedMessage id="memories.taggings.with" />
                    </header>
                    <div className={styles.taggingList}>
                      {taggings.map(
                        tagging =>
                          tagging.description && (
                            <span
                              className={classnames(styles.taggingItem, {
                                [styles.taggingitemHighlight]:
                                  tagging.id === highlightedPersonId,
                              })}
                              key={tagging.id}
                              onMouseOver={handleMouseOver(tagging.id)}
                              onFocus={handleMouseOver(tagging.id)}
                              onMouseOut={handleMouseOut}
                              onBlur={handleMouseOut}
                            >
                              {tagging.description}
                            </span>
                          )
                      )}
                    </div>
                  </>
                ) : (
                  <FormattedMessage id="memories.taggings.empty" />
                )}
              </div>
            )}
          />
        </div>
      </Box>
      <BoxSpacer />
    </>
  )
}

MemoryListItem.propTypes = {
  memory: PropTypes.shape().isRequired,
}

export default React.memo(MemoryListItem)
