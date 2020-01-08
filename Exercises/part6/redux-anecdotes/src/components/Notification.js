import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const message = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleNotificaion = message ? style : {'display': 'none'}

  return (
    <div style={styleNotificaion}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)