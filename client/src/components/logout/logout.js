import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeUser } from '../../actions/userAction'

function Logout(props) {
    localStorage.clear()
    props.dispatch(removeUser())
    return (
        <Redirect to="/login" />
    )
}

export default connect()(Logout)
