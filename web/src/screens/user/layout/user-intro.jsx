import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Box, Text, Ellipsis } from '../../../components/atomics'

class UserIntro extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
  }

  render() {
    const { user } = this.props
    const { fullname, username } = user

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
          <Text color="secondary">@{username}</Text>
        </Ellipsis>
      </Box>
    )
  }
}

export default UserIntro
