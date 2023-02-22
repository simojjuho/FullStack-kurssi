import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const loggedIn = (user) => {
  return (dispatch) => {
    dispatch(setUser(user))
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    const newLogin = await loginService.login(user)
    dispatch(setUser(newLogin))
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedUser')
  }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
