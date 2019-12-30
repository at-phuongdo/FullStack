import React from 'react'
import '../stylesheets/notifications.css'

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage !== null) {
    return (
      <div className='success-message'>
        {successMessage}
      </div>
    )
  }

  if (errorMessage !== null) {
    return (
      <div className='error-message'>
        {errorMessage}
      </div>
    )
  }

  return null
}

export default Notification
