import { useState } from 'react'

const Blog = ({ blog, increaseLikes, handleBlogDeletion }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {blog.title} {blog.author}{' '}
      <button onClick={() => toggleVisibility()}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible ? (
        <>
          <p>{blog.url}</p>
          <p>
            likes{blog.likes}{' '}
            <button onClick={() => increaseLikes(blog.id, blog.likes)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => handleBlogDeletion(blog.id)}>delete</button>
        </>
      ) : null}
    </div>
  )
}

export default Blog
