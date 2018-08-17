import React from 'react';
import { logout } from '../../actions/session_actions';

// function showLeftDropdown(){
//   document.getElementById("left-dropdown").classList.toggle("hidden");
//
// }
//
// function showRightDropdown() {
//   document.getElementById("right-dropdown").classList.toggle("hidden");
// }
const MainNavbar = () => (
  <div className="main-navbar">
    <div className="dropdown-left">
    <a href="#/" className="logo">Perestrava</a>
    <div className="dropdown-left-dashboard">
      <span className="dashboard-top">Dashboard <i className="fas fa-angle-down"></i>
        <div className="dropdown-content-left" id="left-dropdown">
          <li>
            <a href="#/routes/index">My Routes</a>
          </li>
        </div>
        </span>
      </div>
    </div>
    <div className="dropdown-container">
      <div className="dropdown-right"><i className="fas fa-plus-circle"></i>
        <div className="dropdown-content-right" id="right-dropdown">
          <li>
            <a href="#/routes/new">Create a new route</a>
          </li>
        </div>
      </div>
      <button className="main-nav-logout" onClick={logout}>Log Out</button>
    </div>
  </div>
);

export default MainNavbar;
