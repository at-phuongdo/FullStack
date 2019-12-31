import React, { useState, useEffect } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const visibilityRemove = { display: user && (blog.user[0].id === user.id) ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        <h3>{blog.title} {blog.author}</h3>
      </div>
      <div style={showWhenVisible}>
        <h3 onClick={toggleVisibility}>{blog.title} {blog.author}</h3>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleLike(blog.id)}>Like</button></p>
        <p>Added by {blog.user[0].name}</p>
        <button onClick={handleRemove(blog.id)} style={visibilityRemove}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
