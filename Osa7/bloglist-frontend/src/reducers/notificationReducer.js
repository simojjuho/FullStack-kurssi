import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const newInfoMsg = (notification) => {
  return async (dispatch) => {
    dispatch(
      setNotification({
        type: 'success',
        payload: notification,
      })
    )
    setTimeout(() => {
      dispatch(
        setNotification({
          type: 'success',
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
        type: 'danger',
        payload: notification,
      })
    )
    setTimeout(() => {
      dispatch(
        setNotification({
          type: 'danger',
          payload: null,
        })
      )
    }, 5000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
