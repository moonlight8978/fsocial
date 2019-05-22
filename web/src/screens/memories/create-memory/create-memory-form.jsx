import React from 'react'
import { object, string, array, number } from 'yup'
import PropTypes from 'prop-types'
import { message } from 'antd'

import { StaticForm } from '../../../components/form'
import MemoryApi from '../memory-api'
import MemoryResource from '../memory-resource'

const defaultValues = {
  signedBlobId: '',
  memoryTaggings: [],
  content: '',
  picture: {},
}

const schema = intl =>
  object().shape({
    memoryTaggings: array().of(
      object().shape({
        id: number(),
        description: string().nullable(),
      })
    ),
    signedBlobId: string().required(
      intl.formatMessage({ id: 'schema.memory.signedBlobId.errors.required' })
    ),
  })

class CreateMemoryForm extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  createMemory = async memory => {
    try {
      const { data } = await MemoryApi.createMemory(memory)
      this.props.onCreate(MemoryResource.Memory.parse(data))
    } catch (error) {
      if (error.response && error.response.status === 422) {
        message.error('Validation failed')
      } else {
        message.error('Something went wrong')
      }
    }
  }

  render() {
    return (
      <StaticForm
        schema={schema}
        initialValues={defaultValues}
        onSubmit={this.createMemory}
        resetOnSuccess
      >
        {this.props.children}
      </StaticForm>
    )
  }
}

export default CreateMemoryForm
