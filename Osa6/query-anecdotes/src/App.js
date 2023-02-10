import { useQueryClient, useMutation, useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import requests from './services/requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(requests.create, {
      onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
      },
    })

    const updateAnecdoteMutation = useMutation(requests.update, {
      onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => {
          return anecdote.id === updatedAnecdote.id
            ? updatedAnecdote
            : anecdote
        }))
      }
    })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ type: "VOTE", payload: anecdote.content})
    setTimeout(()=>{
      dispatch({type: "EMPTY"})
      },5000)
  }

  const result = useQuery(
    'anecdotes',
    requests.getAll,
    {
      refetchOnWindowFocus: false
    }
  )

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(!result.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newMutation={newAnecdoteMutation} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>

  )
}

export default App
