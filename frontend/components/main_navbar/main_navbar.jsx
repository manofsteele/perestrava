import React from 'react';

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
      <span className="dashboard-top">Dashboard <i className="fas fa-angle-down"></i></span>
        <div className="dropdown-content" id="left-dropdown">
          <li>
            <a href="#/routes/index">My Routes</a>
          </li>
        </div>
    </div>
    <div className="dropdown-right"><i className="fas fa-plus-circle"></i></div>
      <div className="dropdown-content" id="right-dropdown">
        <li>
          <a href="#/routes/new">Create a new route</a>
        </li>
      </div>
  </div>
);

export default MainNavbar;
