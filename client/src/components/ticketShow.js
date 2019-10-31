import React from 'react'
import { Card, Icon } from 'antd'
import axios from '../config/axios'

class TicketShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ticket: {},
            isdata: false,
            color: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id

        axios.get(`/api/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                if (response.data._id) {
                    this.setState({
                        ticket: response.data,
                        isdata: true,
                        color: response.data.isResolved ? 'green' : 'red'
                    })
                }
                else {
                    window.alert('something went wrong')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log('state', this.state)
        return (
            <div className="d-flex-column justify-content-center">
                <h3>Ticket Show</h3><hr />
                <div className="d-flex justify-content-center">
                    {this.state.isdata ? (<Card title={this.state.ticket.title} bordered={true} style={{ width: 500, backgroundColor: this.state.color }}>
                        <p>Priority: {this.state.ticket.priority}</p>
                        <p>Department: {this.state.ticket.departmentId.name}</p>
                        <p>Message: {this.state.ticket.message}</p>

                    </Card>) : (<Icon type="loading" spin style={{ fontSize: "50px" }} />)}
                </div>

            </div>
        )
    }
}
export default TicketShow