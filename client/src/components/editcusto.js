import React from 'react'
import axios from '../config/axios'
import Form from './form.js'

class EditCustomer extends React.Component {
    constructor() {
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/customers/${this.props.match.params.id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {

                this.setState({ customer: response.data })
                console.log(response.data)
            })

    }

    customerAdd = (data) => {
        console.log(data)
        axios.put(`/api/customers/${data.id}`, { name: data.name, email: data.email, mobile: data.mobile }, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.props.history.push(`/customers/${data.id}`)
                }

            })

    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <h2>Edit your details</h2>
                {Object.entries(this.state.customer).length !== 0 && <Form customerAdd={this.customerAdd} customer={this.state.customer} />}
            </React.Fragment>

        )
    }


}
export default EditCustomer