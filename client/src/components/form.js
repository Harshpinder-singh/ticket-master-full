import React from 'react'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.customer ? props.customer.name : '',
            email: props.customer ? props.customer.email : '',
            mobile: props.customer ? props.customer.mobile : ''
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const customer = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }
        this.props.customer && (customer.id = this.props.customer._id)
        this.props.customerAdd(customer)

    }


    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name<input required type="text" className="form-control" value={this.state.name} name="name" onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Email<input required type="text" className="form-control" value={this.state.email} name="email" onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Mobile<input required type="text" className="form-control" value={this.state.mobile} name="mobile" onChange={this.handleChange} />
                    </label><br />
                    <input className="btn btn-primary" type="submit" value="Submit" />


                </form>
            </div>
        )
    }
}
export default Form