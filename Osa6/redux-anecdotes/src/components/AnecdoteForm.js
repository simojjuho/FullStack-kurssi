import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecodteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(createAnecdote(content))
      }

    return(
            <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
            <div><input name="content"  /></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecodteForm