import React from 'react'
import { Button } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../../layout'
import { Box, BoxSpacer } from '../../../components/atomics'
import { paths } from '../../../config'
import { FolloweeSuggestion } from '../../../components/followee-suggestion'
import { withLoading, FluidLoading } from '../../../components/loading'

import ReportApi from './report-api'
import ReportResource from './report-resource'
import PostItem from './post-item'
import styles from './reports.module.scss'

class Reports extends React.PureComponent {
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

  handleDeleteReport = id =>
    this.setState(state => ({
      posts: state.posts.filter(post => post.id !== id),
    }))

  handleDeletePost = id =>
    this.setState(state => ({
      posts: state.posts.filter(
        post => post.id !== id && post.parentId !== id && post.rootId !== id
      ),
    }))

  render() {
    const { intl, isLoading } = this.props
    const { posts, isLastPage } = this.state

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        hasSideLeft
        windowTitle={intl.formatMessage({ id: 'dashboard.windowTitle' })}
        sideLeft={<FolloweeSuggestion />}
        className={styles.layout}
      >
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
      </Layout>
    )
  }
}

export default withLoading(injectIntl(Reports))
