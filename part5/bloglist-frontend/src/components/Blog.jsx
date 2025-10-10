import { useState } from 'react'

const Blog = ({ blog, increaseLikes, handleBlogDeletion }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div data-testid='blog'>
      {blog.title} {blog.author}{' '}
      <button onClick={() => toggleVisibility()}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible ? (
        <>
          <p data-testid='url'>{blog.url}</p>
          <div data-testid='likes'>
            likes: {blog.likes}{' '}
            <button onClick={() => increaseLikes(blog.id, blog.likes)}>
              like
            </button>
          </div>
          <p>{blog.user.name}</p>
          <button onClick={() => handleBlogDeletion(blog.id)}>delete</button>
        </>
      ) : null}
    </div>
  )
}

export default Blog
