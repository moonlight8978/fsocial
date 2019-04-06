import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'

import { withLoading, FluidLoading } from '../loading'
import { Box } from '../atomics'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'
import styles from './activity-list.module.scss'

class ActivityList extends React.Component {
  static propTypes = {
    fetchActivities: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    setActivities: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    finishLoading: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    loadingIndicator: PropTypes.node,
  }

  static defaultProps = {
    loadingIndicator: <FluidLoading />,
  }

  constructor(props) {
    super(props)

    this.state = {
      isLastPage: false,
    }

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  async componentDidMount() {
    this.fetchActivities(({ newActivities }) => newActivities)
  }

  async componentDidUpdate(prevProps) {
    if (this.state.isLastPage) {
      return
    }
    if (prevProps.page !== this.props.page) {
      this.props.startLoading()
      this.fetchActivities(({ newActivities, oldActivities }) =>
        oldActivities.concat(newActivities)
      )
    }
  }

  async fetchActivities(updater) {
    try {
      this.props.startLoading()
      const { data: activities } = await this.props.fetchActivities(
        this.props.page
      )
      const { data: oldActivities } = this.props
      this.setState({ isLastPage: activities.length < 20 })
      this.props.setActivities(
        updater({ newActivities: Activities.parse(activities), oldActivities })
      )
    } catch (error) {
      console.log(error)
    } finally {
      this.props.finishLoading()
    }
  }

  handleLoadMore() {
    const { setPage, page } = this.props
    setPage(page + 1)
  }

  render() {
    const { data, renderItem, isLoading, loadingIndicator } = this.props
    const { isLastPage } = this.state

    return (
      <>
        {data.map(activity => renderItem(activity))}

        {isLoading && loadingIndicator}

        {!isLoading && (
          <Box className={styles.footerLoadMore}>
            <Button
              onClick={this.handleLoadMore}
              htmlType="button"
              type="primary"
              className={styles.buttonLoadMore}
              block
              disabled={isLastPage}
            >
              {isLastPage ? (
                <>
                  <FontAwesomeIcon icon="angle-up" />
                  <span>&nbsp;</span>
                  <FormattedMessage id="activityList.noMoreActivities" />
                  <span>&nbsp;</span>
                  <FontAwesomeIcon icon="angle-up" />
                </>
              ) : (
                <FontAwesomeIcon icon="ellipsis-h" />
              )}
            </Button>
          </Box>
        )}
      </>
    )
  }
}

const ActivityListWithContext = props => (
  <ActivityListConsumer>
    {context => <ActivityList {...context} {...props} />}
  </ActivityListConsumer>
)

export default withLoading(ActivityListWithContext)
