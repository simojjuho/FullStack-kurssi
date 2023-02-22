import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setNotification(state, action) {
      console.log('reducer:', action.payload)
      return action.payload
    },
  },
})

export const newInfoMsg = (notification) => {
  return async (dispatch) => {
    dispatch(
      setNotification({
        type: 'info',
        payload: notification,
      })
    )
    setTimeout(() => {
      dispatch(
        setNotification({
          type: 'info',
          payload: null,
        })
      )
    }, 5000)
  }
}

export const newErrorMsg = (notification) => {
  return async (dispatch) => {
    dispatch(
      setNotification({
        type: 'error',
        payload: notification,
      })
    )
    setTimeout(() => {
      dispatch(
        setNotification({
          type: 'error',
          payload: null,
        })
      )
    }, 5000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
