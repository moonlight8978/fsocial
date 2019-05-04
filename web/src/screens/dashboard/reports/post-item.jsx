import React from 'react'
import { Col, Row, Divider, Button, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { PropTypes } from 'prop-types'

import { Box, BoxSpacer, Text, Ellipsis } from '../../../components/atomics'
import { PostContent } from '../../../components/post-content'
import { PostMedias } from '../../../components/post-medias'
import { InlineName, User } from '../../../components/user'
import { paths } from '../../../config'

import styles from './post-item.module.scss'

class PostItem extends React.Component {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    onDeleteReport: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
  }

  getRootPost = () => {
    const { post } = this.props
    return post.root ? post.root : post
  }

  render() {
    const { post, onDeleteReport, onDeletePost } = this.props
    const {
      id,
      content,
      creator,
      createdAt,
      favoritesCount,
      sharesCount,
      reportsCount,
    } = post
    const rootPost = this.getRootPost()

    return (
      <>
        <Box>
          <Row gutter={16}>
            <Col span={18}>
              <article className={styles.container}>
                <div className={styles.avatar}>
                  <User.Avatar user={creator} size="large" />
                </div>

                <div className={styles.post}>
                  <header className={styles.header}>
                    <Ellipsis className={styles.username}>
                      <Link to={paths.user.resolve(creator)}>
                        <InlineName
                          username={creator.username}
                          fullname={creator.fullname}
                        />
                      </Link>
                    </Ellipsis>

                    <Text color="secondary">{createdAt.toLocaleString()}</Text>

                    <span>&nbsp;</span>

                    <Link
                      to={paths.post.resolve({
                        username: rootPost.creator.username,
                        id: rootPost.id,
                      })}
                    >
                      <Text color="secondary">
                        <FontAwesomeIcon icon="eye" />
                        &nbsp;
                      </Text>
                      <FormattedMessage id="dashboard.reports.item.visit" />
                    </Link>
                  </header>

                  <PostContent content={content} />

                  <PostMedias post={post} />
                </div>
              </article>
            </Col>

            <Col span={6}>
              <div className={styles.rightCol}>
                <div>
                  <div>
                    <FontAwesomeIcon
                      fixedWidth
                      icon="heart"
                      className={styles.statsIcon}
                    />
                    <Text bold className={styles.statsCount}>
                      {favoritesCount}
                    </Text>
                    <FormattedMessage id="dashboard.reports.item.statistics.favorite" />
                  </div>
                  <div>
                    <FontAwesomeIcon
                      fixedWidth
                      icon="retweet"
                      className={styles.statsIcon}
                    />
                    <Text bold className={styles.statsCount}>
                      {sharesCount}
                    </Text>
                    <FormattedMessage id="dashboard.reports.item.statistics.sharing" />
                  </div>
                  <div>
                    <FontAwesomeIcon
                      fixedWidth
                      icon="flag"
                      className={styles.statsIcon}
                    />
                    <Text bold className={styles.statsCount}>
                      {reportsCount}
                    </Text>
                    <FormattedMessage id="dashboard.reports.item.statistics.report" />
                  </div>
                </div>

                <Divider className={styles.divider} />

                <div>
                  <div className={styles.action}>
                    <div className={styles.actionTrigger}>
                      <Button
                        className={styles.actionButton}
                        htmlType="button"
                        onClick={() => onDeletePost(id)}
                      >
                        <FontAwesomeIcon
                          fixedWidth
                          icon={['far', 'trash-alt']}
                        />
                      </Button>
                    </div>
                    <div className={styles.actionDescription}>
                      <Text>
                        <FormattedMessage id="dashboard.reports.item.deletePost" />
                      </Text>
                    </div>
                  </div>

                  <div className={styles.action}>
                    <div className={styles.actionTrigger}>
                      <Button
                        className={styles.actionButton}
                        htmlType="button"
                        onClick={() => onDeleteReport(id)}
                      >
                        <FontAwesomeIcon fixedWidth icon="check" />
                      </Button>
                    </div>
                    <div className={styles.actionDescription}>
                      <Text>
                        <FormattedMessage id="dashboard.reports.item.deleteReport" />
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Box>
        <BoxSpacer />
      </>
    )
  }
}

export default PostItem
