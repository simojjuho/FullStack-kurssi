import AnecodteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  
  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecodteForm />
    </div>
  )
}

export default App