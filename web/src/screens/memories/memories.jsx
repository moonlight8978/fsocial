import React from 'react'

import { Layout, Navbar } from '../layout'
import { ImagePreloader } from '../../components/atomics'

import styles from './memories.module.scss'

class Memories extends React.PureComponent {
  state = {
    width: null,
    height: null,
  }

  vertices = [
    [
      { x: 91, y: 76 },
      { x: 212, y: 76 },
      { x: 212, y: 216 },
      { x: 91, y: 216 },
    ],
    [
      { x: 375, y: 20 },
      { x: 507, y: 20 },
      { x: 507, y: 173 },
      { x: 375, y: 173 },
    ],
  ]

  render() {
    const { width, height } = this.state

    return (
      <Layout hasNavbar navbar={<Navbar />} hasSideLeft>
        <div className={styles.wrapper}>
          <ImagePreloader
            src="/faces-demo/un-trump.jpg"
            alt="Trump and Un"
            className={styles.image}
            onLoad={metadata =>
              this.setState({ height: metadata.height, width: metadata.width })
            }
          />
          {width && height && (
            <svg className={styles.canvas}>
              {this.vertices.map(vertices => (
                <rect
                  width={`${((vertices[1].x - vertices[0].x) / width) * 100}%`}
                  height={`${((vertices[3].y - vertices[0].y) / height) *
                    100}%`}
                  x={`${(vertices[0].x / width) * 100}%`}
                  y={`${(vertices[0].y / height) * 100}%`}
                  className={styles.rect}
                />
              ))}
            </svg>
          )}
        </div>
      </Layout>
    )
  }
}

export default Memories
