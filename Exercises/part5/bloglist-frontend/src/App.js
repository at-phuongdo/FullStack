import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = React.createRef()
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.resetValue()
      password.resetValue()
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut  = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog  = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blogCreated = await blogService.create({
        title, author, url
      })
      const blogsAfterCreated = await blogService.getAll()
      setBlogs(blogsAfterCreated)
      setSuccessMessage(`A new blog ${blogCreated.title} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (error) {
      setErrorMessage(error)
    }
  }

  const handleLikeBlog = (id) => async () => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {...blog, likes: blog.likes + 1}
    try {
      const blogUpdated = await blogService.update(id, newBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : blogUpdated))
    }
    catch (error) {
      setErrorMessage(error)
    }
  }

  const handleRemove = (id) => async () => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
    catch (error) {
      setErrorMessage(error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        Password
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <NewBlogForm
        handleSubmit={handleCreateBlog}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target}) => setUrl(target.value)}
        title={title}
        author={author}
        url={url}
      />
    </Togglable>
  )

  const blogsSortByLikes = blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)

  const rows = () =>
    blogsSortByLikes.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLikeBlog}
        handleRemove={handleRemove}
      />
    )

  return (
    <div>
      <Notifications successMessage={successMessage} errorMessage={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          {user.name} logged in. <button onClick={handleLogOut}>Log out</button>
          <h3>Create blog</h3>
          {createBlogForm()}
          <ul>
            {rows()}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
