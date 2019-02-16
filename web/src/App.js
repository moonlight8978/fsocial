import React, { Component } from 'react'
import axios from 'axios'

function parseBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      return resolve(reader.result)
    }
    reader.onerror = error => {
      return reject(error)
    }
  })
}

async function mapAsync(list, mapper) {
  const results = await Promise.all(list.map(item => mapper(item)))
  return results
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      medias: [],
    }

    this.handleCreatePost = this.handleCreatePost.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUploadFile = this.handleUploadFile.bind(this)
  }

  async handleCreatePost(event) {
    event.preventDefault()

    const medias = await mapAsync(this.state.medias, parseBase64)
    const data = {
      ...this.state,
      medias,
    }

    axios
      .post('http://localhost:3333/api/v1/tests', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  handleInputChange(event) {
    this.setState({ content: event.target.value })
  }

  async handleUploadFile(event) {
    const { medias } = this.state

    if (event.target.files[0]) {
      this.setState({
        medias: [...medias, event.target.files[0]],
      })
    }
  }

  render() {
    const { content } = this.state

    return (
      <div className="App">
        <form action="http://localhost:3333/api/v1/tests" method="post">
          <input type="text" name="content" />
          Data
          <br />
          <input type="file" name="medias" />
          File
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default App
