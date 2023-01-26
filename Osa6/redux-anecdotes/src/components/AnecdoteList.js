import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
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

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        dispatch(createNotification(`You voted for anecdote: "${content}"`))
        setTimeout(()=>{
            dispatch(createNotification(null))
        }, 5000)
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
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>)}
        </div>
        
        
    )
}

export default AnecdoteList