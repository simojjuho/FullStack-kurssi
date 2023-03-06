import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const result = await getUsers()
    dispatch(setUsers(result))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
