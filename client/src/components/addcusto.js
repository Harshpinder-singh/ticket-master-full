import React from 'react'
import axios from '../config/axios'
import Form from './form.js'

class AddCustomer extends React.Component {

    customerAdd = (customer) => {

        axios.post('/api/customers/', customer, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })

        this.props.history.push('/customers')
    }

    render() {
        return (
            <div>
                <h3>Add Customer</h3><hr />
                <Form customerAdd={this.customerAdd} />
            </div>
        )
    }
}
export default AddCustomer