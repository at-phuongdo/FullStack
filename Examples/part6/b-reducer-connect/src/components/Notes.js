import React from 'react'
import { toggleImportanceOf } from '../reducers/noteReducer'


const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = ({ store }) => {
  const { notes, filter } = store.getState()
  const notesToShow = () => {
    console.log(filter);
    
    if ( filter === 'ALL' ) {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  }
  return(
    <ul>
       {notesToShow().map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            store.dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes