import React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import './App.css';
import LoginPage from './JsPage/Login/LoginPage'
import ContractTable from './JsPage/Table/ContractTable'
import CustomerTable from './JsPage/Table/CustomerTable'
import ContractTypeTable from './JsPage/Table/ContractTypeTable'
import UpdateProfile from './JsPage/Update/UpdateProfile'
import UpdateProfileCompany from './JsPage/Update/UpdateProfileCompany'
import EmployeeTable from './JsPage/Table/EmployeeTable'
import SignatureList from './JsPage/Table/SignatureList'
import Particles from 'react-particles-js';
import { Tabs, Result, Button } from 'antd';
import EmployeeSideMenu from './JsPage/Login/EmployeeSideMenu';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import SearchByCode from './JsPage/Login/SearchContract'
import { Offline, Online } from "react-detect-offline";
const { TabPane } = Tabs;
class App extends React.Component {
  state = {
    currentTab: "Login",
    showTab: true
  }
  changeTab = activeKey => {
    console.log(activeKey);
    this.setState({
      currentTab: activeKey,

    });
  };
  render() {
    console.log(this.props.myLoginReducer)
    // var information = this.props.myLoginReducer.map((login, index) => {
    //   this.setState({
    //     showTab:false
    //   })

    // })
    // console.log(JSON.parse(reactLocalStorage.get('login', true)))
    return (
      <div >
        <Online><Particles
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
            {this.props.myLoginReducer.length === 0 ?
              <Tabs onTabClick={this.changeTab} defaultActiveKey="Login" centered>
                <TabPane tab="Login" key="login">
                  <Redirect push to={"/capstone/" + this.state.currentTab} />

                  <Route exact path="/capstone/Login" component={LoginPage} />
                </TabPane>
                <TabPane tab=" Search contract" key="SearchContract">
                  <Redirect push to={"/capstone/" + this.state.currentTab} />

                  <Route exact path="/capstone/SearchContract" component={SearchByCode} />
                </TabPane>

              </Tabs> : <Router>
                <Redirect push to={"/capstone/" + this.state.currentTab} />

                <Route exact path="/capstone/Login" component={LoginPage} />
              </Router>}


            {/* {information} */}
          </Router></Online>
        <Offline><Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary">Back Home</Button>}
        /></Offline>





      </div>
    );
  }
}
var mapStateToProps = state => {

  return {
    myLoginReducer: state.myLoginReducer
  }
}
export default connect(mapStateToProps, null)(App);
