import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './App.css';
import LoginPage from './JsPage/Login/LoginPage'

import { Tabs, Result, Button } from 'antd';

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


    return (
      <div >
        <ReactCSSTransitionGroup transitionName="example"
          transitionAppear={true} transitionAppearTimeout={500}
        >
          {/* <Online> */}

            <Router>
              {/* {this.props.myLoginReducer.length === 0 ?
                <Tabs onTabClick={this.changeTab} defaultActiveKey="Login" centered >
                  <TabPane tab="Login" key="login" style={{  backgroundColor: 'rgb(8, 59, 102)' }}>
                    <Redirect push to={"/capstone/" + this.state.currentTab} />

                    <Route exact path="/capstone/Login" component={LoginPage} />
                  </TabPane>
                  <TabPane tab=" Search contract" key="SearchContract">
                    <Redirect push to={"/capstone/" + this.state.currentTab} />

                    <Route exact path="/capstone/SearchContract" component={SearchByCode} />
                  </TabPane>

                </Tabs> 
                : <Router>
                  <Redirect push to={"/capstone/Login"} />

                  <Route exact path="/capstone/Login" component={LoginPage} />
                </Router>} */}
                <Router>
                  <Redirect push to={"/capstone/Login"} />

                  <Route exact path="/capstone/Login" component={LoginPage} />
                </Router>

              {/* {information} */}
            </Router>
            {/* </Online> */}
          {/* <Offline><Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."

          /></Offline> */}

        </ReactCSSTransitionGroup>



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
