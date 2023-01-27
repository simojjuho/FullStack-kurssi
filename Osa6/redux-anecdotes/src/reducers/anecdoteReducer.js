import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        votes: 0,
      })
    },
    voteAnecdote(state, action) {
      const anecdoteToChange = state.find(anecdote => anecdote.id === action.payload)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const anecdotesWithNewVote = state.map(anecdote => anecdote.id === action.payload
        ? changedAnecdote 
        : anecdote
        )
      
      return anecdotesWithNewVote.sort( (a, b) => {
        return b.votes-a.votes
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer