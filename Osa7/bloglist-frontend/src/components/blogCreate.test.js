import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('createBlog is called with proper arguments', async () => {
  const handleCreate = jest.fn()

  render(<CreateBlogForm handleCreate={handleCreate} />)

  const inputAuthor = screen.getByPlaceholderText('blog author')
  const inputTitle = screen.getByPlaceholderText('blog title')
  const inputUrl = screen.getByPlaceholderText('blog url')
  const sendButton = screen.getByText('create')

  await userEvent.type(inputAuthor, 'Niinistö')
  await userEvent.type(inputTitle, 'title')
  await userEvent.type(inputUrl, 'url.com')
  await userEvent.click(sendButton)

  expect(handleCreate.mock.calls).toHaveLength(1)
  expect(handleCreate.mock.calls[0][0].author).toBe('Niinistö')
})
