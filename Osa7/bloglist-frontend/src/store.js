import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    //notification: notificationReducer,
    //user: userReducer,
  },
})

export default store
