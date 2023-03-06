import NewComment from './NewComment'

const Comments = ({ blog }) => {
  const ifNoComments = () => {
    if (blog.comments.length === 0) {
      return <p>No comments yet!</p>
    } else
      return (
        <ul>
          {blog.comments.map((comment) => {
            return <li key={comment._id}>{comment.content}</li>
          })}
        </ul>
      )
  }

  return (
    <div>
      {ifNoComments()}
      <NewComment id={blog.id} />
    </div>
  )
}

export default Comments
