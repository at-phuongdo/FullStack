import React from 'react'

const Filter = ({searchWord, onSearchWordChange}) => {
  return (
    <div>
      Find country <input value={searchWord} onChange={onSearchWordChange}/>
    </div>
  )
}

export default Filter
