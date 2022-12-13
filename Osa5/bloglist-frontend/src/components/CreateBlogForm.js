import { useState } from 'react'

const CreateBlogForm = ({
  handleCreate
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    handleCreate({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <input
        type='text'
        value={title}
        name='Title'
        onChange={({ target }) => setTitle(target.value)}
        placeholder = 'blog title'
      />
      <input
        type='text'
        value={author}
        name='Author'
        onChange={({ target }) => setAuthor( target.value )}
        placeholder = 'blog author'
      />
      <input
        type='text'
        value={url}
        name='Url'
        onChange={({ target }) => setUrl( target.value )}
        placeholder = 'blog url'
      />
      <button type='submit'>create</button>
    </form>
  )
}

export default CreateBlogForm