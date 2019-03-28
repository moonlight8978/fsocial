import React from 'react'
import PropTypes from 'prop-types'

const initialState = {
  data: [],
  page: 1,
  prependPost: () => {},
  removePost: () => {},
}

const { Provider, Consumer } = React.createContext(initialState)

/* eslint-disable react/no-unused-state */
export class ActivityListProvider extends React.Component {
  static Consumer = Consumer

  static propTypes = {
    api: PropTypes.shape({
      fetch: PropTypes.func.isRequired,
    }).isRequired,
    renderPost: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.prependPost = this.prependPost.bind(this)
    this.removePost = this.removePost.bind(this)

    this.state = {
      ...initialState,
      prependPost: this.prependPost,
      removePost: this.removePost,
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

  prependPost(posts) {
    this.setState(state => ({ data: [...posts, ...state.data] }))
  }

  removePost(id) {
    this.setState(state => ({
      data: state.data.filter(post => post.id !== id),
    }))
  }

  render() {
    return <Provider value={this.state} {...this.props} />
  }
}
