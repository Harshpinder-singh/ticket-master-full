import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom';

function CompoLayout(props) {

    return (

        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`/${props.location.pathname.split('/')[1] == 0 ? '/' : props.location.pathname.split('/')[1]}`]}>

            <Menu.Item key="/">
                <Link className="anchor" to="/">
                    <Icon type="home" />
                    <span className="nav-text"></span>Home
                  </Link>
            </Menu.Item>
            <Menu.Item key="/customers" >
                <Link className="anchor" to="/customers">
                    <Icon type="user" />
                    <span className="nav-text"></span>Customers
                </Link>
            </Menu.Item>
            <Menu.Item key="/departments" >
                <Link className="/departments" to="/departments">
                    <Icon type="container" />
                    <span className="nav-text"></span>
                    Departments
                </Link>
            </Menu.Item>
            <Menu.Item key="/employees" >
                <Link className="anchor" to="/employees">
                    <Icon type="usergroup-add" />
                    <span className="nav-text"></span>
                    Employees
                </Link>
            </Menu.Item>
            <Menu.Item key="/tickets" >
                <Link className="anchor" to="/tickets">
                    <Icon type="radius-upright" />
                    <span className="nav-text"></span>
                    Tickets
                </Link>
            </Menu.Item>
            <Menu.Item key="/logout" >
                <Link className="anchor" to="/logout">
                    <Icon type="user" />
                    <span className="nav-text"></span>Logout
                </Link>
            </Menu.Item>
        </Menu>
    )
}
export default CompoLayout

