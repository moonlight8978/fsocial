import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Modal, Select, Spin } from 'antd'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import { Layout, Navbar } from '../layout'
import { FolloweeSuggestion } from '../../components/followee-suggestion'
import { PostEditor } from '../../components/post-editor'
import {
  ActivityList,
  ActivityListProvider,
  ActivityItem,
  ActivityListConsumer,
} from '../../components/activity-list'
import { Box, BoxList, BoxSpacer } from '../../components/atomics'
import {
  StatisticsProvider,
  StatisticsConsumer,
} from '../../components/statistics'
import { FollowingProvider } from '../../components/following'
import { FluidLoading } from '../../components/loading'
import { withAuthContext } from '../../components/auth'
import { ReplyProvider, ReplyConsumer } from '../../components/reply-editor'
import PopularHashtags from '../../components/hashtag/popular-hashtags/popular-hashtags'

import styles from './messages.module.scss'

class Messages extends React.PureComponent {
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.handleSearch = debounce(this.handleSearch, 800)
  }

  state = {
    isModalVisible: false,
    data: [],
    value: undefined,
    fetching: false,
  }

  handleSearch = value => {
    console.log('fetching user', value)
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ fetching: true })
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        const data = body.results.map(user => ({
          text: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }))
        this.setState({ data, fetching: false })
      })
  }

  handleChange = value => {
    this.setState({
      value,
      fetching: false,
    })
  }

  closeModal = () => this.setState({ isModalVisible: false })

  openModal = () => this.setState({ isModalVisible: true })

  render() {
    const { intl } = this.props
    const { isModalVisible, fetching, data, value } = this.state

    return (
      <Layout
        hasNavbar
        navbar={<Navbar />}
        windowTitle={intl.formatMessage({ id: 'conversations.windowTitle' })}
        hasSideLeft
        sideLeft={
          <Box
            title={
              <header className={styles.header}>
                <FormattedMessage id="conversations.title" />
                <Button
                  shape="circle"
                  icon="form"
                  className={styles.createConversationButton}
                  onClick={this.openModal}
                />
                <Modal
                  title={<FormattedMessage id="conversations.new.title" />}
                  visible={isModalVisible}
                  onOk={() => {}}
                  onCancel={this.closeModal}
                  footer={null}
                >
                  <div>
                    <FormattedMessage id="conversations.new.participant.label" />
                    <Select
                      showSearch
                      value={this.state.value}
                      placeholder="Select"
                      style={this.props.style}
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={this.handleSearch}
                      onChange={this.handleChange}
                      notFoundContent={null}
                    >
                      {data.map(d => (
                        <Select.Option key={d.value}>{d.text}</Select.Option>
                      ))}
                    </Select>
                  </div>
                </Modal>
              </header>
            }
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
              <div>ASAS</div>
            ))}
          </Box>
        }
        className={styles.layout}
      >
        <Box>content</Box>
      </Layout>
    )
  }
}

export default injectIntl(Messages)
