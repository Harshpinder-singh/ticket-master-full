import React from 'react'
import axios from '../config/axios';
import Employeeform from './employeeform'


class AddEmployee extends React.Component {


    handleSubmit = (data) => {


        axios.post('/employees', data, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.props.history.push('/employees')
                }
            })

    }
    render() {
        return (
            <div>
                <h3>Add Employee</h3>
                <Employeeform handleSubmit={this.handleSubmit} />

            </div>
        )
    }
}
export default AddEmployee

