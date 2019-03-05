// @flow
import * as React from 'react'
import { Layout as AntdLayout, Row, Col } from 'antd'
import classnames from 'classnames'

import { Container } from './container'
import styles from './layout.module.scss'

const { Content } = AntdLayout

type Props = {
  hasNavbar?: boolean,
  navbar?: React.Node,
  hasSideRight?: boolean,
  sideRight?: React.Node,
  hasSideLeft?: boolean,
  sideLeft?: React.Node,
  children: React.Node,
  fluid?: boolean,
}

class Layout extends React.Component<Props> {
  static defaultProps = {
    hasNavbar: false,
    navbar: null,
    hasSideRight: false,
    sideRight: null,
    hasSideLeft: false,
    sideLeft: null,
    fluid: false,
  }

  render() {
    const {
      hasNavbar,
      navbar,
      hasSideRight,
      sideRight,
      hasSideLeft,
      sideLeft,
      children,
      fluid,
    } = this.props

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
}

export { Layout }
