import React from 'react'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import axios from '../config/axios'

const { TabPane } = Tabs

class TicketList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pending: [],
            completed: []

        }
    }
    handleRemove = (id) => {
        axios.delete(`/tickets/soft_delete/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    if (response.data.isResolved) {
                        this.setState(prev => {
                            return {
                                completed: prev.completed.filter(data => data._id !== response.data._id)
                            }
                        })

                    }
                    else {
                        this.setState(prev => {
                            return {
                                pending: prev.pending.filter(data => data._id !== response.data._id)
                            }
                        })

                    }
                }
            })
            .catch(err => {
                window.alert('something went wrong')
            })
    }
    componentDidMount() {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {

                let pending = []
                let completed = []
                if (response.data[0]._id) {

                    response.data.forEach(element => {
                        if (element.isResolved) {
                            completed.push(element)
                        } else {
                            pending.push(element)
                        }
                    });
                    this.setState({ pending, completed })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    callback = key => {
        console.log(key)
    }
    checkHandle = (e, ticket) => {
        console.log(ticket)
        const body = { _id: ticket._id, isResolved: e.target.checked }
        axios.put('/ticket/status', body, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    if (response.data.isResolved) {
                        ticket.isResolved = true
                        this.setState(prev => {
                            return {
                                pending: prev.pending.filter(data => data._id !== response.data._id),
                                completed: [...prev.completed, ticket]
                            }
                        })
                    }
                    if (!response.data.isResolved) {
                        ticket.isResolved = false
                        this.setState(prev => {
                            return {
                                completed: prev.completed.filter(data => data._id !== response.data._id),
                                pending: [...prev.pending, ticket]
                            }
                        })
                    }
                }
            })

    }
    render() {
        return (
            <div> <h3>Tickets</h3><hr />
                <Link to='/tickets/new'>Add Ticket</Link>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Pending" key="1">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Customer</th>
                                    <th>Department</th>
                                    <th>Employees</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.pending.map((data, index) => (<tr key={index}>
                                    <td>{data.title}</td>
                                    <td>{data.customerId.name}</td>
                                    <td>{data.departmentId.name}</td>
                                    <td>{data.employeesIds.map(emp => <p key={emp._id}>{emp.name}</p>)}</td>
                                    <td>{data.priority}</td>
                                    <td><Link className='btn btn-primary' to={`/tickets/${data._id}`}>Show</Link><br /><button className='btn btn-danger mt-1' onClick={() => this.handleRemove(data._id)}>Remove</button></td>
                                    <td><input type='checkbox' onChange={(e) => this.checkHandle(e, data)} /></td>
                                </tr>))}

                            </tbody>
                        </table>

                    </TabPane>
                    <TabPane tab="Completed" key="2">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Customer</th>
                                    <th>Department</th>
                                    <th>Employees</th>
                                    <th>Actions</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.completed.map((data, index) => (<tr key={index}>
                                    <td>{data.title}</td>
                                    <td>{data.customerId.name}</td>
                                    <td>{data.departmentId.name}</td>
                                    <td>{data.employeesIds.map(emp => <p key={emp._id}>{emp.name}</p>)}</td>
                                    <td><Link className='btn btn-primary' to={`/tickets/${data._id}`}>Show</Link><br /><button className='btn btn-danger mt-1' onClick={() => this.handleRemove(data._id)}>Remove</button></td>
                                    <td><input type='checkbox' defaultChecked={data.isResolved} onChange={(e) => this.checkHandle(e, data)} /></td>
                                </tr>))}

                            </tbody>
                        </table>
                    </TabPane>

                </Tabs>
            </div>
        )
    }
}

export default TicketList