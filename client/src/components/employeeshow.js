import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'

export default class EmployeeShow extends React.Component {
    state = {
        name: '',
        email: ''
    }
    componentDidMount() {
        axios.get(`/api/employees/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.setState({ name: response.data.name, email: response.data.email })
                }
            })
    }
    render() {

        return (
            <div>
                <h3>show employee</h3><hr />
                <h4>{this.state.name}</h4>
                <h4>{this.state.email}</h4>
                <Link to={`/employees/edit/${this.props.match.params.id}`}>Edit Employee</Link>
            </div>
        )
    }
}