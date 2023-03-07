import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleCreateBtn = (event) => {
    event.preventDefault()
    dispatch(
      addBlog({
        title,
        author,
        url,
      })
    )
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <Form onSubmit={handleCreateBtn}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          id="titleInput"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="blog title"
        />
        <Form.Label>Author:</Form.Label>
        <Form.Control
          id="authorInput"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="blog author"
        />
        <Form.Label>Url:</Form.Label>
        <Form.Control
          id="urlInput"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="blog url"
        />
        <Button id="createBlogButton" type="submit">
          create
        </Button>
      </Form.Group>
    </Form>
  )
}

export default CreateBlogForm
