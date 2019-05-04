import React from 'react'
import { Button } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { WindowTitle } from '../../layout'
import { Box } from '../../../components/atomics'
import {
  withLoading,
  FluidLoading,
  LoadingPropTypes,
} from '../../../components/loading'

import ReportApi from './report-api'
import ReportResource from './report-resource'
import PostItem from './post-item'
import styles from './reports.module.scss'

class Reports extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
    intl: PropTypes.shape().isRequired,
  }

  state = {
    posts: [],
    page: 1,
    isLastPage: false,
  }

  componentDidMount() {
    this.fetchPosts()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.fetchPosts()
    }
  }

  async fetchPosts() {
    if (this.state.isLastPage) {
      return
    }

    try {
      this.props.startLoading()
      const { data } = await ReportApi.fetchPosts(this.state.page)
      const posts = ReportResource.Posts.parse(data)
      this.setState(state => ({
        posts: _.uniqBy([...state.posts, ...posts], 'id'),
        isLastPage: posts.length < 20,
      }))
      this.props.finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  handleChangePage = () => this.setState(state => ({ page: state.page + 1 }))

  handleDeleteReport = async id => {
    try {
      await ReportApi.deleteReport(id)
      this.setState(state => ({
        posts: state.posts.filter(post => post.id !== id),
      }))
    } catch (error) {
      console.log(error)
    }
  }

  handleDeletePost = async id => {
    try {
      await ReportApi.deletePost(id)
      this.setState(state => ({
        posts: state.posts.filter(
          post => post.id !== id && post.parentId !== id && post.rootId !== id
        ),
      }))
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { intl, isLoading } = this.props
    const { posts, isLastPage } = this.state

    return (
      <>
        <WindowTitle
          title={intl.formatMessage({ id: 'dashboard.reports.windowTitle' })}
        />

        {posts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            onDeleteReport={this.handleDeleteReport}
            onDeletePost={this.handleDeletePost}
          />
        ))}

        {isLoading && <FluidLoading />}

        {!isLoading && (
          <Box className={styles.footerLoadMore}>
            <Button
              onClick={this.handleChangePage}
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
                  <FormattedMessage id="dashboard.reports.lastPage" />
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

export default withLoading(injectIntl(Reports))
