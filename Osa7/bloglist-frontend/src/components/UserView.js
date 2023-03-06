const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  const listBlogs = () => {
    if (user.blogs.length === 0) {
      return 'No added blogs yet!'
    } else {
      return (
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>
          })}
        </ul>
      )
    }
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      {listBlogs()}
    </div>
  )
}

export default UserView
