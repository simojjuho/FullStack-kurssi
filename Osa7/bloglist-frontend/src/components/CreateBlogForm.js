import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

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
    <form onSubmit={handleCreateBtn}>
      <input
        id="titleInput"
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
        placeholder="blog title"
      />
      <input
        id="authorInput"
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        placeholder="blog author"
      />
      <input
        id="urlInput"
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
        placeholder="blog url"
      />
      <button id="createBlogButton" type="submit">
        create
      </button>
    </form>
  )
}

export default CreateBlogForm
