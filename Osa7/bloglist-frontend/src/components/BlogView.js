import { addLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Comments from './Comment'
import { useNavigate } from 'react-router-dom'

const BlogView = ({ blog }) => {
  if (!blog) return null

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = () => {
    dispatch(
      addLike({
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        id: blog.id,
        comments: blog.comments,
      })
    )
  }

  const username = useSelector((state) => state.user.username)

  const deleteButton = () => {
    return username === blog.user.username ? (
      <button className="deleteButton" onClick={() => handleDelete()}>
        delete
      </button>
    ) : null
  }

  const handleDelete = () => {
    if (window.confirm(`Want to delete ${blog.author}: ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.url}</p>
      <p>{blog.likes} likes </p>
      <button onClick={() => handleLike()}>like</button>
      <p>added by {blog.user.name}</p>
      {deleteButton()}
      <h4>Comments</h4>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogView
