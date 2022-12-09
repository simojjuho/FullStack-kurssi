import { useState } from "react"

const Blog = ({blog, handleAddLike}) => {
  const [showMore, setShowMore] = useState(false)
  
  const toggleVisibility = () => {
    setShowMore(!showMore)
  }

  const blogStyle = {
    border: '2px black solid',
    maxWidth:  '250px',
    padding: '10px',
    marginBottom: '5px'
  }

  const addLike = () => {
    blog.likes += 1
    handleAddLike({
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url
    }, blog.id)
  }

  if(showMore) {
    return (
      <div style={blogStyle}>
        Title: {blog.title}<br />
        Author: {blog.author}<br />
        Likes: {blog.likes}<br />
        <button onClick={()=>addLike(blog.id)}>like</button><br />
        Url: {blog.url}<br />
        <button onClick={() => toggleVisibility()}>view less</button>
      </div>
    )
  } else {
    return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => toggleVisibility()}>view more</button>
    </div>  
    )
  }
}


export default Blog