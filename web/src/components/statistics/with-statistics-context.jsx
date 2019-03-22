import React from 'react'

import { StatisticsConsumer } from './statistics'

export function withStatisticsContext(Component) {
  function WithStatisticsContext(props) {
    return (
      <StatisticsConsumer>
        {context => <Component {...props} statistics={context} />}
      </StatisticsConsumer>
    )
  }

  return WithStatisticsContext
}
