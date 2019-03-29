import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import { ActivityListConsumer } from './activity-list-context'
import { Activities } from './activity-resource'

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
  }

  constructor(props) {
    super(props)

    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  async componentDidMount() {
    try {
      const { data } = await this.props.api.fetch(this.props.page)
      this.props.setActivities(Activities.parse(data))
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      try {
        const { data } = await this.props.api.fetch(this.props.page)
        const { data: activities } = this.props
        this.props.setActivities([...activities, ...Activities.parse(data)])
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleLoadMore() {
    const { setPage, page } = this.props
    setPage(page + 1)
  }

  render() {
    const { data, renderItem } = this.props

    return (
      <>
        {data.map(activity => renderItem(activity))}
        <Button onClick={this.handleLoadMore} htmlType="button" type="primary">
          Load more
        </Button>
      </>
    )
  }
}

export default props => (
  <ActivityListConsumer>
    {({ setActivities, setPage, page, data }) => (
      <ActivityList
        setActivities={setActivities}
        setPage={setPage}
        page={page}
        data={data}
        {...props}
      />
    )}
  </ActivityListConsumer>
)
