import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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