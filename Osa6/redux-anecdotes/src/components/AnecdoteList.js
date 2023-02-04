import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
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

    const vote = (id, votes) => {
        console.log('vote', id)
        const dataToUpdate = {
            ...anecdotes.find(anecdote => anecdote.id === id),
            votes: votes + 1
        }
        dispatch(addVote(id, dataToUpdate))
        /* dispatch(createNotification(`You voted for anecdote: "${content}"`))
        setTimeout(()=>{
            dispatch(createNotification(null))
        }, 5000) */
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
                    <button onClick={() => vote(anecdote.id, anecdote.votes)}>vote</button>
                </div>
            </div>)}
        </div>
        
        
    )
}

export default AnecdoteList