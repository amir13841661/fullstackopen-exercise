import { render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Blog from './Blog'
import blog from '../../../../part4/blog-list/models/blog'
let testBlog = {}
const increaseLikes = vi.fn()

describe('<Blog/>', () => {
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
    render(<Blog blog={testBlog} increaseLikes={increaseLikes} />)
  })
  test('renders its children', () => {
    screen.getByTestId('blog')
  })
  test('<p> elements should be invisible', () => {
    const url = screen.queryByTestId('url')
    const likes = screen.queryByTestId('likes')
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
  test('after button click url and likes are rendered', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const url = screen.queryByTestId('url')
    const likes = screen.queryByTestId('likes')
    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
  })

  test('if the like button is clicked twice the increaseLikes function will be called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(increaseLikes.mock.calls).toHaveLength(2)
  })
})
