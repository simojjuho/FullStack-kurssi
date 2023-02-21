import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

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
      state.push(action.payload)
    },
    addLike(state, action) {
      const blogsWithNewLike = state.map((blog) => {
        blog.id === action.payload.id ? action.payload : blog
      })
      return blogsWithNewLike.sort((a, b) => {
        return b.likes - a.likes
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

export const { setBlogs, appendBlog, addLike } = blogSlice.actions
export default blogSlice.reducer
