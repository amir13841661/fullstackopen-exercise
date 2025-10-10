import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Blog from './Blog'
import BlogCreationForm from './BlogCreationForm'
const createBlog = vi.fn()

describe('<BlogCreationForm/>', () => {
  beforeEach(() => {
    testBlog = {
      title: 'test title',
      author: 'test author',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 25,
      user: {
        username: 'test username',
        name: 'test name',
        id: '68e7938e2657fa7059d1c65d',
      },
      id: '68e793c92657fa7059d1c661',
    }
    render(<BlogCreationForm createBlog={createBlog} />)
  })
  test('submitting the form works', async () => {
    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const createButton = screen.getByText('create')
    await userEvent.type(titleInput, 'test title')
    await userEvent.type(authorInput, 'test author')
    await userEvent.type(urlInput, 'test url')
    await userEvent.click(createButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual({
      title: 'test title',
      author: 'test author',
      url: 'test url',
    })
  })
})
