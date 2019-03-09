import React from 'react'
import { Spin } from 'antd'

import styles from './loading.module.scss'

const InlineLoading = () => <Spin size="large" />

const FluidLoading = () => (
  <div className={styles.fluidLoading}>
    <InlineLoading />
  </div>
)

const FullscreenLoading = () => (
  <div className={styles.fullscreenLoading}>
    <InlineLoading />
  </div>
)

const EdgeLoading = () => (
  <div className={styles.edgeLoading}>
    <Spin size="default" />
  </div>
)

export { FluidLoading, InlineLoading, FullscreenLoading, EdgeLoading }
