import AnecodteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll()
      .then((response) => {
        dispatch(setAnecdotes(response))        
      })
  }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecodteForm />
    </div>
  )
}

export default App