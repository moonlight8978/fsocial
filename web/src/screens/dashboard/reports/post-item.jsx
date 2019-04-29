import React from 'react'
import { Col, Row, Divider, Button, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { Box, BoxSpacer, Text, Ellipsis } from '../../../components/atomics'
import { PostContent } from '../../../components/post-content'
import { PostMedias } from '../../../components/post-medias'
import { InlineName } from '../../../components/user'
import { paths } from '../../../config'

import styles from './post-item.module.scss'

class PostItem extends React.Component {
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

    return (
      <>
        <Box>
          <Row gutter={16}>
            <Col span={18}>
              <article className={styles.container}>
                <div className={styles.avatar}>
                  <Avatar size="large" src="/avatar-placeholder.png" />
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
                    Favorites
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
                    Shares
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
                    Reports
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
                      <Text>Delete this post</Text>
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
                      <Text>Nothing wrong with this post</Text>
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
