import React from 'react';

import './App.css';
import LoginPage from './JsPage/Login/LoginPage'
import Particles from 'react-particles-js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
function App() {

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


        <Route exact path="/capstone" component={LoginPage} />
        <Route exact path="/capstone/" component={LoginPage} />
        <Route exact path="/capstone/Login" component={LoginPage} />


      </Router>




    </div>
  );
}

export default App;
