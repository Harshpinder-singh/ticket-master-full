import React from 'react'
import axios from '../config/axios'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'


class Customers extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            isdata: false

        }
    }
    componentDidMount() {
        axios.get('/api/customers/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const users = response.data
                this.setState({ users, isdata: true })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    removeCustomer = (id) => {
        if (window.confirm('are want to remove this record ?')) {
            axios.delete(`/api/customers/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(response => {
                    if (response.data._id) {
                        this.setState(prev => {
                            return {
                                users: prev.users.filter(user => user._id !== id)
                            }
                        })

                    }

                })

        }


    }

    render() {
        return (
            <div className="customer">
                <h2>Customers</h2><hr />
                {this.state.isdata ? (<React.Fragment>
                    <Link to="/customers/new">Add Customer</Link>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><Link to={`/customers/${user._id}`}>{user.name}</Link></td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td><button className="btn btn-danger" onClick={() => { this.removeCustomer(user._id) }}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </React.Fragment>) : (<Icon type="loading" spin style={{ fontSize: "50px" }} />)}
            </div>
        )
    }
}
export default Customers