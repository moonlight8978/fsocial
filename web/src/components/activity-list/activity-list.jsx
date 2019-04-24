import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'

import { withLoading, FluidLoading } from '../loading'
import { Box, Text } from '../atomics'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'
import styles from './activity-list.module.scss'

class ActivityList extends React.Component {
  static propTypes = {
    fetchActivities: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    pendingData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    setActivities: PropTypes.func.isRequired,
    appendActivities: PropTypes.func.isRequired,
    mergeActivities: PropTypes.func.isRequired,
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
    this.fetchActivities(activities => this.props.setActivities(activities))
  }

  async componentDidUpdate(prevProps) {
    if (this.state.isLastPage) {
      return
    }
    if (prevProps.page !== this.props.page) {
      this.props.startLoading()
      this.fetchActivities(activities =>
        this.props.appendActivities(activities)
      )
    }
  }

  async fetchActivities(updater) {
    try {
      this.props.startLoading()
      const { data: activities } = await this.props.fetchActivities(
        this.props.page
      )
      this.setState({ isLastPage: activities.length < 20 })
      updater(Activities.parse(activities))
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
    const {
      data,
      pendingData,
      renderItem,
      isLoading,
      loadingIndicator,
      mergeActivities,
    } = this.props
    const { isLastPage } = this.state

    return (
      <>
        {!isLoading && pendingData.length > 0 && (
          <Box className={styles.pendingActivities}>
            <Button
              onClick={mergeActivities}
              htmlType="button"
              type="primary"
              className={styles.buttonMergePendingActivities}
              block
            >
              <Text color="link">
                <FormattedMessage
                  id="activityList.newActivities"
                  values={{ count: pendingData.length }}
                />
              </Text>
            </Button>
          </Box>
        )}

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
