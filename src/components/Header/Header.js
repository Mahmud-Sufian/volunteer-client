import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import "./Header.css";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  return (
    
      <div className="row container header-container">
        <div className="col-md-6">
          <div className="logo">
            <h1>Volunteer</h1>
          </div>
        </div>
        <div className="col-md-6">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addEvents">Add Event</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {loggedInUser.email && <li>
                <Link to="">{loggedInUser.email && loggedInUser.name}</Link>
            </li>}
            <li>
              <Link to="/login" onClick={() => setLoggedInUser({})}>{loggedInUser.email ? 'Log Out' : 'Login'}</Link>
            </li>
          </ul>
        </div>
      </div>
   
  );
};

export default Header;
