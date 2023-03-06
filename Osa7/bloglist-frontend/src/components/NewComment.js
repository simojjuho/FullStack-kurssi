import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const NewComment = ({ id }) => {
  const dispatch = useDispatch()
  const [commentField, setCommentField] = useState('')

  const handleAddComment = (event) => {
    event.preventDefault()
    console.log('commentField: ', commentField)
    const contentObject = {
      content: commentField,
    }
    dispatch(addComment(id, contentObject))
    setCommentField('')
  }
  return (
    <div>
      Add a new comment:
      <form onSubmit={handleAddComment}>
        <input
          value={commentField}
          onChange={({ target }) => setCommentField(target.value)}
          name="content"
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default NewComment
