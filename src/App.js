import React from 'react';

import './App.css';
import LoginPage from './JsPage/Login/LoginPage'
import Search from './JsPage/Login/SearchContract'
import { Tabs, Result, Button } from 'antd';
import FadeIn from 'react-fade-in'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Offline, Online } from "react-detect-offline";

class App extends React.Component {

  render() {

    return (
      <div >
        <FadeIn>
          <Online>

            <Router>



              <>
              <Redirect exact from="/" to={"/capstone/Login"} />

                <Route exact path="/capstone/Login" component={LoginPage} />
                <Route exact path="/capstone/Search" component={Search} />
                </>



            </Router>
          </Online>
          <Offline><Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."

          /></Offline>

        </FadeIn>



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
