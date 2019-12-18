import React from 'react'
const Notification = ({ message, errorMessage }) => {
  if (message !== null) {
    return (
      <div className="success-message">
        {message}
      </div>
    )
  }

  if (errorMessage !== null) {
    return (
      <div className="error-message">
        {errorMessage}
      </div>
    )
  }

  return null
}
export default Notification
