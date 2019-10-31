import React from 'react'
import axios from '../config/axios';
import Select from 'react-select'
import '../App.css'

class Employeeform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.employee ? props.employee.name : '',
            email: props.employee ? props.employee.email : '',
            mobile: props.employee ? props.employee.mobile : '',
            departments: [],
            option: props.employee ? props.employee.departmentId._id : '',
            value: {}
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSelect = (props => {
        this.setState(prev => {
            return {
                option: props.value
            }
        })
    })

    handleSubmit = (e) => {
        e.preventDefault()
        const employee = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            departmentId: this.state.option
        }
        this.props.employee && (employee.id = this.props.employee._id)
        this.props.handleSubmit(employee)


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
                    array.push({ value: item._id, label: item.name })
                })
                this.setState(prev => {
                    return {
                        departments: array

                    }
                })

            })
    }


    render() {
        return (
            <div><hr />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name<input required className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Email<input required className="form-control" type="text" value={this.state.email} name="email" onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Mobile<input required className="form-control" type="text" value={this.state.mobile} name="mobile" onChange={this.handleChange} />
                    </label><br />
                    <label>
                        Department
                       {this.props.employee
                            ?
                            (<Select required className="select" isClearable={true} name="option" options={this.state.departments} onChange={this.handleSelect} />)
                            :
                            <Select required className="select" isClearable={true} name="option" options={this.state.departments} onChange={this.handleSelect} />}
                    </label><br />
                    <input className="btn btn-primary" type="submit" value="Submit" />


                </form>
            </div>
        )
    }
}
export default Employeeform

