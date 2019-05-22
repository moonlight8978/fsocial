import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { BoxSpacer } from '../../components/atomics'

import styles from './memories.module.scss'
import MemoryListItem from './memory-list-item'
import CreateMemory from './create-memory'
import MemoryApi from './memory-api'
import MemoryResource from './memory-resource'

class Memories extends React.PureComponent {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
  }

  state = {
    memories: [],
    page: 1,
  }

  componentDidMount() {
    this.fetchMemories()
  }

  fetchMemories = async () => {
    const { page } = this.state
    try {
      const { data } = await MemoryApi.fetchMemories(page)
      const memories = MemoryResource.Memories.parse(data)
      this.setState({ memories })
    } catch (error) {
      console.log(error)
    }
  }

  prependMemory = memory =>
    this.setState(state => ({ memories: [memory, ...state.memories] }))

  render() {
    const { memories } = this.state
    const { intl } = this.props

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        hasSideLeft
        sideLeft={<FolloweeSuggestion />}
        className={styles.layout}
        windowTitle={intl.formatMessage({ id: 'memories.windowTitle' })}
      >
        <CreateMemory onCreate={this.prependMemory} />

        <BoxSpacer />

        {memories.map(memory => (
          <MemoryListItem memory={memory} key={memory.id} />
        ))}
      </Layout>
    )
  }
}

export default injectIntl(Memories)
