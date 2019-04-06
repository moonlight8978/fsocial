import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { withLoading, FluidLoading } from '../loading'
import { Box } from '../atomics'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'
import styles from './activity-list.module.scss'

class ActivityList extends React.Component {
  static propTypes = {
    api: PropTypes.shape({
      fetch: PropTypes.func.isRequired,
    }).isRequired,
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

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  async componentDidMount() {
    try {
      this.props.startLoading()
      const { data } = await this.props.api.fetch(this.props.page)
      this.props.setActivities(Activities.parse(data))
    } catch (error) {
      console.log(error)
    } finally {
      this.props.finishLoading()
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      try {
        this.props.startLoading()
        const { data } = await this.props.api.fetch(this.props.page)
        const { data: activities } = this.props
        this.props.setActivities([...activities, ...Activities.parse(data)])
      } catch (error) {
        console.log(error)
      } finally {
        this.props.finishLoading()
      }
    }
  }

  handleLoadMore() {
    const { setPage, page } = this.props
    setPage(page + 1)
  }

  render() {
    const { data, renderItem, isLoading, loadingIndicator } = this.props

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
            >
              <FontAwesomeIcon icon="ellipsis-h" />
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
