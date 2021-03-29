// site :  https://volunteer-e97a0.web.app/

import React, { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddEvents from './components/AddEvents/AddEvents';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}> 
        <div className="container">
       <Router>
      <Header></Header> 
      <div>  
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/addEvents">
            <AddEvents />
          </PrivateRoute>
          <Route path="/dashboard">
            
          </Route>
          <Route path="/login">
              <Login></Login>
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
    </userContext.Provider>
  );
}

export default App;
