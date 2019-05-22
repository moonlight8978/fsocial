import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Upload, Icon, message, Input, Form, Collapse } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import { Box } from '../../../components/atomics'
import MemoryApi from '../memory-api'
import MemoryResource from '../memory-resource'
import MarkedImage from '../marked-image'
import { AsyncUtils } from '../../../utils'
import { FluidLoading } from '../../../components/loading'

import styles from './create-memory.module.scss'
import CreateMemoryForm from './create-memory-form'

class CreateMemory extends React.PureComponent {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
    intl: PropTypes.shape().isRequired,
  }

  state = { isOpen: false, isUploading: false }

  handleUploadImage = async (file, handleChange, handleUpload) => {
    this.setState({ isUploading: true })
    await AsyncUtils.delay(2000)
    try {
      const { data } = await MemoryApi.uploadPicture(file)
      const picture = MemoryResource.MemoryPicture.parse(data)
      handleUpload('picture')(picture)
      handleChange({
        target: { name: 'memoryTaggings', value: picture.memoryTaggings },
      })
      handleChange({
        target: { name: 'signedBlobId', value: picture.signedBlobId },
      })
      this.setState({ isUploading: false })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        message.error('Validation failed')
      } else {
        message.error('Something went wrong')
      }
    }
  }

  toggleIsOpen = () => this.setState(state => ({ isOpen: !state.isOpen }))

  render() {
    const { isOpen, isUploading } = this.state
    const { intl, onCreate } = this.props
    const { formatMessage } = intl

    return (
      <Box className={styles.container}>
        <h4 className="animated fadeIn">
          <b>
            <FormattedMessage id="memories.new.title" />
          </b>
        </h4>

        <Collapse
          activeKey={isOpen ? ['1'] : []}
          bordered={false}
          expandIcon={({ isActive }) => (
            <div>
              <Button
                onClick={this.toggleIsOpen}
                className={styles.collapseButton}
              >
                <FontAwesomeIcon
                  icon="chevron-circle-down"
                  size="lg"
                  className={classnames({ [styles.rotatedIcon]: isActive })}
                />
              </Button>
            </div>
          )}
          expandIconPosition="right"
        >
          <Collapse.Panel key="1" className={styles.collapseBox}>
            <div className={styles.createMemoryToolBox}>
              <CreateMemoryForm
                onCreate={memory => {
                  onCreate(memory)
                  this.toggleIsOpen()
                }}
              >
                {({
                  handleSubmit,
                  fieldStatus,
                  values,
                  fieldError,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                  handleUploadSingle,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Upload
                      name="picture"
                      beforeUpload={file => {
                        this.handleUploadImage(
                          file,
                          handleChange,
                          handleUploadSingle
                        )
                        return false
                      }}
                      fileList={[]}
                      accept=".png,.jpg,.jpeg"
                      className={styles.uploadButton}
                    >
                      <Button disabled={isUploading}>
                        <Icon type="upload" />
                        <FormattedMessage id="memories.new.upload" />
                      </Button>
                    </Upload>

                    {isUploading ? (
                      <FluidLoading />
                    ) : (
                      <div className={styles.row}>
                        {values.picture.url && (
                          <MarkedImage
                            className={styles.attachment}
                            src={values.picture.url}
                            taggings={values.memoryTaggings}
                            key={values.picture.name}
                            renderTaggings={({
                              dimension,
                              handleMouseOut,
                              handleMouseOver,
                              highlightedPersonId,
                              taggings,
                            }) => (
                              <div className={styles.taggings}>
                                {taggings.length > 0 ? (
                                  <>
                                    <div className={styles.taggingsTitle}>
                                      <b>
                                        <FormattedMessage id="memories.taggings.with" />
                                      </b>
                                    </div>

                                    <div>
                                      {taggings.map(
                                        (
                                          { vertices, id, description },
                                          index
                                        ) => (
                                          <div
                                            onFocus={handleMouseOver(id)}
                                            onMouseOver={handleMouseOver(id)}
                                            onBlur={handleMouseOut}
                                            onMouseOut={handleMouseOut}
                                            className={styles.taggingItem}
                                          >
                                            <span>
                                              <FormattedMessage id="memories.taggings.entry" />{' '}
                                              {index + 1}
                                            </span>

                                            <Form.Item
                                              validateStatus={fieldStatus(
                                                `memoryTaggings.${index}.description`
                                              )}
                                              help={fieldError(
                                                `memoryTaggings.${index}.description`
                                              )}
                                            >
                                              <Input
                                                type="text"
                                                placeholder={formatMessage({
                                                  id:
                                                    'schemas.memory.description.placeholder',
                                                })}
                                                value={description}
                                                name={`memoryTaggings.${index}.description`}
                                                className={styles.input}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              />
                                            </Form.Item>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <FormattedMessage id="memories.taggings.detectionEmpty" />
                                )}

                                <Button
                                  block
                                  type="primary"
                                  shape="round"
                                  htmlType="submit"
                                  className={styles.button}
                                  disabled={isSubmitting}
                                >
                                  <FormattedMessage id="memories.new.submit" />
                                </Button>
                              </div>
                            )}
                          />
                        )}
                      </div>
                    )}
                  </Form>
                )}
              </CreateMemoryForm>
            </div>
          </Collapse.Panel>
        </Collapse>
      </Box>
    )
  }
}

export default injectIntl(CreateMemory)
