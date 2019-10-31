import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { Layout } from 'antd';
import Customers from "./components/customers.js";
import Departments from "./components/department.js";
import AddEmployee from "./components/addemployees.js";
import EmployeeList from "./components/employeeList.js";
import Ticketnew from "./components/ticketnew.js";
import TicketShow from './components/ticketShow'
import AddCustomer from "./components/addcusto.js";
import customerShow from "./components/customerShow.js";
import EditCustomer from "./components/editcusto.js";
import Homee from "./components/Home/index";
import EmployeeShow from './components/employeeshow'
import EditEmployee from './components/editemployee'
import Login from './components/login/login'
import Logout from './components/logout/logout'
import Register from './components/register/register'
import LayoutLogin from './components/loginLayout/layoutLogin'
import CompoLayout from './components/compoLayout/compoLayout'
import TicketList from './components/ticketsList'
import { connect } from 'react-redux';
import './bootstrap.css'
const { Content, Sider } = Layout;

function App(props) {

  return (

    <React.Fragment>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />

          {Object.keys(props.user).length == 0 ? (<LayoutLogin {...props} />) : (<CompoLayout {...props} />)}

        </Sider>
        <Layout style={{ marginLeft: 200 }}>

          <Content style={{ margin: '10px 16px 0', overflow: 'hidden', height: "100vh" }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              <div className="container">
                <Switch>
                  <Route path="/" component={Homee} exact />

                  <Route path="/login" component={Login} exact />
                  <Route path="/register" component={Register} exact />
                  <Route path="/logout" component={Logout} exact />
                  <Route path="/customers" component={Customers} exact />
                  <Route path="/customers/new" component={AddCustomer} exact />
                  <Route path="/customers/edit/:id" component={EditCustomer} />

                  <Route path="/customers/:id" component={customerShow} />
                  <Route path="/tickets/new" exact component={Ticketnew} />
                  <Route path="/tickets" exact component={TicketList} />
                  <Route path="/tickets/:id" component={TicketShow} />


                  <Route path="/departments" component={Departments} />
                  <Route path="/employees" component={EmployeeList} exact />
                  <Route path="/employees/new" component={AddEmployee} />
                  <Route path="/employees/edit/:id" component={EditEmployee} />
                  <Route path="/employees/:id" component={EmployeeShow} />



                </Switch>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

    </React.Fragment>



  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(withRouter(App));
