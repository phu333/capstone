import React from 'react';

import './App.css';
import LoginPage from './JsPage/Login/LoginPage'
import ContractTable from './JsPage/ContractTable'
import CustomerTable from './JsPage/CustomerTable'
import ContractTypeTable from './JsPage/ContractTypeTable'
import UpdateProfile from './JsPage/UpdateProfile'
import UpdateProfileCompany from './JsPage/UpdateProfileCompany'
import EmployeeTable from './JsPage/EmployeeTable'
import SignatureList from './JsPage/SignatureList'
import Particles from 'react-particles-js';
import EmployeeSideMenu from './JsPage/EmployeeSideMenu';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
class App extends React.Component {
  render() {
    var information = this.props.myLoginReducer.map((login, index) => {
      return (<>
        <Route exact path="/capstone/SideMenu" component={EmployeeSideMenu} />
        <Route exact path="/capstone/customerList" component={CustomerTable} />
        <Route exact path="/capstone/contract" render={() => <ContractTable role={login.signPermission} />
        } />
        <Route exact path="/capstone/contractType" component={ContractTypeTable} />
        <Route exact path="/capstone/profile" component={UpdateProfile} />
        <Route exact path="/capstone/employee" component={EmployeeTable} />
        <Route exact path="/capstone/signatureList" component={SignatureList} />
        <Route exact path="/capstone/companyProfile" component={UpdateProfileCompany} /></>);

    })
    console.log(information)
    return (
      <div >
        <Particles
          style={{ position: "absolute" }}
          height="95%"
          width="95%"
          params={{
            particles: {
              color: {
                value: "#000000"
              },
              line_linked: {
                color: {
                  value: "#000000"
                }
              },
              number: {
                value: 50
              },
              size: {
                value: 3
              }
            }
          }}
        />
        <Router>

        <Redirect push to="/capstone/Login" />

          <Route exact path="/capstone/Login" component={LoginPage} />
          {information}
        </Router>




      </div>
    );
  }
}
var mapStateToProps = state => {
  console.log(state.myLoginReducer)
  return {
    myLoginReducer: state.myLoginReducer
  }
}
export default connect(mapStateToProps, null)(App);
