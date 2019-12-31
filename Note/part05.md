Update a blog
```
const handleLikeBlog = (id) => async () => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {...blog, likes: blog.likes + 1}
    const blogUpdated = await blogService.update(id, newBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : blogUpdated))
  }

```