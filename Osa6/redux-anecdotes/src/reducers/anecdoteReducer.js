import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {    
      const anecdotesWithNewVote = state.map(anecdote => anecdote.id === action.payload.id
        ? action.payload 
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id, dataToChange) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id, dataToChange)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer