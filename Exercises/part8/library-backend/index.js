const { ApolloServer, UserInputError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://fullstack:12qwaszx@cluster0-ojioi.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const Book = require('./models/book')
const Author = require('./models/author')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: String
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book
  }
`
const resolvers = {
  Query: {
    allBooks: () => {
      return Book.find({})
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author', {name: 1})
      return books.filter(book => book.author.name === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})