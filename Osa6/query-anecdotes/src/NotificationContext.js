import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case "VOTE":
            return `Voted for "${action.payload}".`
        case "CREATE":
            return `Created new anecdote "${action.payload}".`
        case "EMPTY":
            return null
        case "ERROR":
            return action.payload
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext