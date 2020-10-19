import React from 'react';

import './App.css';
import LoginPage from './JsPage/Login/LoginPage'
import Particles from 'react-particles-js';

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
      <LoginPage></LoginPage>

    </div>
  );
}

export default App;
