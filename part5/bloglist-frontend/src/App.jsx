import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
  blogs.sort((a, b) => b.likes - a.likes)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('logged in successfuly')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch {
      setError('invalid credintials')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    setMessage('logged out')
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }
  const increaseLikes = async (blogId, likes) => {
    try {
      await blogService.update(blogId, likes + 1)
      const copy = [...blogs]
      const blogIndex = copy.findIndex((u) => u.id == blogId)
      copy[blogIndex].likes = likes + 1
      setBlogs(copy)
    } catch {
      setError('error changing likes')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const createBlog = async ({ title, author, url }) => {
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setMessage('new blog added')
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch {
      setError('couldnt add blog')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const deleteBlog = async (blogId) => {
    if (!window.confirm('do you really want to delete this blog?')) {
      return
    }
    try {
      await blogService.deleteBlog(blogId)
      const copy = blogs.filter((u) => u.id !== blogId)
      setBlogs(copy)
      setMessage('blog deleted successfuly')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch {
      setError("could'nt delete blog")
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  useEffect(() => {
    async function getBlogs() {
      const response = await blogService.getAll()
      setBlogs(response.data)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={error} type='error' />
      <Notification message={message} type='notification' />
      {!user && (
        <Togglable buttonLabel={'login'}>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
          />
        </Togglable>
      )}
      {user && (
        <Blogs
          blogs={blogs}
          name={user.name}
          handleLogout={handleLogout}
          increaseLikes={increaseLikes}
          handleBlogDeletion={deleteBlog}
        />
      )}
      {user && (
        <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
          <BlogCreationForm createBlog={createBlog} />
        </Togglable>
      )}
    </div>
  )
}

export default App
