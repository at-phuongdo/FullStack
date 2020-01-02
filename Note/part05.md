Update a blog
```
const handleLikeBlog = (id) => async () => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {...blog, likes: blog.likes + 1}
    const blogUpdated = await blogService.update(id, newBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : blogUpdated))
  }

```

*Don’t call Hooks inside loops, conditions, or nested functions*. Instead, always use Hooks at the top level of your React function.
*Don’t call Hooks from regular JavaScript functions*. Instead, you can:
- Call Hooks from React function components.
- Call Hooks from custom Hooks