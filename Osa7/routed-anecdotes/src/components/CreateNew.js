import { useNavigate } from "react-router-dom"
import { useField } from '../hooks'

const CreateNew = ({ addNew, changeNotification }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      changeNotification(`New anecdote created: ${content.value}`)
      navigate('/')
    }

    const handleReset = () => {
      content.onReset()
      author.onReset()
      info.onReset()
    }

    return (
        <div>
          <h2>create a new anecdote</h2>
          <form onSubmit={handleSubmit}>
            <div>
              content
              <input {...content} />
            </div>
            <div>
              author
              <input {...author} />
            </div>
            <div>
              url for more info
              <input {...info} />
            </div>
            <button type="submit">create</button>
            <button type="reset" onClick={()=>handleReset()}>reset</button>
          </form>
        </div>
      )
}

export default CreateNew