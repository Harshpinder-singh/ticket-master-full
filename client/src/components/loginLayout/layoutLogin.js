import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom';

function LayoutLogin(props) {

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`/${props.location.pathname.split('/')[1]}`]}>

            <Menu.Item key="/">
                <Link className="anchor" to="/">
                    <Icon type="home" />
                    <span className="nav-text"></span>Home
                  </Link>
            </Menu.Item>
            <Menu.Item key="/login"  >
                <Link className="anchor" to="/login">
                    <Icon type="user" />
                    <span className="nav-text"></span>Login
                </Link>
            </Menu.Item>
            <Menu.Item key="/register"  >
                <Link className="anchor" to="/register">
                    <Icon type="user" />
                    <span className="nav-text"></span>Register
                </Link>
            </Menu.Item>

        </Menu>
    )
}
export default LayoutLogin