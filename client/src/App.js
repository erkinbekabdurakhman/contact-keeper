import React from 'react';
import './App.css';
import NavBar from './components/layout/Navbar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import ContactState from './Context/contact/ContactState';
import AuthState from './Context/auth/AuthState';
import AlertState from './Context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <div className="App">
                <NavBar />
              </div>
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
