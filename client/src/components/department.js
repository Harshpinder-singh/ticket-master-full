import React from 'react'
import axios from '../config/axios'
import { Link } from 'react-router-dom'

import { Icon } from 'antd'


class Departments extends React.Component {
    constructor() {
        super()
        this.state = {
            departments: [],
            name: '',
            isdata: false
        }
    }
    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const depart = { name: this.state.name }
        axios.post('/departments/', depart, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ name: '' })
                this.axiosUpdate()
            })

    }
    axiosUpdate() {
        axios.get('/departments/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ departments: response.data })
            })
    }
    removeHandle = (id) => {
        axios.delete(`/departments/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.setState(prev => {
                        return {
                            departments: prev.departments.filter(depart => depart._id !== id)
                        }
                    })

                }

            })

    }

    componentDidMount() {
        axios.get('/departments/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ departments: response.data, isdata: true })
            })
    }

    render() {
        return (

            <div className="department">
                {this.state.isdata ? (< React.Fragment>
                    <h3>Departments</h3><hr />

                    <form onSubmit={this.handleSubmit}>
                        <label><h4>Add Department</h4>
                            <input type="text" required className="form-control" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <input className="btn btn-primary" type="submit" value="Add" />
                    </form>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.departments.map((department, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{department.name}</td>
                                        <td><button className="btn btn-danger" onClick={() => { this.removeHandle(department._id) }}>Remove</button></td>
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
export default Departments