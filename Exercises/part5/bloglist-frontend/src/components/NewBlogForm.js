import React from 'react'

const NewBlogForm = ({
  handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
  }) => {
  return (
    <div>
      <h2>Create new note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
            <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
            />
        </div>
        <div>
          Author
            <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
            />
        </div>
        <div>
          Url
            <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
            />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
