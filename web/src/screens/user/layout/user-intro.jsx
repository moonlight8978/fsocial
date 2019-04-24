import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Box, Text, Ellipsis } from '../../../components/atomics'

import styles from './user-intro.module.scss'

class UserIntro extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
  }

  render() {
    const { user } = this.props
    const { fullname, username, description, birthday, gender } = user

    return (
      <Box
        title={
          <Text bold>
            <FormattedMessage id="user.intro.title" />
          </Text>
        }
        bordered
      >
        <Ellipsis>
          <Text bold size="xxlarge">
            {fullname}
          </Text>
          <br />
          <Text color="secondary" bold>
            @{username}
          </Text>
        </Ellipsis>

        {description && (
          <p className={styles.entry}>
            <Text color="secondary">{description}</Text>
          </p>
        )}

        <div className={styles.entry}>
          <FontAwesomeIcon fixedWidth icon="birthday-cake" />

          <Text className={styles.entryText}>{birthday || 'N/A'}</Text>
        </div>

        <div className={styles.entry}>
          <FontAwesomeIcon fixedWidth icon="venus-mars" />

          <Text className={styles.entryText}>
            {gender ? (
              <FormattedMessage id={`schemas.user.gender.enums.${gender}`} />
            ) : (
              'N/A'
            )}
          </Text>
        </div>
      </Box>
    )
  }
}

export default UserIntro
