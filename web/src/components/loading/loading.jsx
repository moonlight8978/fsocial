import React from 'react'
import { Spin } from 'antd'

import styles from './loading.module.scss'

const InlineLoading = () => <Spin size="large" />

const FluidLoading = () => (
  <div className={styles.fluidLoading}>
    <InlineLoading />
  </div>
)

export { FluidLoading, InlineLoading }
