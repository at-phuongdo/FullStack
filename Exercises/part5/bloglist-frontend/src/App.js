import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notifications from './components/Notifications'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = React.createRef()

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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
      setBlogs(blogs.concat(blogCreated))
      setSuccessMessage(`A new blog ${blogCreated.title} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (error) {
      setErrorMessage(error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
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

  const handleLikeBlog = (blog) => async () => {
    // blog.likes = blog.likes + 1
    // console.log(blog)
    // const blogUpdated = await blogService.update(blog.id, blog)
  }

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
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLikeBlog} />
            )}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
