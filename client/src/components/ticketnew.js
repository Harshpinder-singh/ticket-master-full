import React from 'react'
import axios from '../config/axios'

import Select from 'react-select'

class Ticketnew extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            customers: [],
            customer: '',
            departments: [],
            message: '',
            priority: '',
            employees: [],
            employee: [],
            employeesnew: [],
            option: '',
            isResolved: false
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSelect = (props => {
        // console.log('handle select', props)
        this.setState({ [props.name]: props.value }, () => {
            console.log(this.state)
        })

        if (props.name == "option") {
            this.setState(prev => {
                return {
                    employeesnew: prev.employees.filter(employee => employee.department_id == prev.option)
                }
            })


        }
        else if (Array.isArray(props) == true) {
            console.log(props)
            this.setState({ employee: props })

        }

        // console.log(this.state)

    })

    handleSubmit = (e) => {
        e.preventDefault()
        const emp = []
        this.state.employee.forEach(data => {
            emp.push(data.value)
        })
        const ticket = {
            title: this.state.title,
            customerId: this.state.customer,
            departmentId: this.state.option,
            employeesIds: emp,
            priority: this.state.priority,
            message: this.state.message,
            code: Number(new Date()),
            isResolved: this.state.isResolved
        }

        axios.post('/api/tickets', ticket, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {

                if (response.data._id) {
                    this.setState({
                        title: '',
                        customers: [],
                        customer: '',
                        departments: [],
                        message: '',
                        priority: '',
                        employees: [],
                        employee: [],
                        employeesnew: [],
                        option: '',
                        isResolved: false
                    }, () => {
                        this.props.history.push('/tickets')
                    })

                }
                else {
                    if (response.data.error) {
                        window.alert(response.data.error)
                    } else {
                        window.alert('something went wrong')
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    componentDidMount() {
        axios.get('/api/departments/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const array = []
                response.data.forEach(item => {
                    array.push({ value: item._id, label: item.name, name: "option" })
                })
                this.setState({ departments: array })

            })
        axios.get('/api/customers/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const array = []
                response.data.forEach(item => {
                    array.push({ value: item._id, label: item.name, name: "customer" })
                })
                this.setState({ customers: array })
                console.log(array)

            })
        axios.get('/api/employees/', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const array = []
                response.data.forEach(item => {
                    array.push({ value: item._id, label: item.name, name: "employee", department_id: item.departmentId._id })
                })
                this.setState({ employees: array })

            })
    }


    render() {
        return (
            <div>
                <h3>Add Ticket</h3><hr />

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title <input className="form-control" type="text" name="title" cvalue={this.state.title} onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Customer<Select className="select" name="customer" options={this.state.customers} onChange={this.handleSelect} />
                    </label><br />
                    <label>
                        Department<Select className="select" name="option" options={this.state.departments} onChange={this.handleSelect} />
                    </label><br />
                    <label>
                        Employees
                    <Select className="select" isMulti name="employee" options={this.state.employeesnew} onChange={this.handleSelect} />
                    </label><br />
                    <label>
                        Message
                        <textarea name="message" required className="form-control" value={this.state.message} onChange={this.handleChange} />
                    </label>
                    <div>
                        <label>
                            High:
                        <input type="radio" value="high" name="priority" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div >
                        <label>
                            Low:
                        <input type="radio" value="low" name="priority" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div >
                        <label>
                            Medium: <input type="radio" value="medium" name="priority" onChange={this.handleChange} /><br />
                        </label>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Submit" />



                </form>
            </div>
        )
    }
}

export default Ticketnew

