import React from 'react'

const Notification = (props) => {
  const message = props.store.getState().notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleNotificaion = message ? style : {'display': 'none'}

  return (
    <div style={styleNotificaion}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification