import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'

export default class customerShow extends React.Component {
    state = {
        name: '',
        email: ''
    }
    componentDidMount() {
        axios.get(`/api/customers/${this.props.match.params.id}`, {
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
                <h2>show customer</h2><hr />
                <h3>{this.state.name}</h3>
                <h3>{this.state.email}</h3>
                <Link to={`/customers/edit/${this.props.match.params.id}`}>Edit Customer</Link>
            </div>
        )
    }
}