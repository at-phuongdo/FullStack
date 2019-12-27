const blogsRoute = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRoute.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRoute.post('/', async (request, response, next) => {
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch (exception){
    next(exception)
  }
})

blogsRoute.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const userId = decodedToken.id
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(401).json({ error: 'the blog deleted' })
    } else if ( blog.user.toString() === userId.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'permission denined' })
    }
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

    response.json(blogUpdated.toJSON())
  }
  catch(exception) {
    next(exception)
  }
})
module.exports = blogsRoute
