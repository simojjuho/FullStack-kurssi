import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload
        }
    }
})

export const newNotification = (message, time = 10) => {
    return dispatch => {
        dispatch(createNotification(message))
        setTimeout(()=>{
            dispatch(createNotification(null))
        }, time*1000)
    }
}

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer