import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filterAnecdotes = () => {
        const regex = new RegExp(filter.toLowerCase(), 'g')
        return anecdotes.filter(anecdote => {
            return regex.test(anecdote.content.toLowerCase())
        })
    }
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        const dataToUpdate = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        dispatch(addVote(anecdote.id, dataToUpdate))
        dispatch(newNotification(`You voted '${anecdote.content}'`, 5))
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {filterAnecdotes().map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>)}
        </div>
        
        
    )
}

export default AnecdoteList