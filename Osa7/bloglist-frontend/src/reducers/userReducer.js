import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { newErrorMsg, newInfoMsg } from './notificationReducer'

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

export const loginUser = (newUser) => {
  return (dispatch) => {
    loginService
      .login(newUser)
      .then((user) => {
        dispatch(setUser(user))
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        dispatch(newInfoMsg(`Logged in as ${user.name}`))
      })
      .catch(() => {
        dispatch(newErrorMsg('Wrong username and/or password.'))
      })
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
