import React from 'react'
import { startSetUser } from '../../actions/userAction'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(startSetUser(body))

    }

    render() {
        if (this.props.user._id) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className="row h-100 justify-content-center align-items-center">

                <form onSubmit={
                    this.handleSubmit
                } ><h3>Login</h3><hr />
                    <div className="form-group">
                        <label >
                            Email < input type="email"
                                name="email" className="form-control"
                                value={
                                    this.state.email
                                }
                                onChange={
                                    this.handleChange
                                }
                            /> </label>
                    </div>
                    <div className="form-group">
                        <label >
                            Password < input type="password"
                                name="password"
                                className="form-control"
                                value={
                                    this.state.password
                                }
                                onChange={
                                    this.handleChange
                                }
                            /> </label>
                    </div>
                    <input type="submit" className="btn btn-primary"
                        value="Login" />
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login)