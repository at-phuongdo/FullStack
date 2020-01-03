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
  console.log(store.getState());
  
  return(
    <ul>
      {store.getState().map(note =>
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