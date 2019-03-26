import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class PostList extends React.Component {
  static propTypes = {
    api: PropTypes.shape({
      fetch: PropTypes.func.isRequired,
    }).isRequired,
    renderPost: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      data: [],
    }
  }

  async componentDidMount() {
    try {
      const { data } = await this.props.api.fetch(this.state.page)
      this.setState({ data })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { data } = this.state
    const { renderPost } = this.props

    return <>{data.map(post => renderPost(post))}</>
  }
}

export default PostList
