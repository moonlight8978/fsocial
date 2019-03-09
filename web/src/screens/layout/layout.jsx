import React from 'react'
import PropTypes from 'prop-types'
import { Layout as AntdLayout, Row, Col } from 'antd'
import classnames from 'classnames'

import { Container } from './container'
import styles from './layout.module.scss'

const { Content } = AntdLayout

function Layout({
  hasNavbar,
  navbar,
  hasSideRight,
  sideRight,
  hasSideLeft,
  sideLeft,
  children,
  fluid,
}) {
  if (fluid) {
    return (
      <AntdLayout className="layout">
        {hasNavbar && navbar}
        <Content
          className={classnames(styles.contentWrapper, {
            [styles.contentWithNavbar]: hasNavbar,
          })}
        >
          {children}
        </Content>
      </AntdLayout>
    )
  }

  const contentSpan = 12 + (hasSideLeft ? 0 : 6) + (hasSideRight ? 0 : 6)

  return (
    <AntdLayout className="layout">
      {hasNavbar && navbar}

      <Container>
        <Content
          className={classnames(styles.contentWrapper, {
            [styles.contentWithNavbar]: hasNavbar,
          })}
        >
          <Row gutter={16}>
            {hasSideLeft && <Col span={6}>{sideLeft}</Col>}
            <Col span={contentSpan}>{children}</Col>
            {hasSideRight && <Col span={6}>{sideRight}</Col>}
          </Row>
        </Content>
      </Container>
    </AntdLayout>
  )
}

Layout.propTypes = {
  hasNavbar: PropTypes.bool,
  navbar: PropTypes.node,
  hasSideRight: PropTypes.bool,
  sideRight: PropTypes.node,
  hasSideLeft: PropTypes.bool,
  sideLeft: PropTypes.node,
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
}

Layout.defaultProps = {
  hasNavbar: false,
  navbar: null,
  hasSideRight: false,
  sideRight: null,
  hasSideLeft: false,
  sideLeft: null,
  fluid: false,
}

export { Layout }
