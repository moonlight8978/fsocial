import React from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { TimeUtils } from '../../utils/time-utils'

export default class RelativeTime extends React.PureComponent {
  static propTypes = {}

  render() {
    const { fromTime } = this.props
    const { value, type } = TimeUtils.getRelativeTimeFromNow(fromTime)
    let id

    switch (type) {
      case TimeUtils.format.LESS_THAN_X_SECONDS: {
        id = 'lessThanXSeconds'
        break
      }
      case TimeUtils.format.HALF_A_MINUTE: {
        id = 'halfAMinute'
        break
      }
      case TimeUtils.format.LESS_THAN_A_MINUTE: {
        id = 'lessThanAMinute'
        break
      }
      case TimeUtils.format.MINUTE: {
        id = 'minute'
        break
      }
      case TimeUtils.format.X_MINUTES: {
        id = 'xMinutes'
        break
      }
      case TimeUtils.format.HOUR: {
        id = 'hour'
        break
      }
      case TimeUtils.format.X_HOURS: {
        id = 'xHours'
        break
      }
      case TimeUtils.format.DAY: {
        id = 'day'
        break
      }
      case TimeUtils.format.X_DAYS: {
        id = 'xDays'
        break
      }
      case TimeUtils.format.X_MONTHS: {
        id = 'xMonths'
        break
      }
      case TimeUtils.format.YEAR: {
        id = 'year'
        break
      }
      case TimeUtils.format.X_YEAR: {
        id = 'xYear'
        break
      }
      default: {
        throw new Error(`${type} is not supported`)
      }
    }

    return <FormattedMessage id={`time.relative.${id}`} values={{ value }} />
  }
}
