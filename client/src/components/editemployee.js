import React from 'react'
import axios from '../config/axios'
import Employeeform from './employeeform'

class EditEmployee extends React.Component {
    constructor() {
        super()
        this.state = {
            employee: {}
        }
    }

    componentDidMount() {
        axios.get(`/employees/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {

                this.setState({ employee: response.data })
                console.log(response.data)
            })

    }

    handleSubmit = (data) => {
        console.log("handlesubmit wala   ", data)
        axios.put(`/employees/${data.id}`, { name: data.name, email: data.email, mobile: data.mobile, departmentId: data.departmentId }, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log("axios wala ", response.data)
                if (response.data._id) {
                    this.props.history.push(`/employees/${data.id}`)
                }

            })

    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <h2>Edit your details</h2>
                {Object.entries(this.state.employee).length !== 0 && <Employeeform handleSubmit={this.handleSubmit} employee={this.state.employee} />}
            </React.Fragment>

        )
    }


}
export default EditEmployee