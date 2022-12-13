import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders automatically title and author, not likes and url', async () => {
  const blog = {
    title: 'How to test react?',
    author: 'Kerkko Koskinen',
    likes: 10,
    url: 'bestblog.com'
  }

  const { container } = render(<Blog blog={blog} username={'juho87'} />)

  const div = container.querySelector('.blogLessInfo')
  expect(div).toHaveTextContent('How to test react?')
})

test('also the likes and url render when view more is clicked', async () => {
  const blog = {
    title: 'How to test react?',
    author: 'Kerkko Koskinen',
    likes: 10,
    url: 'bestblog.com',
    user: {
      username: 'juho87'
    }
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} handleAddLike={mockHandler} handleRemove={mockHandler} username={'juho87'} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view more')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('bestblog.com')
  expect(div).toHaveTextContent('10')
})