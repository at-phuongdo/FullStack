import React from 'react'

const Filter = ({searchWord, onSearchWordChange}) => {
  return (
    <div>
      Filter shown with <input value={searchWord} onChange={onSearchWordChange}/>
    </div>
  )
}

export default Filter
