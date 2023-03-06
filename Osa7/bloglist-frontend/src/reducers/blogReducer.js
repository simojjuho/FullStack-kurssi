import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'
import { newErrorMsg, newInfoMsg } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogsSorted = action.payload.sort((a, b) => {
        return b.likes - a.likes
      })
      return blogsSorted
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    modifyLikedBlog(state, action) {
      const blogsWithNewLike = state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog
      })
      return blogsWithNewLike.sort((a, b) => {
        return b.likes - a.likes
      })
    },
    removeBlog(state, action) {
      return state.filter((blog) => {
        return blog.id !== action.payload
      })
    },
    setComment(state, action) {
      return state.map((blog) => {
        return blog.id === action.payload.id ? action.payload : blog
      })
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogsFromServer = await blogs.getAll()
    dispatch(setBlogs(blogsFromServer))
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogs.update(blog)
    dispatch(modifyLikedBlog(likedBlog))
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogs.create(blog)
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return (dispatch) => {
    blogs
      .remove(id)
      .then(() => {
        dispatch(removeBlog(id))
        dispatch(newInfoMsg('The blog was deleted!'))
      })
      .catch(() => {
        dispatch(removeBlog(id))
        dispatch(
          newErrorMsg('Error with the server. Blog removed from the list..')
        )
      })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const result = await blogs.createComment(id, comment)
    dispatch(setComment(result))
  }
}

export const { setBlogs, appendBlog, modifyLikedBlog, removeBlog, setComment } =
  blogSlice.actions
export default blogSlice.reducer
