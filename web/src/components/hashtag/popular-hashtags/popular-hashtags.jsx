import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { Box, Text, Ellipsis } from '../../atomics'
import { paths } from '../../../config'
import { withLoading, LoadingPropTypes, FluidLoading } from '../../loading'

import styles from './popular-hashtags.module.scss'
import HashtagApi from './hashtag-api'
import HashtagResource from './hashtag-resource'

class PopularHashtags extends React.PureComponent {
  static propTypes = {
    ...LoadingPropTypes,
  }

  state = {
    hashtags: [],
  }

  async componentDidMount() {
    try {
      const { data } = await HashtagApi.fetchPopularHashtags()
      this.setState({
        hashtags: HashtagResource.Hashtags.parse(data),
      })
      this.props.finishLoading()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { isLoading } = this.state
    const { hashtags } = this.state

    return (
      <Box
        title={
          <Text bold>
            <FormattedMessage id="hashtags.popular.title" />
          </Text>
        }
      >
        {isLoading ? (
          <FluidLoading />
        ) : (
          hashtags.map(({ name, postsCount, id }) => (
            <div className={styles.listItem} key={id}>
              <Ellipsis>
                <Link to={paths.hashtag.resolve({ slug: name })}>
                  <Text color="link" hover hoverColor="link" bold>
                    #{name}
                  </Text>
                </Link>
              </Ellipsis>
              <Ellipsis>
                <Text color="secondary" size="small">
                  <FormattedMessage
                    id="hashtags.popular.postsCount"
                    values={{ count: postsCount }}
                  />
                </Text>
              </Ellipsis>
            </div>
          ))
        )}
      </Box>
    )
  }
}

export default withLoading(PopularHashtags)
