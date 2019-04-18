import React from 'react'
import PropTypes from 'prop-types'
import { Layout as AntdLayout, Row, Col } from 'antd'
import classnames from 'classnames'

import styles from './layout.module.scss'
import Container from './container'
import WindowTitle from './window-title'

const { Content } = AntdLayout

class Layout extends React.PureComponent {
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
      windowTitle,
      className,
      header,
    } = this.props

    if (fluid) {
      return (
        <div className="animated fadeIn">
          <AntdLayout className={classnames(className, styles.layout)}>
            <WindowTitle title={windowTitle} />
            {hasNavbar && navbar}
            <Content
              className={classnames(styles.contentWrapper, {
                [styles.contentWithNavbar]: hasNavbar,
              })}
            >
              {children}
            </Content>
          </AntdLayout>
        </div>
      )
    }

    const contentSpan = 12 + (hasSideLeft ? 0 : 6) + (hasSideRight ? 0 : 6)

    return (
      <div className="animated fadeIn">
        <AntdLayout className={classnames(className, styles.layout)}>
          <WindowTitle title={windowTitle} />
          {hasNavbar && navbar}

          {header}

          <Container>
            <Content
              className={classnames(styles.contentWrapper, {
                [styles.contentWithNavbar]: hasNavbar && !header,
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
      </div>
    )
  }
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
  windowTitle: PropTypes.string.isRequired,
  className: PropTypes.string,
  header: PropTypes.node,
}

Layout.defaultProps = {
  hasNavbar: false,
  navbar: null,
  hasSideRight: false,
  sideRight: null,
  hasSideLeft: false,
  sideLeft: null,
  fluid: false,
  className: '',
  header: null,
}

export { Layout }
