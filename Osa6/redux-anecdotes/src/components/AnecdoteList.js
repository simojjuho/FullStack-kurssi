import { useDispatch, useSelector } from 'react-redux'
import anecdoteReducer, { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
    }

    return(
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>)}
        </div>
        
        
    )
}

export default AnecdoteList