import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ newMutation }) => {
  const [notification, dispatch] = useContext(NotificationContext)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length > 5) {
      newMutation.mutate({ content, votes: 0 })
      console.log(`Creating new anecdote: '${content}'`)
      dispatch({ type: "CREATE", payload: content })
      setTimeout(()=>{
        dispatch({type: "EMPTY"})
        },5000)
    } else {
      dispatch({ type: "ERROR",  payload: "Anecdote is too short. Length must be 5 or more."})
      setTimeout(()=>{
        dispatch({type: "EMPTY"})
        },5000)
    }
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
