import React from 'react'
import axios from '../config/axios'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Div = styled.div`
    height:80vh;
    display:flex;
    flex-direction: column;
    align-items:center;
   

`


class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = {
            employees: [],
            isdata: false
        }
    }
    removeHandle = (id) => {
        axios.delete(`/employees/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.setState(prev => {
                        return {
                            employees: prev.employees.filter(employee => employee._id !== id)
                        }
                    })

                }

            })

    }

    componentDidMount() {
        axios.get('/employees/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {

                this.setState({ employees: response.data, isdata: true })
            })
    }

    render() {
        return (


            <Div>
                <h3>Employees List</h3>
                <hr />
                {this.state.isdata ? (<React.Fragment>
                    <Link to="/employees/new">Add Employee</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><Link to={`/employees/${employee._id}`}>{employee.name}</Link></td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.email}</td>
                                        {employee.departmentId !== null ? <td>{employee.departmentId.name}</td> : <td></td>}
                                        <td><button className="btn btn-danger" onClick={() => { this.removeHandle(employee._id) }}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </React.Fragment>) : (<Icon type="loading" spin style={{ fontSize: "50px" }} />)}
            </Div>


        )
    }
}
export default EmployeeList