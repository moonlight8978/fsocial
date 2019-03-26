import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import { PostList } from '../../components/post-list'
import { Box, BoxList } from '../../components/atomics'

import Statistics from './statistics'
import CreatePost, { PostApi } from './create-post'

class Home extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  render() {
    const { intl } = this.props

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        windowTitle={intl.formatMessage({ id: 'home.windowTitle' })}
        hasSideRight
        sideRight={<FolloweeSuggestion />}
        hasSideLeft
        sideLeft={<Statistics />}
      >
        <BoxList>
          <Box>
            <CreatePost>
              {({ onSubmit }) => (
                <PostEditor
                  submitText={intl.formatMessage({
                    id: 'home.postEditor.submit',
                  })}
                  placeholder={intl.formatMessage({
                    id: 'home.postEditor.placeholder',
                  })}
                  onSubmit={onSubmit}
                />
              )}
            </CreatePost>
          </Box>
          <PostList
            renderPost={post => (
              <Box key={post.id}>{post.trackable.content}</Box>
            )}
            api={{ fetch: page => PostApi.all(page) }}
          />
        </BoxList>
      </Layout>
    )
  }
}

export default injectIntl(Home)
