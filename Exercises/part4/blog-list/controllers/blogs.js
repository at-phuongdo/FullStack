const blogsRoute = require('express').Router()
const Blog = require('../models/blog')

blogsRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRoute.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRoute.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRoute.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url
  }
  try {
    const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log(blogUpdated)
    
    response.json(blogUpdated.toJSON())
  }
  catch(exception) {
    next(exception)
  }
})
module.exports = blogsRoute
