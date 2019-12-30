import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, handleLike }) => {
  console.log(blog);
  
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        <h3>{blog.title} {blog.author}</h3>
      </div>
      <div style={showWhenVisible}>
        <h3 onClick={toggleVisibility}>{blog.title} {blog.author}</h3>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={handleLike(blog)}>Like</button></p>
        <p>Added by {blog.user[0].name}</p>
      </div>
    </div>
  )
}

export default Blog