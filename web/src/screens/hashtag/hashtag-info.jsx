import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Text, Box, Ellipsis } from '../../components/atomics'

class HashtagInfo extends React.PureComponent {
  static propTypes = {
    hashtag: PropTypes.shape().isRequired,
  }

  render() {
    const { hashtag } = this.props
    const { name, creator } = hashtag

    return (
      <Box>
        <Text color="link" bold size="xlarge">
          #{name}
        </Text>

        <div>
          <i>
            <Text color="secondary">
              <FormattedMessage id="hashtag.firstCreated" />
            </Text>
          </i>

          <Ellipsis>
            <Link to="/">@{creator.username}</Link>
          </Ellipsis>
        </div>
      </Box>
    )
  }
}

export default HashtagInfo
