import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import {
  withLoading,
  LoadingPropTypes,
  FluidLoading,
} from '../../../components/loading'
import { BoxSpacer } from '../../../components/atomics'

import FollowingUser from './following-user'

class FollowingUserList extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    fetch: PropTypes.func.isRequired,
    ...LoadingPropTypes,
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
    try {
      const { user, finishLoading, fetch } = this.props
      const { data } = await fetch(user.username)
      this.setState({ data }, finishLoading)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { data } = this.state
    const { isLoading } = this.props

    return (
      <div>
        {isLoading ? (
          <FluidLoading />
        ) : (
          <Row gutter={16}>
            {data.map(followee => (
              <Col span={8} key={followee.id}>
                <FollowingUser user={followee} />
                <BoxSpacer />
              </Col>
            ))}
          </Row>
        )}
      </div>
    )
  }
}

export default withLoading(FollowingUserList)
